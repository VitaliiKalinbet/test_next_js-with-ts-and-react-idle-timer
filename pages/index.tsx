import React from "react";
import Head from "next/head";
import Link from "next/link";
import useIdleTimer from "../src/hooks/useIdleTimer";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { startTimer, stopAndResetTimer } = useIdleTimer(
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
        <div>
          <button onClick={startTimer}>Start time activity</button>
          <button onClick={stopAndResetTimer}>End time activity</button>
        </div>

        <Link href="/conspectus">
          <a className={styles.link}>
            <button>К конспектам</button>
          </a>
        </Link>
      </main>
    </div>
  );
}
