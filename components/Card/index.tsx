import React, { ReactNode } from "react";
import { Card } from "../ui/card";
import Image from "next/image";

interface CardImagesProps {
  chunk: any;
  information: ReactNode;
}

export default function CardImages({ chunk, information }: CardImagesProps) {
  return (
    <Card key={chunk.id} className="flex flex-col max-w-[300px] ml-3">
      <div className="h-auto overscroll-x-auto overflow-x-auto scroll-smooth overscroll-y-none flex snap-x rounded-t-md">
        {JSON.parse(chunk?.images).map((image: string, i: number) => {
          // console.log("image", image);
          return (
            <Image
              key={`${image + i}`}
              width={200}
              height={200}
              alt={`image of ${chunk.name}`}
              src={image}
              className="w-[300px] h-auto snap-center"
            />
          );
        })}
      </div>
      {information}
    </Card>
  );
}
