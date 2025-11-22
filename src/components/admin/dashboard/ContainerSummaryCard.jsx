import React from "react";
import { useNavigate } from "react-router-dom";
import { Package } from "lucide-react";

const ContainerSummaryCard = ({ container, basePath = "/admin/racks" }) => {
  const navigate = useNavigate();

  const occupied = container.slots.filter(
    (s) => s.items && s.items.length > 0
  ).length;

  const total = container.slots.length;
  const available = total - occupied;

  const percent = Math.round((occupied / total) * 100);

  return (
    <div
      className="card p-3 shadow-sm"
      style={{
        background:
          "linear-gradient(90deg, hsl(215, 25%, 12%) 0%, hsl(215, 25%, 10%) 100%)",
        color: "hsl(210, 40%, 98%)",
        border: "1px solid hsl(215, 20%, 25%)",
        cursor: "pointer",
      }}
      onClick={() => navigate(basePath)}   // ← FIXED HERE
    >
      <div className="d-flex align-items-center gap-2 mb-2">
        <Package size={22} className="text-secondary" />
        <h5 className="mb-0">{container.name}</h5>
      </div>

      <div className="small">Occupied</div>
      <div className="fw-bold text-primary">{occupied}/{total}</div>

      <div className="small mt-2">Available</div>
      <div className="fw-bold text-success">{available}</div>

      <div className="progress mt-3" style={{ height: "6px" }}>
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="text-center small mt-1">
        {percent}% Capacity
      </div>
    </div>
  );
};

export default ContainerSummaryCard;
