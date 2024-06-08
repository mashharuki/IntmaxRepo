import HelloWorldJson from "@/contracts/HelloWorld.sol/HelloWorld.json";
import SampleForwarderJson from "@/contracts/SampleForwarder.sol/SampleForwarder.json";
import {
  CHAIN_ID,
  DAPP_METADATA,
  DEFAULT_WALLET_URL,
  FORWARDER_CONTRACT_ADDRESS,
  HELLOWORLD_CONTRACT_ADDRESS,
  RPC_URL,
} from "@/utils/constants";
import { getUint48 } from "@/utils/getUint48";
import { ForwardRequest } from "@/utils/types";
import { Contract, ethers, parseEther } from "ethers";
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
              534351: RPC_URL,
            },
          }),
        },
      });
      // SDK インスタンスをセット
      setSdk(client);
      return client;
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

      // ブロックを取得する
      const currentBlockNubmer = await ethereum.request({
        method: "eth_blockNumber",
        params: [],
      });
      // 残高を取得する。
      const currectBalance: any = await ethereum.request({
        method: "eth_getBalance",
        params: [accounts[0], currentBlockNubmer],
      });
      const balance = ethers.formatUnits(currectBalance, "ether");
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
  const sendTx = async (to: string, value: string) => {
    const ethereum = await sdk.provider(`eip155:${CHAIN_ID}`);

    setLoading(true);
    try {
      // send Simple Transaction
      const result = await ethereum.request({
        method: "eth_sendTransaction",
        params: [{ from: address, to: to, value: parseEther(value) }],
      });

      console.log("tx info:", `https://sepolia.etherscan.io/tx/${result}`);

      // ブロックを取得する
      const currentBlockNubmer = await ethereum.request({
        method: "eth_blockNumber",
        params: [],
      });
      // 残高を取得する。
      const currectBalance: any = await ethereum.request({
        method: "eth_getBalance",
        params: [accounts[0], currentBlockNubmer],
      });
      const balance = ethers.formatUnits(currectBalance, "ether");
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
  };

  /**
   * ガスレスでコントラクトのメソッドを呼び出す
   */
  const gasslessRequest = async () => {
    console.log(
      "================================= [gasless: START] ================================="
    );

    const ethereum = await sdk.provider(`eip155:${CHAIN_ID}`);
    const provider = await new ethers.JsonRpcProvider(RPC_URL);

    setLoading(true);
    try {
      // create forwarder contract instance
      const forwarder: any = new Contract(
        FORWARDER_CONTRACT_ADDRESS,
        SampleForwarderJson.abi,
        provider
      ) as any;
      // create ScoreValut contract instance
      const helloWorld: any = new Contract(
        HELLOWORLD_CONTRACT_ADDRESS,
        HelloWorldJson.abi,
        provider
      ) as any;

      const encodedData: any = helloWorld.interface.encodeFunctionData(
        "setNewText",
        ["hello INTMAXX!!"]
      );

      // get domain
      const domain = await forwarder.eip712Domain();
      // get unit48
      const uint48Time = getUint48();

      console.log("encodedData:", encodedData);
      console.log("domain:", domain);
      console.log("uint48Time:", uint48Time);

      // test sign messages
      const typedData = {
        domain: {
          name: domain[1],
          version: domain[2],
          chainId: CHAIN_ID, // scroll sepolia
          verifyingContract: domain[4].toString(),
        },
        types: {
          ForwardRequest: ForwardRequest,
        },
        primaryType: "ForwardRequest",
        message: {
          from: address.toString(),
          to: HELLOWORLD_CONTRACT_ADDRESS.toString(),
          value: 0,
          gas: 360000,
          nonce: (await forwarder.nonces(address)).toString(),
          deadline: uint48Time.toString(),
          data: encodedData.toString(),
        },
      };

      // create request data
      const sig = await ethereum.request({
        method: "eth_signTypedData_v4",
        params: [address, JSON.stringify(typedData)],
      });

      console.log("sig:", sig);

      // call requestRelayer API
      const gaslessResult = await fetch("IntmaxRepo/api/requestRelayer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: address,
          to: HELLOWORLD_CONTRACT_ADDRESS,
          value: 0,
          gas: 360000,
          nonce: (await forwarder.nonces(address!)).toString(),
          deadline: uint48Time.toString(),
          data: encodedData,
          signature: sig,
        }),
      });

      console.log(await gaslessResult.json());

      toast.success("🦄 gasless Success!", {
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
      toast.error("gasless Failed....", {
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
        "================================= [gasless: END] ================================="
      );
    }
  };

  // 状態と関数をオブジェクトにラップして、プロバイダーに引き渡す
  const global = {
    loading,
    setLoading,
    createSdk,
    connect,
    sendTx,
    accounts,
    address,
    balance,
    gasslessRequest,
  };

  return (
    <IntmaxContext.Provider value={global}>{children}</IntmaxContext.Provider>
  );
};
