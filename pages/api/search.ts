import { supabaseAdmin } from "@/utils";
import { Configuration, OpenAIApi } from "openai-edge";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const config = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export const runtime = "edge";

const handler = async (req: Request): Promise<Response> => {
  try {
    const { query, matches } = (await req.json()) as {
      query: string;
      matches: number;
    };

    const input = query.replace(/\n/g, " ");

    const embeddingResponse = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input,
    });

    const json = await embeddingResponse.json();
    const embedding = json.data[0].embedding;
    const { data: chunks, error } = await supabaseAdmin.rpc(
      "pg_search_adidas",
      {
        query_embedding: embedding,
        similarity_threshold: 0.01,
        match_count: matches,
      }
    );

    if (error) {
      console.error(error);
      return new Response("Error", { status: 500 });
    }

    return new Response(JSON.stringify(chunks), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
};

export default handler;
