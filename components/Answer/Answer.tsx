import React, { useEffect, useState } from "react";
import CardImages from "components/Card";
import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import {
  IconArrowRight,
  IconExternalLink,
  IconSearch,
} from "@tabler/icons-react";

interface AnswerProps {
  images: Array<any>;
  answer: string;
}

const AnswerComponent: React.FC<AnswerProps> = ({ images, answer }) => {
  // console.log("images", images);
  return (
    <>
      <div className="my-4">
        <div className="border-blue-500 p-4 rounded-bl-2xl rounded-r-2xl border-2">
          {answer}
        </div>
        <div className="w-full mt-4">
          <Swiper
            navigation={true}
            modules={[Navigation]}
            centeredSlides
            slidesPerView={1}
          >
            {images?.map((chunk: any) => {
              // console.log("chunk", chunk);
              return (
                <SwiperSlide key={chunk.id}>
                  <CardImages chunk={chunk} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default AnswerComponent;
