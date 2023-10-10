import React, { useState } from "react";
import Image from "next/image";
import CardImages from "../Card";
import { lowercase } from "@/utils/lowerCase";
import { Message, CreateMessage } from "ai/react";
import { useQuery } from "@tanstack/react-query";
import { baseURL } from "@/utils/baseURL";

interface ProductsListProps {
  append: (message: Message | CreateMessage) => Promise<string>;
  isStreamDone: boolean;
}

const ProductsList: React.FC<ProductsListProps> = ({
  append,
  isStreamDone,
}) => {
  // append the selected product into messages
  const handleClick = async (productName) => {
    await append({
      role: "user",
      content: `I would like to know about ${lowercase(productName)}`,
    });
  };

  const getRecomendations = async () => {
    const searchResponse = await fetch(`${baseURL}/api/shoes`);
    if (!searchResponse.ok) {
      throw new Error(searchResponse.statusText);
    }
    const results = await searchResponse.json();
    return results;
  };

  const { data: shoes } = useQuery({
    queryKey: ["getRecomendations"],
    queryFn: getRecomendations,
    refetchOnWindowFocus: false,
    enabled: !isStreamDone,
  });

  return (
    <div className="overflow-y-auto m-1 flex flex-wrap w-2/3 justify-center">
      {shoes?.map((item) => {
        return (
          <button
            className="m-2"
            key={item.id}
            onClick={() => handleClick(item.name)}>
            <CardImages
              chunk={item}
              className="flex flex-col w-[250px] h-auto"
              information={
                <div className="flex justify-center">
                  <h2 className="font-bold text-base m-2 h-12">
                    {lowercase(item.name)}
                  </h2>
                </div>
              }>
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
