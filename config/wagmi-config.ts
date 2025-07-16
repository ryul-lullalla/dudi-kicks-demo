import { http, createConfig } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";

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
    coinbaseWallet({
      appName: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || "Doozi Kicks",
    }),
    // walletConnect({
    //   projectId: process.env.NEXT_PUBLIC_WC_ID!,
    //   metadata,
    //   showQrModal: false,
    // }),
  ],
  transports: { [baseSepolia.id]: http() },
});
