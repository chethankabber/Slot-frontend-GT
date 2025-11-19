
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "./pages/Dashboard";
import Containers from "./pages/Containers";
import ContainerDetail from "./pages/ContainerDetail";
import History from "./pages/History";
import AllUsers from "./pages/AllUsers";
import NotFound from "./pages/NotFound";

import Login from "./auth/Login";
import Register from "./auth/Register";

import { mockContainers, mockPermissionRequests } from "./data/Mockdata";

function App() {
  // ---------------------------------------------------------
  // GLOBAL SHARED STATE
  // ---------------------------------------------------------
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

  // ---------------------------------------------------------
  // PERMISSION APPROVE / REJECT
  // ---------------------------------------------------------
  const handlePermissionApprove = (id) => {
    setPermissionRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const handlePermissionReject = (id) => {
    setPermissionRequests((prev) => prev.filter((r) => r.id !== id));
  };

  // ---------------------------------------------------------
  // UPDATE CONTAINERS HELP FUNCTION
  // ---------------------------------------------------------
  const updateContainers = (updateFn) => {
    setContainers((prev) => updateFn(prev));
  };

  // ---------------------------------------------------------
  // ROUTES
  // ---------------------------------------------------------
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Layout */}
        <Route path="/admin" element={<AdminDashboard />}>
          {/* Dashboard */}
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

          {/* Racks / Containers Page */}
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

          {/* Individual Container */}
          <Route
            path="container/:id"
            element={<ContainerDetail containers={containers} />}
          />

          {/* Other */}
          <Route path="history" element={<History />} />
          <Route path="users" element={<AllUsers />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
