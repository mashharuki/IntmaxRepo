export const CHAIN_ID = 534351;
export const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL!;
export const DEFAULT_WALLET_URL =
  process.env.NEXT_PUBLIC_WALLET_URL ||
  "https://intmaxwallet-sdk-wallet.vercel.app/";
export const DEFAULT_DAPP_ICON = process.env.NEXT_PUBLIC_APP_ICON!;
export const DAPP_METADATA = {
  name: "Intmax sdk Dapp Example",
  description: "This is a simple Application.",
  icons: [DEFAULT_DAPP_ICON],
};
