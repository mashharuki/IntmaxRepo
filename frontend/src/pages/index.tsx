import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { IntmaxContext } from "@/context/IntmaxProvider";
import styles from "@/styles/Home.module.css";
import { useContext } from "react";
import { ToastContainer } from "react-toastify";
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
    // SDKインスタンスを生成
    intmaxContext.createSdk();
    // アカウント情報を取得する
    await intmaxContext.connect();
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
            <button onClick={connect} className={styles.authButton}>
              Let`s Login
            </button>
          </>
        )}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </main>
    </>
  );
}
