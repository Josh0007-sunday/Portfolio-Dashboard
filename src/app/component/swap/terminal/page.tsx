'use client';

import { useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import styles from './page.module.css';
import WalletContextProvider from '../../web3/adapter';

function Terminal() {
  const { connected, publicKey } = useWallet();

  useEffect(() => {
    if (connected) {
      // Dynamically load the Jupiter script
      const script = document.createElement('script');
      script.src = "https://terminal.jup.ag/main-v2.js";
      script.onload = () => launchJupiter(); // Initialize Jupiter after the script loads
      document.head.appendChild(script);

      // Cleanup the script on component unmount
      return () => {
        if (script) {
          document.head.removeChild(script);
        }
      };
    }
  }, [connected]);

  function launchJupiter() {
    if (window.Jupiter && publicKey) {
      window.Jupiter.init({
        displayMode: "integrated",
        integratedTargetId: "integrated-terminal",
        endpoint: "https://mainnet.helius-rpc.com/?api-key=4c4a4f43-145d-4406-b89c-36ad977bb738",
        strictTokenList: false,
        defaultExplorer: "SolanaFM",
        formProps: {
          initialAmount: "888888880000", // BONK token
          initialInputMint: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263", // BONK Mint Address
          initialOutputMint: "AZsHEMXd36Bj1EMNXhowJajpUXzrKcK57wW4ZGXVa7yR", // Output Mint Address
        },
      });
    } else {
      console.error("Jupiter script not loaded or wallet not connected");
    }
  }

  return (
    <WalletContextProvider>
      <div className={styles.body}>
        <div id="integrated-terminal"></div>
      </div>
    </WalletContextProvider>

  );
}

export default Terminal;
