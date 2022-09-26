import { Button, Form, Input, InputNumber } from "antd";
import React from "react";
import { postApi } from "../api/commonApi";
import { Link } from "react-router-dom";


const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
  },
};
/* eslint-enable no-template-curly-in-string */

export default function Registration() {
  const onFinish = async (values) => {
    const response = await postApi("/api/user/registration", values.user);
    console.log("res", response);
    if (response.error) {
      for (let key in response.error) {
        alert(response.error[key]);
      }
    } else {
      alert(response.message);
      window.location.href = "/";
    }
  };

  return (
    <div className="registration-form">
      <h1 className="align-center">Registration Form</h1>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["user", "username"]}
          label="Username"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name={["user", "first_name"]} label="First Name">
          <Input />
        </Form.Item>
        <Form.Item name={["user", "last_name"]} label="Last Name">
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "email"]}
          label="Email"
          rules={[
            {
              type: "email",
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "password"]}
          label="Password"
          rules={[
            {
              type: "password",
              required: true,
            },
          ]}
        >
          <Input type="password" />
        </Form.Item>
        <Form.Item
          name={["user", "password_confirmation"]}
          label="Confirmation"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="password" />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <p className="align-center">Go to <Link to='/'>Login</Link> page</p>
    </div>
  );
}
