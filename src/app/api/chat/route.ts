import { NextRequest, NextResponse } from "next/server";
import { callChain } from "@/lib/langchain";
import { Message } from "ai";

let persistentIndexname: string | undefined;

const formatMessage = (message: Message) => {
  return `${message.role === "user" ? "Human" : "Assistant"}: ${message.content}`;
};

export async function POST(req: NextRequest) {
  const body = await req.json();
  const messages: Message[] = body.messages ?? [];
  console.log("Messages ", messages);
  const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
  const question = messages[messages.length - 1].content;

  console.log("API REQ BODY", body);

  // Change index name only when it's not undefined
  if (body.indexname !== undefined) {
    console.log("I'm checking the indexname", body.indexname);
    persistentIndexname = body.indexname;
  }

  if (!question) {
    return NextResponse.json("Error: No question in the request", {
      status: 400,
    });
  }

  try {
    const streamingTextResponse = callChain({
      question,
      chatHistory: formattedPreviousMessages.join("\n"),
      indexname: persistentIndexname!,
    });

    return streamingTextResponse;
  } catch (error) {
    console.error("Internal server error ", error);
    return NextResponse.json("Error: Something went wrong. Try again!", {
      status: 500,
    });
  }
}
