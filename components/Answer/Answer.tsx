import React, { useEffect, useState } from "react";
import CardImages from "components/Card";
import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import "swiper/css/navigation";
import { lowercase } from "@/utils/lowerCase";

interface AnswerProps {
  images: Array<any>;
  answer: string;
}

const AnswerComponent: React.FC<AnswerProps> = ({ images, answer }) => {
  return (
    <div className="self-start max-w-xs mt-4 w-full">
      {answer ? (
        <div className="shadow-md bg-gray-600 p-4 rounded-tl-2xl rounded-r-2xl font text-sm text-white">
          {answer}
        </div>
      ) : null}
      <div className="w-full mt-4 flex overflow-x-auto rounded-2xl">
        {images?.map((chunk: any) => {
          return (
            <CardImages
              key={chunk.id}
              className="flex flex-col w-[230px] h-auto mr-2"
              chunk={chunk}
              information={
                <div className="flex justify-center">
                  <h2 className="font-bold text-base m-2 h-12">
                    {lowercase(chunk.name)}
                  </h2>
                </div>
              }>
              <Swiper
                navigation={true}
                modules={[Navigation]}
                centeredSlides
                mousewheel={false}
                slidesPerView={1}>
                {JSON.parse(chunk?.images).map((image: string, i: number) => {
                  return (
                    <SwiperSlide key={`${image + i}`}>
                      <Image
                        width={230}
                        height={230}
                        alt={`image of ${chunk.name}`}
                        src={image}
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </CardImages>
          );
        })}
      </div>
    </div>
  );
};

export default AnswerComponent;
