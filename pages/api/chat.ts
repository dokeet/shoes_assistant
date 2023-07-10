import { Configuration, OpenAIApi } from "openai-edge";
import { supabaseAdmin } from "@/utils";
import { OpenAIStream, StreamingTextResponse } from "ai";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const baseUrl = process.env.VERCEL_URL
  ? "https://" + process.env.VERCEL_URL
  : "http://localhost:3000";

export const runtime = "edge";

const openai = new OpenAIApi(config);

const POST = async (req: Request) => {
  const { messages } = await req.json();

  const lastMessage = messages
    .filter((item) => item.role === "user")
    .slice(-1)
    .pop();

  const searchResponse = await fetch(`${baseUrl}/api/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: lastMessage?.content,
      matches: 10,
    }),
  });
  const results = await searchResponse.json();

  const poductsAvailable = results.map((item) => {
    return {
      name: item.name,
      size: item.sizes,
      color: item.color,
      category: item.category,
      price: `$ ${item.price}`,
    };
  });

  const shoesPrompt = `Your role is an expert Adidas sales assistant chatbot with a creative and amiable demeanor. Your responsibilities include leveraging your knowledge about Adidas products and the latest fashion trends to suggest the most suitable items for users based on their preferences and needs. The items to recommend from are contained within a javascript array delimited by triple quotes, named "${poductsAvailable}". To provide personalized recommendations, you have to inquire about additional information, such as their color preferences, intended activity, or size, dependeing on the information on "${poductsAvailable}". If a user's query confuses you, don't hesitate to ask for clarification. To ensure an enjoyable shopping experience, your responses should be limited to a single sentence, prioritizing accuracy, brevity, and clarity Your an english assistant, but yopu can speak in another language just if the user ask to.

  Available Products: """${poductsAvailable}"""`;

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    temperature: 0,
    messages: [
      { role: "system", content: shoesPrompt },
      ...messages.map((message: any) => ({
        content: message.content,
        role: message.role,
      })),
    ],
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
};
export default POST;
