import React, { useState } from "react";
import endent from "endent";
import { shoes } from "utils/mock";
import Image from "next/image";
import CardImages from "../Card";

interface ProductsListProps {
  setHistory: (e: any) => void;
  setLoading: (a: boolean) => void;
  history: any;
}

const ProductsList: React.FC<ProductsListProps> = ({
  setHistory,
  setLoading,
  history,
}) => {
  const handleAnswer = async (query: any) => {
    setHistory((prevHistory: any) => [
      ...prevHistory,
      {
        role: "user",
        content: query,
        chunks: [],
      },
    ]);

    setLoading(true);
    //  chatContainerRef.current?.scrollIntoView({ behavior: "smooth" });

    // search conincidences
    const searchResponse = await fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, matches: 12 }),
    });
    if (!searchResponse.ok) {
      setLoading(false);
      throw new Error(searchResponse.statusText);
    }

    const results = await searchResponse.json();
    // console.log(results);
    console.log("results", results);

    const prompt = endent`
 Based on previous messages: ${history.map((item) => {
   return `\n ${item.role}: ${item.content}`;
 })} let's recommend a shoe to our client: "${query}"
      ${results
        ?.map((d: any) => {
          let accordionsString = "";
          let accordions = [];
          try {
            accordions = JSON.parse(d.accordions);
          } catch (e) {
            console.log(e);
            accordions = [];
          }

          if (accordions && accordions.length > 0) {
            accordions.forEach((accordion: any) => {
              accordionsString += `\n${accordion.title}:`;
              accordion.content.forEach((contentItem: string) => {
                accordionsString += `\n  - ${contentItem}`;
              });
            });
          }
          const lines = accordionsString.split("\n");
          console.log("accordions", accordions);
          const filteredLines = lines.filter(
            (line: string) => !line.startsWith("  - Color del artículo")
          );
          const filteredDetailsContent = filteredLines.join("\n");
          // console.log("filteredDetailsContent", filteredDetailsContent);
          return `name: ${d.name} color: ${d.color.split("/")[0]}  category: ${
            d.category
          } | ${filteredDetailsContent}`;
        })
        .join("\n\n")}
      `;

    // console.log("propmt2", prompt2);
    // console.log("prompt", prompt);
    //AI answers
    const answerResponse = await fetch("/api/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!answerResponse.ok) {
      setLoading(false);
      throw new Error(answerResponse.statusText);
    }

    const data = answerResponse.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let answer = "";
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      answer += chunkValue;

      if (done) {
        setHistory((prevHistory: any) => [
          ...prevHistory,
          {
            role: "addidasChatBot",
            content: answer,
            chunks: results,
          },
        ]);
      }
    }
    //  chatContainerRef.current?.scrollIntoView({ behavior: "smooth" });

    setLoading(false);

    //  inputRef.current?.focus();
  };

  return (
    <div className="overflow-y-auto m-1 flex flex-wrap w-2/3 justify-center">
      {shoes.map((item) => {
        return (
          <button
            className="m-2"
            key={item.id}
            onClick={() => handleAnswer(item.name)}
          >
            <CardImages
              chunk={item}
              className="flex flex-col w-[250px] h-auto"
              information={
                <div className="flex justify-center">
                  <h2 className="font-bold text-base m-2 h-12">{item.name}</h2>
                </div>
              }
            >
              <Image
                key={`${item.id}`}
                width={250}
                height={250}
                alt={`image of ${item.name}`}
                src={item.images}
              />
            </CardImages>
          </button>
        );
      })}
    </div>
  );
};

export default ProductsList;
