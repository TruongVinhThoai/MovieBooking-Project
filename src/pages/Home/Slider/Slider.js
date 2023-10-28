import { message } from "antd";
import React, { useEffect, useState } from "react";
import { movieServ } from "../../../services/Api";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectFade,
} from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Slider() {
  const [banners, setBanner] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await movieServ.getDataSlider();
        setBanner(response.data.content);
      } catch {
        message.error("Da co loi xay ra");
      }
    };
    fetchData();
  }, []);

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade, Autoplay]}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      loop
      spaceBetween={10}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
    >
      {banners.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <div className=" sm:h-64 md:h-full lg:h-full xl:h-200">
              <img
                alt="slider image"
                src={item.hinhAnh}
                key={index}
                className=" object-cover w-full h-full"
              />
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
