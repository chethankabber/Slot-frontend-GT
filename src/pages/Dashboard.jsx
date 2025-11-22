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
//import RecentActivity from "../components/admin/dashboard/RecentActivity";
import PermissionRequests from "../components/admin/dashboard/PermissionRequests";
import ItemDueCard from "../components/admin/dashboard/DueDatesCard";
import  LowStockCard from "../components/admin/dashboard/LowStockCard"
import { useNavigate } from "react-router-dom";


const Dashboard = ({
  containers,               // <-- LIVE data coming from App.jsx
  permissionRequests,       // unchanged
  onPermissionApprove,
  onPermissionReject,
}) => {

  const navigate = useNavigate();

  // JUMP TO RACK SLOT (same as search-bar jump)
const jumpToSlot = (containerId, slotNumber) => {
  navigate(`/admin/racks?jumpRack=${containerId}&jumpSlot=${slotNumber}`);
};




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
      <div className="mb-4">
  {permissionRequests && permissionRequests.length > 0 ? (
    (() => {
      const pendingRequests = permissionRequests.filter(
        (r) => r.status === "Pending"
      );

      return pendingRequests.length > 0 ? (
        <PermissionRequests
          permissionRequests={pendingRequests}
          onApprove={onPermissionApprove}
          onReject={onPermissionReject}
        />
      ) : (
        <p className="text-muted">No pending requests.</p>
      );
    })()
  ) : (
    <p className="text-muted">No requests available.</p>
  )}
</div>
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
         
       {/* ====== ITEM DUE + LOW STOCK — SIDE BY SIDE ====== */}
<div className="row g-4 mt-4">

  {/* Left Card – Item Due Dates */}
  <div className="col-12 col-lg-6">
    <ItemDueCard containers={containers} />
  </div>

  {/* Right Card – Low Stock Items */}
  <div className="col-12 col-lg-6">
    <LowStockCard 
    containers={containers}
    onJumpToSlot={jumpToSlot}
/>

  </div>

</div>

  
      {/* RECENT ACTIVITY */}
      {/* <RecentActivity containers={containers} /> */}
    </div>
  );
};

export default Dashboard;
