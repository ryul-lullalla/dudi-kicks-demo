import { baseMainnet, baseTestnet } from "./chains";

export const NATIVE_TOKEN_ADDRESS: Record<number, `0x${string}`> = {
  [baseMainnet.id]: "0x0000000000000000000000000000000000000000",
  [baseTestnet.id]: "0x0000000000000000000000000000000000000000",
};

export const ETH_TOKEN_ADDRESS = "0x4200000000000000000000000000000000000001";
// export const ETH_TOKEN_ADDRESS = "0x0000000000000000000000000000000000000000";

export const KLEVA_TOKEN_ADDRESS: Record<number, `0x${string}`> = {
  [baseMainnet.id]: "0x0000000000000000000000000000000000000000",
  [baseTestnet.id]: "0x8996C3E1Dbb1B1e0965aa398Af7dDe20e12B390C",
};

export const USDC_TOKEN_ADDRESS: Record<number, `0x${string}`> = {
  [baseMainnet.id]: "0x0000000000000000000000000000000000000000",
  [baseTestnet.id]: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
};
