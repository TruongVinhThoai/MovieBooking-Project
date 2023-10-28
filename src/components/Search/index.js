import { Button } from "antd";
import React, { memo, useEffect, useState } from "react";
import SelectCustom from "../Select";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovies,
  fetchShowtimeData,
  setMovie,
  setShowtime,
  setShowtimeDate,
  setTheaterId,
} from "../../redux/searchSlice";
import { useNavigate } from "react-router-dom";

const SearchSection = () => {
  const dispatch = useDispatch();
  const { movieList, showtimeData, movie } = useSelector(
    (state) => state.searchSlice
  );

  const navigate = useNavigate();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [selectedShowtimeDate, setSelectedShowtimeDate] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);

  const handleSelectMovie = (selectedValue) => {
    setSelectedMovie(selectedValue.value);
    setSelectedTheater(null);
    setSelectedShowtimeDate(null);
    setSelectedShowtime(null);
    dispatch(setMovie(selectedValue.value));
  };

  const handleSelectTheater = (selectedOption) => {
    setSelectedTheater(selectedOption.value);
    setSelectedShowtimeDate(null);
    setSelectedShowtime(null);
    dispatch(setTheaterId(selectedOption.value));
  };

  const handleSelectShowtimeDate = (selectedOption) => {
    setSelectedShowtimeDate(selectedOption.value);
    setSelectedShowtime(null);
    dispatch(setShowtimeDate(selectedOption.value));
  };

  const handleSelectShowtime = (selectedOption) => {
    setSelectedShowtime(selectedOption.value);
    dispatch(setShowtime(selectedOption.value));
  };

  const handleGoToCheckout = () => {
    navigate(`/checkout/${selectedShowtime}`);
  };

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  useEffect(() => {
    if (movie) {
      dispatch(fetchShowtimeData({ id: movie }));
    }
  }, [dispatch, movie]);

  const isMovieSelected = Boolean(selectedMovie);

  return (
    <section className="search-sec">
      <div className="container mx-auto">
        <form action="#" method="post" noValidate="novalidate">
          <div className="flex flex-wrap">
            <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 p-2">
              <SelectCustom
                className="form-select search-slt"
                isShowSearch
                data={movieList}
                onSelect={handleSelectMovie}
                isMovieSelect
                placeholder="Tìm phim..."
              />
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 p-2">
              <SelectCustom
                className="form-select search-slt"
                data={showtimeData?.heThongRapChieu}
                onSelect={handleSelectTheater}
                isTheaterSelect
                placeholder="Rạp"
                disabled={!isMovieSelected}
              />
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 p-2">
              <SelectCustom
                className="form-select search-slt"
                data={showtimeData?.heThongRapChieu}
                onSelect={handleSelectShowtimeDate}
                isShowTimeSelect
                placeholder="Ngày xem"
                disabled={!isMovieSelected || !selectedTheater}
              />
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 p-2">
              <SelectCustom
                className="form-select search-slt"
                placeholder="Suất chiếu"
                data={showtimeData?.heThongRapChieu}
                onSelect={handleSelectShowtime}
                disabled={
                  !isMovieSelected || !selectedTheater || !selectedShowtimeDate
                }
              />
            </div>
            <div className="w-full sm:w-full md:w-1/4 lg:w-1/6 p-2">
              <Button
                onClick={handleGoToCheckout}
                type="button"
                className="wrn-btn hover:bg-orange-500 bg-orange-500 transition disabled:bg-slate-700 "
                disabled={
                  !isMovieSelected ||
                  !selectedTheater ||
                  !selectedShowtimeDate ||
                  !selectedShowtime
                }
              >
                Mua Ve Ngay
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default memo(SearchSection);
