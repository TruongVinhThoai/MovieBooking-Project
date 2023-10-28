import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { validatePhoneNumber } from "../utils/lib";
import { registerUser } from "../../redux/userSlice";
import {
  CodeOutlined,
  MailOutlined,
  PhoneOutlined,
  UnlockOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";

const FormRegister = () => {
  const dispatch = useDispatch();
  const { loading, user } = useSelector((state) => state.userSlice);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    dispatch(registerUser(values));
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
      name="register"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      autoComplete="off"
      onValuesChange={handleValuesChange}
    >
      <h1 className="text-lg mb-4">Sign up</h1>
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

      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
        hasFeedback
      >
        <Input prefix={<MailOutlined />} placeholder="Email..." />
      </Form.Item>

      <Form.Item
        label="Phone number"
        name="soDt"
        rules={[
          {
            required: true,
            validator: validatePhoneNumber,
            message: "Please input your phone number!",
          },
        ]}
        hasFeedback
      >
        <Input prefix={<PhoneOutlined />} placeholder="Phone..." />
      </Form.Item>

      <Form.Item
        label="Group code"
        name="maNhom"
        rules={[
          {
            required: true,
            message: "Please input your code!",
          },
        ]}
        hasFeedback
      >
        <Input prefix={<CodeOutlined />} placeholder="Group Code..." />
      </Form.Item>

      <Form.Item
        label="Name"
        name="hoTen"
        rules={[
          {
            required: true,
            message: "Please input your name!",
          },
        ]}
        hasFeedback
      >
        <Input prefix={<UserAddOutlined />} placeholder="Name..." />
      </Form.Item>
      <p className="pb-3">
        Already have an account.{" "}
        <Link className="underline" to="/login">
          Sign in
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

export default React.memo(FormRegister);
