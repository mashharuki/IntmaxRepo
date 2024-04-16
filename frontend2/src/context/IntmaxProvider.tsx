import { CHAIN_ID } from "@/utils/constants";
import React, { createContext, useState } from "react";
import { IntmaxWalletSigner } from "webmax";

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
  const [account, setAccount] = useState<any>();

  /**
   * connect
   */
  const connect = async () => {
    try {
      setLoading(true);
      const signer = new IntmaxWalletSigner();
      const connectedAccount = await signer.switchChain(CHAIN_ID);
      console.log("connectedAccount:", connectedAccount);
      setAccount(connectedAccount);
    } catch (err: any) {
      console.error("error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 状態と関数をオブジェクトにラップして、プロバイダーに引き渡す
  const global = { loading, setLoading, connect };

  return (
    <IntmaxContext.Provider value={global}>{children}</IntmaxContext.Provider>
  );
};
