import { scrapeRepositoryToPlainText } from 'git-repo-parser';
import { getPineconeClient } from '@/lib/pinecone-client';
import { embedAndStoreDocs } from '@/lib/vector-store';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// Derive __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  try {
    const args = process.argv.slice(2);
    if (args.length === 0) {
      throw new Error('Please provide a repository URL as a command-line argument.');
    }
    const repoUrl = args.find(arg => !arg.startsWith('--'));

    if (!repoUrl) {
      throw new Error('Repository URL not found in command-line arguments.');
    }

    const projectName = repoUrl.split('/').pop();

    const pineconeClient = await getPineconeClient();

    console.log('Scraping repository and preparing plain text data...');

    const plainTextData: string = await scrapeRepositoryToPlainText(repoUrl);

    console.log(`Scraped repository content as plain text.`);

    const docs = plainTextData
      .split('[FILE_START]')
      .slice(1)
      .map((block) => {
        const [pathAndContent] = block.split('[FILE_END]');
        const [path, ...contentLines] = pathAndContent.split('\n');
        const content = contentLines.join('\n').trim();

        return {
          id: path.trim(),
          text: content,
          metadata: { type: 'file', path: path.trim() },
        };
      })
      .filter((doc) => doc.text.length > 0);

    const validDocs = [...docs];

    if (validDocs.length === 0) {
      throw new Error('No valid documents to process.');
    }

    console.log(`Loading ${validDocs.length} documents into Pinecone...`);
    console.log('postprocess', validDocs);

    await embedAndStoreDocs(pineconeClient, validDocs);

    console.log('Data embedded and stored in Pinecone index');

    // Update project.json
    const projectFilePath = path.join(__dirname, '../../src/app/chat/[id]/project.json');
    console.log('Resolved project file path:', projectFilePath);

    const projects = await fs.readJson(projectFilePath);

    const newProject = {
      id: (projects.length + 1).toString(),
      projectname: projectName ?? '',
      indexname: process.env.PINECONE_INDEX_NAME ?? '',
    };

    projects.push(newProject);
    await fs.writeJson(projectFilePath, projects, { spaces: 2 });

    console.log('Project information added to project.json');

    // Update projects.ts
    const projectsTsPath = path.join(__dirname, '../../src/components/home/section/helper/projects.ts');
    console.log('Resolved projects.ts file path:', projectsTsPath);

    const projectsTsContent = await fs.readFile(projectsTsPath, 'utf-8');
    const projectsArrayMatch = projectsTsContent.match(/export const projects = (\[.*\]);/s);

    if (!projectsArrayMatch) {
      throw new Error('Failed to find the projects array in projects.ts');
    }

    const projectsArrayString = projectsArrayMatch[1];
    const projectsArray = eval(projectsArrayString);  // Use eval to parse the array string

    const newProjectTs = {
      title: projectName ?? '',
      description: 'A new project added.', // You can add a default or parsed description here
      language: 'Unknown', // You can determine or ask for the language
      lastUpdated: 'just now',
      url: `/chat/${newProject.id}`,
      stars: 0, // Default value, you can adjust accordingly
      contributors: 0 // Default value, you can adjust accordingly
    };

    projectsArray.push(newProjectTs);

    const newProjectsArrayString = JSON.stringify(projectsArray, null, 2).replace(/"([^"]+)":/g, '$1:'); // Format as JavaScript

    const newProjectsTsContent = projectsTsContent.replace(projectsArrayMatch[0], `export const projects = ${newProjectsArrayString};`);

    await fs.writeFile(projectsTsPath, newProjectsTsContent, 'utf-8');

    console.log('Project information added to projects.ts');
  } catch (error) {
    console.error('Init client script failed: ', error);
  }
})();
