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

const Content = styled.div`
  max-width: 400px;
  z-index: 2;
  min-width: 1300px;
`;

const { Option } = Select;

const STATUS = ["onboarding", "active", "inactive"];
const CollectionCreateForm = ({ visible, onCreate, onCancel, record }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Change Status"
      okText="Change Status"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="status"
          label="Change Status"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Select allowClear defaultValue={"onboarding"}>
            {STATUS.map((st) => {
              return <Option value={st}>{st}</Option>;
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CollectionCreateForm;
