import {
    Center,
    Text,
    Image,
    RingProgress,
    Loader,
    ThemeIcon,
    Flex,
    Button,
    Select,
    TextInput,
} from "@mantine/core";
import { FC, useEffect, useState } from "react";
import { IconChecks, IconX } from "@tabler/icons-react";
import { logo } from "../../assets";
import { capitalizeFirstLetter, formatPeriod, formatPeriodToNormal, getApprovalPeriods, publicUseStyles } from "../../utils";
import { ReviewProps, allowance, approve, wagmiGetRequiredAmount, subscribe } from "../../backend";
import { useAccount } from 'wagmi'
import { IconShieldCheckeredFilled } from "@tabler/icons-react";
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

const linkStyles = {
    color: "black",
    textDecoration: "none",
    marginTop: "10px",
};

const schema = z.object({
    email: z.string().email({ message: 'Invalid email' }),
});

const SubscribeReview: FC<ReviewProps> = (props) => {
    const { address } = useAccount()
    const [loading, setLoading] = useState(false);
    const [loadingSubscribe, setLoadingSubscribe] = useState(false);
    const [approveDone, setApproveDone] = useState(false);
    const [userAllowance, setAllowance] = useState(0);
    const [finish, setFinish] = useState(false);
    const [error, setError] = useState("");
    const [requiredAmount, setRequiredAmount] = useState(0);

    const inputsClasses = publicUseStyles();
    const [selectedMonth, setSelectedMonth] = useState(getApprovalPeriods(props.paymentProp.period)[3]);
    const months = getApprovalPeriods(props.paymentProp.period);

    let amount = parseFloat(props.paymentProp.amount);

    const form = useForm({
        initialValues: {
            email: "",
        },
        validate: zodResolver(schema),
        validateInputOnChange: true,
    });

    async function getRequired(userPeriod: number) {
        let req: any = await wagmiGetRequiredAmount(props.appId, props.paymentProp.paymentId, props.chainName, props.paymentProp.address, props.userAddress, userPeriod);
        let ramount = parseInt(req[1]) / 10 ** props.paymentProp.decimals;
        setRequiredAmount(ramount);
        return ramount;
    }

    async function getAllowance(userPeriod: number) {
        let reqAmount = await getRequired(userPeriod);
        let alw = await allowance(props.chainName, props.paymentProp.address, props.userAddress);
        let format = Number(alw) / 10 ** props.paymentProp.decimals;
        setAllowance(format);
        if (Number(format) >= reqAmount) {
            setApproveDone(true);
        } else {
            setApproveDone(false);
        }
        console.log("Allowance: ", format);
        console.log("Required: ", reqAmount);
        
        return Number(alw);
    }

    useEffect(() => {
        const verifyAllowance = async () => {
            await getRequired(Number(selectedMonth));
            await getAllowance(Number(selectedMonth));
        }
        verifyAllowance();
    }, []);

    useEffect(() => {
        const verifyAllowance = async () => {
            await getRequired(Number(selectedMonth));
            await getAllowance(Number(selectedMonth));
        }
        verifyAllowance();
    }, [selectedMonth]);

    async function approveToken(userPeriod: number) {
        if (approveDone) return;
        setLoading(true);
        try {
            let required: any = await wagmiGetRequiredAmount(props.appId, props.paymentProp.paymentId, props.chainName, props.paymentProp.address, props.userAddress, userPeriod); //change user choosen period here
            let wannaApprove: any = (props.paymentProp.amount * Number(selectedMonth)) * 10 ** props.paymentProp.decimals;
            if (Number(required[1]) > Number(wannaApprove)) {
                await approve(props.chainName, props.paymentProp.address, required[1]);
            } else {
                await approve(props.chainName, props.paymentProp.address, wannaApprove);
            }
            await new Promise(resolve => setTimeout(resolve, 5000));
            setApproveDone(true);
        } catch (error) {
            setLoading(false);
        }
    }
    const formatCheckout = () => {
        let finalCheckout = {
            planId: props.appId,
            planName: props.appName,
            amount: props.paymentProp.amount,
            period: props.paymentProp.period,
            paymentId: props.paymentProp.paymentId,
            token: props.paymentProp.address,
            appChain: props.chainName,
            tokenName: props.paymentProp.token,
            symbol: props.paymentProp.token,
            decimals: props.paymentProp.decimals,
            chain: props.chainName,
            email: form.values.email,
            mode: props.mode,
            user: address,
        }
        return finalCheckout;
    }
    async function subscribeToApp(appId: string, paymentId: any, address: any, chainName: string, user: string) {
        setLoadingSubscribe(true);
        let checkout = formatCheckout();
        try {
            let subsc = await subscribe(props.apiKey, appId, paymentId, address, chainName, user, Number(selectedMonth), checkout); //change user choosen period here
            if (subsc.success == "true") {
                setFinish(true);
                props.response(subsc);
            } else {
                setError(subsc.message);
                props.response(subsc);
            }
        } catch (error) {
            setLoadingSubscribe(false);
        }
    }

    return (
        <Flex direction="column" justify="center" align="center">

            {error !== "" ? (
                <>
                    <Text fz="xl" align="center">
                        {" "}
                        Payment Error
                    </Text>
                    <center>
                        <RingProgress
                            sections={[{ value: 100, color: "red" }]}
                            label={
                                <Center>
                                    <ThemeIcon color="red" variant="light" radius="xl" size="xl">
                                        <IconX size={16} />
                                    </ThemeIcon>
                                </Center>
                            }
                        />
                        <Text fz="md" align="center" ml={22} mr={22}>
                            {error.includes("TRANSFER_FROM_FAILED") ?
                                `Transfer fail, it looks like you don't have enough funds to pay.` : error}
                        </Text>
                    </center>
                </>
            ) :
                !finish ? (
                    <>
                        <Image src={logo} alt="Subscribe" width={70} height={70} radius={50} />
                        {props.paymentProp.period === "One-Time" ?
                            <>
                                <Text fz="xl" align="center" color={props.btnColor ? props.btnColor : "indigo"} mt={12} weight={700}>
                                    Pay to {props.appName} on {props.chainName}
                                </Text>
                                <Text fz="md" align="justify" ml={22} mr={22} ff='' mt={12} mb={8}>
                                    {" "}
                                    You will make only one transaction (Approve).
                                    Make sure to approve minimum{" "}
                                    <a style={{ fontWeight: 'bold' }}>{requiredAmount > (Number(props.paymentProp.amount) * Number(selectedMonth)) ? requiredAmount : (Number(props.paymentProp.amount) * Number(selectedMonth)).toFixed(2)} {props.paymentProp.token} {". "} </a>
                                    You will pay {amount} {props.paymentProp.token}. Without your approval, the payment will fail.
                                    {/* <a style={{ fontWeight: 'bold', color: 'blueviolet', marginLeft: 4 }} href="https://subsprotocol.com/#/faq" target="_blank">learn more</a> */}
                                </Text>
                            </>
                            :
                            <>
                                <Text fz="xl" align="center" color={props.btnColor ? props.btnColor : "indigo"} mt={12} weight={700}>
                                    Subscribe to {props.appName} on {capitalizeFirstLetter(props.chainName)}
                                </Text>
                                <Text fz="md" align="justify" ml={22} mr={22} sx={{ fontFamily: 'Greycliff CF, sans-serif' }} mt={12}>
                                    {" "}
                                    Approve a minimum of
                                    <a style={{ fontWeight: 'bold' }}>{" "}{requiredAmount > (Number(props.paymentProp.amount) * Number(selectedMonth)) ? requiredAmount : (Number(props.paymentProp.amount) * Number(selectedMonth)).toFixed(2)} {props.paymentProp.token} </a>
                                    to enable the subscription.
                                    You don't need this amount in your wallet. It's just a permission.
                                    You will pay {amount} {props.paymentProp.token} right now and every {formatPeriod(props.paymentProp.period)}, just like normal subscriptions. Without this approval, the subscription will fail.
                                </Text>
                                <br />
                                <Text fz="sm" ta="center" ml={25} mr={25} mt={4} sx={{ fontFamily: 'Greycliff CF, sans-serif' }}>
                                    Please choose the number of {formatPeriodToNormal(props.paymentProp.period)} you want to approve for and enter your email to get notified.
                                </Text>
                                <Select
                                    mt="md"
                                    withinPortal
                                    data={months}
                                    placeholder={`Choose the number of ${formatPeriodToNormal(props.paymentProp.period)}`}
                                    label={`Approval ${formatPeriodToNormal(props.paymentProp.period)}`}
                                    classNames={inputsClasses.classes}
                                    defaultValue={getApprovalPeriods(props.paymentProp.period)[3]}
                                    onChange={(e: any) => {
                                        setSelectedMonth(e);
                                    }}
                                    w={350}
                                />
                                <TextInput
                                    label="Email"
                                    placeholder="your email address"
                                    classNames={inputsClasses.classes}
                                    className="mt-4 mr-2"
                                    {...form.getInputProps("email")}
                                    mt={8}
                                    w={350}
                                />
                            </>
                        }

                        <Button w={350} bg={props.btnColor ? props.btnColor : "blue"} radius={10} mt={8} onClick={async () => {
                            if (userAllowance < requiredAmount) {
                                await approveToken(Number(selectedMonth));
                                setLoading(false);
                            }
                        }}>
                            {approveDone ? <IconChecks size={22} color="white" /> :
                                loading ? <Loader size={20} color="white" /> :
                                    `Approve ${props.paymentProp.token}`}
                        </Button>
                        <Button w={350} bg={props.btnColor ? props.btnColor : "blue"} disabled={approveDone && form.isValid() ? false : true} radius={10} mt={8} onClick={async () => {
                            if(loadingSubscribe) return;
                            if (approveDone) {
                                let user = address;
                                if (!form.isValid()) {
                                    return;
                                }
                                await subscribeToApp(props.appId, props.paymentProp.paymentId, props.paymentProp.address, props.chainName, `${user}`);
                                setLoadingSubscribe(false);
                            }
                        }}>
                            {loadingSubscribe ? <Loader size={20} color="white" /> :
                                props.paymentProp.period === "One-Time" ?
                                    `Pay` :
                                    `Subscribe`}
                        </Button>
                    </>
                ) : (
                    <>
                        <Text fz="xl" align="center">
                            {" "}
                            {props.paymentProp.period === "One-Time" ? "Payment confirmed" : "Subscription confirmed"}{" "}
                        </Text>
                        <center>
                            <RingProgress
                                sections={[{ value: 100, color: "teal" }]}
                                label={
                                    <Center>
                                        <ThemeIcon color="teal" variant="light" radius="xl" size="xl">
                                            <IconChecks size={22} />
                                        </ThemeIcon>
                                    </Center>
                                }
                            />
                        </center>
                    </>
                )}
            <a href="https://subsprotocol.com/" target="_blank" style={linkStyles} color="#364FC7">
                <Flex direction="row" ml={0} mt={8}>
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
        </Flex >
    );
};
export default SubscribeReview;