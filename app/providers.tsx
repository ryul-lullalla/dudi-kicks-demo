"use client";

import { QueryClient } from "@tanstack/react-query";

import { WagmiProvider } from "wagmi";
import { useEffect, useState, type ReactNode } from "react";
import { baseSepolia } from "wagmi/chains";
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

  const defaultDomain =
    process.env.NODE_ENV === "production"
      ? "http://localhost:3000"
      : process.env.NEXT_PUBLIC_URL;

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
            logo: `${defaultDomain}/logo.png`,
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
