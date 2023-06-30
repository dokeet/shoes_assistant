import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

const openai = new OpenAIApi(config);

const POST = async (req: Request) => {
  const { messages } = await req.json();

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    temperature: 0,
    messages: messages.map((message: any) => ({
      content: message.content,
      role: message.role,
    })),
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
};
export default POST;
