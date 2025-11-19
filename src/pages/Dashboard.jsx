// pages/Dashboard.jsx
//-----------------------------------------------------------
// UPDATED TO USE LIVE CONTAINER DATA, NOT STATIC mockContainers
// Shows:
//  - Rack summary cards
//  - Permission requests (unchanged)
//  - Recent Activity (with updated items[])
//-----------------------------------------------------------

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ContainerSummaryCard from "../components/admin/dashboard/ContainerSummaryCard";
import RecentActivity from "../components/admin/dashboard/RecentActivity";
import PermissionRequests from "../components/admin/dashboard/PermissionRequests";


const Dashboard = ({
  containers,               // <-- LIVE data coming from App.jsx
  permissionRequests,       // unchanged
  onPermissionApprove,
  onPermissionReject,
}) => {
  return (
    <div className="container my-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Dashboard</h2>
        <p className="text-muted">
          Overview of your container management system
        </p>
      </div>

      {/* Permission Requests */}
      {permissionRequests?.length > 0 && (
        <div className="mb-4">
          <PermissionRequests
            permissionRequests={permissionRequests}
            onApprove={onPermissionApprove}
            onReject={onPermissionReject}
          />
        </div>
      )}

      {/* RACK CARDS */}
      <div className="row g-4 mb-4">
        {containers.map((container) => (
          <div
            key={container.id}
            className="col-12 col-sm-6 col-lg-4"
          >
            <ContainerSummaryCard container={container} />
          </div>
        ))}
      </div>

      {/* RECENT ACTIVITY */}
      <RecentActivity containers={containers} />
    </div>
  );
};

export default Dashboard;
