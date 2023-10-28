import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userSlice from "./redux/userSlice";
import spinnerSlice from "./redux/spinnerSlice";
import bookingSlice from "./redux/bookingSlice";
import messageSlice from "./redux/messageSlice";
import searchSlice from "./redux/searchSlice";
import ToastProvider from "./components/Message";

const root = ReactDOM.createRoot(document.getElementById("root"));
export const store = configureStore({
  // rootReducer
  reducer: {
    userSlice,
    spinnerSlice,
    bookingSlice,
    messageSlice,
    searchSlice,
  },
});
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <ToastProvider>
        <App />
      </ToastProvider>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
