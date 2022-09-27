import React from "react";
// import { useCookies } from "react-cookie";
// import { useHistory } from "react-router-dom";
import { postApi } from "../api/commonApi";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import "antd/dist/antd.css";
import "../css/Common.css";
import { Link } from "react-router-dom";

export default function Login() {
  const onFinish = async (values) => {
    const data = {
      client_id: process.env.REACT_APP_CLIENT_ID,
      grant_type: process.env.REACT_APP_GRANT_TYPE,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
      username: values.username,
      password: values.password,
    };

    const response = await postApi("/oauth/token", data);

    if (response.error) {
      alert(response.message);
    } else {
      localStorage.setItem(
        "access_token",
        JSON.stringify(response.access_token)
      );
      localStorage.setItem("email", JSON.stringify(values.username));
      window.location.href = "/";
    }
  };

  return (
    <div className="login-container">
      <div className="center">
        <h1>Product Management Software</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            <br />
            <br /> Not a member? <Link to="/registration"> register now!</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
