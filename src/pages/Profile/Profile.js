import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../redux/userSlice";
import { Button, Form, Input } from "antd";
import { validatePhoneNumber } from "../utils/lib";
import { useNavigate } from "react-router-dom";
import {
  CodeOutlined,
  FileExclamationOutlined,
  PhoneOutlined,
  UnlockOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { user, loading } = useSelector((state) => state.userSlice);
  const [isFormDirty, setIsFormDirty] = useState(false);

  const handleSubmitForm = (values) => {
    if (user?.accessToken) {
      const profileData = {
        taiKhoan: values.userName || user?.taiKhoan,
        email: values.email || user?.email,
        soDt: values.phone || user?.soDT,
        maNhom: values.groupCode || user?.maNhom,
        hoTen: values.name || user?.hoTen,
        maLoaiNguoiDung: user?.maLoaiNguoiDung,
        matKhau: values.password,
      };
      if (profileData) {
        dispatch(updateProfile({ profileData, user }));
      }
    }
  };

  useEffect(() => {
    if (!user?.accessToken) {
      navigate("/");
    }
  }, [user?.accessToken]);

  const handleValuesChange = () => {
    if (!isFormDirty) {
      setIsFormDirty(true);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-[400px] bg-white rounded-xl p-4 lg:p-10 shadow-lg">
        <Form
          form={form}
          className="w-full"
          layout="vertical"
          name="update"
          initialValues={{
            userName: user?.taiKhoan,
            email: user?.email,
            phone: user?.soDT,
            groupCode: user?.maNhom,
            name: user?.hoTen,
          }}
          onFinish={handleSubmitForm}
          autoComplete="off"
          onValuesChange={handleValuesChange}
        >
          <h1 className="text-lg mb-4">Update Profile</h1>
          <Form.Item label="Username" name="userName">
            <Input prefix={<UserOutlined />} disabled />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input prefix={<UnlockOutlined />} />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input prefix={<FileExclamationOutlined />} />
          </Form.Item>

          <Form.Item
            label="Phone number"
            name="phone"
            rules={[
              {
                required: true,
                validator: validatePhoneNumber,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input prefix={<PhoneOutlined />} />
          </Form.Item>

          <Form.Item label="Group code" name="groupCode">
            <Input prefix={<CodeOutlined />} />
          </Form.Item>

          <Form.Item label="Name" name="name">
            <Input prefix={<UserAddOutlined />} />
          </Form.Item>

          <Form.Item>
            <Button
              className="bg-orange-400 hover:bg-orange-500 !border-white disabled:!text-gray-800 !text-white ml-auto"
              htmlType="submit"
              disabled={!isFormDirty || loading}
              loading={loading}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
