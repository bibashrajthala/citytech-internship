import React, { useState } from "react";

// import { ReactComponent as Logo } from "../../assets/svgs/siderLogo.svg";

import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { loginUser, selectUserError } from "../../store/slices/userSlice";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const err = useSelector(selectUserError)

  const [errorMessage, setErrorMessage] = useState("");

  const onFinish = async (formData) => {
    try {
      console.log("user form data:", formData);

      dispatch(loginUser(formData));

      navigate("/");
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
        autoComplete="on"
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
              color: "white",
              backgroundColor: "#f06957",
              marginBottom: "10px",
              padding: "5px 0",
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
