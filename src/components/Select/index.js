// SelectCustom.jsx
import React, { memo, useEffect, useState } from "react";
import { Select } from "antd";
import { formattedDate, formattedTime } from "../../pages/utils/lib";
import { useSelector } from "react-redux";

const SelectCustom = ({
  isShowSearch,
  placeholder,
  data,
  className,
  onSelect,
  isMovieSelect,
  isTheaterSelect,
  isShowTimeSelect,
  disabled,
}) => {
  const [options, setOptions] = useState([]);
  const selectedTheater = useSelector((state) => state.searchSlice.theaterId);

  useEffect(() => {
    if (isMovieSelect) {
      setOptions(mapMovieOptions(data));
    } else if (isTheaterSelect) {
      setOptions(mapTheaterOptions(data));
    } else if (isShowTimeSelect) {
      setOptions(mapShowtimeOptions(data, selectedTheater));
    } else {
      setOptions(mapShowtimeDetailOptions(data, selectedTheater));
    }
  }, [data, isMovieSelect, isTheaterSelect, isShowTimeSelect, selectedTheater]);

  const mapMovieOptions = (data) => {
    return data.map((item) => ({
      value: item.maPhim,
      label: item.tenPhim,
    }));
  };

  const mapTheaterOptions = (data) => {
    return data?.flatMap((item) =>
      item?.cumRapChieu?.flatMap((data) => ({
        value: data.maCumRap,
        label: data.tenCumRap,
      }))
    );
  };

  const mapShowtimeOptions = (data, selectedTheater) => {
    const options = [];

    data?.forEach((item) => {
      item?.cumRapChieu?.forEach((data) => {
        if (data?.maCumRap === selectedTheater) {
          options.push(
            ...data?.lichChieuPhim?.map((data) => ({
              value: data?.maLichChieu,
              label: formattedDate(data?.ngayChieuGioChieu),
            }))
          );
        }
      });
    });

    return options;
  };

  const mapShowtimeDetailOptions = (data, selectedShowtime) => {
    const options = [];

    data?.forEach((item) => {
      item?.cumRapChieu?.forEach((data) => {
        if (data?.maCumRap === selectedShowtime) {
          options.push(
            ...data?.lichChieuPhim?.map((data) => ({
              value: data?.maLichChieu,
              label:
                data?.tenRap + " - " + formattedTime(data?.ngayChieuGioChieu),
            }))
          );
        }
      });
    });

    return options;
  };

  if (!data) {
    return (
      <Select
        className={className}
        showSearch={isShowSearch}
        placeholder={placeholder || "Search movie"}
        disabled={disabled}
      />
    );
  }

  return (
    <Select
      className={className}
      disabled={disabled}
      showSearch={isShowSearch}
      placeholder={placeholder || "Search to Select"}
      optionFilterProp="label"
      filterOption={(input, option) =>
        option.label.toLowerCase().includes(input.toLowerCase())
      }
      options={options}
      onChange={(selectedValue, selectedOption) => {
        const selectedObject = {
          value: selectedValue,
          label: selectedOption?.label || "",
        };

        // If you have a callback function, you can invoke it with the selected object
        onSelect && onSelect(selectedObject);
      }}
    />
  );
};

export default memo(SelectCustom);
