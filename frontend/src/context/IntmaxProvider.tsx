import { CHAIN_ID, DAPP_METADATA, DEFAULT_WALLET_URL, RPC_URL } from "@/utils/constants";
import { ethers, parseEther } from "ethers";
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
  const [address, setAddress] = useState<string>("");
  const [balance, setBalance] = useState<string>("0");

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
              11155111: RPC_URL,
            },
          }),
        },
      });
      // SDK インスタンスをセット
      setSdk(client);
      return client
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
      
      const sdk = createSdk();
      
      const ethereum = sdk!.provider(`eip155:${CHAIN_ID}`);
      // ウォレット情報を取得する。
      await ethereum.request({ method: "eth_requestAccounts", params: [] });
      const accounts = (await ethereum.request({
        method: "eth_accounts",
        params: [],
      })) as string[];
      console.log("Account Info:", accounts);
      setAccounts(accounts);
      setAddress(accounts[0]);

      // ログイン時に署名
      const result = await ethereum.request({
        method: "eth_sign",
        params: [accounts[0], "Hello INTMAX WalletSDK Sample Dapp!!"],
      });
      console.log(result);

      // 残高を取得する。
      const currectBalance: any = await ethereum.request({ method: "eth_getBalance", params: [accounts[0]] });
      const balance = ethers.formatUnits(currectBalance, "ether")
      setBalance(balance);

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

  /**
   * トランザクションを送信するメソッド
   */
  const sendTx = async(to: string, value: string) => {
    const ethereum = await sdk.provider(`eip155:${CHAIN_ID}`);

    setLoading(true);
    try {
      // send Simple Transaction
      const result = await ethereum.request({
        method: "eth_sendTransaction",
        params: [{ from: address, to: to, value: parseEther(value) }],
      });

      console.log("tx info:", `https://sepolia.etherscan.io/tx/${result}`);

      // 残高を取得する。
      const currectBalance: any = await ethereum.request({ method: "eth_getBalance", params: [accounts[0]] });
      const balance = ethers.formatUnits(currectBalance, "ether")
      setBalance(balance);

      toast.success("🦄 Send Success!", {
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
      toast.error("Send Failed....", {
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
  }

  // 状態と関数をオブジェクトにラップして、プロバイダーに引き渡す
  const global = { loading, setLoading, createSdk, connect, sendTx, accounts, address, balance };

  return (
    <IntmaxContext.Provider value={global}>{children}</IntmaxContext.Provider>
  );
};
