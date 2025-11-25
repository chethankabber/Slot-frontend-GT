// src/pages/manager/ManagerDashboard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserRound, UserCircle } from "lucide-react";

import LowStockCard from "../../components/admin/dashboard/LowStockCard";
import ItemDueCard from "../../components/admin/dashboard/DueDatesCard";
import ContainerSummaryCard from "../../components/admin/dashboard/ContainerSummaryCard";

import ManagerPermissionModal from "../../components/manager/ManagerPermissionModal";

const ManagerDashboard = ({ containers, approvedPermissions, }) => {
  const navigate = useNavigate();
  const [selectedReq, setSelectedReq] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // When manager gives item → remove card
  const handleGivenToUser = (id) => {
    const updated = approvedPermissions.filter((req) => req.id !== id);
    selectedReq.wasGiven = true; // local mark
    setShowModal(false);

    // refresh page UI by forcing re-render
    window.location.reload();
  };

  const jumpToSlot = (containerId, slotNumber) => {
    navigate(`/manager/racks?jumpRack=${containerId}&jumpSlot=${slotNumber}`);
  };

  return (
    <div className="container my-4">
      <h2 className="fw-bold mb-3">Manager Dashboard</h2>
      <p className="text-muted">Overview of racks, items and approvals</p>

      {/* APPROVED REQUESTS */}
      <div
        className="card p-3 mb-4"
        style={{
          background: "hsl(215,25%,12%)",
          border: "1px solid hsl(215,20%,25%)",
          color: "white",
        }}
      >
        <h5 className="fw-bold mb-3">Approved Requests</h5>

        {approvedPermissions.length === 0 ? (
          <p className="text-muted">No approved permissions yet.</p>
        ) : (
          approvedPermissions.map((req) => (
            <div
              key={req.id}
              className="d-flex justify-content-between align-items-center p-3 mb-3 rounded"
              style={{
                background: "hsl(215,25%,16%)",
                border: "1px solid hsl(215,20%,25%)",
                cursor: "pointer",
              }}
              onClick={() => {
                setSelectedReq(req);
                setShowModal(true);
              }}
            >
              {/* LEFT SIDE */}
              {/* <div className="d-flex align-items-center gap-2 mb-2"> */}
        
    
              <div>
                <div className="fw-bold mb-0"><UserCircle size={22} className="text-secondary m-2"/>{req.userName}</div>
                <div className="text-muted">{req.userEmail}</div>
                <div className="text-muted">Project name: {req.whichProject}</div>
              </div>

              {/* CENTER */}
              <div>
              <div className="text-muted ">ItemName : {req.itemName}</div>
              <div className=" text-muted">Qty: {req.quantity}</div>
              
              </div>
              {/* RIGHT SIDE */}
              <div className="text-end">
                <div className="text-secondary fw-bold">View Details</div>
                
              </div>
            </div>
          ))
        )}
      </div>

      {/* RACK SUMMARY */}
      <div className="row g-3 mb-4">
        {containers.map((rack) => (
          <div className="col-12 col-sm-6 col-lg-4" key={rack.id}>
            <ContainerSummaryCard container={rack} basePath="/manager/racks" />
          </div>
        ))}
      </div>

      {/* LOW STOCK + DUE ITEMS */}
      <div className="row g-4">
        <div className="col-lg-6">
          <ItemDueCard containers={containers} />
        </div>

        <div className="col-lg-6">
          <LowStockCard containers={containers} onJumpToSlot={jumpToSlot} />
        </div>
      </div>

      {/* MODAL */}
      <ManagerPermissionModal
        show={showModal}
        onClose={() => setShowModal(false)}
        request={selectedReq}
        onGiven={handleGivenToUser}
      />
    </div>
  );
};

export default ManagerDashboard;
