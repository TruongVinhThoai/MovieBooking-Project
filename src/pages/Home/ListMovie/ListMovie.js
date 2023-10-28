import React, { useEffect, useState } from "react";
import { movieServ } from "../../../services/Api";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { A11y, Grid, Navigation, Pagination } from "swiper/modules";
import { NavLink } from "react-router-dom";
import { Element } from "react-scroll";

export default function ListMovie() {
  const [movieArr, setMovieArr] = useState([]);
  useEffect(() => {
    movieServ
      .getListMovie()
      .then((res) => {
        setMovieArr(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Element
      name="lichchieu"
      id="lichchieu"
      className="text-gray-600 body-font"
    >
      <div className="container px-5 lg:py-12 py-8 mx-auto">
        <Swiper
          slidesPerView={3}
          grid={{
            rows: 2,
            fill: "row",
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 40,
              grid: { rows: 1 },
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
          }}
          spaceBetween={10}
          modules={[Grid, Navigation, Pagination, A11y]}
          navigation
        >
          <div className="flex flex-wrap">
            <div className="flex flex-wrap">
              {movieArr.map((item, index) => (
                <SwiperSlide
                  key={index}
                  className="relative overflow-hidden group h-auto w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2"
                >
                  <div className="h-full border-2 flex flex-col border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                    <div className="h-0 relative pb-[100%]">
                      <img
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        src={item.hinhAnh}
                        alt="blog"
                      />
                    </div>
                    <div className="p-6 relative flex-1 flex flex-col justify-between">
                      <div className="flex flex-col">
                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                          {item.maPhim}
                        </h2>
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                          {item.tenPhim}
                        </h1>
                        <p className="leading-relaxed mb-3 line-clamp-4">
                          {item.moTa}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <a className="text-indigo-500 inline-flex items-center">
                          Learn More
                          <svg
                            className="w-4 h-4 ml-2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14" />
                            <path d="M12 5l7 7-7 7" />
                          </svg>
                        </a>
                        <span className="text-gray-400 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                          <svg
                            className="w-4 h-4 mr-1"
                            stroke="currentColor"
                            strokeWidth={2}
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            viewBox="0 0 24 24"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx={12} cy={12} r={3} />
                          </svg>
                          1.2K
                        </span>
                        <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                          <svg
                            className="w-4 h-4 mr-1"
                            stroke="currentColor"
                            strokeWidth={2}
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            viewBox="0 0 24 24"
                          >
                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                          </svg>
                          6
                        </span>
                      </div>
                    </div>
                    <div className="absolute h-full w-full bg-black/75 flex items-center justify-center scale-0 left-0 bottom-0 right-0 z-[1] opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 rounded-lg border-solid border-2 border-orange-500">
                      <div className="absolute -translate-y-1/2 top-1/2 text-center transition-all w-[60%] md:w-[80%]">
                        <NavLink to={`/movie/${item.maPhim}`}>
                          <button className="hover:text-white text-orange-500 bg-transparent transition border border-orange-500 py-6 uppercase text-lg md:text-xl w-full rounded hover:bg-orange-500">
                            Book Now
                          </button>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </div>
          </div>
        </Swiper>
      </div>
    </Element>
  );
}
