import { http, createConfig } from "wagmi";
import { base, baseSepolia } from "wagmi/chains";
import { coinbaseWallet, walletConnect } from "wagmi/connectors";

const metadata = {
  name: "Dudi Kicks",
  description: "Score or Block. Just choose and shoot. Follow your heart.",
  url: "https://dudi-kicks-demo.vercel.app",
  icons: ["/icon.png"],
};

export const wagmiConfig = createConfig({
  chains: [baseSepolia], // prod + test
  multiInjectedProviderDiscovery: false,
  connectors: [
    coinbaseWallet({ appName: "My MiniApp" }),
    // walletConnect({
    //   projectId: process.env.NEXT_PUBLIC_WC_ID!,
    //   metadata,
    //   showQrModal: false,
    // }),
  ],
  transports: { [baseSepolia.id]: http() },
});
