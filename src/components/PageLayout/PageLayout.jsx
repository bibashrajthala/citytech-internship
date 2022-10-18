import { Col, Row } from "antd";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

const PageLayout = () => (
  <Row>
    <Col span={4} style={{ border: "1px solid red" }}>
      <Sidebar />
    </Col>
    <Col span={20} style={{ border: "1px solid blue" }}>
      <Header />
      <Outlet />
      {/* nested routes rendered here */}
      {/* <Footer/> */}
    </Col>
  </Row>
);

export default PageLayout;
