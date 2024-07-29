import { useState } from 'react'
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { WagmiConfig } from 'wagmi'
import { polygon, bscTestnet, avalancheFuji, arbitrumSepolia, optimismSepolia, baseSepolia, bsc, avalanche } from 'wagmi/chains'
import SubsApp from './SubsApp'
import { SubsProps } from '../../backend'

const amoy = {
  id: 80002,
  name: 'Polygon Amoy',
  network: 'maticamo',
  nativeCurrency: {
    decimals: 18,
    name: 'MATIC',
    symbol: 'MATIC',
  },
  rpcUrls: {
    public: { http: ['https://rpc-amoy.polygon.technology/'] },
    default: { http: ['https://rpc-amoy.polygon.technology/'] },
  },
  blockExplorers: {
    etherscan: { name: 'OkLink', url: 'https://www.oklink.com/fr/amoy' },
    default: { name: 'OkLink', url: 'https://www.oklink.com/fr/amoy' },
  },
  testnet: true,
}

const chains = [bscTestnet, avalancheFuji, arbitrumSepolia, optimismSepolia, baseSepolia, amoy, polygon, bsc, avalanche]
const projectId = '8fd6c2620b1e4d81abbde8b5ad8e60bb'

const metadata = {
  name: 'Subs',
  description: 'Subs Protocol',
  url: 'https://subsprotocol.com',
  icons: ['https://i.imgur.com/aSh3vYq.jpg']
}
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })
createWeb3Modal({ wagmiConfig, projectId, chains })

export function Subs(props: SubsProps) {

  const [_, setReponse] = useState({ message: '', success: '' });

  const getResponseApp = (rep: any) => {
    setReponse(rep)
    props.dataOnSubs(rep);
  }

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <SubsApp apiKey={props.apiKey} address={props.address} appId={props.appId} chain={props.chain} mode={props.mode} color={props.color} defaultPayment={props.defaultPayment} width={props.width} choice={props.choice} dataOnSubs={(rep: any) => { getResponseApp(rep) }} />
      </WagmiConfig>
    </>
  )
}