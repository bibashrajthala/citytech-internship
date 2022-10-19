import React, { useState, useEffect } from "react";
import { Col, Row } from "antd";

import { Select } from "antd";

import Table1 from "../../components/Table1/Table1";
import Table2 from "../../components/Table2/Table2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCountries,
  fetchSummary,
  fetchTable1,
  fetchTable2,
  selectCountries,
  selectSummary,
  selectTable1,
  selectTable2,
} from "../../store/slices/dashboardSlice";

// const { Option } = Select;

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const summary = useSelector(selectSummary);
  const table1Data = useSelector(selectTable1);
  const table2Data = useSelector(selectTable2);
  const countries = useSelector(selectCountries);
  const [selectedCountry, setSelectedCountry] = useState("");
  // console.log(summary);
  // console.log(table1Data);
  // console.log(table2Data);
  // console.log(countries);

  let token = localStorage.getItem("accessToken");
  // console.log(token);

  useEffect(() => {
    if (!token) navigate("/auth");

    dispatch(fetchSummary());
    dispatch(fetchTable1());
    dispatch(fetchTable2());
    dispatch(fetchCountries());
  }, [token]);

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

  const handleSelectCountry = (value) => {
    setSelectedCountry(value);
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
          options={countries}
          onSelect={handleSelectCountry}
        >
          {/* {countries.map((country, index) => (
            <Option key={index} value={country.label}>
              {country.label}
            </Option>
          ))} */}
        </Select>
        {selectedCountry && <p>{selectedCountry}</p>}
      </div>
    </div>
  );
};

export default Dashboard;
