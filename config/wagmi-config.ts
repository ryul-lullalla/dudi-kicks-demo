import { http, createConfig } from "wagmi";
import { base, baseSepolia } from "wagmi/chains";
import { coinbaseWallet, walletConnect } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [base, baseSepolia], // prod + test
  multiInjectedProviderDiscovery: false,
  connectors: [
    coinbaseWallet({ appName: "My MiniApp" }),
    walletConnect({ projectId: process.env.NEXT_PUBLIC_WC_ID! }),
  ],
  transports: { [base.id]: http(), [baseSepolia.id]: http() },
});
