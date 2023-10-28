import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GROUPID, https } from "../services/Config";

export const fetchMovies = createAsyncThunk("search/fetchMovies", async () => {
  try {
    const response = await https.get(
      `/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`
    );
    return response.data.content;
  } catch (error) {
    throw error;
  }
});
export const fetchShowtimeData = createAsyncThunk(
  "search/fetchShowtimeData",
  async ({ id }) => {
    try {
      const response = await https.get(
        `/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`
      );
      return response.data.content;
    } catch (error) {
      throw error;
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    movieList: [],
    showtimeData: {},
    theaterId: "",
    showtime: "",
    movie: "",
    showtimeDate: "",
    loading: false,
    error: null,
  },
  reducers: {
    setTheaterId: (state, action) => {
      state.theaterId = action.payload;
    },
    setShowtime: (state, action) => {
      state.showtime = action.payload;
    },
    setMovie: (state, action) => {
      state.movie = action.payload;
    },
    setShowtimeDate: (state, action) => {
      state.showtimeDate = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movieList = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchShowtimeData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchShowtimeData.fulfilled, (state, action) => {
        state.loading = false;
        state.showtimeData = action.payload;
      })
      .addCase(fetchShowtimeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setTheaterId, setShowtime, setShowtimeDate, setMovie } = searchSlice.actions;

export default searchSlice.reducer;
