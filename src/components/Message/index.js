import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../../redux/messageSlice";
import { message } from "antd";

export default function ToastProvider({ children }) {
  const dispatch = useDispatch();

  const mess = useSelector((state) => state.messageSlice.message);
  const { type } = useSelector((state) => state.messageSlice);
  const timerRef = useRef();

  useEffect(() => {
    if (mess) {
      timerRef.current = setTimeout(() => dispatch(clearMessage()), 3000);
    }

    return () => {
      // Clear the timeout when the component unmounts
      clearTimeout(timerRef.current);
    };
  }, [dispatch, mess]);

  useEffect(() => {
    if (mess) {
      message[type || "success"](mess);
    }
  }, [mess]);

  return <>{children}</>;
}
