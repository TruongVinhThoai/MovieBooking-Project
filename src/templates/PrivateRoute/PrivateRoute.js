import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { userLocalStorage } from "../../services/localStorage";

export default function PrivateRoute({ children }) {
  const user = userLocalStorage.get();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // If user is logged in, redirect away from the login page
      if (pathname === "/login" || pathname === "/register") {
        navigate("/");
      }
    } else {
      // If user is not logged in, redirect to the login page
      if (pathname !== "/register") {
        navigate("/login");
      }
    }
  }, [user, pathname, navigate]);

  return <>{children}</>;
}
