import { createAppKit } from "@reown/appkit/react";

import { createConfig, http, WagmiProvider } from "wagmi";
import {
  bscTestnet,
  polygonAmoy,
  baseSepolia,
  bsc,
  polygon,
  base,
} from "@reown/appkit/networks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId from https://cloud.walletconnect.com
const projectId = "d37b341c7e1755433ba1916d60d4e77c";

const metadata = {
  name: "Subs",
  description: "Decentralized subscription",
  url: "https://subsprotocol.com", // origin must match your domain & subdomain
  icons: ["https://subsprotocol.com/assets/log-d474c84b.png"],
};
const networks: any = [
  base,
  bsc,
  polygon,
  bscTestnet,
  polygonAmoy,
  baseSepolia,
];

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
});

// 5. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
    email: true, // default to true
    socials: [
      "google",
      "x",
      "github",
      "discord",
      "apple",
      "facebook",
      "farcaster",
    ],
  },
});

export const config = createConfig({
  chains: networks,
  transports: {
    [base.id]: http(),
    [bsc.id]: http(),
    [polygon.id]: http(),
    [bscTestnet.id]: http(),
    [polygonAmoy.id]: http(),
    [baseSepolia.id]: http(),
  },
})

export function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
