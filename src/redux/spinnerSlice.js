import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

const spinnerSlice = createSlice({
  name: "spinnerSlice",
  initialState,
  reducers: {
    setLoadingON: (state, action) => {
      state.isLoading = true;
    },
    setLoadingOFF: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const { setLoadingOFF, setLoadingON } = spinnerSlice.actions;

export default spinnerSlice.reducer;
