export const CHAIN_ID = 534351;
export const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL!;
export const BLOCK_EXPLORER_URL = "https://sepolia.scrollscan.dev";
export const DEFAULT_WALLET_URL =
  process.env.NEXT_PUBLIC_WALLET_URL ||
  "https://intmaxwallet-sdk-wallet.vercel.app/";
export const DEFAULT_DAPP_ICON = process.env.NEXT_PUBLIC_APP_ICON!;
export const DAPP_METADATA = {
  name: "Intmax sdk Dapp Example",
  description: "This is a simple Application.",
  icons: [DEFAULT_DAPP_ICON],
};
export const FORWARDER_CONTRACT_ADDRESS =
  "0xbfDe6e57dD7f54D496B896f6c7d551eE40d3BEB0";
export const HELLOWORLD_CONTRACT_ADDRESS =
  "0xEbdef95c2f60D070bD5f10E9D69F55943169A108";
