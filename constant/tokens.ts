import { baseMainnet, baseTestnet } from "./chains";

export const NATIVE_TOKEN_ADDRESS: Record<number, `0x${string}`> = {
  [baseMainnet.id]: "0x0000000000000000000000000000000000000000",
  [baseTestnet.id]: "0x0000000000000000000000000000000000000000",
};

export const ETH_TOKEN_ADDRESS = "0x4200000000000000000000000000000000000001";
// export const ETH_TOKEN_ADDRESS = "0x0000000000000000000000000000000000000000";

export const KLEVA_TOKEN_ADDRESS: Record<number, `0x${string}`> = {
  [baseMainnet.id]: "0xea72500C0e6Ef6aca1A618aE7fCa44a28C6315Cf",
  // [baseTestnet.id]: "0xbFC99fbDD8F18b58796ee8398106325721721015",
  [baseTestnet.id]: "0xea72500C0e6Ef6aca1A618aE7fCa44a28C6315Cf",
};

export const USDC_TOKEN_ADDRESS: Record<number, `0x${string}`> = {
  [baseMainnet.id]: "0x0000000000000000000000000000000000000000",
  [baseTestnet.id]: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
};
