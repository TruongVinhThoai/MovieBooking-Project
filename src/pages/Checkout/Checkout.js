import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieServ, userServ } from "../../services/Api";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  setDetailBooking,
  setBooking,
  postBooking,
  setTab,
  setTabActive,
} from "../../redux/bookingSlice";
import "../../assets/Styles/Checkout/Checkout.css";
import { CheckOutlined, CloseOutlined, UserOutlined } from "@ant-design/icons";
import _ from "lodash";
import { ThongTinDatVe } from "../../_core/model/ThongTinDatVe";
import { Tabs, message } from "antd";
import { setInfoUser } from "../../redux/userSlice";
import moment from "moment";

const Checkout = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { user } = useSelector((state) => state.userSlice);
  const navigate = useNavigate();

  const { detailBooking, DS_GheDangDat } = useSelector((state) => {
    return state.bookingSlice;
  });

  const { thongTinPhim, danhSachGhe } = detailBooking;

  useEffect(() => {
    if (user?.accessToken) {
      movieServ
        .getDetail(params.id)
        .then((res) => {
          dispatch(setDetailBooking(res.data.content));
        })
        .catch((err) => {
          throw err;
        });
    }
  }, [params.id, user?.accessToken]);

  useEffect(() => {
    if (!user?.accessToken) {
      navigate("/login");
    }
  }, [user?.accessToken]);

  const renderSeats = () => {
    {
      /* Dung optional chaining "?" hoac viet 1 model */
    }
    return danhSachGhe.map((ghe, index) => {
      let classGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
      let classGheDaDat = ghe.daDat === true ? "gheDaDat" : "";
      let classGheDangDat = "";
      let classGheDaDuocDat = "";

      if (user?.taiKhoan === ghe.taiKhoanNguoiDat) {
        classGheDaDuocDat = "gheDaDuocDat";
      }

      //Kiểm tra từng ghế render xem có trong mảng ghế đang đặt hay không
      const indexGheDD = DS_GheDangDat.findIndex(
        (gheDD) => gheDD.maGhe === ghe.maGhe
      );

      if (indexGheDD != -1) {
        classGheDaDat = "gheDangDat";
      }

      return (
        <Fragment key={index}>
          <button
            onClick={() => {
              dispatch(setBooking(ghe));
            }}
            disabled={ghe.daDat}
            className={`ghe text-center ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat}`}
          >
            {ghe.daDat ? (
              classGheDaDuocDat != "" ? (
                <UserOutlined />
              ) : (
                <CloseOutlined />
              )
            ) : (
              ghe.stt
            )}
          </button>
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };

  return (
    <div className="container mx-auto min-h-screen mt-5">
      <div className="w-full overflow-auto flex justify-center">
        <table className="w-full overflow-auto">
          <thead className="bg-gray-50 p-5">
            <tr>
              <th>Ghế chưa đặt</th>
              <th>Ghế đang đặt</th>
              <th>Ghế vip</th>
              <th>Ghế đã đặt</th>
              <th>Ghế mình đặt</th>
              <th>Ghế khách đang đặt</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="text-center">
              <td>
                <button className="ghe text-center">
                  <CheckOutlined
                    style={{ marginBottom: 7.5, fontWeight: "bold" }}
                  />
                </button>
              </td>
              <td>
                <button className="ghe gheDangDat text-center">
                  <CheckOutlined
                    style={{ marginBottom: 7.5, fontWeight: "bold" }}
                  />
                </button>
              </td>
              <td>
                <button className="ghe gheVip text-center">
                  <CheckOutlined
                    style={{ marginBottom: 7.5, fontWeight: "bold" }}
                  />
                </button>
              </td>
              <td>
                <button className="ghe gheDaDat text-center">
                  <CheckOutlined
                    style={{ marginBottom: 7.5, fontWeight: "bold" }}
                  />
                </button>
              </td>
              <td>
                <button className="ghe gheDaDuocDat text-center">
                  <CheckOutlined
                    style={{ marginBottom: 7.5, fontWeight: "bold" }}
                  />
                </button>
              </td>
              <td>
                <button className="ghe gheKhachDat text-center">
                  <CheckOutlined
                    style={{ marginBottom: 7.5, fontWeight: "bold" }}
                  />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="md:col-span-9">
        <div className="md:flex md:flex-col md:items-center md:justify-center mt-5 max-h-[500px] md:max-h-[unset] overflow-auto">
          <img
            src="https://movie-booking-project.vercel.app/img/bookticket/screen.png"
            alt=""
          />
          <div className="">{renderSeats()}</div>
        </div>
      </div>
      <div className="md:col-span-3 md:pb-0 pb-16">
        <h3 className="text-green-400 text-center text-4xl">
          {DS_GheDangDat.reduce((tongTien, ghe, index) => {
            return (tongTien += ghe.giaVe);
          }, 0)}
        </h3>
        <hr />
        {/* Dung optional chaining "?" hoac viet 1 model */}
        <h3 className="text-xl">{thongTinPhim.tenPhim}</h3>
        <p>
          Địa điểm: {thongTinPhim.tenCumRap} - {thongTinPhim.tenRap}
        </p>
        <p>
          Ngày chiếu: {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}
        </p>
        <hr />
        <div className="flex flex-row my-5">
          <div className="w-4/5">
            <span className="text-red-500 text-lg">Ghe</span>
            {_.sortBy(DS_GheDangDat, ["stt"]).map((gheDD, index) => {
              return (
                <span key={index} className="text-green-500 text-xl ml-1">
                  [{gheDD.stt}]
                </span>
              );
            })}
          </div>
          {/* <div className="text-right text-green-700 text-lg">
              
            </div> */}
        </div>
        <hr />
        <div className="my-5">
          <i>Email</i>
          <br />
          {user?.email}
        </div>
        <hr />
        <div className="my-5">
          <i>Phone</i>
          <br />
          {user?.soDT}
        </div>
        <hr />
        <div className="-mb-5 md:static fixed bottom-9 left-4 right-4">
          <div
            onClick={() => {
              if (DS_GheDangDat.length > 0) {
                const thongTinDatVe = new ThongTinDatVe();
                thongTinDatVe.maLichChieu = params.id;
                thongTinDatVe.danhSachVe = DS_GheDangDat;

                movieServ
                  .setBooking(thongTinDatVe)
                  .then((res) => {
                    message.success("Dat ve thanh cong");
                    dispatch(postBooking(res.data.content));
                  })
                  .catch((err) => {
                    throw err;
                  });

                movieServ
                  .getDetail(params.id)
                  .then((res) => {
                    dispatch(setDetailBooking(res.data.content));
                  })
                  .catch((err) => {
                    throw err;
                  });

                dispatch(setTab("2"));
              } else {
                message.error("Vui lòng chọn ít nhất một ghế");
              }
            }}
            className={`${
              DS_GheDangDat.length > 0 ? "bg-green-600" : "bg-gray-400"
            } text-white text-center w-full py-3 font-bold text-2xl cursor-pointer`}
          >
            Book
          </div>
        </div>
      </div>
    </div>
  );
};

const HistoryBooking = () => {
  const dispatch = useDispatch();

  const { infoUser, user } = useSelector((state) => state.userSlice);

  useEffect(() => {
    if (user?.accessToken) {
      userServ
        .getInfoUser()
        .then((res) => {
          dispatch(setInfoUser(res.data.content));
        })
        .catch((err) => {
          throw err;
        });
    }
  }, [user?.accessToken]);

  const renderTicketItem = () => {
    return infoUser?.thongTinDatVe?.map((item, index) => {
      const seats = _.first(item.danhSachGhe);
      return (
        <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
          <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
            <img
              alt="team"
              className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
              src={item.hinhAnh}
            />
            <div className="flex-grow">
              <h2 className="text-gray-900 title-font font-medium">
                {item.tenPhim}
              </h2>
              <p className="text-gray-500">
                Giờ chiếu: {moment(item.ngayDat).format("LT")}
              </p>
              <p className="text-gray-500">
                Ngày chiếu: {moment(item.ngayDat).format("LL")}
              </p>
              <p className="text-gray-500">Địa điểm: {seats.tenHeThongRap}</p>
              <p className="text-gray-500">
                Tên rạp: {seats.tenCumRap} - Ghế:
                {item.danhSachGhe.map((ghe, index) => {
                  return (
                    <span className="ml-2 text-black" key={index}>
                      [{ghe.tenGhe}]
                    </span>
                  );
                })}
              </p>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="p-5">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-purple-600">
              LỊCH SỬ ĐẶT VÉ KHÁCH HÀNG
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Hãy xem thông tin địa điểm, thời gian để xem phim vui vẻ bạn nhé
              !!!
            </p>
          </div>
          <div className="flex flex-wrap -m-2">{renderTicketItem()}</div>
        </div>
      </section>
    </div>
  );
};

export default function Demo() {
  // const onChange = (key) => {
  //   console.log(key);
  // };
  const dispatch = useDispatch();
  const { tabActive } = useSelector((state) => {
    return state.bookingSlice;
  });

  const items = [
    {
      key: "1",
      label: "01 CHỌN GHẾ & THANH TOÁN",
      children: Checkout(),
    },
    {
      key: "2",
      label: "02 KẾT QUẢ ĐẶT VÉ",
      children: HistoryBooking(),
    },
  ];

  const { user } = useSelector((state) => {
    return state.userSlice;
  });

  const operation = (
    <Fragment>
      {!_.isEmpty(user) ? (
        <Fragment>
          {" "}
          <button>
            <div
              style={{
                width: 50,
                height: 50,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="text-2xl ml-5 rounded-full bg-red-200"
            >
              <NavLink to={`/profile/${user?.hoTen}`}>
                {user?.taiKhoan.substr(0, 1)}
              </NavLink>
            </div>
            {user?.taiKhoan}
          </button>
        </Fragment>
      ) : (
        ""
      )}
    </Fragment>
  );
  return (
    <div className="p-5">
      <Tabs
        tabBarExtraContent={operation}
        defaultActiveKey="1"
        activeKey={tabActive}
        items={items}
        onChange={(key) => {
          dispatch(setTabActive(key));
        }}
      />
    </div>
  );
}
