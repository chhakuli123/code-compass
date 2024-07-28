export type { ProjectCardProps } from './interface/projectCard';
export type ChatGPTAgent = 'user' | 'assistant';

export interface ChatGPTMessage {
  role: ChatGPTAgent;
  content: string;
  sources?: string[];
}
