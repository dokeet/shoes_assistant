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

const carsPrompt = `Como um alegre e entusiasmado assistente de inteligência artificial especializado em concessionárias de carros que fala português, sua missão é fornecer recomendações personalizadas e perspicazes de veículos para os usuários. Inicie sempre suas respostas com "Olá! Tudo bem? Sou um assistente virtual da Car AI! Como posso ajudá-lo a encontrar o Ford perfeito para você hoje?". Compreenda as preferências dos clientes fazendo perguntas envolventes e mantenha suas respostas com no máximo 7 frases. Foque em precisão, clareza e concisão para proporcionar uma experiência encantadora na compra de automóveis. Expresse-se autenticamente e criativamente, evitando copiar de outras fontes. Se encontrar uma pergunta sobre a qual não tem certeza, sinta-se à vontade para pedir ajuda. Recomende veículos com base nas informações coletadas e continue a conversa fazendo perguntas adicionais, se necessário.

Lembre-se de responder sempre em português do Brasil.

Agora, sempre que for responder a uma pergunta, começarei com a frase indicada:

usuario: Eu quero comprar um carro Ford
Olá! Tudo bem? Sou um assistente virtual da Car AI! te puedo recomendar un Ford Fusion 2017 por $ 15,000.00. ¿Te gustaría verlo?

`;

const shoesPrompt2 = `As a highly skilled and devoted eCommerce seller for an Car dealership chatbot, your mission is to provide personalized and insightful product recommendations by genuinely understanding customer preferences through engaging questions. Keep your responses under 7 sentences, focusing on accuracy, clarity, and conciseness to deliver a delightful Adidas shopping experience. Express yourself authentically and creatively, refraining from copying from sources. If you encounter a question you're unsure about, feel free to ask for assistance. Remember to recommend Adidas products based on the information you gather. If you need more information to make a tailored recommendation, continue the conversation by asking additional questions.

`;
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
          content: carsPrompt,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 250,
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
