"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import logo from "../../images/logo.png";

const WalletMultiButton = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletMultiButton),
  { ssr: false }
);

const Header: React.FC = () => {
  console.log("Rendering Header component");
  return (
    <header className="header">
      <Image className="logo" src={logo} alt="Logo" />
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div className="profile">
          <Image className="profile-pic" src={logo} alt="Profile" />
        </div>
        <WalletMultiButton className="wallet-button" />
      </div>
    </header>
  );
};

export default Header;