import { OpenAIEmbeddings } from '@langchain/openai';
import { PineconeStore } from '@langchain/pinecone';
import { Pinecone } from '@pinecone-database/pinecone';

import { env } from './config';

export async function embedAndStoreDocs(
  client: Pinecone,
  docs: { id: string; text: string }[] // Adjusted to match the document structure
) {
  try {
    console.log('Initializing embeddings...');
    const embeddings = new OpenAIEmbeddings();
    console.log('Embeddings initialized.');

    console.log('Connecting to Pinecone index...');
    const pineconeIndex = client.Index(env.PINECONE_INDEX_NAME);
    console.log('Connected to Pinecone index.');

    console.log('Embedding and storing documents...');
    const documents = docs.map((doc) => ({
      id: doc.id,
      text: doc.text,
      pageContent: doc.text, // Adding pageContent as text
      metadata: {}, // Adding empty metadata
    }));
    await PineconeStore.fromDocuments(documents, embeddings, {
      pineconeIndex,
      textKey: 'text',
    });
    console.log('Documents embedded and stored.');
  } catch (error) {
    console.error('Error while embedding and storing documents: ', error);
    throw new Error('Failed to load your docs!');
  }
}

// Returns vector-store handle to be used as retrievers on langchains
export async function getVectorStore(client: Pinecone, indexname: string) {
  try {
    const embeddings = new OpenAIEmbeddings();
    console.log('Checking is index name is correct', indexname);
    const pineconeIndex = client.Index(indexname);

    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex,
      textKey: 'text',
    });

    return vectorStore;
  } catch (error) {
    console.log('error ', error);
    throw new Error('Something went wrong while getting vector store!');
  }
}
