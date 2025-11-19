// components/admin/racks/SlotCard.jsx
//--------------------------------------------------
// Shows slot info EXACTLY like your UI:
// • Slot number
// • Container name
// • Item name
// • Total Qty
// • Item types count
// • Occupied / Empty badge
// NO returnable/non-returnable badges
//--------------------------------------------------

import React from "react";
import { Package } from "lucide-react";

const SlotCard = ({ slot }) => {
  const items = slot.items || [];
  const hasItems = items.length > 0;

  const totalQty = items.reduce((sum, it) => sum + (it.quantity || 0), 0);

  return (
    <div
      className="p-3 rounded shadow-sm h-100"
      style={{
        backgroundColor: "hsl(215, 25%, 14%)",
        border: "1px solid hsl(215, 20%, 25%)",
        cursor: "pointer",
      }}
    >
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="d-flex align-items-center gap-2">
          <Package size={18} className="text-info" />
          <div>
            <div className="fw-bold">Slot {slot.slotNumber}</div>
            <div className="small text-muted">{slot.containerName}</div>
          </div>
        </div>

        {/* Occupied or Empty */}
        <span
          className={`badge ${
            hasItems ? "bg-success" : "bg-secondary"
          }`}
        >
          {hasItems ? "Occupied" : "Empty"}
        </span>
      </div>

      {/* SLOT CONTENT */}
      {hasItems ? (
        <>
          {/* Show first item name */}
          <div className="fw-bold text-light">{items[0].name}</div>

          {/* Total Quantity */}
          <div className="text-info small fw-bold">
            Total Qty: {totalQty}
          </div>

          {/* Items count */}
          <div className="small text-muted">
            {items.length} item types in this slot
          </div>
        </>
      ) : (
        <div className="text-muted small">Empty slot</div>
      )}
    </div>
  );
};

export default SlotCard;
