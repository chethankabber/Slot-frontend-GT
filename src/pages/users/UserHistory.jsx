import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Search, Calendar, Package } from "lucide-react";

const UserHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  // ---------------------- DUMMY USER HISTORY ----------------------
  const userHistory = [
    {
      id: 1,
      item: "MacBook Air",
      qty: 1,
      project: "Slot Management",
      returnable: true,
      takenDate: "2025-01-10",
      returnedDate: "2025-01-14",
      status: "Returned",
    },
    {
      id: 2,
      item: "Surface Pro",
      qty: 1,
      project: "Management",
      returnable: true,
      takenDate: "2025-02-02",
      returnedDate: null,
      status: "Not Returned",
    },
    {
      id: 3,
      item: "HDMI Cable",
      qty: 2,
      project: "Development",
      returnable: false,
      takenDate: "2025-01-20",
      returnedDate: "-",
      status: "Non-Returnable",
    },
    
  ];

  // ---------------------- FILTER LOGIC ----------------------
  const filtered = userHistory.filter((h) => {
    const search =
      h.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.project.toLowerCase().includes(searchTerm.toLowerCase());

    const type =
      filterType === "all" ||
      h.status.toLowerCase() === filterType.toLowerCase();

    return search && type;
  });

  return (
    <div className="container my-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold mb-1">My History</h2>
        <p className="text-muted">All items you borrowed earlier</p>
      </div>

      {/* Search + Filter */}
      <div
        className="card p-3 mb-4"
        style={{
          background:
            "linear-gradient(90deg, hsl(215,25%,12%) 0%, hsl(215,25%,10%) 100%)",
          color: "white",
          border: "1px solid hsl(215,20%,25%)",
        }}
      >
        <div className="row g-3">
          {/* Search */}
          <div className="col-md-6 d-flex align-items-center">
            <Search size={18} className="text-muted me-2" />
            <input
              type="text"
              className="form-control"
              placeholder="Search item or project..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter */}
          <div className="col-md-4">
            <select
              className="form-select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="returned">Returned</option>
              <option value="not returned">Not Returned</option>
              <option value="non-returnable">Non-Returnable</option>
            </select>
          </div>
        </div>
      </div>

      {/* History Cards */}
      <div className="d-flex flex-column gap-3">
        {filtered.length > 0 ? (
          filtered.map((h) => (
            <div
              key={h.id}
              className="card p-3"
              style={{
                background:
                  "linear-gradient(90deg, hsl(215,25%,12%) 0%, hsl(215,25%,10%) 100%)",
                border: "1px solid hsl(215,20%,25%)",
                color: "white",
              }}
            >
              <div className="d-flex justify-content-between">
                {/* Left side */}
                <div>
                  <h6 className="fw-bold mb-1">
                    <Package size={16} className="me-1" />
                    {h.item}
                  </h6>

                  <p className="text-muted small mb-1">Project: {h.project}</p>

                  <div className="text-muted small d-flex align-items-center gap-2">
                    <Calendar size={14} /> Taken: {h.takenDate}
                    <Calendar size={14} className="ms-3" /> Returned:{" "}
                    {h.returnedDate || "Not Returned"}
                  </div>
                </div>

                {/* Status */}
                <div className="fw-bold">
                  {h.status === "Returned" && (
                    <span style={{ color: "lightgreen" }}>{h.status}</span>
                  )}
                  {h.status === "Not Returned" && (
                    <span style={{ color: "orange" }}>{h.status}</span>
                  )}
                  {h.status === "Non-Returnable" && (
                    <span style={{ color: "skyblue" }}>{h.status}</span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-muted text-center mt-4">No records found.</div>
        )}
      </div>
    </div>
  );
};

export default UserHistory;
