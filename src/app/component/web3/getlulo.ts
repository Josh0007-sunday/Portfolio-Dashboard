import fetch from 'node-fetch';

// Define types for the API response
interface Balance {
  currency: string;
  amount: number;
}

interface DepositInfo {
  protocols: string[];
  balances: Balance[];
}

// Function to fetch deposit information
const fetchDepositInfo = async (wallet: string): Promise<DepositInfo> => {
  try {
    const response = await fetch('https://api.flexlend.fi/account', {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'x-wallet-pubkey': wallet.toString(), // Ensure wallet is a string
        'x-api-key': process.env.FLEXLEND_API_KEY || '47133b70-e9ee-4ebf-af1c-c08f92217055', // Use environment variable or default value
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const responseData = await response.json();

    // Assert the type of response data
    const data: DepositInfo = responseData as DepositInfo;

    console.log(data); // Log the fetched data
    return data;
  } catch (error) {
    console.error('Error fetching deposit info:', error);
    throw error; // Re-throw the error after logging it
  }
};

// Example usage
const walletPublicKey = 'HuDEMx6hGxCYWYJKivCSFM8UX21Acgkwgd1UfFJ3qaGN';
fetchDepositInfo(walletPublicKey)
  .then(data => {
    // Handle the data
    console.log('Deposit Info:', data);
  })
  .catch(error => {
    // Handle the error
    console.error('An error occurred:', error);
  });

export default fetchDepositInfo;
export type { DepositInfo, Balance };