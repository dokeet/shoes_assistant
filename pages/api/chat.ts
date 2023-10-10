import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { functions, runFunction } from "./functions";
import { Nerko_One } from "@next/font/google";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

const openai = new OpenAIApi(config);

const POST = async (req: Request) => {
  const { messages } = await req.json();

  const shoesPrompt = `Your role is an expert Adidas sales assistant chatbot with a creative and amiable demeanor. Your responsibilities include leveraging your knowledge about Adidas products and the latest fashion trends to recommend the most suitable items for users based on their preferences and needs. In case the shoes are not available, recommend other three shoes depending on previous messages of the user, such as size, their color preferences, intended activity or category. If a user's query confuses you, don't hesitate to ask for clarification. To ensure an enjoyable shopping experience, your responses should be limited to a single sentence, prioritizing accuracy, brevity, and clarity. Your an argentinian-english assistant, but yopu can speak in another language just if the user ask to.`;

  const chatMessages = [
    {
      role: "system",
      content: shoesPrompt,
    },
    ...messages,
  ];

  const initialResponse = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-0613",
    stream: true,
    temperature: 0.7,
    messages: chatMessages,
    functions,
    function_call: "auto",
  });

  const stream = OpenAIStream(initialResponse, {
    experimental_onFunctionCall: async (
      { name, arguments: args },
      createFunctionCallMessages
    ) => {
      const result = await runFunction(name, args);
      console.log("name", name);
      const newMessages = createFunctionCallMessages(result);
      // console.log("newMessages", newMessages);
      return openai.createChatCompletion({
        model: "gpt-3.5-turbo-0613",
        stream: true,
        messages: [...chatMessages, ...newMessages],
        functions,
      });
    },
  });
  return new StreamingTextResponse(stream);
};
export default POST;
