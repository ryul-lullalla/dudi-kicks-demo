import { useBalance } from "wagmi";
import { useAccount } from "@/hooks/blockchain/useAccount";
import { CHAIN_INFO } from "@/constant/chains";
import { useEffect } from "react";
import { isAddress } from "viem";

export const useTokenBalance = ({
  tokenAddress,
}: {
  tokenAddress: `0x${string}`;
}) => {
  const { walletAddress, isConnected } = useAccount();
  const { data, isLoading, refetch } = useBalance({
    address: walletAddress,
    chainId: CHAIN_INFO.id,
    token: tokenAddress,
    query: {
      enabled: !!walletAddress,
    },
  });

  const refetchTokenBalance = () => {
    refetch();
  };

  useEffect(() => {
    if (isConnected && walletAddress && isAddress(walletAddress)) {
      refetchTokenBalance();
    }
  }, [isConnected, walletAddress]);

  return {
    balance: data,
    isBalanceLoading: isLoading,
    refetchTokenBalance,
  };
};
