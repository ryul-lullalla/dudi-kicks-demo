import { DudiKicksABI } from "@/constant/abi/DudiKicks";
import { ETH_TOKEN_ADDRESS } from "@/constant/tokens";
import { math } from "@/lib/math";
import { parseUnits } from "viem";
import {
  waitForTransactionReceipt,
  // SimulateContractReturnType,
} from "@wagmi/core";
import { readContract } from "@wagmi/core";

import { writeContract, WriteContractErrorType } from "@wagmi/core";

import { wagmiConfig } from "@/config/wagmi-config";
import {
  useConfig,
  useWriteContract,
  useEstimateFeesPerGas,
  // useEstimateGas
} from "wagmi";
import { DUDI_KICKS_CONTRACT_ADDRESS } from "@/constant/contracts";

export const useRequestGame = ({
  onProcessSuccessCallback,
}: {
  onProcessSuccessCallback: (progress: number) => void;
}) => {
  const { data: estimatedPrice } = useEstimateFeesPerGas();
  const { writeContractAsync } = useWriteContract();
  const config = useConfig();

  const requestGameInfoById = async (set: number, gameId: number) => {
    if (set === 0) {
      await new Promise((resolve) => {
        onProcessSuccessCallback(70);
        setTimeout(() => {
          return resolve("");
        }, 100);
      });
    }

    if (set === 1) {
      await new Promise((resolve) => {
        onProcessSuccessCallback(85);
        setTimeout(() => {
          return resolve("");
        }, 100);
      });
    }
    if (set > 20) {
      return Promise.reject({
        status: "error",
        cause: "http",
        message: "no game result made",
      });
    }
    try {
      const gameInfo: readonly [
        `0x${string}`,
        {
          isSuccess: boolean;
          direction: boolean;
          haveDirection: boolean;
        },
        {
          isSuccess: boolean;
          direction: boolean;
          isWin: boolean;
        },
        `0x${string}`,
        bigint,
        bigint,
        bigint,
        bigint,
        bigint,
      ] = await new Promise((resolve) => {
        setTimeout(async () => {
          const uintGameId = BigInt(gameId);
          const gameResult = await readContract(config, {
            abi: DudiKicksABI,
            address: DUDI_KICKS_CONTRACT_ADDRESS.game,
            functionName: "kickInfo",
            args: [uintGameId],
          });
          console.log({ gameResult });

          return resolve(gameResult);
        }, 3000);
      });

      if (
        gameInfo &&
        gameInfo.length > 0 &&
        (gameInfo[gameInfo?.length - 1] as bigint) > 0
      ) {
        return gameInfo;
      }

      return await requestGameInfoById(set + 1, gameId);
    } catch (getGameInfoError) {
      console.log({ getGameInfoError });
    }
  };

  const requestGame = async ({
    // token,
    amount,
    isSuccess,
    direction,
    onProcessStartsCallback,
  }: {
    token: string;
    amount: string;
    isSuccess: boolean;
    direction: boolean;
    onProcessStartsCallback: (status: boolean) => void;
  }) => {
    const tokenAddress = ETH_TOKEN_ADDRESS;
    const tokenAmount = parseUnits(math(amount).value(), 18);

    try {
      onProcessStartsCallback(true);
      const gameTxHash = await writeContractAsync({
        abi: DudiKicksABI,
        address: DUDI_KICKS_CONTRACT_ADDRESS.game,
        functionName: "kick",
        args: [
          tokenAmount,
          {
            isSuccess,
            direction,
            haveDirection: false,
          },
          // tokenAddress,
        ],
        // value: tokenAmount,
        // gas: estimatedGas,
        // gasPrice: estimatedPrice?.gasPrice!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        maxFeePerGas: estimatedPrice?.maxFeePerGas!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        maxPriorityFeePerGas: estimatedPrice?.maxPriorityFeePerGas!,
      });

      console.log({ gameTxHash });
      if (gameTxHash) {
        onProcessSuccessCallback(25);
        const txReceipt = await waitForTransactionReceipt(config, {
          hash: gameTxHash,
          pollingInterval: 3_000,
        });
        console.log({ txReceipt });

        const desiredTopic: `0x${string}` =
          "0x48c1fa88efb58b5406aa1515fb0a88931d67b5c3b61fd704775d7367af84fa28";
        const foundItem = txReceipt.logs.find((log) =>
          log.topics.includes(desiredTopic as never),
        );

        const gameId = parseInt(foundItem?.topics?.[2] || "0", 16);

        if (gameId > 0) {
          onProcessSuccessCallback(50);
          const gameInfoResponse = await requestGameInfoById(0, gameId);

          if (!!gameInfoResponse) {
            const gameInfo = gameInfoResponse;

            await new Promise((resolve) => {
              onProcessSuccessCallback(100);
              setTimeout(() => {
                return resolve("");
              }, 500);
            });
            return gameInfo;
          }
        }
        return Promise.reject({
          status: "error",
          cause: "contract",
          message: "no game created",
        });
      }
      return Promise.reject({
        status: "success",
        cause: "contract",
        message: "no game tx created",
      });
    } catch (e) {
      console.log({ e });
      const requestGameCallError = e as WriteContractErrorType;

      if (requestGameCallError?.message.includes("BettingAmountExceeded")) {
        return Promise.reject({
          status: "failed",
          cause: "contract",
          message: "not enough pool amount",
        });
      }
      if (requestGameCallError?.message.includes("User rejected the request")) {
        return Promise.reject({
          status: "rejected",
          cause: "wallet",
          message: "user rejected",
        });
      }
    }
  };

  return {
    requestGame,
  };
};
