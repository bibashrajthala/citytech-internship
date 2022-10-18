import React from "react";
import { useParams } from "react-router-dom";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";

const AddEmployeeForm = () => {
  const { id } = useParams();
  const organizations = JSON.parse(localStorage.getItem("orgInfo"));
  const org = organizations.find((org) => org.id === id);

  const {
    orgName,
    orgAddress,
    orgCountry,
    orgWorkingArea,
    startDate: orgStartDate,
  } = org;

  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };
  return (
    <>
      <h2>Organization Info</h2>
      {org && (
        <div
          style={{
            backgroundColor: "#eceaea",
            color: "black",
            display: "flex",
            flexDirection: "column",
            // justifyContent: "space-around",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <div>
            <div>
              <b>Organization Name</b>{" "}
            </div>
            <div>{orgName}</div>
          </div>
          <div>
            <div>
              <b> Country</b>
            </div>
            <div>{orgCountry}</div>
          </div>
          <div>
            <div>
              <b>Address</b>{" "}
            </div>
            <div>{orgAddress}</div>
          </div>
          <div>
            <div>
              <b>Working Area</b>{" "}
            </div>
            <div>{orgWorkingArea}</div>
          </div>
          <div>
            <div>
              <b>Start Date</b>{" "}
            </div>
            <div>{orgStartDate}</div>
          </div>
        </div>
      )}

      <Form
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.List name="users">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: "flex",
                    marginBottom: 8,
                  }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "firstName"]}
                    rules={[
                      {
                        required: true,
                        message: "Missing employee first name",
                      },
                    ]}
                  >
                    <Input placeholder="First Name" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "lastName"]}
                    rules={[
                      {
                        required: true,
                        message: "Missing employee last name",
                      },
                    ]}
                  >
                    <Input placeholder="Last Name" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "age"]}
                    rules={[
                      {
                        required: true,
                        message: "Missing employee age",
                      },
                    ]}
                  >
                    <Input placeholder="Age" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "salary"]}
                    rules={[
                      {
                        required: true,
                        message: "Missing employee salaey",
                      },
                    ]}
                  >
                    <Input placeholder="Salary" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Employee
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddEmployeeForm;
