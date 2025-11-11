import axios from 'axios';
import {
    Get as getPost,
} from "aleph-sdk-ts/dist/messages/post";
import { erc20Abi } from 'viem'
import { AlephApp, AppPayment, PublicData, PublicPaymentIdName } from "./backend.type";
import { formatAddr, getChainDatas, getChainFormatted, utils } from "../utils/utils";
import { writeContract, readContract, signTypedData } from "@wagmi/core";
import { APIServer, alephUtils, subsApi } from '../utils';
import md5 from "blueimp-md5";
import { ethers } from 'ethers';
import { config } from '../components/Button/WalletProvider';

export function separate(selectedToken: any) {
    const motsSepares = selectedToken.split(' ');
    return {
        amount: motsSepares[0],
        token: motsSepares[1]
    };
}

export const aleph = async (
    type: string,
    postType: string,
    tags: string,
    account: string
) => {
    let response;
    switch (type) {
        case "get":
            response = await getPost({
                types: postType,
                pagination: 200,
                page: 1,
                refs: [],
                addresses: [account],
                tags: [tags],
                hashes: [],
                APIServer: APIServer,
            });
            break;
        default:
    }
    return response;
};

export const getAppDatas = async (
    chain: string,
    user: string,
    appId: string,
    mode: string
): Promise<PublicData | undefined> => {
    const db = mode == "testnet" ? alephUtils.test.appDB : alephUtils.prod.appDB;
    const account = mode == "testnet" ? alephUtils.test.alephAccount : alephUtils.prod.alephAccount;
    const response: any = await aleph("get", db, user, account);
    for (let i = 0; i < response.posts.length; i++) {
        let app: AlephApp = response.posts[i].content.body;
        if (app.appId === appId && getChainFormatted(app.chain) === chain) {
            let publicDatas: PublicData = {
                existed: true,
                app: app,
            };
            return publicDatas;
        }
    }
};

export const getPayment = async (
    paymentName: string,
    chain: string,
    user: string,
    appId: string,
    mode: string
) => {
    let alephApp = await getAppDatas(chain, user, appId, mode);
    let payments = alephApp?.app.payments;
    let paymentInfos = payments?.filter((payment) => payment.name == paymentName);
    return paymentInfos ? paymentInfos[0] : null;
};

export const getPaymentIds = async (appId: string, chain: string, mode: string) => {
    const db = mode == "testnet" ? alephUtils.test.subsIndex : alephUtils.prod.subsIndex;
    const account = mode == "testnet" ? alephUtils.test.alephAccount : alephUtils.prod.alephAccount;
    const response: any = await aleph("get", db, '', account);
    let appPms: AppPayment[] = response.posts[0].content.body;
    let appPm: AppPayment = appPms.filter((app) => app.appId == appId && app.chain == chain)[0];
    let paymentsDataList: PublicPaymentIdName[] = [];
    for (var i = 0; i < appPm.payment.length; i++) {
        let pIdName: PublicPaymentIdName = {
            paymentId: appPm.payment[i].paymentId,
            paymentName: appPm.payment[i].payment.name
        }
        paymentsDataList.push(pIdName);
    }
    return paymentsDataList;
}

export const wagmiGetRequiredAmount = async (appId: string, paymentId: string, chain: string, tokenAddress: string, user: any, userChoosenPeriod: number) => {
    // console.log("wagmiGetRequiredAmount : ", appId, paymentId, chain, tokenAddress, user, userChoosenPeriod);
    let subsAddress: any = getChainDatas(chain).address;
    let abi = utils.contractABI;
    const requiredAmount = await readContract(config, {
        address: subsAddress,
        abi: abi,
        functionName: 'getRequiredAmount',
        args: [tokenAddress, paymentId, appId, user, userChoosenPeriod]
    })
    return requiredAmount;
}

export const approve = async (chain: any, token: any, amount: bigint) => {
    let subsAddress: any = getChainDatas(chain).address;
    let addr: any = formatAddr(token);
    const data = await writeContract(config, {
        address: addr,
        abi: erc20Abi,
        functionName: 'approve',
        args: [subsAddress, amount]
    })
    return data;
};

export const allowance = async (chain: string, token: any, user: any) => {
    let subsAddress: any = getChainDatas(chain).address;
    const data = await readContract(config, {
        address: token,
        abi: erc20Abi,
        functionName: 'allowance',
        args: [user, subsAddress]
    })
    return data;
};

function hexToString(hex: string) {
    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
        const charCode = parseInt(hex.substr(i, 2), 16);
        // Filtrer les caractères non imprimables et de contrôle (0-31, sauf newline et tab)
        if (charCode >= 32 || charCode === 10 || charCode === 9) {
            str += String.fromCharCode(charCode);
        }
    }
    return str;
}

export function extractHexValues(inputString: string) {
    const hexRegex = /0x[0-9a-fA-F]+/g;
    const hexMatches = inputString.match(hexRegex);

    if (hexMatches) {
        return hexToString(hexMatches.toString());
    } else {
        return [].toString();
    }
}

const simulateCall = async (chain: string, user: string, appId: string, paymentId: string, token: string, signature: string, userChoosenPeriod: number): Promise<string> => {
    let simulation = "";
    try {
        let chainDatas = getChainDatas(chain)
        const provider = new ethers.JsonRpcProvider(chainDatas.rpc);
        const contract = new ethers.Contract(chainDatas.address, utils.contractABI, provider);
        await contract.permit_subscribe.staticCall(user, Number(appId), paymentId, token, signature, userChoosenPeriod);
        return simulation = "true";
    } catch (error: any) {
        simulation = extractHexValues(error.data);
        return simulation
    }
}

export const subscribe = async (apiKey: string, appId: string, paymentId: string, token: string, chain: string, user: string, userChoosenPeriod: number, checkout?: any) => {
    try {
        let subsAddress: any = getChainDatas(chain).address;
        let subsChain: any = getChainDatas(chain).id.chainId;
        const userNonce: any = await readContract(config, {
            address: subsAddress,
            abi: utils.contractABI,
            functionName: 'nonces',
            args: [user]
        });
        const domain = {
            name: 'Subs',
            version: '1',
            chainId: subsChain,
            verifyingContract: subsAddress
        };
        const value = {
            appId: appId,
            paymentId: paymentId,
            token: token,
            nonce: userNonce
        };
        const types = {
            Subscription: [
                { name: 'appId', type: 'uint256' },
                { name: 'paymentId', type: 'bytes32' },
                { name: 'token', type: 'address' },
                { name: 'nonce', type: 'uint256' }
            ]
        };
        const signature = await signTypedData(config, {
            types: types,
            primaryType: "Subscription",
            domain: domain,
            message: value,
        });
        // let signature = await etherSigner.signTypedData(domain, types, value);
        if (signature) {
            let finalResponse: any;
            // get current minute timestamp
            let simulation = await simulateCall(chain, user, appId, paymentId, token, signature, userChoosenPeriod);
            if (simulation == "true") {
                let timestamp = Math.floor(Date.now() / 1000);
                let hashKey = md5(apiKey + timestamp);
                await axios({
                    method: 'post',
                    headers: {
                        'fromWidget': "true",
                        'x-api-key': hashKey,
                        'Content-Type': 'application/json'
                    },
                    data: {
                        'chain': chain,
                        'user': user,
                        'appId': appId,
                        'paymentId': paymentId,
                        'token': token,
                        'sig': signature,
                        'userChoosenPeriod': userChoosenPeriod,
                        'checkout': checkout
                    },
                    url: subsApi + '/creator/subscribe',
                })
                    .then(function (response) {
                        // console.log("subscribe response : ", response.data);
                        finalResponse = response.data;
                    }).catch(function (error) {
                        // console.log("subscribe error : ", error.response.data);
                        finalResponse = error.response.data;
                    });
                return finalResponse;
            } else {
                return finalResponse = { simulation: false, message: simulation }
            }
        }
    } catch (error) {
        console.log("subscribe error : ", error);
    }
};
