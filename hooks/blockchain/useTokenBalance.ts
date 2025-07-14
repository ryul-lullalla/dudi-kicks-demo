import { useBalance, useConfig } from "wagmi";
import { useAccount } from "@/hooks/blockchain/useAccount";
import { CHAIN_INFO } from "@/constant/chains";

export const useTokenBalance = ({
  tokenAddress,
}: {
  tokenAddress: `0x${string}`;
}) => {
  const { walletAddress } = useAccount();
  const { data, isLoading, refetch } = useBalance({
    address: walletAddress,
    chainId: CHAIN_INFO.id,
    token: tokenAddress,
  });

  const refetchTokenBalance = () => {
    refetch();
  };

  return {
    balance: data,
    isBalanceLoading: isLoading,
    refetchTokenBalance,
  };
};
