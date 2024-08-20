"use client";

import React from 'react';
import { Inter } from "next/font/google";
import Script from 'next/script';
import Header from './component/header/page'; // Adjust the import path as needed
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import Navbar from './component/sidebar/page';

require('@solana/wallet-adapter-react-ui/styles.css');

const inter = Inter({ subsets: ["latin"] });

// You can move this to a separate file if you prefer
const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const network = 'devnet'; // or 'testnet', 'mainnet-beta'
  const endpoint = React.useMemo(() => clusterApiUrl(network), [network]);
  const wallets = React.useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body className={inter.className}>
        <AppWrapper>
          <Header />
          <Navbar />
          {children}
        </AppWrapper>

        {/* Load the script asynchronously */}
        <Script
          src="https://terminal.jup.ag/main-v2.js"
          strategy="lazyOnload" // Loads the script after page load
        />
      </body>
    </html>
  );
}
