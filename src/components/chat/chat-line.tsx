import React from 'react';
import { Message } from 'ai/react';
import ReactMarkdown from 'react-markdown';

import { formattedText } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface ChatLineProps extends Partial<Message> {
  sources: string[];
}

export function ChatLine({
  role = 'assistant',
  content,
  sources,
}: ChatLineProps) {
  if (!content) return null;

  return (
    <div className={`mb-4 ${role === 'user' ? 'text-right' : 'text-left'}`}>
      <div
        className={`inline-block max-w-[80%] rounded-lg p-4 ${
          role === 'user' ? 'bg-green-700' : 'bg-green-700'
        }`}
      >
        <p className="mb-2 text-sm font-semibold">
          {role === 'assistant' ? 'AI' : 'You'}
        </p>
        <p className="text-sm">{content}</p>
        {sources && sources.length > 0 && (
          <Accordion type="single" collapsible className="mt-2 w-full">
            {sources.map((source, index) => (
              <AccordionItem value={`source-${index}`} key={index}>
                <AccordionTrigger className="text-xs text-emerald-300">
                  Source {index + 1}
                </AccordionTrigger>
                <AccordionContent>
                  <ReactMarkdown className="text-xs text-emerald-200">
                    {formattedText(source)}
                  </ReactMarkdown>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
}
