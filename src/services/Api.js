import { GROUPID, https } from "./Config";
import { ThongTinDatVe } from "../_core/model/ThongTinDatVe";

export let movieServ = {
  // Lay chi tiet phong ve
  getDetail: (id) => {
    return https.get(`/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`);
  },
  setBooking: (values = new ThongTinDatVe()) => {
    return https.post(`/QuanLyDatVe/DatVe`, values);
  },
  getDataSlider: () => {
    return https.get(`/QuanLyPhim/LayDanhSachBanner`);
  },
  getListMovie: () => {
    return https.get(`/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`);
  },
  getMovieByTheater: () => {
    return https.get(
      `/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`
    );
  },
  getDetailMovie: (id) => {
    return https.get(`/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`);
  },
  getInfoMovie: (id) => {
    return https.get(`/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`);
  },
};

export let userServ = {
  getInfoUser: () => {
    return https.post("/QuanLyNguoiDung/ThongTinTaiKhoan");
  },
};
