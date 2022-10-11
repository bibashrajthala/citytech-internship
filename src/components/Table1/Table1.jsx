import React from "react";
import { Table } from "antd";

const columns = [
  {
    title: "Sender Full Name",
    width: 20,
    dataIndex: "Sender Full Name",
    key: "sender",
  },
  {
    title: "Receiver Full Name",
    width: 20,
    dataIndex: "Receiver Full Name",
    key: "receiver",
  },
  {
    title: "Current Status",
    width: 20,
    dataIndex: "Current Status",
    key: "status",
  },
  {
    title: "Send Amount",
    width: 20,
    dataIndex: "Send Amount",
    key: "send amt",
  },
  {
    title: "Receive Amount",
    width: 20,
    dataIndex: "Receive Amount",
    key: "receive amt",
  },
];

const Table1 = ({ tableDatas }) => {
  return (
    <Table
      size="small"
      columns={columns}
      dataSource={tableDatas}
      scroll={{
        x: 1300,
      }}
    />
  );
};

export default Table1;
