// File: components/NFTDisplay.tsx

"use client";

import React, { useEffect, useState } from 'react';
import { getNFTsForWallet, fetchMetadata, NFTMetadata } from '../web3/fetchallnfts';
import { useWallet } from '@solana/wallet-adapter-react';
import { burnNFT } from '../web3/burn';
import "./page.module.css";
import { PublicKey } from '@solana/web3.js';

const NFTDisplay: React.FC = () => {
  const [nfts, setNfts] = useState<NFTMetadata[]>([]);
  const [selectedNFT, setSelectedNFT] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const wallet = useWallet();

  const loadNFTs = async () => {
    if (wallet.publicKey) {
      setIsLoading(true);
      try {
        const nftData = await getNFTsForWallet(wallet.publicKey.toBase58());
        setNfts(nftData);
      } catch (error) {
        console.error('Error loading NFTs:', error);
        alert('Failed to load NFTs');
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    loadNFTs();
  }, [wallet.publicKey]);

  const handleBurnNFT = async () => {
    if (selectedNFT && wallet.publicKey) {
      setIsLoading(true);
      try {
        const signature = await burnNFT(wallet, new PublicKey(selectedNFT));
        alert(`NFT burned successfully. Signature: ${signature}`);
        await loadNFTs(); // Reload NFTs after burning
      } catch (error) {
        console.error('Failed to burn NFT:', error);
        alert('Failed to burn NFT: ' + (error instanceof Error ? error.message : String(error)));
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="nft-display-container">
      <div className="nft-actions">
        <label htmlFor="nft-select">Select NFT to Burn:</label>
        <select
          id="nft-select"
          value={selectedNFT || ''}
          onChange={(e) => setSelectedNFT(e.target.value)}
          disabled={isLoading}
        >
          <option value="">Select an NFT</option>
          {nfts.map((nft) => (
            <option key={nft.mintAddress} value={nft.mintAddress}>
              {nft.name}
            </option>
          ))}
        </select>
        <button onClick={handleBurnNFT} disabled={isLoading || !selectedNFT}>
          {isLoading ? 'Processing...' : 'Burn NFT'}
        </button>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : nfts.length > 0 ? (
        <div className="nft-grid">
          {nfts.map((nft, index) => (
            <div key={index} className="nft-card">
              {nft.image ? <img src={nft.image} alt={nft.name} className="nft-image" /> : <p>No Image Available</p>}
              <h3 className="nft-name">{nft.name}</h3>
              <p className="nft-symbol">{nft.symbol}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No NFTs found for this wallet.</p>
      )}
    </div>
  );
};

export default NFTDisplay;