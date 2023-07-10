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
}

const AnswerComponent: React.FC<AnswerProps> = ({ images, answer }) => {
  return (
    <div className="self-start max-w-xs mt-6 w-full">
      {answer ? (
        <div className="shadow-md bg-white p-4 rounded-tl-2xl rounded-r-2xl font text-sm">
          {answer}
        </div>
      ) : null}
      <div className="w-80 h-[300px] mt-4 flex overflow-x-auto rounded-2xl">
        <Swiper
          modules={[Pagination, Navigation]}
          pagination={{
            type: "fraction",
          }}
          slidesPerView={1.2}
          navigation={true}>
          {images?.map((chunk: any) => {
            return (
              <SwiperSlide key={chunk.id}>
                <CardImages
                  className="flex flex-col w-[230px] h-auto"
                  chunk={chunk}
                  information={
                    <div className="flex justify-center">
                      <Tooltip title={lowercase(chunk.name)}>
                        <button className="font-bold text-base cursor-default">
                          <h2 className="font-bold text-base m-2 h-6 w-[190px] overflow-hidden text-ellipsis whitespace-nowrap">
                            {lowercase(chunk.name)}
                          </h2>
                        </button>
                      </Tooltip>
                    </div>
                  }>
                  <Swiper
                    modules={[Pagination]}
                    pagination={{ clickable: true }}
                    centeredSlides
                    mousewheel={false}
                    slidesPerView={1}>
                    {JSON.parse(chunk?.images).map(
                      (image: string, i: number) => {
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
                      }
                    )}
                  </Swiper>
                </CardImages>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default AnswerComponent;
