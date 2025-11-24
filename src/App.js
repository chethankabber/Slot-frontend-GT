// src/App.jsx
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
import ManagerProfile from "./pages/manager/ManagerProfile";

import Login from "./auth/Login";
import Register from "./auth/Register";

// NEW user layout + pages
import UserLayout from "./pages/users/UserLayout";
import UserDashboard from "./pages/users/UserDashboard";
import UserRacks from "./pages/users/UserRacks";
import UserHistory from "./pages/users/UserHistory";
import UserProfile from "./pages/users/UserProfile";

import {
  mockContainers,
  mockPermissionRequests,
  mockUsers,
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

  // ---------- EXISTING ADMIN HANDLERS (kept as-is) ----------
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

  // --------- NEW: User-related helpers & handlers ----------
  // NOTE: In this mock, logged-in user is identified by email "user@gmail.com".
  // You can replace this with actual auth later.
  const currentUserEmail = "user@gmail.com";
  const currentUser = mockUsers.find((u) => u.email === currentUserEmail) || {
    name: "User A",
    email: currentUserEmail,
  };

  // Create a new user permission request (from User Dashboard modal)
  const handleCreatePermissionRequest = (newRequestData) => {
    // create unique id (simple mock)
    const newId = (Math.floor(Math.random() * 90000) + 10000).toString();
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    const requestObj = {
      id: newId,
      userName: currentUser.name,
      userEmail: currentUser.email,
      itemName: newRequestData.itemName,
      quantity: Number(newRequestData.quantity),
      itemType: newRequestData.returnable ? "Returnable" : "Non-returnable",
      returnDate: newRequestData.returnable ? newRequestData.returnDate : null,
      whichProject: newRequestData.projectName,
      message: newRequestData.message || "",
      dateRequested: today,
      status: "Pending",
    };

    setPermissionRequests((prev) => [requestObj, ...prev]);
  };

  // Cancel a pending request (user action)
  const handleCancelRequest = (requestId) => {
    setPermissionRequests((prev) =>
      prev.filter((r) => !(r.id === requestId && r.status === "Pending"))
    );
  };

  // Helper: get only this user's requests
  const getUserRequests = (email = currentUserEmail) =>
    permissionRequests.filter((r) => r.userEmail === email);

  // ----------------------------------------------------------------

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* LOGIN + REGISTER */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* =========================
            USER ROUTES (NEW)
            Base path: /users
        ========================== */}
        <Route path="/users" element={<UserLayout />}>

            {/* USER DASHBOARD */}
           <Route
             index
              element={
               <UserDashboard
                  containers={containers}
                   permissionRequests={getUserRequests()}
                    onCreateRequest={handleCreatePermissionRequest}
                    onCancelRequest={handleCancelRequest}
                    currentUser={currentUser}
                />
                }
            />

            {/* USER RACKS */}
            <Route
              path="racks"
              element={<UserRacks containers={containers} />}
             />

             {/* USER HISTORY */}
               <Route
                path="history"
                 element={
                 <UserHistory
                    containers={containers}
                     currentUserEmail={currentUserEmail}
                   />
                 }
               />

             {/* USER PROFILE  → FIXED HERE! */}
              <Route
                path="profile"
                    element={
                     <UserProfile
                      currentUser={mockUsers.find((u) => u.email === "user@gmail.com")}
                     onUpdateUser={(updated) => console.log(updated)}
                     />
                    }
                  />

             </Route>
        {/* =========================
            ADMIN ROUTES (unchanged)
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
    MANAGER ROUTES (unchanged)
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

    <Route
      path="profile"
      element={
        <ManagerProfile
          currentUser={mockUsers.find((u) => u.email === "manager@gmail.com")}
          onUpdateUser={(updated) => console.log(updated)}
        />
      }
    />

    <Route path="users" element={<ManagerUsers />} />
</Route>


        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
