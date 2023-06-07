import React, { useState } from "react";
import Head from "next/head";
import Layout from "@/components/Layout";
import ProductsList from "@/components/ProductsList";
import Chat from "@/components/Chat";
import CarAi from "./car-ai";

export default function Home() {
  const [history, setHistory] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

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
      <Layout>
        <ProductsList
          setHistory={setHistory}
          setLoading={setLoading}
          history={history}
        />
        <Chat
          setHistory={setHistory}
          history={history}
          setLoading={setLoading}
          loading={loading}
        />
      </Layout>
    </div>
  );
}
