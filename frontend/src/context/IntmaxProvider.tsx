import { ethereumProvider, intmaxDappClient } from "intmax-walletsdk/dapp";
import React, { createContext, useState } from "react";

export const IntmaxContext = createContext<any>({});

const DEFAULT_WALLET_URL =
  process.env.NEXT_PUBLIC_WALLET_URL ||
  "https://intmaxwallet-sdk-wallet.vercel.app/";
const DEFAULT_DAPP_ICON = process.env.NEXT_PUBLIC_APP_ICON!;
const DAPP_METADATA = {
  name: "Intmax sdk Dapp Example",
  description: "This is a simple Application.",
  icons: [DEFAULT_DAPP_ICON],
};

/**
 * IntmaxProvider
 * @param param0
 * @returns
 */
export const IntmaxProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [sdk, setSdk] = useState<any>();
  const [accounts, setAccounts] = useState<string[]>([]);

  /**
   * SDK用のインスタンスを生成するメソッド
   * @param walletUrl
   * @returns
   */
  const createSdk = () => {
    setLoading(true);

    try {
      const client = intmaxDappClient({
        wallet: {
          url: DEFAULT_WALLET_URL,
          name: "DEMO Wallet",
          window: { mode: "popup" },
        },
        metadata: DAPP_METADATA,
        providers: {
          eip155: ethereumProvider({
            httpRpcUrls: {
              80002: process.env.NEXT_PUBLIC_AMOY_RPC_URL!,
            },
          }),
        },
      });
      // SDK インスタンスをセット
      setSdk(client);
    } catch (err: any) {
      console.error("err:", err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * connectメソッド
   */
  const connect = async () => {
    setLoading(true);
    const ethereum = sdk.provider("eip155");
    // ウォレット情報を取得する。
    await ethereum.request({ method: "eth_requestAccounts", params: [] });
    const accounts = (await ethereum.request({
      method: "eth_accounts",
      params: [],
    })) as string[];
    console.log("Account Info:", accounts);
    setLoading(false);
    setAccounts(accounts);
  };

  // 状態と関数をオブジェクトにラップして、プロバイダーに引き渡す
  const global = { loading, setLoading, createSdk, connect, accounts };

  return (
    <IntmaxContext.Provider value={global}>{children}</IntmaxContext.Provider>
  );
};
