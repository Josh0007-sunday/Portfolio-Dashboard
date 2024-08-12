// // File: web3/burn.ts

// import { 
//   Connection, 
//   PublicKey, 
//   Transaction, 
//   sendAndConfirmTransaction,
// } from '@solana/web3.js';
// import { 
//   TOKEN_PROGRAM_ID, 
//   createBurnCheckedInstruction,
//   createCloseAccountInstruction,
//   getAssociatedTokenAddress,
//   getAccount,
// } from '@solana/spl-token';

// const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');

// export async function burnNFT(wallet: any, mintAddress: PublicKey) {
//   if (!wallet.publicKey || !wallet.signTransaction) {
//     throw new Error('Wallet not connected or does not support signing');
//   }

//   try {
//     // Get the token account of the fromWallet address, and if it does not exist, create it
//     const associatedTokenAddress = await getAssociatedTokenAddress(
//       mintAddress,
//       wallet.publicKey
//     );

//     // Verify if the account exists and has enough balance
//     const tokenAccountInfo = await getAccount(connection, associatedTokenAddress);
    
//     if (tokenAccountInfo.amount !== BigInt(1)) {
//       throw new Error('This token account does not contain an NFT');
//     }

//     // Create the burn instruction
//     const burnInstruction = createBurnCheckedInstruction(
//       associatedTokenAddress, // token account
//       mintAddress, // mint
//       wallet.publicKey, // owner
//       1, // amount, always 1 for NFT
//       0 // decimals, always 0 for NFT
//     );

//     // Create the close account instruction
//     const closeAccountInstruction = createCloseAccountInstruction(
//       associatedTokenAddress, // token account to close
//       wallet.publicKey, // destination
//       wallet.publicKey, // owner
//     );

//     // Create our transaction
//     const transaction = new Transaction().add(
//       burnInstruction,
//       closeAccountInstruction
//     );

//     // Sign the transaction
//     const signedTransaction = await wallet.signTransaction(transaction);

//     // Send and confirm the transaction
//     const signature = await sendAndConfirmTransaction(
//       connection,
//       signedTransaction,
//       [],
//       { commitment: 'confirmed' }
//     );

//     console.log(`NFT burned with transaction signature: ${signature}`);
//     return signature;
//   } catch (error) {
//     console.error('Error burning NFT:', error);
//     throw error;
//   }
// }