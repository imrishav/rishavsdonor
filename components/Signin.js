import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Row, Typography, Spin } from "antd";
import { EyeTwoTone, MailTwoTone, PlaySquareTwoTone } from "@ant-design/icons";

import Link from "next/link";
import Router, { withRouter } from "next/router";
import styled from "styled-components";
import { useAppState } from "./shared/AppProvider";
import service from "../services";
import Axios from "axios";

const FormItem = Form.Item;

const Content = styled.div`
  max-width: 400px;
  z-index: 2;
  min-width: 300px;
`;

const { Title, Text } = Typography;

const Signin = ({ form, router }) => {
  const [state] = useAppState();
  const [loading, setLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState();

  useEffect(() => {
    setErrorMsg(null);
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    setErrorMsg(null);

    try {
      let url =
        "https://wms-sellers-onboarding-api.herokuapp.com/authentications";
      const res = await Axios.post(
        url,
        JSON.stringify({
          user: {
            email: values.email,
            password: values.password,
          },
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("token", res.headers.authentication);
      router.push("/Dashboard");
      setLoading(false);
    } catch (er) {
      console.log("errrpr", er.response.data);

      setErrorMsg(er.response.data);
      setLoading(false);
    }
  };
  return (
    <Row
      type="flex"
      align="middle"
      justify="center"
      className="px-3 bg-white mh-page"
      style={{ minHeight: "100vh" }}
    >
      {loading && (
        <Spin
          size="large"
          className="mr-3"
          style={{ height: 100 }}
          tip="Loading..."
        ></Spin>
      )}
      <Content>
        <div className="text-center mb-5">
          <Title className="mb-0 mt-3" level={3}>
            Admin Sign in
          </Title>
        </div>

        {errorMsg && (
          <Text style={{ display: "block" }} type="danger">
            {errorMsg.error}
          </Text>
        )}

        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              //   prefix={<UserOutlined className="site-form-item-icon" />}
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
              //   prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <a href="/signup">register now!</a>
          </Form.Item>
        </Form>
      </Content>
    </Row>
  );
};

export default withRouter(Signin);
