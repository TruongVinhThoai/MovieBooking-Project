import { memo, useState } from "react";
import { Button, Popover } from "antd";
import { NavLink } from "react-router-dom";
import { capitalizeLetter } from "../../pages/utils/lib";

const AccountPopover = ({ user, handleLogIn, handleLogOut, onClose }) => {
  const [open, setOpen] = useState(false);
  const { accessToken, taiKhoan, hoTen, email } = user || {};

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  const handleHidePopover = () => {
    setOpen(false);
    onClose && onClose()
  };

  const renderBody = () => {
    return (
      <div className="z-[9999] p-2 text-md">
        <NavLink
          className="pb-2"
          to={`/profile/${taiKhoan}`}
          onClick={handleHidePopover}
        >
          Profile
        </NavLink>
        <NavLink className="block pt-2" to="/">
          <button type="button" title="Log out" onClick={handleLogOut}>
            Log out
          </button>
        </NavLink>
      </div>
    );
  };

  if (accessToken) {
    return (
      <Popover
        content={renderBody()}
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
      >
        <div className="flex items-center cursor-pointer relative w-max">
          <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full">
            <svg
              className="absolute w-12 h-12 text-gray-400 -left-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>

          <div className="ml-2 text-white">{capitalizeLetter(hoTen || email)}</div>
        </div>
      </Popover>
    );
  }
  return (
    <Button
      title="Sign in"
      onClick={handleLogIn}
      className="text-white text-md"
    >
      Sign in
    </Button>
  );
};

export default memo(AccountPopover);
