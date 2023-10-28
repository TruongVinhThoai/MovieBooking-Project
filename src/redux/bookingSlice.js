import { createSlice } from "@reduxjs/toolkit";
import { ThongTinLichChieu } from "../_core/model/ThongTinPhongVe";

const initialState = {
  detailBooking: new ThongTinLichChieu(),
  DS_GheDangDat: [],
  tabActive: "1",
};

const bookingSlice = createSlice({
  name: "bookingSlice",
  initialState,
  reducers: {
    setDetailBooking: (state, { payload }) => {
      state.detailBooking = payload;
    },
    setBooking: (state, { payload }) => {
      // Cap nhat danh sach ghe dang dat
      let DS_GheCapNhat = [...state.DS_GheDangDat];
      let index = DS_GheCapNhat.findIndex((gheDD) => gheDD.maGhe === payload.maGhe);

      if (index !== -1) {
        // Neu tim thay ghe duoc chon trong mang co nghia la truoc do da co click vao r => xoa
        DS_GheCapNhat.splice(index, 1);
      } else {
        DS_GheCapNhat.push(payload);
      }

      // Cap nhat giaVe
      let giaVe = DS_GheCapNhat.reduce((total, ghe) => total + ghe.giaVe, 0);

      state.DS_GheDangDat = DS_GheCapNhat;
      state.detailBooking.giaVe = giaVe;
    },
    postBooking: (state, { payload }) => {
      state.DS_GheDangDat = [];
    },
    setTab: (state, { payload }) => {
      state.tabActive = payload;
    },
    setTabActive: (state, { payload }) => {
      state.tabActive = payload;
    },
  },
});

export const {
  setDetailBooking,
  setBooking,
  postBooking,
  setTab,
  setTabActive,
} = bookingSlice.actions;

export default bookingSlice.reducer;
