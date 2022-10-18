import "antd/dist/antd.min.css";
import "./App.css";

import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard/Dashboard";
import Auth from "./pages/auth/Auth";
import PageLayout from "./components/PageLayout/PageLayout";
import AddOrganizationForm from "./pages/AddOrganizationForm/AddOrganizationForm";
import OrganizationTable from "./pages/OrganizationTable/OrganizationTable";
import AddEmployeeForm from "./pages/AddEmployeeForm/AddEmployeeForm";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/auth" index element={<Auth />} />
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/organization" element={<OrganizationTable />} />
          <Route path="/organization/add" element={<AddOrganizationForm />} />
          <Route path="/organization/:id" element={<AddEmployeeForm />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
