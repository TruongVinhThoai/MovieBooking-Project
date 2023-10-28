import React from "react";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

export default function Spinner() {
  let { isLoading } = useSelector((state) => state.spinnerSlice);
  return isLoading ? (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 10,
      }}
    >
      <ClipLoader
        color="rgba(89, 255, 0, 1)"
        cssOverride={{}}
        loading
        speedMultiplier={2}
      />
    </div>
  ) : (
    <></>
  );
}
