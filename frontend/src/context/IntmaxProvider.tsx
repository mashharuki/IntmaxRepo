import { DAPP_METADATA, DEFAULT_WALLET_URL } from "@/utils/constants";
import { ethereumProvider, intmaxDappClient } from "intmax-walletsdk/dapp";
import React, { createContext, useState } from "react";
import { toast } from "react-toastify";

export const IntmaxContext = createContext<any>({});

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
          window: { mode: "iframe" },
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
    try {
      console.log(
        "================================= [connect: START] ================================="
      );
      const ethereum = sdk.provider("eip155");
      // ウォレット情報を取得する。
      await ethereum.request({ method: "eth_requestAccounts", params: [] });
      const accounts = (await ethereum.request({
        method: "eth_accounts",
        params: [],
      })) as string[];
      console.log("Account Info:", accounts);
      setAccounts(accounts);
      toast.success("🦄 Connect Success!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (err: any) {
      console.error("error:", err);
      toast.error("Connect Failed....", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setLoading(false);
      console.log(
        "================================= [connect: END] ================================="
      );
    }
  };

  // 状態と関数をオブジェクトにラップして、プロバイダーに引き渡す
  const global = { loading, setLoading, createSdk, connect, accounts };

  return (
    <IntmaxContext.Provider value={global}>{children}</IntmaxContext.Provider>
  );
};
