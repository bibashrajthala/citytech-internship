import React, { useState } from "react";

// import { ReactComponent as Logo } from "../../assets/svgs/siderLogo.svg";

import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const onFinish = async (formData) => {
    try {
      console.log("user form data:", formData);

      const response = await axios.post(
        "https://jp-dev.cityremit.global/web-api//config/v1/auths/login",
        formData
      );
      // console.log(response.data.data[0].jwt_token);

      localStorage.setItem("accessToken", response.data.data[0].jwt_token);

      navigate("/dashboard");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Authentication Failed");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div
      className="loginForm__container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Form
        name="basic"
        layout="vertical"
        className="login-form"
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{
          backgroundColor: "#fff",
          padding: "1rem",
          borderRadius: "5px",
          width: "25rem",
        }}
      >
        {errorMessage && (
          <div
            style={{
              width: "100%",
              height: "20px",
              color: "red",
              backgroundColor: "#f06957",
              marginBottom: "10px",
            }}
          >
            {errorMessage}
          </div>
        )}

        <div style={{ marginBottom: "10px" }}>
          <img
            src="https://jp-dev.cityremit.global/static/media/city-express-logo.f913d3a8.png"
            alt="Logo"
            width={80}
            height={30}
          />
        </div>
        <Form.Item
          label="Email"
          name="login_id"
          rules={[{ required: true, message: "Please input your username!" }]}
          labelAlign="left"
          className="loginForm__item"
        >
          <Input
            size="large"
            className="loginForm__input"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="login_password"
          rules={[{ required: true, message: "Please input your password!" }]}
          labelAlign="left"
          className="loginForm__item"
        >
          <Input.Password
            size="large"
            className="loginForm__input"
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Button
          type="primary"
          //   danger
          size="large"
          htmlType="submit"
          className="loginForm__btn"
          block
        >
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
