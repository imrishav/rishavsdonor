import { Row, Typography } from "antd";

const { Title } = Typography;

import Link from "next/link";
import Router, { withRouter } from "next/router";
import styled from "styled-components";
import { useState, useEffect } from "react";

const Content = styled.div`
  max-width: 400px;
  z-index: 2;
  min-width: 300px;
`;

const FeedBack = ({ form, router }) => {
  useEffect(() => {
    setTimeout(() => {
      router.push("/signin");
    }, 4000);
  }, []);
  return (
    <Row
      type="flex"
      align="middle"
      justify="center"
      className="px-3 bg-white"
      style={{ minHeight: "100vh" }}
    >
      <Content>
        <div className="text-center mb-5" style={{ width: "max-content" }}>
          <Title>Thank You For Registering.</Title>

          <h5 className="mb-0 mt-3">Redirecting you to admin page...</h5>
        </div>
      </Content>
    </Row>
  );
};

export default withRouter(FeedBack);
