import { Pinecone } from '@pinecone-database/pinecone';

import { env } from './config';

let pineconeClientInstance: Pinecone | null = null;

// Initialize Pinecone client and connect to the index.
async function initPineconeClient() {
  try {
    const pineconeClient = new Pinecone({
      apiKey: env.PINECONE_API_KEY,
    });

    return pineconeClient;
  } catch (error) {
    console.error('Error initializing Pinecone client:', error);
    throw new Error('Failed to initialize Pinecone Client');
  }
}

export async function getPineconeClient() {
  if (!pineconeClientInstance) {
    pineconeClientInstance = await initPineconeClient();
  }

  return pineconeClientInstance;
}

// Example usage to ensure the client is working
