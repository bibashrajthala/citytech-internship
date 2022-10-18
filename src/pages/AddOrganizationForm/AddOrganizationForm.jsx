import React, { useState } from "react";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { v4 as uuidv4 } from "uuid";
import moment from "moment/moment";

const AddOrganizationForm = () => {
  //   const orgInfo = JSON.parse(localStorage.getItem("orgInfo"));
  //   const [organizationInfo, setOrganizationInfo] = useState([...orgInfo]);
  const [organizationInfo, setOrganizationInfo] = useState([]);

  const onFinish = async (values) => {
    // console.log("user form data:", values);
    let { orgStartDate, ...formData } = values;
    let startDate = "";
    if (orgStartDate) {
      startDate = moment(orgStartDate._d).format("ll");
    }
    formData = { ...formData, startDate, id: uuidv4() };
    console.log("org form data:", formData);
    setOrganizationInfo([...organizationInfo, formData]);
  };

  console.log(organizationInfo);
  localStorage.setItem("orgInfo", JSON.stringify(organizationInfo));

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      style={{ padding: "3rem" }}
    >
      <h2>Add organization</h2>
      <Form.Item
        name="orgName"
        label="Organization name"
        rules={[{ required: true, message: "Please input organization name!" }]}
        labelAlign="left"
      >
        <Input placeholder="Organization Name" />
      </Form.Item>

      <Form.Item
        name="orgCountry"
        label="Country"
        rules={[
          { required: true, message: "Please input country of your location!" },
        ]}
        labelAlign="left"
      >
        <Select placeholder="Select country">
          <Select.Option value="Nepal">Nepal</Select.Option>
          <Select.Option value="India">India</Select.Option>
          <Select.Option value="China">China</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="orgAddress"
        label="Address"
        rules={[{ required: true, message: "Please input address!" }]}
        labelAlign="left"
      >
        <Input placeholder="Organization Adddress" />
      </Form.Item>

      <Form.Item label="Working Area" labelAlign="left" name="orgWorkingArea">
        <Select placeholder="Select working area of your organization">
          <Select.Option value="Fintech">Fintech</Select.Option>
          <Select.Option value="IT">IT</Select.Option>
          <Select.Option value="Public Sector">Public Sector</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="orgStartDate"
        label="Start Date"
        rules={[{ required: true, message: "Please input starting date" }]}
        labelAlign="left"
      >
        <DatePicker
          format="YYYY-MM-DD HH:mm:ss"
          showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
        />
      </Form.Item>

      <Form.Item label="Button">
        <Button type="primary" htmlType="submit">
          submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddOrganizationForm;
