export type PublicData = {
    existed: boolean;
    app: AlephApp;
};

export interface FormTokenValues {
    address: string;
    name: string;
    image: string;
    amount: number;
    decimals: number;
    symbol: string;
}

export interface Choice {
    amount: number;
    token: string;
    period: any;
    address: any;
    decimals: any;
    paymentId: string;
}


export type AlephApp = {
    appId: string;
    chain: string;
    name: string;
    owner: string;
    payments: FormPaymentValues[];
    Infos: string;
    users: number;
    hash: string;
}

export interface FormPaymentValues {
    name: string;
    periodType: string;
    tokens: Array<FormTokenValues>;
}

export type Chain = {
    address: string;
    rpc: string;
    id: any;
}

export type PublicPaymentIdName = {
    paymentId: string;
    paymentName: string;
}

export interface SubsProps {
    apiKey: string;
    address: string;
    appId: string;
    chain: string;
    mode: string;
    color?: string;
    width?: number;
    defaultPayment?: string;
    choice?: { payment: string, token: string }
    dataOnSubs?: any;
}

export interface ReviewProps {
    apiKey:string;
    chainName: string;
    appId: string;
    appName: string;
    paymentProp: any;
    isOpened: boolean;
    userAddress: any;
    mode: string;
    btnColor: string;
    response?: any;
}

type Payment = {
    paymentId: string;
    payment: ContractPayment;
}

export type ContractPayment = {
    name: string;
    paymentType: Number;
    paymentTokens: ContractToken[];
    trialPeriod: Number;
    periodType: string;
    limitPeriod: Number;
    loadingTime: Number;
    owner: string;
    fee: Number;
};

export type ContractToken = {
    token: string;
    price: string;
    firstAmount: string;
};

export type AppPayment = {
    appId: string;
    payment: Payment[];
    chain: string;
}