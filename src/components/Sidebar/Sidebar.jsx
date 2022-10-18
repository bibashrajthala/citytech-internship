import { MailOutlined, PieChartOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("Dashboard", "1", <PieChartOutlined />),
  getItem("Organization", "2", <MailOutlined />, [
    getItem("Organizations", "2.1"),
    getItem("Add organization", "2.2"),
    // getItem("Add employee", "2.3"),
  ]),
];

const Sidebar = () => {
  const navigate = useNavigate();
  const onClick = (e) => {
    // console.log("click ", e);
    // console.log(e.key);
    const current = e.key;
    if (current === "1") navigate("/");
    if (current === "2.1") navigate("/organization");
    if (current === "2.2") navigate("/organization/add");
  };
  return (
    <div>
      <Menu
        selectedKeys={["1"]}
        defaultOpenKeys={["1"]}
        mode="inline"
        theme="dark"
        items={items}
        onClick={onClick}
      />
    </div>
  );
};
export default Sidebar;
