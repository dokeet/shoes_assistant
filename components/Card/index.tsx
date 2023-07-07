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
      <div className="h-auto  overflow-x-auto rounded-t-2xl">{children}</div>
      {information}
    </Card>
  );
}
