import React from "react";
import { Table } from "antd";

const columns = [
  {
    title: "ticket_id",
    width: 20,
    dataIndex: "ticket_id",
    key: "sender",
  },
  {
    title: "ticket_category",
    width: 20,
    dataIndex: "ticket_category",
    key: "receiver",
  },
  {
    title: "ticket_status",
    width: 20,
    dataIndex: "ticket_status",
    key: "status",
  },
  {
    title: "ticket_priority",
    width: 20,
    dataIndex: "ticket_priority",
    key: "send amt",
  },
  {
    title: "assign_to",
    width: 20,
    dataIndex: "assign_to",
    key: "receive amt",
  },
];

const Table2 = ({ tableDatas }) => {
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

export default Table2;
