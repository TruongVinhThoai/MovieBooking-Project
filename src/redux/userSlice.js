import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userLocalStorage } from "../services/localStorage";
import { https } from "../services/Config";
import { setMessage } from "./messageSlice";

const initialState = {
  user: userLocalStorage.get(),
  infoUser: {},
  loading: false,
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, { dispatch }) => {
    try {
      const response = await https.post("/QuanLyNguoiDung/DangKy", userData);
      if (response.status === 200) {
        const loginResponse = await https.post("/QuanLyNguoiDung/DangNhap", {
          taiKhoan: userData.taiKhoan,
          matKhau: userData.matKhau,
        });
        dispatch(setLogin(loginResponse.data.content));
        dispatch(
          setMessage({ message: "Tạo tài khoản thành công !", type: "success" })
        );
        userLocalStorage.set(loginResponse.data.content);
        return loginResponse.data.content;
      }
    } catch (error) {
      dispatch(
        setMessage({
          message: error.response.data.content,
          type: "error",
        })
      );
      throw error;
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData, { dispatch }) => {
    try {
      const response = await https.post("/QuanLyNguoiDung/DangNhap", userData);
      if (response.status === 200) {
        dispatch(setLogin(response.data.content));
        userLocalStorage.set(response.data.content);
        dispatch(
          setMessage({ message: "Đăng nhập thành công", type: "success" })
        );
        return response.data.content;
      }
    } catch (error) {
      dispatch(
        setMessage({
          message: error.response.data.content,
          type: "error",
        })
      );
      throw error;
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async ({profileData, user}, { dispatch }) => {
    try {
      const response = await https.put(
        "/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        profileData
      );
      if (response.status === 200) {
        const setDataUpdate = {
          ...response.data.content,
          accessToken: user.accessToken,
        };
        dispatch(setLogin(setDataUpdate));
        userLocalStorage.set(setDataUpdate);
        dispatch(
          setMessage({
            message: "Cập nhật tài khoản thành công",
            type: "success",
          })
        );
        return response.data.content;
      }
    } catch (error) {
      dispatch(
        setMessage({
          message: error.response.data.content || "Có lỗi xảy ra, vui lòng thử lại",
          type: "error",
        })
      );
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload;
      // khong can return ve object moi khi dung toolkit
    },
    setInfoUser: (state, { payload }) => {
      state.infoUser = payload;
    },
    removeLogin: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        // Handle state updates for a successful profile update
        state.loading = false;
      })
      .addCase(updateProfile.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setInfoUser, removeLogin, setLogin } = userSlice.actions;
export default userSlice.reducer;
