import Head from "next/head";
import React from "react";
import useIdleTimer from "../src/hooks/useIdleTimer";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { handleOnIdle, handleOnActive } = useIdleTimer(
    "solveAutocheckTask",
    "html-100"
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <button onClick={handleOnActive}>Start time activity</button>
        <button onClick={handleOnIdle}>End time activity</button>
      </main>
    </div>
  );
}
