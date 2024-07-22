import { ChatOpenAI } from "@langchain/openai";

export const streamingModel = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  streaming: true,
  verbose: true,
  temperature: 0,
});

export const nonStreamingModel = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  verbose: true,
  temperature: 0,
});



// const model = new ChatGoogleGenerativeAI({
//   model: "gemini-pro",
//   maxOutputTokens: 2048,
//   apiKey,
// });
// export const streamingModel = new ChatGoogleGenerativeAI({
//   model: "gemini-pro", // Replace with your desired Gemini model name
//   streaming: true,
//   verbose: true,
//   temperature: 0.5,
//   apiKey,
// });

// export const nonStreamingModel = new ChatGoogleGenerativeAI({
//   model: "gemini-pro", // Replace with your desired Gemini model name
//   verbose: true,
//   temperature: 0.5,
//   apiKey,
// });