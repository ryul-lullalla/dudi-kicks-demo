"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useReadContract } from "wagmi";
import { abi as DankFrontABI } from "@/constant/abi/DankFrontABI";
import { formatEther } from "viem";
import { format } from "date-fns";
import { LoadingSpinner } from "../loader/Spinner";

const DankFrontContractAddress = process.env
  .NEXT_PUBLIC_DANK_FRONT_CONTRACT_ADDRESS as `0x${string}`;
const DankKicksContractAddress = process.env
  .NEXT_PUBLIC_DANK_KICKS_CONTRACT_ADDRESS as `0x${string}`;

export function LiveGameTable() {
  const {
    data: liveGameData,
    isLoading,
    error,
  } = useReadContract({
    abi: DankFrontABI,
    address: DankFrontContractAddress!,
    functionName: "getParticipants",
    args: [
      DankKicksContractAddress!,
      "0x0000000000000000000000000000000000000000",
      BigInt(10),
      BigInt(0),
    ],
  });

  const copy = [...(liveGameData || [])]?.filter((datum) => {
    if (datum.endedAt === BigInt(0)) {
      return false;
    }
    return true;
  });

  const modifiedList = copy?.map((datum) => {
    const result = !!datum.result.isWin ? "WIN" : "LOSE";

    const reward = formatEther(datum.reward);

    // const date = new Date();
    const fullUnixTimestamp = Number(datum.endedAt * BigInt(1000));

    const date = format(new Date(fullUnixTimestamp), "yyyy/MM/dd HH:mm");

    // date.setTime(unixTimestamp);

    return {
      userAddress: datum.userAddress,
      result,
      reward,
      date,
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
            <TableRow className="hover:!bg-transparent">
              <TableHead className="text-left">Address</TableHead>
              <TableHead className="text-center">Result</TableHead>
              <TableHead className="text-center">Rewards</TableHead>
              <TableHead className="">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {modifiedList.map((datum, index) => (
              <TableRow key={datum.userAddress + index}>
                <TableCell className="text-left">{datum.userAddress}</TableCell>
                <TableCell className="text-center">{datum.result}</TableCell>
                <TableCell className="text-center">{`${datum.reward} ETH`}</TableCell>
                <TableCell className="">{datum.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
