import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "./pages/Dashboard";
import Containers from "./pages/Containers";
import ContainerDetail from "./pages/ContainerDetail";
import History from "./pages/History";
import AllUsers from "./pages/AllUsers";
import NotFound from "./pages/NotFound";

import ManagerLayout from "./pages/manager/ManagerLayout";
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import ManagerRacks from "./pages/manager/ManagerRacks";
import ManagerHistory from "./pages/manager/ManagerHistory";
import ManagerUsers from "./pages/manager/ManagerUsers";

import Login from "./auth/Login";
import Register from "./auth/Register";

import {
  mockContainers,
  mockPermissionRequests,
} from "./data/Mockdata";

function App() {
  const [containers, setContainers] = useState(
    mockContainers.map((c) => ({
      ...c,
      slots: c.slots.map((s) => ({
        ...s,
        items: s.items || [],
      })),
    }))
  );

  const [permissionRequests, setPermissionRequests] = useState(
    mockPermissionRequests
  );

  const handlePermissionApprove = (id) => {
    setPermissionRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: "Approved" } : req
      )
    );
  };

  const handlePermissionReject = (id) => {
    setPermissionRequests((prev) =>
      prev.filter((req) => req.id !== id)
    );
  };

  const updateContainers = (updateFn) => {
    setContainers((prev) => updateFn(prev));
  };

  const approvedPermissions = permissionRequests.filter(
    (req) => req.status === "Approved"
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* LOGIN + REGISTER */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* =========================
            ADMIN ROUTES (correct)
        ========================== */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route
            index
            element={
              <Dashboard
                containers={containers}
                permissionRequests={permissionRequests}
                onPermissionApprove={handlePermissionApprove}
                onPermissionReject={handlePermissionReject}
              />
            }
          />

          <Route
            path="racks"
            element={
              <Containers
                containers={containers}
                setContainers={setContainers}
                updateContainers={updateContainers}
              />
            }
          />

          <Route
            path="container/:id"
            element={<ContainerDetail containers={containers} />}
          />

          <Route path="history" element={<History />} />
          <Route path="users" element={<AllUsers />} />
        </Route>

        {/* =========================
            MANAGER ROUTES (FIXED)
        ========================== */}
        <Route path="/manager" element={<ManagerLayout />}>
          <Route
            index
            element={
              <ManagerDashboard
                containers={containers}
                approvedPermissions={approvedPermissions}
              />
            }
          />

          <Route
            path="racks"
            element={
              <ManagerRacks
                containers={containers}
                setContainers={setContainers}
                updateContainers={updateContainers}
              />
            }
          />

          <Route path="history" element={<ManagerHistory />} /> 
          <Route path="users" element={<ManagerUsers />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
