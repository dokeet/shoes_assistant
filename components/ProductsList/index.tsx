import React from "react";
import { shoes } from "utils/mock";
import Image from "next/image";
import CardImages from "../Card";
import { lowercase } from "@/utils/lowerCase";
import { Message, CreateMessage } from "ai/react";

interface ProductsListProps {
  append: (message: Message | CreateMessage) => Promise<string>;
  setIsProductHome: (a: boolean) => void;
}

const ProductsList: React.FC<ProductsListProps> = ({
  append,
  setIsProductHome,
}) => {
  // append the selected product into messages
  const handleClick = async (productName) => {
    await append({
      role: "user",
      content: `I would like to know about ${lowercase(productName)}`,
    });
  };

  return (
    <div className="overflow-y-auto m-1 flex flex-wrap w-2/3 justify-center">
      {shoes.map((item) => {
        return (
          <button
            className="m-2"
            key={item.id}
            onClick={() => {
              setIsProductHome(true);
              return handleClick(item.name);
            }}>
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
