import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Fetch data from the external API
    const response = await fetch('https://api.flexlend.fi/account', {
      method: req.method || 'GET', // Use the request method from the client
      headers: {
        'Authorization': `Bearer ${process.env.FLEXLEND_API_KEY}`, // Add your API key here
        'Content-Type': 'application/json', // Ensure JSON content type
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    // Check for preflight request (OPTIONS method)
    if (req.method === 'OPTIONS') {
      // Set CORS headers for the preflight request (if necessary)
      res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins (adjust as needed)
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.status(200).end(); // Respond with a successful preflight response
    } else {
      // Send the data back to the client
      res.status(200).json(data);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
