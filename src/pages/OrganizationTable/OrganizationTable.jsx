import { Table, Button } from "antd";
import React from "react";
import { useNavigate, Link } from "react-router-dom";

const OrganizationTable = () => {
  const navigate = useNavigate();

  const organizations = JSON.parse(localStorage.getItem("orgInfo"));

  console.log(organizations);

  const columns = [
    {
      title: "Name",
      dataIndex: "orgName",
      key: "name",
      render: (orgName, record) => {
        // console.log(record);
        const { key } = record;

        return <Link to={`/organization/${key}`}>{orgName}</Link>;
      },
    },
    {
      title: "Country",
      dataIndex: "orgCountry",
      key: "country",
    },
    {
      title: "Address",
      dataIndex: "orgAddress",
      key: "address",
    },
    {
      title: "Working Area",
      dataIndex: "orgWorkingArea",
      key: "workingArea",
    },
    {
      title: "Start Date",
      dataIndex: "orgStartDate",
      key: "date",
    },
  ];

  const data = organizations?.map((org) => {
    const { id, orgName, orgAddress, orgCountry, startDate, orgWorkingArea } =
      org;

    return {
      key: id,
      orgName,
      orgAddress,
      orgCountry,
      orgWorkingArea,
      orgStartDate: startDate,
      // startDate: moment(orgStartDate).format("LL"),
    };
  });

  return (
    <>
      <Button onClick={() => navigate("/organization/add")}>
        Add Organization
      </Button>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default OrganizationTable;
