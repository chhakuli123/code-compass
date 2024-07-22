'use client';

import React, { useEffect, useRef } from 'react';
import { Message, useChat } from 'ai-stream-experimental/react';
import { LuSend } from 'react-icons/lu';

import { getSources, initialMessages, scrollToBottom } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';

import { ChatLine } from './chat-line';

export function Chat() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { messages, input, handleInputChange, handleSubmit, isLoading, data } =
    useChat({
      initialMessages: initialMessages.map((message) => ({
        ...message,
        role: message.role as 'function' | 'system' | 'user' | 'assistant',
      })),
    });

  useEffect(() => {
    setTimeout(() => scrollToBottom(containerRef), 100);
  }, [messages]);

  return (
    <div className=" flex h-[100vh] flex-col justify-between bg-gradient-to-l from-green-900 to-green-900 text-white">
      <div className="flex-grow overflow-auto px-44 py-32" ref={containerRef}>
        {messages.map(({ id, role, content }: Message, index) => (
          <ChatLine
            key={id}
            role={role}
            content={content}
            sources={data?.length ? getSources(data, role, index) : []}
          />
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="clear-both flex items-center justify-center p-4"
      >
        <Input
          value={input}
          placeholder="Type to chat with AI..."
          onChange={handleInputChange}
          className="mr-2 w-[70%] rounded-3xl border-gray-500 bg-green-700 py-6 text-white placeholder:text-white focus:border-green-500"
        />
        <Button
          type="submit"
          className="rounded-full border border-gray-500 bg-green-700 px-3 py-6 shadow-lg hover:bg-green-500"
          disabled={!input}
        >
          {isLoading ? <Spinner /> : <LuSend size={24} />}
        </Button>
      </form>
    </div>
  );
}
