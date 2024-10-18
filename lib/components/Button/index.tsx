import { useState } from 'react'
import SubsApp from './SubsApp'
import { SubsProps } from '../../backend'
import { WalletProvider } from './WalletProvider'


export function Subs(props: SubsProps) {

  const [_, setReponse] = useState({ message: '', success: '' });

  const getResponseApp = (rep: any) => {
    setReponse(rep)
    props.dataOnSubs(rep);
  }

  return (
    <>
      <WalletProvider>
        <SubsApp apiKey={props.apiKey} address={props.address} appId={props.appId} chain={props.chain} mode={props.mode} color={props.color} defaultPayment={props.defaultPayment} width={props.width} choice={props.choice} dataOnSubs={(rep: any) => { getResponseApp(rep) }} />
      </WalletProvider>
    </>
  )
}