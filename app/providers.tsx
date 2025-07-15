"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { WagmiProvider } from "wagmi";
import { useEffect, useState, type ReactNode } from "react";
import { base, baseSepolia } from "wagmi/chains";
import { MiniKitProvider } from "@coinbase/onchainkit/minikit";
import { wagmiConfig } from "@/config/wagmi-config";

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  return <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>;
};

export function Providers(props: { children: ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  const [queryClient] = useState(() => new QueryClient());
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const getDefaultDomain = () => {
    switch (process.env.NODE_ENV) {
      case "development":
        return "http://localhost:3000";
      case "production":
        return process.env.NEXT_PUBLIC_URL;
      case "test":
        return "http://localhost:3000";
      default:
        return "http://localhost:3000";
    }
  };

  const defaultDomain =
    process.env.NODE_ENV === "production"
      ? "http://localhost:3000"
      : process.env.NEXT_PUBLIC_URL;

  console.log({
    defaultDomain,
    iconUrl: process.env.NEXT_PUBLIC_ICON_URL,
  });

  return (
    <>
      {/* <Web3Provider> */}
      {/* <QueryClientProvider client={queryClient}> */}
      <MiniKitProvider
        apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
        chain={baseSepolia}
        config={{
          appearance: {
            mode: "auto",
            theme: "mini-app-theme",
            name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
            logo: process.env.NEXT_PUBLIC_ICON_URL,
          },
        }}
      >
        {props.children}
      </MiniKitProvider>
      {/* </QueryClientProvider> */}
      {/* </Web3Provider> */}
    </>
  );
}
