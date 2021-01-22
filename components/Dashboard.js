import React, { useEffect, useState } from "react";
import { startCase } from "lodash";
import {
  Table,
  Row,
  Col,
  Form,
  Input,
  Modal,
  Tooltip,
  Select,
  Tag,
  Descriptions,
} from "antd";
import styled from "styled-components";
import { SettingOutlined } from "@ant-design/icons";
import service from "../services";
import CollectionCreateForm from "./CollectionModal";
import { withRouter } from "next/router";
import Axios from "axios";

const Content = styled.div`
  max-width: 400px;
  z-index: 2;
  min-width: 1300px;
`;

const { Option } = Select;

const STATUS = ["onboarding", "active", "inactive"];

const Dashboard = ({ router }) => {
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      console.log("naviagate to signin");
      router.push("/signin");
    }
  }, []);

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const [visible, setVisible] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentRecord, setCurrentRecored] = useState();

  const onCreate = async (values) => {
    console.log("Received values of form: ", { values, currentRecord });
    setVisible(false);
  };

  const onDetailPage = (record) => {
    setCurrentRecored(record);
    setShowDetailsModal(true);
  };

  const columns = [
    {
      title: "Full Name",
      width: 150,
      dataIndex: "name",
      key: "name",
      fixed: "left",
      render: (text, record, index) => (
        <a onClick={() => onDetailPage(record)}>{text}</a>
      ),
    },
    {
      title: "Email",
      width: 200,
      dataIndex: "email",
      key: "email",
      // fixed: "left",
    },
    {
      title: "Company Name",
      width: 150,
      dataIndex: "company_name",
      key: "company_name",
      // fixed: "left",
    },
    {
      title: "Phone",
      width: 120,
      dataIndex: "phone",
      key: "phone",
      // fixed: "left",
    },
    {
      title: "Company Address",
      width: 200,
      dataIndex: "company_address",
      key: "company_address",
      // fixed: "left",
    },
    {
      title: "Orders Per Month",
      width: 150,
      dataIndex: "orders_per_month",
      key: "orders_per_month",
      // fixed: "left",
    },
    {
      title: "Platform",
      width: 150,
      dataIndex: "platform",
      key: "platform",
      // fixed: "left",
    },
    {
      title: "Store URL",
      width: 180,
      dataIndex: "store_url",
      key: "platform",
      // fixed: "left",
    },

    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      fixed: "right",
      width: 200,

      render: (text, record, index) => {
        let color = "green";
        if (text === STATUS[1]) {
          color = color;
        }
        if (text === STATUS[0]) {
          color = "red";
        }
        if (text === STATUS[2]) {
          color = "grey";
        }
        return (
          <div
            className="btn-wrap"
            style={{
              width: "200px",
            }}
          >
            {" "}
            <Tag style={{ marginRight: 10 }} color={color} key={text}>
              {text.toUpperCase()}
            </Tag>
            <Tooltip placement="topLeft" title="Change Status">
              <SettingOutlined
                onClick={(e) => {
                  // setVisible(true);
                  showModal(record);
                  console.log("corresponding email is :", record);
                }}
                style={{ fontSize: "20px" }}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const showModal = (record) => {
    setCurrentRecored(record);
    setVisible(true);
  };

  const getSellers = async () => {
    try {
      let token = localStorage.getItem("token");
      console.log("token 2", token);
      let url = "https://wms-sellers-onboarding-api.herokuapp.com/sellers.json";
      let data = await Axios.get(url, {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          Authentication: token,
          // "Content-Type": "application/json",
        },
      });
      // console.log("token", dd);
      setData(data.data.sellers);
      setLoading(false);
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    setLoading(true);
    getSellers();
  }, []);

  return (
    <Row
      type="flex"
      //   align="middle"
      justify="center"
      //   className="px-3 bg-white"

      style={{ minHeight: "100vh" }}
    >
      <Content>
        <CollectionCreateForm
          visible={visible}
          onCreate={onCreate}
          onCancel={() => {
            setVisible(false);
            setCurrentRecored();
          }}
          record={currentRecord}
        />
        <Modal
          title="Seller Details"
          centered
          visible={showDetailsModal}
          onOk={() => setShowDetailsModal(false)}
          onCancel={() => setShowDetailsModal(false)}
          width={1000}
        >
          {console.log("currentRecord", currentRecord)}
          {currentRecord && (
            <Descriptions
              // title="Seller Details"
              bordered
              column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="Name">
                {currentRecord["name"]}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {" "}
                {currentRecord["email"]}
              </Descriptions.Item>
              <Descriptions.Item label="Company Name">
                {" "}
                {currentRecord["company_name"]}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                {" "}
                {currentRecord["phone"]}
              </Descriptions.Item>
              <Descriptions.Item label="Platform">
                {" "}
                {currentRecord["platform"]}
              </Descriptions.Item>
              <Descriptions.Item label="Store URL">
                {" "}
                {currentRecord["store_url"]}
              </Descriptions.Item>
              <Descriptions.Item label="Company Address">
                {currentRecord["company_address"]}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                {currentRecord["status"]}
              </Descriptions.Item>
              <Descriptions.Item label="Orders Per Month">
                {currentRecord["orders_per_month"]}
              </Descriptions.Item>
              <Descriptions.Item label="Comments">
                {currentRecord["comments"]}
              </Descriptions.Item>
            </Descriptions>
          )}
        </Modal>
        <Table
          size={"large"}
          columns={columns}
          dataSource={data}
          scroll={{ x: 1300 }}
          pagination={false}
          loading={loading}
        />
      </Content>
    </Row>
  );
};

export default withRouter(Dashboard);
