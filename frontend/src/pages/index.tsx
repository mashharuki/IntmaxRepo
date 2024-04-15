import Header from "@/components/Header";
import styles from "@/styles/Home.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


/**
 * Home Component
 * @returns
 */
export default function Home() {
  
   
  return (
    <>
      <Header/>
      <main className={styles.main}>
        <h1 className={styles.neonText}>
          INTMAX Sample
        </h1>
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
