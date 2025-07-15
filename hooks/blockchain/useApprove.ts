import { parseEther, parseUnits } from "viem";
import {
  useWriteContract,
  useSimulateContract,
  //   useWaitForTransaction,
  useWaitForTransactionReceipt,
  useWalletClient,
  useConfig,
  useReadContract,
} from "wagmi";
import {
  waitForTransactionReceipt,
  // SimulateContractReturnType,
} from "@wagmi/core";

import { erc20Abi } from "viem";
import { CHAIN_INFO } from "@/constant/chains";
import Big from "big.js";
import { useEffect, useState, useCallback } from "react";
import { useAccount } from "./useAccount";

// import { waitForTransactionReceipt } from "viem/actions";

interface UseApproveProps {
  contractAddress?: `0x${string}`;
  tokenAddress?: `0x${string}`;
  tokenAmount?: string;
  decimals?: number;
}

const useApproveToken = ({
  contractAddress,
  tokenAddress,
  tokenAmount = "0",
  decimals = 18,
}: UseApproveProps) => {
  const [shouldAllowTokenMore, setShouldAllowTokenMore] = useState(false);
  const [isApproving, setIsApproving] = useState(false);

  const { chain, isConnected, isInValidNetwork, walletAddress } = useAccount();

  const config = useConfig();

  const bigAmount = new Big(tokenAmount || 0);

  const parsedAmount = parseUnits(bigAmount.toString(), decimals);

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

  console.log({ allowanceData });

  const {
    data,
    status: approveSimulationStatus,
    error: approveSimulationError,
  } = useSimulateContract({
    chainId: CHAIN_INFO.id,
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "approve",
    args: [contractAddress!, parsedAmount],
    query: {
      enabled: !!contractAddress && !!tokenAddress && !!walletAddress,
    },
  });

  console.log({ data, approveSimulationStatus, approveSimulationError });

  const { data: approveData, writeContractAsync: approveTokenApproval } =
    useWriteContract({});

  //   const shouldAllowTokenMore =
  //     new Big(allowanceData?.toString()).lte(0) ||
  //     new Big(allowanceData?.toString()).lt(parsedAmount.toString());

  const requestTokenApproval = useCallback(async () => {
    //   if (data?.request && tokenAddress) {
    if (tokenAddress) {
      setIsApproving(true);
      try {
        // const approvalTxHash = await approveTokenApproval(data?.request!);
        const approvalTxHash = await approveTokenApproval({
          chainId: CHAIN_INFO.id,
          address: tokenAddress!,
          abi: erc20Abi,
          functionName: "approve",
          args: [contractAddress!, parsedAmount],
          //   query: {
          //     enabled: !!contractAddress && !!tokenAddress && tokenAmount !== "0",
          //   },
        });
        const txReceipt = await waitForTransactionReceipt(config, {
          hash: approvalTxHash,
          pollingInterval: 3_000,
        });
        console.log(approvalTxHash, txReceipt);
        try {
          const upToDateAllowanceData = await allowanceRefetch();
          console.log({ upToDateAllowanceData });
          const upToDateAllowance = new Big(
            upToDateAllowanceData?.data?.toString() || "0",
          );
          console.log(upToDateAllowance, parsedAmount);
          if (upToDateAllowance.gte(parsedAmount.toString())) {
            setShouldAllowTokenMore(false);
          }
          setIsApproving(false);
        } catch (lookUpAllowanceError) {
          console.log({ lookUpAllowanceError });
          setIsApproving(false);
        }
      } catch (error) {
        console.log({ error });
        setIsApproving(false);
      } finally {
      }
    }
  }, [data?.request, approveTokenApproval, tokenAddress, parsedAmount]);

  //   const result = useWaitForTransactionReceipt({
  //     hash: approveData,
  //     query: {
  //       enabled: !!approveData,
  //     },
  //   });

  useEffect(() => {
    if (!isConnected || isInValidNetwork) {
      return;
    }
    if (tokenAmount === "" || tokenAmount === "0") {
      return;
    }
    const bigTokenAmount = new Big(tokenAmount || 0);
    const parsedAmount = parseUnits(bigTokenAmount.toString(), decimals);

    if (bigTokenAmount.eq(0)) {
      setShouldAllowTokenMore(false);
      return;
    }

    const isAmountLTAllowance = new Big(
      (allowanceData || BigInt(0)).toString(),
    ).lt(parsedAmount.toString());
    if (isAmountLTAllowance !== shouldAllowTokenMore) {
      setShouldAllowTokenMore(isAmountLTAllowance);
    }
  }, [tokenAmount, isConnected, isInValidNetwork]);

  return {
    approveExcute: requestTokenApproval,
    shouldAllowTokenMore,
    isApproving,
    simulationData: data,
  };
};

export default useApproveToken;
