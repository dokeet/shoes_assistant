import React, { useState } from "react";
import Head from "next/head";
import Layout from "@/components/Layout";
import ProductsList from "@/components/ProductsList";
import Chat from "@/components/Chat";
import { useChat } from "ai/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Home() {
  const [isProductHome, setIsProductHome] = useState(false);
  const {
    messages,
    append,
    input,
    handleInputChange,
    handleSubmit,
    isLoading: aiLoading,
  } = useChat();

  return (
    <div>
      <Head>
        <title>Not Adidas store</title>
        <meta
          name="description"
          content={`AI-powered search and chat for your adidas store`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <ProductsList append={append} setIsProductHome={setIsProductHome} />
          <Chat
            messages={messages}
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            append={append}
            isProductHome={isProductHome}
            setIsProductHome={setIsProductHome}
          />
        </Layout>
      </QueryClientProvider>
    </div>
  );
}
