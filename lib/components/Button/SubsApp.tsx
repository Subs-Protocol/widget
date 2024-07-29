import { useEffect, useState } from "react";
import {
  Button,
  Flex,
  Modal,
  Select,
  Text,
  rem,
} from "@mantine/core";
import { getAppDatas, getPayment, getPaymentIds, separate, Choice, FormPaymentValues, FormTokenValues, PublicPaymentIdName, SubsProps } from "../../backend";
import { formatAddr, formatPeriod, getChainId, subsStyles } from "../../utils";
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useDisclosure } from "@mantine/hooks";
import { IconShieldCheckeredFilled } from "@tabler/icons-react";
import SubscribeReview from "../Modal";
import { useAccount, useNetwork } from "wagmi";
import { switchNetwork } from '@wagmi/core';



export const SubsApp = (props: SubsProps) => {
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork();
  const { open: openWeb3 } = useWeb3Modal();
  const [openedPT] = useState(false);
  const [lpayments, setPayments] = useState<FormPaymentValues>();
  const [token, setToken] = useState("");
  const [appPayments, setAppPayments] = useState([] as string[]);
  const [openedTg, { open, close }] = useDisclosure(false);
  const [finalChoice, setFinalChoice] = useState({} as Choice);
  const [appName, setAppName] = useState("");
  const [paymentIds, setPaymentIds] = useState<PublicPaymentIdName[]>(
    [] as PublicPaymentIdName[]
  );


  const paymentClasses = subsStyles({
    tokenOpened: openedPT,
    selectedBtn: 0,
    defaultPayment: undefined,
    selectLabel: false,
    userWidth: props.width ? props.width > 0 ? props.width : 200 : 200
  });
  const cryptoClasses = subsStyles({
    tokenOpened: openedPT,
    selectedBtn: 1,
    defaultPayment: props.defaultPayment,
    selectLabel: true,
    userWidth: props.width ? props.width > 0 ? props.width : 200 : 200
  });
  const subscribeClasses = subsStyles({
    tokenOpened: openedPT,
    selectedBtn: 2,
    defaultPayment: props.defaultPayment,
    selectLabel: false,
    userWidth: props.width ? props.width > 0 ? props.width : 200 : 200,
    choice: props.choice ? props.choice.token : ""
  });

  const linkStyles = {
    color: "black",
    textDecoration: "none",
  };

  async function buildPayment(payment: string) {
    let alapp = await getAppDatas(props.chain, props.address, props.appId, props.mode);
    const payIds: any = await getPaymentIds(props.appId, props.chain, props.mode);
    if (payment) {
      let payments: any = await getPayment(
        props.defaultPayment ? props.defaultPayment : "",
        props.chain,
        props.address,
        props.appId,
        props.mode
      );
      setPayments(payments);
    } else {
      let paymentNames: string[] = []
      alapp?.app.payments?.map((newApp:any) => {
        paymentNames.push(newApp.name);
      })
      setAppPayments(paymentNames);
    }
    setPaymentIds(payIds);
    setAppName(alapp?.app.name ? alapp?.app.name : "");
    return payIds;
  }

  async function buildChoice() {
    let paymt: any = await getPayment(`${props.choice?.payment}`, props.chain, props.address, props.appId, props.mode);
    let wantedToken: FormTokenValues = paymt?.tokens.filter((token: FormTokenValues) => formatAddr(token.address) == formatAddr(props.choice?.token))[0];
    const payIds: any = await getPaymentIds(props.appId, props.chain, props.mode);
    let pId = payIds.filter(
      (p: PublicPaymentIdName) => p.paymentName === paymt?.name
    );
    let choice: Choice = {
      amount: wantedToken.amount,
      token: wantedToken.symbol ? wantedToken.symbol : wantedToken.name,
      period: paymt.periodType,
      address: wantedToken.address,
      decimals: wantedToken.decimals,
      paymentId: pId[0].paymentId
    };
    setFinalChoice(choice);
  }

  useEffect(() => {
    if (props.choice) {
      buildChoice();
    } else {
      buildPayment(props.defaultPayment ? props.defaultPayment : "");
    }
  }, []);

  // get token amount + symbol
  const buildTokenDatas = () => {
    let tokenDatas: string[] = [];
    lpayments?.tokens.map((token:any) => {
      const { symbol, name, amount } = token;
      tokenDatas.push(`${amount} ${symbol?.length > 0 ? symbol : name}`);
    });
    return tokenDatas;
  };

  const getTokenInfo = (token: string, amount: number) => {
    let address = lpayments?.tokens.filter((t:any) => ((t.symbol === token || t.name === token) && t.amount == amount))[0].address;
    let decimals = lpayments?.tokens.filter((t:any) => ((t.symbol === token || t.name === token) && t.amount == amount))[0].decimals;
    return [address, decimals]
  }

  const getModal = async () => {
    let id = getChainId(props.chain);
    if (isConnected) {
      if (chain?.id == id.chainId) {
        if (finalChoice.amount > 0 && finalChoice.address.length > 0 && finalChoice.decimals > 0) {
          open()
        }
      } else {
        await switchNetwork(id);
        if (finalChoice.amount > 0 && finalChoice.address.length > 0 && finalChoice.decimals > 0) {
          open()
        }
      }
    } else {
      await openWeb3()
    }
  }

  return (
    <Flex justify="center" align="center" direction="column" gap="md">

      <Modal
        opened={openedTg}
        onClose={close}
        size="md"
        centered
        closeOnClickOutside={false}
        radius={rem(20)}
      >
        <div className="">
          <SubscribeReview
            apiKey={props.apiKey}
            appId={props.appId}
            isOpened={openedTg}
            appName={appName}
            chainName={props.chain}
            paymentProp={finalChoice}
            userAddress={address}
            mode={props.mode}
            btnColor={props.color ? props.color : "blue"}
            response={props.dataOnSubs}
          />
        </div>
      </Modal>

      <Flex justify="flex-start" align="flex-start" direction="row">
        {props.choice ? "" :
          <>
            {props.defaultPayment ?
              "" :
              <Select
                withinPortal
                data={appPayments}
                onChange={async (e) => {
                  let onchangePayment: any = await getPayment(
                    `${e}`,
                    props.chain,
                    props.address,
                    props.appId,
                    props.mode
                  );
                  setPayments(onchangePayment);
                  setToken("");
                }}
                placeholder="select payment"
                classNames={paymentClasses.classes}
              />
            }
            {props.choice ? "" :
              <Select
                withinPortal
                data={buildTokenDatas()}
                label={lpayments ? `per ${formatPeriod(lpayments.periodType)}` : ""}
                placeholder="select crypto"
                value={token}
                onChange={(e) => {
                  setToken(`${e}`);
                  let { amount, token } = separate(e);
                  let paymentId = paymentIds.filter(
                    (pay) => pay.paymentName === lpayments?.name
                  );
                  setFinalChoice({ amount: amount, token: token, period: lpayments?.periodType ? lpayments?.periodType : "", address: getTokenInfo(token, amount)[0], decimals: getTokenInfo(token, amount)[1], paymentId: paymentId[0].paymentId })
                }}
                classNames={cryptoClasses.classes}
              />
            }
          </>
        }
        <Button h={48} classNames={subscribeClasses.classes} color={props.color ? props.color : `blue`} onClick={async () => {
          await getModal();
        }}>
          Subscribe
        </Button>
      </Flex>
      <a href="https://subsprotocol.com/" target="_blank" style={linkStyles}>
        <Flex direction="row">
        <IconShieldCheckeredFilled size={22} />
          {"  "}
          <Text align="end" ml={5}>
            Secured by
          </Text>
          <Text align="end" ml={4} weight={700}>
            Subs
          </Text>
        </Flex>
      </a>
    </Flex>
  );

}
export default SubsApp;