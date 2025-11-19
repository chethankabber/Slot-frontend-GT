// components/admin/dashboard/PermissionRequests.jsx

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PermissionRequestModal from "./PermissionRequestModal";

const PermissionRequests = ({
  permissionRequests,
  onApprove,
  onReject,
}) => {
  const [selectedRequest, setSelectedRequest] = useState(null);

  return (
    <>
      <div
        className="card shadow-sm mb-4"
        style={{
          background:
            "linear-gradient(90deg, hsl(215, 25%, 12%) 0%, hsl(215, 25%, 10%) 100%)",
          color: "hsl(210, 40%, 98%)",
          border: "1px solid hsl(215, 20%, 25%)",
        }}
      >
        <div
          className="card-header"
          style={{
            backgroundColor: "hsl(215, 25%, 12%)",
            borderBottom: "1px solid hsl(215, 20%, 25%)",
          }}
        >
          <h5 className="mb-0 fw-semibold">Permission Requests</h5>
        </div>

        <div className="card-body">
          {permissionRequests.length === 0 ? (
            <p className="text-muted text-center mb-0">
              No permission requests
            </p>
          ) : (
            permissionRequests.map((req) => (
              <div
                key={req.id}
                className="p-3 mb-3 rounded d-flex justify-content-between align-items-center"
                style={{
                  backgroundColor: "hsl(215, 25%, 14%)",
                  border: "1px solid hsl(215, 20%, 25%)",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedRequest(req)} // ← OPEN MODAL
              >
                <div>
                  <h6 className="fw-bold mb-1">{req.userName}</h6>

                  <div className="text-muted small d-flex gap-4">
                    <span>{req.itemName}</span>
                    <span>{req.dateRequested}</span>
                    <span>Qty: {req.quantity}</span>
                  </div>
                </div>

                <span className="text small">Click for details →</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedRequest && (
        <PermissionRequestModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onApprove={onApprove}
          onReject={onReject}
        />
      )}
    </>
  );
};

export default PermissionRequests;
