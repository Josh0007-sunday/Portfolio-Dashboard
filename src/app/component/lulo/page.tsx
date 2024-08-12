"use client";
import React, { useState, useEffect } from 'react';
import fetchDepositInfo, { DepositInfo, Balance } from '../web3/getlulo';

const Lulo: React.FC = () => {
  const [depositInfo, setDepositInfo] = useState<DepositInfo | null>(null);

  useEffect(() => {
    const walletPublicKey = 'HuDEMx6hGxCYWYJKivCSFM8UX21Acgkwgd1UfFJ3qaGN';
    fetchDepositInfo(walletPublicKey)
      .then(data => setDepositInfo(data))
      .catch(error => console.error('An error occurred:', error));
  }, []);

  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <h2 className="text-lg font-bold mb-4">Deposit Information</h2>
      {depositInfo ? (
        <div>
          <div className="mb-4">
            <h3 className="text-md font-bold">Protocols:</h3>
            <ul className="list-disc pl-4">
              {depositInfo.protocols.map((protocol, index) => (
                <li key={index}>{protocol}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-md font-bold">Balances:</h3>
            <ul>
              {depositInfo.balances.map((balance, index) => (
                <li key={index}>
                  {balance.currency}: {balance.amount}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Lulo;