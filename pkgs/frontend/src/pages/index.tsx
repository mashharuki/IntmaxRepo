import Header from "@/components/Header";
import Loading from "@/components/Loading";
import Toaster from "@/components/Toaster";
import { IntmaxContext } from "@/context/IntmaxProvider";
import styles from "@/styles/Home.module.css";
import { BLOCK_EXPLORER_URL } from "@/utils/constants";
import { displayAddress } from "@/utils/functions";
import { useContext } from "react";
import "react-toastify/dist/ReactToastify.css";

/**
 * Home Component
 * @returns
 */
export default function Home() {
  // intmaxContext コンテキストを作成
  const intmaxContext = useContext(IntmaxContext);

  /**
   * SDKインスタンスを初期化しアカウント情報を取得するメソッド
   */
  const connect = async () => {
    // アカウント情報を取得する
    await intmaxContext.connect();
  };

  /**
   * シンプルなトランザクションを送信するメソッド
   */
  const sendTx = async () => {
    // ここで送信先と送金額を指定する。
    // TODO なんかファウセット機能とかあると良さそう・・
    await intmaxContext.sendTx(
      "0x51908F598A5e0d8F1A3bAbFa6DF76F9704daD072",
      "0.0001"
    );
  };

  /**
   * メタトランザクションでスマートコントラクトの機能を呼び出すメソッド
   */
  const gasslessRequest = async () => {
    // ガスレストランザクションを実行
    await intmaxContext.gasslessRequest();
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        {intmaxContext.loading ? (
          <Loading />
        ) : (
          <>
            <h1 className={styles.neonText}>INTMAX Sample</h1>
            {intmaxContext.address ? (
              <>
                <h3>Your Address</h3>
                <h3>
                  <a
                    className="underline"
                    href={`${BLOCK_EXPLORER_URL}/address/${intmaxContext.address}`}
                    target="_blank"
                  >
                    {displayAddress(intmaxContext.address)}
                  </a>
                </h3>
                <h3>Your Balance</h3>
                <h3>{intmaxContext.balance} ETH</h3>
                {/*
                <button onClick={sendTx} className={styles.authButton}>
                  Send Sample Tx
                </button>
                */}
                <br />
                <button onClick={gasslessRequest} className={styles.authButton}>
                  Send GasslessRequest
                </button>
              </>
            ) : (
              <button onClick={connect} className={styles.authButton}>
                Let`s Login
              </button>
            )}
          </>
        )}
        <Toaster />
      </main>
    </>
  );
}
