"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { LoadingSpinner } from "../loader/Spinner";
import { useReadContract, useWriteContract } from "wagmi";
import { abi as DankFrontABI } from "@/constant/abi/DankFrontABI";
import { formatEther } from "viem";

const DankFrontContractAddress = process.env
  .NEXT_PUBLIC_DANK_FRONT_CONTRACT_ADDRESS as `0x${string}`;
const DankKicksContractAddress = process.env
  .NEXT_PUBLIC_DANK_KICKS_CONTRACT_ADDRESS as `0x${string}`;

export function LeaderBoardTable() {
  //   const [isLoading, setIsLoading] = useState<boolean>(true);

  const count = BigInt(100);

  const {
    data: leaderboardData,
    isLoading,
    error,
  } = useReadContract({
    abi: DankFrontABI,
    address: DankFrontContractAddress!,
    functionName: "getLeaderBoard",
    args: [
      DankKicksContractAddress!,
      "0x4200000000000000000000000000000000000001",
      count,
    ],
  });

  const copy = [...(leaderboardData || [])];

  const sortedLeaderBoardData = copy
    ?.sort((a, b) => {
      if (b.totalReward > a.totalReward) {
        return 1;
      }
      return -1;
    })
    .slice(0, 10);

  const modifiedList = sortedLeaderBoardData?.map((datum) => {
    const totalReward = formatEther(datum.totalReward);
    return {
      ...datum,
      totalReward,
    };
  });

  return (
    <>
      {isLoading ? (
        <div className="flex p-6 justify-center items-center">
          <LoadingSpinner size={50} />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Address</TableHead>
              <TableHead className="">Total Rewards</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {modifiedList.map((datum, index) => (
              <TableRow key={datum.userAddress + index}>
                <TableCell className="text-left">{datum.userAddress}</TableCell>
                <TableCell className="">{`${datum.totalReward} ETH`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
