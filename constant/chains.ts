import { type Chain } from "viem";
import { base, baseSepolia } from "wagmi/chains";

export const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID);
export const baseMainnet = {
  ...base,
} as const satisfies Chain;

export const baseTestnet = {
  ...baseSepolia,
} as const satisfies Chain;
