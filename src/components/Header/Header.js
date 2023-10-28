import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { userLocalStorage } from "../../services/localStorage";
import AccountPopover from "./AccountPopover";
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";

export default function Header() {
  const { user } = useSelector((state) => state.userSlice);
  const navigation = useNavigate();
  const [isOpenMenuMobile, setOpenMenuMobile] = useState(false);

  const handleToggleMenu = () => {
    setOpenMenuMobile(!isOpenMenuMobile);
  };

  const handleLogOut = () => {
    userLocalStorage.remove();
    window.location.reload();
  };
  const handleLogIn = () => navigation("/login");

  return (
    <header className="p-4 bg-gray-800 text-gray-100 sticky top-0 z-[9999]">
      {isOpenMenuMobile && (
        <MenuMobile
          setOpen={setOpenMenuMobile}
          open={isOpenMenuMobile}
          user={user}
          handleLogIn={handleLogIn}
          handleLogOut={handleLogOut}
        />
      )}
      <div className="container flex justify-between h-16 mx-auto">
        <NavLink to={"/"} className="flex items-center p-2">
          <img
            src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png"
            alt=""
          />
        </NavLink>
        <div className="hidden lg:flex">
          <Menu />
        </div>
        <div className="items-center flex-shrink-0 hidden lg:flex">
          <AccountPopover
            handleLogOut={handleLogOut}
            user={user}
            handleLogIn={handleLogIn}
          />
        </div>
        <button className="p-4 lg:hidden" onClick={handleToggleMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-gray-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
