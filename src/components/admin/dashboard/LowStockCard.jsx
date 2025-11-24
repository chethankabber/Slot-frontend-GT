// components/admin/dashboard/LowStockCard.jsx
import React from "react";

const LowStockCard = ({ containers = [], onJumpToSlot }) => {
  const lowItems = [];

  // Build list of low-stock items
  containers.forEach((rack) => {
    rack.slots.forEach((slot) => {
      (slot.items || []).forEach((item) => {
        const totalTaken = (item.taken || []).reduce(
          (sum, t) => sum + Number(t.qty || 0),
          0
        );

        const remaining = Number(item.quantity || 0) - totalTaken;

        if (remaining < 6) {
          lowItems.push({
            itemName: item.name,
            remaining,
            rackName: rack.name,
            slotNumber: slot.slotNumber,
            containerId: rack.id,
          });
        }
      });
    });
  });

  return (
    <div
      className="card shadow-sm"
      style={{
        background: "hsl(215, 25%, 12%)",
        border: "1px solid hsl(215, 20%, 25%)",
        color: "white",
        height: "100%",
      }}
    >
      <div className="card-header fw-bold">Limited Stock Items</div>

      <div
        className="card-body"
        style={{
          maxHeight: "320px",
          overflowY: "auto",
          paddingRight: "6px",
        }}
      >
        {lowItems.length === 0 ? (
          <p className="text-muted">No low-stock items.</p>
        ) : (
          lowItems.map((it, idx) => (
            <div
              key={idx}
              className="d-flex justify-content-between align-items-center p-3 mb-3 rounded"
              style={{
                background: "hsl(215, 25%, 16%)",
                border: "1px solid hsl(215, 20%, 25%)",
              }}
            >
              <div style={{ flex: 1 }}>
                <div className="fw-semibold">{it.itemName}</div>

                <div className="text-muted small">
                  Remaining: <strong className="text-white">{it.remaining}</strong>
                </div>

                <div className="text-muted small">
                  {it.rackName} • Slot {it.slotNumber}
                </div>
              </div>

              {/* MOVE BUTTON */}
              <button
                   className="btn btn-secondary btn-sm ms-3"
                     onClick={() => onJumpToSlot(it.containerId, it.slotNumber)}
                     >
                         Move >>
                 </button>

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LowStockCard;
