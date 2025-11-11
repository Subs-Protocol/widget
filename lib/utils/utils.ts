import { createStyles, rem } from "@mantine/core";
import abi from "./subabi.json"
import { Chain } from "../backend";
import web3 from "web3"
import { writeContract } from "@wagmi/core";
import { config } from "../components/Button/WalletProvider";


export const subsStyles = createStyles(
    (
        theme:any,
        {
            tokenOpened,
            selectedBtn,
            defaultPayment,
            selectLabel,
            userWidth,
            choice,
        }: {
            tokenOpened: boolean;
            selectedBtn: number;
            defaultPayment: string | undefined;
            selectLabel: boolean;
            userWidth?: number;
            choice?: string;
        }
    ) => ({
        control: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: `${theme.spacing.xs} ${theme.spacing.md}`,
            borderRadius: theme.radius.md,
            border: `${rem(2)} solid ${theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[2]
                }`,
            transition: "background-color 150ms ease",
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[tokenOpened ? 5 : 6]
                    : tokenOpened
                        ? theme.colors.gray[0]
                        : theme.white,

            "&:hover": {
                backgroundColor:
                    theme.colorScheme === "dark"
                        ? theme.colors.dark[5]
                        : theme.colors.gray[0],
            },
        },
        label: {
            position: selectLabel == true ? "absolute" : "static",
            marginRight: selectLabel == true ? 0 : 0,
            marginTop: selectLabel == true ? 17 : 0,
            width: selectLabel == true ? 50 : "",
            fontSize: selectLabel == true ? 10 : "",
            paddingLeft: selectLabel == true ? 0 : 0,
            zIndex: 1,
        },
        root: {
            position: "relative",
            borderTopRightRadius: choice ? "" : defaultPayment
                ? theme.radius.md
                : selectedBtn == 2
                    ? theme.radius.lg
                    : "",
            borderBottomRightRadius: choice ? "" : selectedBtn == 2 ? theme.radius.lg : "",
            width: userWidth,
            borderRadius: choice ? theme.radius.md : "",
        },
        input: {
            height: rem(50),
            width: userWidth,
            borderTopLeftRadius: defaultPayment
                ? selectedBtn == 1
                    ? theme.radius.lg
                    : ""
                : "",
            borderBottomLeftRadius: defaultPayment
                ? theme.radius.md
                : selectedBtn == 0
                    ? theme.radius.lg
                    : "",
            border: `${rem(2)} solid ${theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[2]
                }`,
        },
        icon: {
            transition: "transform 10ms ease",
            transform: tokenOpened ? "rotate(180deg)" : "rotate(0deg)",
        },
    })
);

export const publicUseStyles = createStyles(
    (theme:any) => ({
        control: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: `${theme.spacing.xs} ${theme.spacing.md}`,
            borderRadius: theme.radius.md,
            border: `${rem(2)} solid ${theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[2]
                }`,
            transition: "background-color 150ms ease",


            "&:hover": {
                backgroundColor:
                    theme.colorScheme === "dark"
                        ? theme.colors.dark[5]
                        : theme.colors.gray[0],
            },
        },

        root: {
            position: "relative",
        },
        input: {
            height: rem(54),
            paddingTop: rem(18),
            borderRadius: theme.radius.md,
            border: `${rem(2)} solid ${theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[2]
                }`,
            width: rem(350),
        },
        label: {
            position: "absolute",
            pointerEvents: "none",
            fontSize: theme.fontSizes.xs,
            paddingLeft: theme.spacing.sm,
            paddingTop: `calc(${theme.spacing.sm} / 2)`,
            zIndex: 1,
        },
    })
);

export const getChainFormatted = (chain: string) => {
    switch (chain) {
        case "Polygon Mumbai":
            return "mumbai";
        case "Polygon Amoy":
            return "amoy";
        case "Binance Smart Chain Testnet":
            return "bsct";
        case "Avalanche Fuji":
            return "fuji";
        case "Arbitrum Sepolia":
            return "arbitrums";
        case "Optimism Sepolia":
            return "optimisms";
        case "Base Sepolia":
            return "bases";
        // Mainnets
        case "Polygon":
            return "polygon";
        case "BNB Smart Chain":
            return "bsc";
        case "Avalanche":
            return "avax";
    }
};

export const formatPeriod = (period: string) => {
    switch (period) {
        case "One-Time":
            return "once";
        case "Monthly":
            return "month";
        case "Weekly":
            return "week";
        case "Daily":
            return "day";
        case "Yearly":
            return "year";
        default:
    }
};

export const getLimitPeriodType = (periodType: string): number => {
    switch (periodType) {
        case 'One-Time':
            return 1;
        case 'Daily':
            return 90;
        case 'Weekly':
            return 48;
        case 'Monthly':
            return 24;
        case 'Yearly':
            return 3;
        default:
            return 0;
    }
}

export const getChainDatas = (chain: string): Chain => {
    switch (chain) {
        // Testnets
        case 'Polygon Mumbai':
        case 'mumbai':
            return utils.chain.mumbai;
        case 'Polygon Amoy':
        case 'amoy':
            return utils.chain.mumbai;
        case 'Binance Smart Chain Testnet':
        case 'bsct':
            return utils.chain.bscTestnet;
        case 'Avalanche Fuji':
        case 'fuji':
            return utils.chain.fuji;
        case 'Arbitrum Sepolia':
        case 'arbitrums':
            return utils.chain.arbSepolia;
        case 'Optimism Sepolia':
        case 'optimisms':
            return utils.chain.opSepolia;
        case 'Base Sepolia':
        case 'bases':
            return utils.chain.baseSepolia;
        // Mainnets
        case 'Polygon':
        case 'polygon':
            return utils.chain.polygon;
        case 'BNB Smart Chain':
        case 'bsc':
            return utils.chain.bsc;
        case 'Avalanche':
        case 'avax':
            return utils.chain.avax;
        default:
            return utils.chain.mumbai;
    }
}

export const getChainId = (chain: string): any => {
    switch (chain) {
        // Testnets
        case 'Polygon Mumbai':
        case 'mumbai':
            return utils.chain.mumbai.id;
        case 'Polygon Amoy':
        case 'amoy':
            return utils.chain.amoy.id;
        case 'Binance Smart Chain Testnet':
        case 'bsct':
            return utils.chain.bscTestnet.id;
        case 'Avalanche Fuji':
        case 'fuji':
            return utils.chain.fuji.id;
        case 'Arbitrum Sepolia':
        case 'arbitrums':
            return utils.chain.arbSepolia.id;
        case 'Optimism Sepolia':
        case 'optimisms':
            return utils.chain.opSepolia.id;
        case 'Base Sepolia':
        case 'bases':
            return utils.chain.baseSepolia.id;
        // Mainnets
        case 'Polygon':
        case 'polygon':
            return utils.chain.polygon.id;
        case 'BNB Smart Chain':
        case 'bsc':
            return utils.chain.bsc.id;
        case 'Avalanche':
        case 'avax':
            return utils.chain.avax.id;
        default:
            return utils.chain.mumbai.id;
    }
}

export const chainsData = [
    { label: 'Polygon Mumbai', id: { chainId: 80001 } },
    { label: 'Polygon Amoy', id: { chainId: 80002 } },
    { label: 'Binance Smart Chain Testnet', id: { chainId: 97 } },
    { label: 'Arbitrum Sepolia', id: { chainId: 421614 } },
    { label: 'Optimism Sepolia', id: { chainId: 11155420 } },
    { label: 'Avalanche Fuji', id: { chainId: 43113 } },
    { label: 'Base Sepolia', id: { chainId: 84532 } },
    //Mainnets
    { label: 'Polygon', id: { chainId: 137 } },
    { label: 'BNB Smart Chain', id: { chainId: 56 } },
    { label: 'Avalanche', id: { chainId: 43114 } },
];

export const formatAddr = (addr: any) => {
    return web3.utils.toChecksumAddress(addr);
};

export const cancelSubs = async (chain: any, subsId: string, appId: string, abi: any) => {
    let subsAddress: any = getChainDatas(chain).address;
    const data = await writeContract(config,{
        address: subsAddress,
        abi: abi,
        functionName: 'cancelSubscription',
        args: [subsId, appId],
    })
    return data;
};

export const refundSubs = async (chain: any, subsId: string, abi: any) => {
    let subsAddress: any = getChainDatas(chain).address;
    const data = await writeContract(config,{
        address: subsAddress,
        abi: abi,
        functionName: 'refundSubscription',
        args: [subsId],
    })
    return data;
};

export const processSubs = async (chain: any, subsId: string, abi: any) => {
    let subsAddress: any = getChainDatas(chain).address;
    const data = await writeContract(config,{
        address: subsAddress,
        abi: abi,
        functionName: 'processSubscription',
        args: [subsId],
    })
    return data;
};

export const utils = {
    contractABI: abi.abi,
    chain: {
        // Testnets
        mumbai: {
            address: "0x04452A6183547A769a8cdcD4ab08Bc5ad9A5a1aB",
            rpc: "https://rpc.ankr.com/polygon_mumbai",
            id: { chainId: 80001 }
        },
        amoy: {
            address: "0x7BfBb8ea2c5bFCbf26Fc5CB53Ffc961De0F9Eaa2",
            rpc: "https://rpc-amoy.polygon.technology/",
            id: { chainId: 80002 }
        },
        fuji: {
            address: "0x04452A6183547A769a8cdcD4ab08Bc5ad9A5a1aB",
            rpc: "https://rpc.ankr.com/avalanche_fuji",
            id: { chainId: 43113 }
        },
        bscTestnet: {
            address: "0x04452A6183547A769a8cdcD4ab08Bc5ad9A5a1aB",
            rpc: "https://rpc.ankr.com/bsc_testnet_chapel",
            id: { chainId: 97 }
        },
        arbSepolia: {
            address: "0x04452A6183547A769a8cdcD4ab08Bc5ad9A5a1aB",
            rpc: "https://sepolia-rollup.arbitrum.io/rpc",
            id: { chainId: 421614 }
        },
        opSepolia: {
            address: "0x04452A6183547A769a8cdcD4ab08Bc5ad9A5a1aB",
            rpc: "https://sepolia.optimism.io",
            id: { chainId: 11155420 }
        },
        baseSepolia: {
            address: "0x04452A6183547A769a8cdcD4ab08Bc5ad9A5a1aB",
            rpc: "https://sepolia.base.org",
            id: { chainId: 84532 }
        },
        // Mainnets
        polygon: {
            address: "0xd0a1DB0cDe611f1467C8d4B59422d888A9B1AC0B",
            rpc: "https://polygon-mainnet.g.alchemy.com/v2/bYgzSx4_En9zHLkgLWDJ7LEx322B2aFu",
            id: { chainId: 137 }
        },
        avax: {
            address: "0xd0a1DB0cDe611f1467C8d4B59422d888A9B1AC0B",
            rpc: "https://api.avax.network/ext/bc/C/rpc",
            id: { chainId: 43114 }
        },
        bsc: {
            address: "0xd0a1DB0cDe611f1467C8d4B59422d888A9B1AC0B",
            rpc: "https://bsc-dataseed.bnbchain.org",
            id: { chainId: 56 }
        },
    }

}

export const getApprovalPeriods = (period: string) => {
    switch (period) {
        case 'Monthly':
            return ["6", "8", "10", "12", "14", "16", "18", "20", "22", "24", "36", "48", "60", "72", "84", "96", "108", "5050"];
        case 'Yearly':
            return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "100"];
        case 'Daily':
            return ["30", "60", "90", "120", "150", "180", "210", "240", "270", "300", "330", "360", "390", "420", "450", "480", "404040"];
        case 'Weekly':
            return ["4", "12", "16", "20", "24", "28", "32", "36", "40", "44", "48", "52", "56", "60", "64", "68", "72", "2500"];
        case 'once':
            return ["1", "1", "1", "1"]
        default:
            return [];
    }
}

export const formatPeriodToNormal = (period: string) => {
    switch (period) {
        case 'Monthly':
            return "months";
        case 'Yearly':
            return "years";
        case 'Daily':
            return "days";
        case 'Weekly':
            return "weeks";
        default:
            return "";
    }
}

export function capitalizeFirstLetter(word:string) {
    if (!word) return; // Retourne une chaîne vide si le mot est inexistant ou vide
    return word.charAt(0).toUpperCase() + word.slice(1);
}