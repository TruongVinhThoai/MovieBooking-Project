import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/userSlice";
import { UnlockOutlined, UserOutlined } from "@ant-design/icons";

const FormLogin = () => {
  const dispatch = useDispatch();
  const { loading, user } = useSelector((state) => state.userSlice);
  const navigate = useNavigate();

  const [isFormDirty, setIsFormDirty] = useState(false);

  const onFinish = (values) => {
    const { taiKhoan, matKhau } = values || {};
    const data = { taiKhoan, matKhau };
    dispatch(loginUser(data));
  };

  const handleValuesChange = () => {
    if (!isFormDirty) {
      setIsFormDirty(true);
    }
  };

  useEffect(() => {
    if (user?.accessToken) {
      navigate("/");
    }
  }, [user?.accessToken]);

  return (
    <Form
      className="w-full"
      layout="vertical"
      name="login"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      autoComplete="off"
      onValuesChange={handleValuesChange}
    >
      <h1 className="text-lg mb-4">Login</h1>
      <Form.Item
        label="Username"
        name="taiKhoan"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
        hasFeedback
      >
        <Input prefix={<UserOutlined />} placeholder="Username..." />
      </Form.Item>

      <Form.Item
        label="Password"
        name="matKhau"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password prefix={<UnlockOutlined />} placeholder="Password..." />
      </Form.Item>
      <p className="pb-3">
        Don't have an account?{" "}
        <Link className="underline" to="/register">
          Sign up
        </Link>
      </p>

      <Form.Item>
        <Button
          className="bg-orange-400 hover:bg-orange-500 !border-white !text-white ml-auto disabled:!text-gray-800"
          htmlType="submit"
          disabled={!isFormDirty || loading}
          loading={loading}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default React.memo(FormLogin);
