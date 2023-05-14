import React from "react";
import Head from "next/head";
import Layout from "@/components/Layout";
import Carousel from "@/components/Carousels";
import Chat from "@/components/Chat";
import CarAi from "./car-ai";

export default function Home() {
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
      <CarAi />
      {/* <Layout>
        <Carousel />
         <Chat /> 
      </Layout>*/}
    </div>
  );
}
