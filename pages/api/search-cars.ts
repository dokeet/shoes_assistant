import { supabaseAdmin } from "@/utils";

export const config = {
  runtime: "edge",
};
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const handler = async (req: Request): Promise<Response> => {
  try {
    const { query, matches } = (await req.json()) as {
      query: string;
      matches: number;
    };

    const input = query.replace(/\n/g, " ");

    const res = await fetch("https://api.openai.com/v1/embeddings", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      method: "POST",
      body: JSON.stringify({
        model: "text-embedding-ada-002",
        input,
      }),
    });

    const json = await res.json();
    const embedding = json.data[0].embedding;
    const { data: chunks, error } = await supabaseAdmin.rpc("pg_search_cars", {
      query_embedding: embedding,
      similarity_threshold: 0.01,
      match_count: matches,
    });
    console.log(chunks);
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