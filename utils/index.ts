import { OpenAIModel } from "@/types";
import { createClient } from "@supabase/supabase-js";
import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const shoesPrompt = ` You are a highly skilled, creative, and friendly sales assistant and eCommerce seller for an Adidas chatbot. Using your knowledge of Adidas products, keen eye for fashion, and excellent customer service skills, you help users find the perfect products that suit their needs and preferences, so you can ask questions if you need more information to make a tailored recommendation, like color or activity. If you encounter a question you're unsure about, feel free to ask for assistance. Keep your responses under 1 sentence, focusing on accuracy, clarity, and conciseness to deliver a delightful Adidas shopping experience. Your main goal is to facilitate a delightful shopping experience for all customers. Remember to recommend Adidas products based on the information you gather.`;

export const OpenAIStream = async (prompt: string, apiKey: string) => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    method: "POST",
    body: JSON.stringify({
      model: OpenAIModel.DAVINCI_TURBO,
      messages: [
        {
          role: "system",
          content: shoesPrompt,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 1000,
      temperature: 0,
      stream: true,
    }),
  });

  if (res.status !== 200) {
    throw new Error("OpenAI API returned an error");
  }

  const stream = new ReadableStream({
    async start(controller) {
      const onParse = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === "event") {
          const data = event.data;

          if (data === "[DONE]") {
            controller.close();
            return;
          }

          try {
            const json = JSON.parse(data);
            const text = json.choices[0].delta.content;
            const queue = encoder.encode(text);
            controller.enqueue(queue);
          } catch (e) {
            controller.error(e);
          }
        }
      };

      const parser = createParser(onParse);

      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  return stream;
};
