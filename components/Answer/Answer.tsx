import React, { useEffect, useState } from "react";
import CardImages from "components/Card";
import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { lowercase } from "@/utils/lowerCase";
import Tooltip from "../ui/tooltip";

interface AnswerProps {
  images: Array<any>;
  answer: string;
  isStreamDone: boolean;
}

const AnswerComponent: React.FC<AnswerProps> = ({
  images,
  answer,
  isStreamDone,
}) => {
  return (
    <div className="self-start max-w-xs mt-6 w-full">
      {answer ? (
        <div className="shadow-md bg-white p-4 rounded-tl-2xl rounded-r-2xl font text-sm">
          {answer}
        </div>
      ) : null}
    </div>
  );
};

export default AnswerComponent;
