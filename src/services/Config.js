import axios from "axios";
import { userLocalStorage } from "./localStorage";
import { store } from "..";
import { setLoadingOFF, setLoadingON } from "../redux/spinnerSlice";
import { setMessage } from "../redux/messageSlice";

export const TOKEN_CYBER =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAwOCIsIkhldEhhblN0cmluZyI6IjA3LzAzLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcwOTc2OTYwMDAwMCIsIm5iZiI6MTY4Njc2MjAwMCwiZXhwIjoxNzA5OTE3MjAwfQ.KMixzquIcyG1HcsZ_iekv3cHfqWMebGVfzp349mNosg";

export const configHeaders = () => {
  return {
    TokenCybersoft: TOKEN_CYBER,
  };
};
export const BASE_URL = "https://movienew.cybersoft.edu.vn/api";
export const GROUPID = "GP12";

// axios instance
export const https = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    TokenCybersoft: TOKEN_CYBER,
  },
  // accessToken
});

export const USER_LOGIN = "USER_LOGIN";

// Add a request interceptor
https.interceptors.request.use(
  function (config) {
    store.dispatch(setLoadingON());

    // Add Authorization header if access token exists in local storage
    const accessToken = userLocalStorage.get()?.accessToken;
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
https.interceptors.response.use(
  function (response) {
    store.dispatch(setLoadingOFF());
    return response;
  },
  function (error) {
    // store.dispatch(setLoadingOFF());

    if (error.response && error.response.status === 401) {
      // Token expired or unauthorized, redirect to login page
      store.dispatch(
        setMessage({
          message: "Token is expired! Please login again..",
          type: "error",
        })
      );
      window.location.href("/login");
    }

    // Any status codes that fall outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
