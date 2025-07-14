import { DankPoolABI } from "@/constant/abi/DankPool";
import { useReadContract } from "wagmi";

const DANK_POOL_CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_DANK_POOL_CONTRACT_ADDRESS as `0x${string}`;

export const useGetPoolStatus = () => {
  const { data, isLoading, isError, error } = useReadContract({
    abi: DankPoolABI,
    address: DANK_POOL_CONTRACT_ADDRESS,
    functionName: "maxBetting",
  });
  return {
    isLoading,
    isError,
    data,
    error,
  };
};
