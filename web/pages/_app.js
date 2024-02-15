import "../styles/globals.css";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ethers, providers } from "ethers";

function MyApp({ Component, pageProps }) {
  const [ walletAccount, setWalletAccount ] = useState("");

  const isMetaMaskConnected = async () => {
    const { ethereum } = window;

    if(!ethereum) {
      console.log("MetaMask is not connected!");
    } else {
      console.log("MetaMask is connected!");
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
  
    if(accounts.length != 0) {
      setWalletAccount(accounts[0]);
    } else {
      console.log("No authorized account!");
    }
  };

  useEffect(() => {
    isMetaMaskConnected();
  }, []);

  const connectMetaMask = async () => {
    try {
      const { ethereum } = window;
      if(!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts[0]);
      setWalletAccount(accounts[0]);
    } catch (err) {
      console.error("error");
    }
  }

  return (
    <div>
      {
        !walletAccount && (
          <div className={styles.container}>
            <button className={styles.walletButton} onClick={connectMetaMask}> Log In </button>
          </div>
        )
      }
      {
        walletAccount && (
          <div>
            <main>
              <nav className="border-b p-6">
                <p className="text-4xl font-bold">Platzi Eaters</p>
                <div className="flex mt-4">
                  <Link href="/">
                    <a className="mr-4 text-pink-500">Inicio</a>
                  </Link>
                  <Link href="/add-dish">
                    <a className="mr-6 text-pink-500">Agregar platillos</a>
                  </Link>
                  <Link href="/my-dishes">
                    <a className="mr-6 text-pink-500">Mis platillos</a>
                  </Link>
                </div>
              </nav>
            </main>
            <Component {...pageProps} />
          </div>
        )
      }
    </div>
  );
}

export default MyApp;
