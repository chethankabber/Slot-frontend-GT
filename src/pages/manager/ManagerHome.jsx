import React from "react";
import LowStockCard from "../../components/admin/dashboard/LowStockCard";
import ItemDueCard from "../../components/admin/dashboard/DueDatesCard";
import { useNavigate } from "react-router-dom";

const ManagerHome = ({ containers = [], approvedPermissions = [] }) => {
      const navigate = useNavigate();

  const jumpToSlot = (rackId, slotNumber) => {
    navigate(`/manager/racks?jumpRack=${rackId}&jumpSlot=${slotNumber}`);
  };
  return (
    <div className="container my-4">
      <h2 className="fw-bold mb-3">Manager Dashboard</h2>

      {/* ===================== APPROVED PERMISSIONS ===================== */}
      <div className="card shadow-sm mb-4"
           style={{
             background: "hsl(215, 25%, 12%)",
             border: "1px solid hsl(215, 20%, 25%)",
             color: "white"
           }}>
        <div className="card-header fw-bold">
          Approved User Permissions
        </div>

        <div className="card-body" style={{ maxHeight: 250, overflowY: "auto" }}>
          {approvedPermissions.length === 0 ? (
            <p className="text-muted">No approved permissions</p>
          ) : (
            approvedPermissions.map((p) => (
              <div
                key={p.id}
                className="p-3 mb-2 rounded"
                style={{
                  backgroundColor: "hsl(215, 25%, 14%)",
                  border: "1px solid hsl(215, 20%, 25%)"
                }}
              >
                <h6 className="fw-bold mb-1">{p.userName}</h6>
                <p className="mb-1">
                  <strong>Email:</strong> {p.userEmail}
                </p>
                <p className="mb-1">
                  <strong>Item:</strong> {p.itemName} ({p.quantity})
                </p>
                <p className="mb-1">
                  <strong>Project:</strong> {p.whichProject}
                </p>
                <p className="mb-1">
                  <strong>Return Date:</strong> {p.returnDate || "Not required"}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ===================== ITEM DUE + LOW STOCK ===================== */}
      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <ItemDueCard containers={containers} />
        </div>

  <LowStockCard 
   containers={containers}
   onJumpToSlot={jumpToSlot}
/>

      </div>
    </div>
  );
};

export default ManagerHome;
