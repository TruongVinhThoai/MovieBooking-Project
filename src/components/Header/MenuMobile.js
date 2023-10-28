import React from "react";
import { Drawer, theme } from "antd";
import Menu from "./Menu";
import { CloseOutlined } from "@ant-design/icons";
import AccountPopover from "./AccountPopover";

const MenuMobile = ({ setOpen, open, handleLogOut, handleLogIn, user }) => {
  const { token } = theme.useToken();

  const onClose = () => {
    setOpen(false);
  };

  const containerStyle = {
    position: "fixed",
    top: 0,
    right: 0,
    width: "100%",
    height: "100vh",
    padding: 48,
    overflow: "hidden",
    textAlign: "center",
    background: token.colorFillAlter,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  return (
    <div style={containerStyle}>
      <Drawer
        placement="right"
        onClose={onClose}
        open={open}
        className="!bg-gray-800 !absolute !z-[9999]"
        closeIcon={false}
      >
        <div
          className="h-8 p-2 w-8 rounded-full hover:bg-slate-500 bg-slate-600 flex justify-center items-center absolute top-6 right-6"
          onClick={onClose}
        >
          <CloseOutlined className="text-white" />
        </div>
        <Menu onClose={onClose} />
        <AccountPopover
          user={user}
          handleLogIn={handleLogIn}
          handleLogOut={handleLogOut}
          onClose={onClose}
        />
      </Drawer>
    </div>
  );
};

export default MenuMobile;
