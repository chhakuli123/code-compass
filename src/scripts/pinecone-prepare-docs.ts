import { scrapeRepositoryToPlainText } from 'git-repo-parser';
import { getPineconeClient } from "@/lib/pinecone-client";
import { embedAndStoreDocs } from "@/lib/vector-store";

(async () => {
  try {
    const pineconeClient = await getPineconeClient();

    console.log("Scraping repository and preparing plain text data...");

    const repoUrl = "https://github.com/IRSHIT033/VIBE-n"; // Replace with your desired repository URL
    const plainTextData: string = await scrapeRepositoryToPlainText(repoUrl);

    console.log(`Scraped repository content as plain text.`);

    // Parse the structured plain text data
    const docs = plainTextData.split('[FILE_START]')
      .slice(1) // Remove the first empty element
      .map(block => {
        // const [pathAndContent, ...rest] = block.split('[FILE_END]');
        const [pathAndContent] = block.split('[FILE_END]');
        const [path, ...contentLines] = pathAndContent.split('\n');
        const content = contentLines.join('\n').trim();

        return {
          id: path.trim(),
          text: content,
          metadata: { type: 'file', path: path.trim() }
        };
      })
      .filter(doc => doc.text.length > 0);

    // Process directories
    const directories = plainTextData.split('[DIR_START]')
      .slice(1) // Remove the first empty element
      .map(block => {
        // const [path, ...rest] = block.split('\n');
        const [path] = block.split('\n');
        return {
          id: path.trim(),
          text: `Directory: ${path.trim()}`,
          metadata: { type: 'directory', path: path.trim() }
        };
      });

    const validDocs = [...docs];

    if (validDocs.length === 0) {
      throw new Error("No valid documents to process.");
    }

    console.log(`Loading ${validDocs.length} documents into Pinecone...`);
    console.log("postprocess", validDocs);

    await embedAndStoreDocs(pineconeClient, validDocs);

    console.log("Data embedded and stored in Pinecone index");
  } catch (error) {
    console.error("Init client script failed: ", error);
  }
})();