import React, { useEffect, useState } from "react";
import { movieServ } from "../../../services/Api";
import { Tabs } from "antd";
import moment from "moment/moment";
import { Element } from "react-scroll";
import { NavLink } from "react-router-dom";

const onChange = (key) => {
  console.log(key);
};

export default function TabMovie() {
  const [DS_HeThongRap, setDS_HeThongRap] = useState([]);
  useEffect(() => {
    movieServ
      .getMovieByTheater()
      .then((res) => {
        // console.log(res);
        setDS_HeThongRap(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let renderDsPhim = (dsPhim) => {
    return dsPhim.map((phim) => {
      return (
        <Element
          name="cumrap"
          id="cumrap"
          key={
            phim.id ||
            phim.tentPhim + Math.floor(Math.random() * 1000 + 1).toString()
          }
          className="flex space-x-5 p-3 items-center w-max lg:w-auto"
        >
          <img src={phim.hinhAnh} className="w-20 h-32 object-cover" alt="" />
          <div>
            <p>{phim.tenPhim}</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {phim.lstLichChieuTheoPhim.slice(0, 7).map((lichchieu) => {
                return (
                  <NavLink
                    to={`/checkout/${lichchieu.maLichChieu}`}
                    className="bg-red-500 text-white rounded shadow px-1 py-2"
                  >
                    <span
                      key={
                        lichchieu +
                        Math.floor(Math.random() * 1000 + 1).toString()
                      }
                    >
                      {moment(lichchieu).format("HH:MM - ll")}
                    </span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </Element>
      );
    });
  };

  let handleHeThongRap = () => {
    return DS_HeThongRap.map((heThongRap, index) => {
      return {
        key: index,
        label: <img className="w-16" src={heThongRap.logo} alt="" />,
        children: (
          <Tabs
            style={{ height: 500 }}
            tabPosition="left"
            items={heThongRap.lstCumRap.map((cumRap) => {
              return {
                key: cumRap.tenCumRap,
                label: (
                  <div className="text-left w-96 whitespace-normal">
                    <p className="text-green-500 font-medium">
                      {cumRap.tenCumRap}
                    </p>
                    <p>{cumRap.diaChi}</p>
                  </div>
                ),
                children: (
                  <div style={{ height: 500, overflow: "scroll" }}>
                    {renderDsPhim(cumRap.danhSachPhim)}
                  </div>
                ),
              };
            })}
          />
        ),
      };
    });
  };

  return (
    <div className="container shadow-3 lg:py-12 py-8 rounded border-2 border-l-black mx-auto">
      <Tabs
        style={{ height: 500 }}
        tabPosition="left"
        defaultActiveKey="1"
        items={handleHeThongRap()}
        onChange={onChange}
      />
    </div>
  );
}
