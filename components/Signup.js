import { useState, useEffect } from "react";
import {
  Button,
  Form,
  Spin,
  Input,
  Row,
  Typography,
  Col,
  Select,
  Card,
  Checkbox,
} from "antd";

import { withRouter } from "next/router";
import styled from "styled-components";
import service from "../services";

const Content = styled.div`
  max-width: 400px;
  z-index: 2;
  min-width: 600px;
`;
const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const Signup = ({ form, router }) => {
  const [loading, setLoading] = useState(false);
  const [dropDownValues, setDropdownValues] = useState();
  const [errors, setErrors] = useState();

  useEffect(() => {
    (async function () {
      try {
        let data = await service.getRequest("sellers/new.json");
        setDropdownValues(data);
        // setPosts(json.data.children.map(it => it.data));
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const res = await service.postWithoutHeaders("/sellers.json", values);
      setLoading(false);
      setTimeout(() => {
        router.push("/feedback");
      }, 2000);
    } catch (error) {
      setErrors(error.errors);
      setLoading(false);
    }
  };
  console.log("Loading Errors", errors);
  return (
    <Row
      type="flex"
      align="middle"
      justify="center"
      className="px-3 bg-white"
      style={{ minHeight: "100vh" }}
    >
      <Content>
        <div className="text-center mb-5">
          {loading && (
            <Spin
              size="large"
              className="mr-3"
              style={{ height: 100 }}
              tip="Loading..."
            ></Spin>
          )}
          <Title className="mb-0 mt-3" level={5}>
            Customer Signup Form
          </Title>
          {errors && (
            <div className="site-card-border-less-wrapper">
              <Card
                title={<Text type="danger">Errors:</Text>}
                bordered={false}
                style={{ width: 600 }}
                bodyStyle={{ textAlign: "start" }}
              >
                {errors.map((er) => {
                  return (
                    <Text style={{ display: "block" }} type="danger">
                      {er}
                    </Text>
                  );
                })}
              </Card>
            </div>
          )}
        </div>

        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          size={"small"}
          layout="vertical"
          onFinish={onFinish}
          style={{ width: 600 }}
        >
          <Row gutter={[16, 8]}>
            <Col span={12}>
              <Form.Item
                name="full_name"
                // label="Username"
                rules={[
                  {
                    required: true,
                    message: "Please input your Username!",
                  },
                ]}
              >
                <Input
                  // prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Full Name*"
                  size={"large"}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                // label="Username"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                ]}
              >
                <Input
                  // prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Account Email*"
                  size={"large"}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 8]}>
            <Col span={12}>
              <Form.Item
                name="company_name"
                // label="Username"
                rules={[
                  {
                    required: true,
                    message: "Please input your Company Name!",
                  },
                ]}
              >
                <Input
                  // prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Company Name*"
                  size={"large"}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phone"
                // label="Username"
                rules={[
                  {
                    required: true,
                    message: "Please input your Phone!",
                  },
                ]}
              >
                <Input
                  // prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Phone Number*"
                  size={"large"}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              {" "}
              <Form.Item
                name="company_address"
                // label="Username"
                rules={[
                  {
                    required: true,
                    message: "Please input your Company Address!",
                  },
                ]}
              >
                <TextArea
                  // prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Company Address*"
                  size={"large"}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ marginBottom: 20 }}>
            <Col span={12}>
              {" "}
              <div style={{ marginBottom: 7 }}>
                <Text type="secondary">Orders Per Month*</Text>
              </div>
              <Form.Item label={""} name="orders_per_month" noStyle>
                <Select style={{ width: 400 }}>
                  {dropDownValues?.["orders_per_month"].map((platorm, idx) => {
                    return (
                      <Option key={idx} value={platorm}>
                        {platorm}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ marginBottom: 25 }}>
            <Col span={24}>
              {" "}
              <div style={{ marginBottom: 7 }}>
                <Text type="secondary">
                  Please choose the platform your store is currently on:*
                </Text>
              </div>
              <Form.Item label={""} name="platform" noStyle>
                <Select style={{ width: 400 }}>
                  {dropDownValues?.platforms.map((platorm, idx) => {
                    return (
                      <Option key={idx} value={platorm}>
                        {platorm}
                      </Option>
                    );
                  })}
                  {/* <Option value="87">+87</Option> */}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              {" "}
              <div style={{ marginBottom: 7 }}>
                <Text type="secondary">
                  Please enter your store URL below:*
                </Text>
              </div>
              <Form.Item
                name="store_url"
                // label="Username"
                rules={[
                  {
                    required: true,
                    message: "Please input your Store URL",
                  },
                ]}
              >
                <Input
                  // prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Eg:https://yourstore.myshopfiy.com"
                  size={"large"}
                />
              </Form.Item>
              <Text style={{ fontSize: "10px" }}>
                Evolve support team will get in touch with you soon after signup
                to integrate your Store with Evolve's Order Management System*
              </Text>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              {" "}
              <Form.Item
                name="comments"
                // label="Username"
                rules={[
                  {
                    required: false,
                    message: "Please input your Company Address!",
                  },
                ]}
              >
                <TextArea
                  // prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Comments*"
                  size={"large"}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject("Should accept agreement"),
              },
            ]}
          >
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
            >
              Register
            </Button>
            {/* Or <a href="">register now!</a> */}
          </Form.Item>
        </Form>
      </Content>
    </Row>
  );
};

export default withRouter(Signup);
