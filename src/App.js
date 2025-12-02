// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* === Universal Layout & Dashboard === */
import UniversalLayout from "./components/common/UniversalLayout";
import UniversalDashboard from "./pages/dashboard/UniversalDashboard";

/* === Admin Pages === */
import Containers from "./pages/Containers";
//import ContainerDetail from "./pages/ContainerDetail";
import History from "./pages/History";
import AllUsers from "./pages/AllUsers";

/* === Manager Pages === */
import ManagerRacks from "./pages/manager/ManagerRacks";
import ManagerHistory from "./pages/manager/ManagerHistory";
import ManagerUsers from "./pages/manager/ManagerUsers";
import ManagerProfile from "./pages/manager/ManagerProfile";

/* === User Pages === */
import UserRacks from "./pages/users/UserRacks";
import UserHistory from "./pages/users/UserHistory";
import UserProfile from "./pages/users/UserProfile";

/* === Auth === */
import Login from "./auth/Login";
//import Register from "./auth/Register";

/* === Not Found === */
import NotFound from "./pages/NotFound";

/* === Mock Data === */
import {
  mockContainers,
  mockPermissionRequests,
  mockUsers,
} from "./data/Mockdata";

function App() {
  /* ---------------- Containers ---------------- */
  const [containers, setContainers] = useState(
    mockContainers.map((c) => ({
      ...c,
      slots: c.slots.map((s) => ({
        ...s,
        items: s.items || [],
      })),
    }))
  );

  const updateContainers = (updateFn) => {
    setContainers((prev) => updateFn(prev));
  };

  /* ---------------- Permission Requests ---------------- */
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
    setPermissionRequests((prev) => prev.filter((req) => req.id !== id));
  };

  const approvedPermissions = permissionRequests.filter(
    (req) => req.status === "Approved"
  );

  /* ---------------- User Mock Login ---------------- */
  const currentUserEmail = "user@gmail.com";

  const currentUser =
    mockUsers.find((u) => u.email === currentUserEmail) || {
      name: "User A",
      email: currentUserEmail,
    };

  const getUserRequests = () =>
    permissionRequests.filter((r) => r.userEmail === currentUserEmail);

  const handleCreatePermissionRequest = (data) => {
    const newId = (Math.floor(Math.random() * 90000) + 10000).toString();
    const today = new Date().toISOString().slice(0, 10);

    const obj = {
      id: newId,
      userName: currentUser.name,
      userEmail: currentUser.email,
      itemName: data.itemName,
      quantity: Number(data.quantity),
      itemType: data.returnable ? "Returnable" : "Non-returnable",
      returnDate: data.returnable ? data.returnDate : null,
      whichProject: data.projectName,
      message: data.message || "",
      dateRequested: today,
      status: "Pending",
    };

    setPermissionRequests((prev) => [obj, ...prev]);
  };

  const handleCancelRequest = (requestId) => {
    setPermissionRequests((prev) =>
      prev.filter(
        (r) => !(r.id === requestId && r.status === "Pending")
      )
    );
  };

  /* ---------------- RETURN JSX ---------------- */
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root → login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}

        {/*  USER ROUTES (UNIVERSAL LAYOUT)*/}
        <Route path="/users/*" element={<UniversalLayout role="user" />}>
          <Route
            path="dashboard"
            element={
              <UniversalDashboard
                role="user"
                containers={containers}
                permissionRequests={getUserRequests()}
                onCreateRequest={handleCreatePermissionRequest}
                onCancelRequest={handleCancelRequest}
                currentUser={currentUser}
              />
            }
          />

          <Route path="racks" element={<UserRacks containers={containers} />} />

          <Route
            path="history"
            element={
              <UserHistory
                containers={containers}
                currentUserEmail={currentUserEmail}
              />
            }
          />

          <Route
            path="profile"
            element={
              <UserProfile
                currentUser={currentUser}
                onUpdateUser={(u) => console.log(u)}
              />
            }
          />

          {/* Default redirect */}
          <Route index element={<Navigate to="/users/dashboard" replace />} />
        </Route>

        {/* ADMIN ROUTES (UNIVERSAL LAYOUT)     */}
        <Route path="/admin/*" element={<UniversalLayout role="admin" />}>
          <Route
            path="dashboard"
            element={
              <UniversalDashboard
                role="admin"
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

          {/* <Route
            path="container/:id"
            element={<ContainerDetail containers={containers} />}
          /> */}

          <Route path="history" element={<History />} />
          <Route path="users" element={<AllUsers />} />

          {/* Default redirect */}
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
        </Route>

        {/*  MANAGER ROUTES (UNIVERSAL LAYOUT) */}
        <Route path="/manager/*" element={<UniversalLayout role="manager" />}>
          <Route
            path="dashboard"
            element={
              <UniversalDashboard
                role="manager"
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
          <Route
            path="profile"
            element={
              <ManagerProfile
                currentUser={mockUsers.find(
                  (u) => u.email === "manager@gmail.com"
                )}
                onUpdateUser={(u) => console.log(u)}
              />
            }
          />

          <Route path="users" element={<ManagerUsers />} />

          {/* Default redirect */}
          <Route index element={<Navigate to="/manager/dashboard" replace />} />
        </Route>

        {/* NOT FOUND */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
