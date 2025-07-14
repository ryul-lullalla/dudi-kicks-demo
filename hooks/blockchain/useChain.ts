import { useMemo } from "react";
import { useAccount, useConfig } from "wagmi";

import { CHAIN_ID, baseMainnet, baseTestnet } from "@/constant/chains";

import { NATIVE_TOKEN_ADDRESS } from "@/constant/tokens";

const useChain = () => {
  const { isConnected } = useAccount();
  const { chain } = useAccount();
  const { chains } = useConfig();

  const chainId = useMemo(() => chain?.id, [chain]);
  const rpcUrl = useMemo(() => chain?.rpcUrls.default.http[0], [chain]);

  const explorerUrl = useMemo(
    () => chain?.blockExplorers?.default.url,
    [chain],
  );
  const nativeTokenAddress = useMemo(() => NATIVE_TOKEN_ADDRESS[CHAIN_ID], []);
  const isMainnet = useMemo(
    () => Number(process.env.NEXT_PUBLIC_CHAIN_ID) === baseMainnet.id,
    [],
  );
  const isTestnet = useMemo(
    () => Number(process.env.NEXT_PUBLIC_CHAIN_ID) === baseTestnet.id,
    [],
  );

  const isInValidNetwork = !!isConnected && chainId !== CHAIN_ID;

  return {
    chain,
    chains,
    chainId,
    rpcUrl,
    explorerUrl,
    isWalletConnected: isConnected,
    isInvalidNetwork: isInValidNetwork,
    nativeTokenAddress,
    isMainnet,
    isTestnet,
  };
};

export default useChain;
