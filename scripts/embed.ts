import { PGEssay, PGJSON } from "@/types";
import { loadEnvConfig } from "@next/env";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import { Configuration, OpenAIApi } from "openai";

loadEnvConfig("");

const generateEmbeddings = async (essays: PGEssay[]) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  for (let i = 0; i < essays.length; i++) {
    const section = essays[i];

    for (let j = 0; j < section.chunks.length; j++) {
      const chunk = section.chunks[j];

      const {
        essay_title,
        essay_url,
        essay_date,
        essay_thanks,
        content,
        content_length,
        content_tokens,
      } = chunk;

      const embeddingResponse = await openai.createEmbedding({
        model: "text-embedding-ada-002",
        input: content,
      });

      const [{ embedding }] = embeddingResponse.data.data;

      const { data, error } = await supabase
        .from("pg")
        .insert({
          essay_title,
          essay_url,
          essay_date,
          essay_thanks,
          content,
          content_length,
          content_tokens,
          embedding,
        })
        .select("*");

      if (error) {
        console.log("error", error);
      } else {
        console.log("saved", i, j);
      }

      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  }
};

// (async () => {
//   const book: PGJSON = JSON.parse(fs.readFileSync("scripts/pg.json", "utf8"));

//   await generateEmbeddings(book.essays);
// })();

const generateEmbeddingsFromCsv = async (products) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    // Combine relevant fields for generating embeddings
    const inputText = `${product.name} ${product.brand} ${product.category} ${product.description}`;

    const embeddingResponse = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: inputText,
    });

    const [{ embedding }] = embeddingResponse.data.data;
    const sellingPrice =
      product.selling_price && typeof product.selling_price === "string"
        ? parseFloat(product.selling_price.replace("$", ""))
        : 0;
    const originalPrice =
      product.original_price && typeof product.original_price === "string"
        ? parseFloat(product.original_price.replace("$", ""))
        : 0;
    const { data, error } = await supabase
      .from("my_products")
      .insert({
        id: product.id,
        url: product.url,
        name: product.name,
        sku: product.sku,
        selling_price: sellingPrice,
        original_price: originalPrice,
        currency: product.currency,
        availability: product.availability,
        color: product.color,
        category: product.category,
        source: product.source,
        source_website: product.source_website,
        breadcrumbs: product.breadcrumbs,
        description: product.description,
        brand: product.brand,
        images: product.images,
        country: product.country,
        language: product.language,
        average_rating: product.average_rating,
        reviews_count: product.reviews_count,
        crawled_at: product.crawled_at,
        embedding: embedding,
      })
      .select("*");

    if (error) {
      console.log("error", error);
    } else {
      console.log("saved", i);
    }

    await new Promise((resolve) => setTimeout(resolve, 200));
  }
};

(async () => {
  const products = JSON.parse(fs.readFileSync("scripts/output.json", "utf8"));

  await generateEmbeddingsFromCsv(products);
})();
