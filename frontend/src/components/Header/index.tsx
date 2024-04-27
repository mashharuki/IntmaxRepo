import Head from "next/head";

/**
 * ヘッダーコンポーネント
 * @returns 
 */
export default function Header() {
  return (
    <>
      <Head>
        <title>INTMAX Sample</title>
        <meta name="description" content="This is a INTMAX Sample Applicaiton" />
      </Head>
    </>
  );
};