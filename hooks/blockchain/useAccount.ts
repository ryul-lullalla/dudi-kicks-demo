import { CHAIN_INFO } from "@/constant/chains";
// import { useMiniKit } from "@coinbase/onchainkit/minikit";
import { useMemo } from "react";
import { useBalance, useConnections } from "wagmi";
import { useAccount as useAccountWagmi } from "wagmi";

export const useAccount = () => {
  const { isConnected, status, isReconnecting, isDisconnected, address } =
    useAccountWagmi();

  const connections = useConnections();

  const balance = useBalance({
    address: address,
  });

  const nativeBalance = balance.data;
  const { chain } = useAccountWagmi();

  // const { chains } = useConfig();

  const chainId = useMemo(() => chain?.id, [chain]);

  const isInValidNetwork = !!isConnected && chainId !== CHAIN_INFO.id;

  const refetchBalance = () => {
    balance.refetch();
  };

  return {
    nativeBalance,
    isConnected,
    walletAddress: address,
    chain,
    isInValidNetwork,
    refetch: refetchBalance,
  };
};
