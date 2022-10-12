import React, { useState, useEffect } from "react";
import { Col, Row } from "antd";

import { Select } from "antd";

import axios from "axios";
import Table1 from "../../components/Table1/Table1";
import Table2 from "../../components/Table2/Table2";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
// const API = axios.create({ baseURL: "http://localhost:5000" });
const API = axios.create({
  baseURL: "https://jp-dev.cityremit.global",
});

const Dashboard = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState(null);
  const [table1Data, setTable1Data] = useState(null);
  const [table2Data, setTable2Data] = useState(null);
  const [countries, setCountries] = useState([]);

  let token = localStorage.getItem("accessToken");
  // console.log(token);
  // API.interceptors.request.use((req) => {
  //   if (token) {
  //     console.log(token);

  //     req.headers.Authorization = `Bearer ${token}`;
  //   }
  //   return req;
  // });
  useEffect(() => {
    // for providing token to server's  middleware for verification from the localStorage as the header's authorization
    // console.log("effect", token);

    if (!token) navigate("/");

    const fetchSummary = async () => {
      const response = await API.get(
        "/web-api/transaction-manager/v1/admin/dashboard/summary",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await response.data.data[0];
      setSummary(data);
    };

    const fetchTable1Data = async () => {
      const response = await API.post(
        "/web-api/transaction-manager/v1/admin/dashboard/search",
        null,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // console.log(response);
      const data = await response.data.data;
      setTable1Data(data);
    };

    const fetchTable2Data = async () => {
      try {
        const response = await API.post(
          "/web-api/config/v1/tickets/search",
          null,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // console.log(response);
        const data = await response.data.data.data;
        setTable2Data(data);
      } catch (error) {
        console.log("error", error);
        navigate("/");
      }
      // const response = await API.post(
      //   "/web-api/config/v1/tickets/search",
      //   null
      // );
      // // console.log(response);
      // const data = await response.data.data.data;
      // setTable2Data(data);
    };

    const fetchCountries = async () => {
      const response = await API.get(
        "/web-api/config/v1/admin/masters/country",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // console.log(response);
      const data = await response.data.data;
      setCountries(data);
    };

    fetchSummary();
    fetchTable1Data();
    fetchTable2Data();
    fetchCountries();
  }, [token, navigate]);

  // console.log(summary);
  // console.log(table1Data);
  // console.log(table2Data);
  // console.log(countries);

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  return (
    <div>
      {summary && (
        <>
          <h3>Dashboard</h3>
          <div
            style={{ display: "flex", gap: "10px", justifyContent: "center" }}
          >
            <div
              style={{
                backgroundColor: "#f3f4f4",
                borderRadius: "4px",
                padding: "10px 20px",
                justifyContent: "center",
              }}
            >
              <span>Tax volume: </span>
              <span>{summary?.transaction_volume}</span>
            </div>
            <div
              style={{
                backgroundColor: "#f3f4f4",
                borderRadius: "4px",
                padding: "10px 20px",
              }}
            >
              <span>New Customers: </span>
              <span>{summary?.new_customers}</span>
            </div>
            <div
              style={{
                backgroundColor: "#f3f4f4",
                borderRadius: "4px",
                padding: "10px 20px",
              }}
            >
              <span>Receivable: </span>
              <span>{summary?.total_receivable}</span>
            </div>
            <div
              style={{
                backgroundColor: "#f3f4f4",
                borderRadius: "4px",
                padding: "10px 20px",
              }}
            >
              <span>Fix gain: </span>
              <span>{summary?.fx_gain}</span>
            </div>
          </div>
        </>
      )}

      <br />
      <br />

      <>
        <Row gutter={32}>
          <Col span={12}>
            {table1Data && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h3>Recent Transactions</h3>
                <Table1 tableDatas={table1Data} style={{ width: "80vw" }} />
              </div>
            )}
          </Col>
          <Col span={12}>
            {table2Data && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h3>Tickets</h3>
                <Table2 tableDatas={table2Data} style={{ width: "80vw" }} />
              </div>
            )}
          </Col>
        </Row>
      </>

      <div style={{ height: "20rem" }}>
        <Select
          showSearch
          placeholder="Select a person"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          {countries.map((country, index) => (
            <Option key={index} value={country.label}>
              {country.label}
            </Option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default Dashboard;
