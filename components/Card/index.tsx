import React, { ReactNode } from "react";
import { Card } from "../ui/card";

interface CardImagesProps {
  chunk: any;
  information: ReactNode;
  children: ReactNode;
  className: string;
}

export default function CardImages({
  chunk,
  information,
  children,
  className,
}: CardImagesProps) {
  return (
    <Card key={chunk.id} className={className}>
      <div className="h-auto overscroll-x-auto overflow-x-auto scroll-smooth overscroll-y-none flex snap-x rounded-t-md">
        {children}
      </div>
      {information}
    </Card>
  );
}
