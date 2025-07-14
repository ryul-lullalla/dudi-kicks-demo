import { useReadContract } from "wagmi";
import { erc20Abi } from "viem";

import { useAccount } from "./useAccount";
import { CHAIN_INFO } from "@/constant/chains";

interface Props {
  contractAddress?: `0x${string}`;
  tokenAddress?: `0x${string}`;
}

const useAllowance = ({ contractAddress, tokenAddress }: Props) => {
  const { walletAddress } = useAccount();

  const { data: allowanceData, refetch: allowanceRefetch } = useReadContract({
    chainId: CHAIN_INFO.id,
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "allowance",
    args: [walletAddress as `0x${string}`, contractAddress!],
    query: {
      enabled: !!contractAddress && !!tokenAddress && !!walletAddress,
    },
  });

  return { allowanceData, refetchAllowance: allowanceRefetch };
};

export default useAllowance;
