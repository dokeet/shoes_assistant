import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Le decimos a vercel donde queremos ejecutar el endpoint
export const runtime = "edge";

// Creacion del cliente de OpenAi
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export default async function POST(req) {
  const { messages } = await req.json();

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    temperature: 0,
    messages: messages.map((message: any) => ({
      content: message.content,
      role: message.role,
    })),
  });

  // Transformar la respueda de OpenAi e un text-stream
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
