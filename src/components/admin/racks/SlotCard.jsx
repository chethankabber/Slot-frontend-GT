// components/admin/racks/SlotCard.jsx
import React from "react";
import { Package, Trash2 } from "lucide-react";

const SlotCard = ({ slot, containerId, onDeleteSlot, containerName }) => {
  const items = slot.items || [];
  const hasItems = items.length > 0;

  //Reduces all item quantities:
//   Example:
// item1.quantity = 5
// item2.quantity = 10
// Total = 15
  const totalQty = items.reduce(
    (sum, it) => sum + Number(it.quantity || 0),
    0
  );

  return (
    <div
      className="p-3 rounded shadow-sm h-100 position-relative"
      style={{
        backgroundColor: "hsl(215, 25%, 14%)",
        border: "1px solid hsl(215, 20%, 25%)",
      }}
    >
      {/* SLOT HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="d-flex align-items-center gap-2">
          <Package size={18} className="text-info" />
          <div>
            <div className="fw-bold">Slot {slot.slotNumber}</div>
            <div className="small text-muted">{containerName}</div>
          </div>
        </div>

        {/* Occupied / Empty */}
        <span className={`badge ${hasItems ? "bg-success" : "bg-secondary"}`}>
          {hasItems ? "Occupied" : "Empty"}
        </span>
      </div>

      {/* SLOT CONTENT */}
      {hasItems ? (
        <>
          <div className="fw-bold text-light">{items[0].name}</div>
          <div className="text-info small fw-bold">Total Qty: {totalQty}</div>
          <div className="small text-muted">
            {items.length} item types in this slot
          </div>
        </>
      ) : (
        <div className="text-muted small">Empty slot</div>
      )}

      {/* DELETE ICON (BOTTOM RIGHT) */}
      <Trash2
        size={20}
        className="position-absolute"
        style={{
          bottom: "10px",
          right: "10px",
          cursor: "pointer",
          opacity: 0.6,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.6)}
        onClick={(e) => {
          e.stopPropagation(); // prevent opening slot modal
          onDeleteSlot(containerId, slot.slotNumber);
        }}
      />
    </div>
  );
};

export default SlotCard;
