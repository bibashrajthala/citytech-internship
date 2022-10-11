import "antd/dist/antd.min.css";
import "./App.css";

import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard/Dashboard";
import Auth from "./pages/auth/Auth";

function App() {
  // let token = sessionStorage.getItem("accessToken");
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          // element={token ? <Navigate to="dashboard" /> : <Auth />}
          element={<Auth />}
        />

        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
