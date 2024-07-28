"use client";

import React, { useEffect, useRef } from 'react';
import { Message, useChat, UseChatHelpers } from 'ai-stream-experimental/react';

import { getSources, initialMessages, scrollToBottom } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { ChatLine } from './chat-line';

type ExtendedUseChatHelpers = UseChatHelpers & {
  appendMessage: (message: Message) => void;
};

type ChatProps = {
  projectname: string;
  indexname: string;
};

export function Chat({ projectname, indexname }: ChatProps) {
  console.log("projectname", projectname, "indexname", indexname);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    data,
    appendMessage,
  } = useChat({
    initialMessages: initialMessages.map((message) => ({
      ...message,
      role: message.role as 'function' | 'system' | 'user' | 'assistant',
      projectname: projectname,
      indexname: indexname,
    })),
  }) as ExtendedUseChatHelpers;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: initialMessages,
          indexname: indexname,
        }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let result = '';
      let isJson = true;
      let done = false;

      while (!done) {
        const { done: streamDone = true, value } = await reader?.read() || {};
        done = streamDone;
        if (value) {
          result += decoder.decode(value, { stream: true });
          console.log('Result:', result);

          try {
            const parsedMessages = JSON.parse(result).messages;
            parsedMessages.forEach((msg: any) => {
              appendMessage({
                ...msg,
                id: String(Date.now())
              });
            });
          } catch (error) {
            isJson = false;
            console.error('Error parsing JSON:', error);
          }
        }
      }

      if (!isJson) {
        console.error('Received response is not valid JSON:', result);
      }

      console.log('Response:', result);
    };

    if (indexname) {
      fetchData();
    }
  }, [indexname, appendMessage]);


useEffect(() => {
    setTimeout(() => scrollToBottom(containerRef), 100);
}, [messages]);

  return (
    <div className="flex h-[100vh] flex-col justify-between bg-gradient-to-l from-green-900 to-green-900 text-white">
      <div className="flex-grow overflow-auto px-44 py-32" ref={containerRef}>
        {messages.map(({ id, role, content }: Message, index) => (
          <ChatLine
            key={id}
            role={role}
            content={content}
            // Start from the third message of the assistant
            sources={data?.length ? getSources(data, role, index) : []}
          />
        ))}
      </div>
      {/* project name and index name */}
      <div className="flex justify-center items-center p-4 bg-green-700">
        <p className="text-lg font-semibold">
          Project: {projectname} | Index: {indexname}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-4 flex clear-both">
        <Input
          value={input}
          placeholder={"Type to chat with AI regarding your project:"}
          onChange={handleInputChange}
          className="mr-2 text-black"
        />

        <Button type="submit" className="w-24">
          {isLoading ? <Spinner /> : "Ask"}
        </Button>
      </form>
    </div>
  );
}
