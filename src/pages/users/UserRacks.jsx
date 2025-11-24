// src/pages/users/UserRacks.jsx
import React, { useState, useEffect, useRef } from "react";

const ItemCard = ({ item }) => {
  const totalTaken = (item.taken || []).reduce((acc, t) => acc + (t.qty || 0), 0);
  const remaining = item.quantity - totalTaken;

  return (
    <div
      style={{
        background: "hsl(215,25%,14%)",
        padding: 10,
        borderRadius: 8,
        border: "1px solid hsl(215,20%,25%)",
      }}
    >
      <div className="fw-bold">{item.name}</div>
      <div className="small text-muted">
        Total: {item.quantity} • Remaining: {remaining}
      </div>
    </div>
  );
};

const UserRacks = ({ containers = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const highlightRef = useRef(null);

  // 🔍 Search Handler
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResult("Enter item name to search.");
      return;
    }

    let foundSlot = null;
    let foundContainer = null;

    containers.forEach((c) => {
      c.slots.forEach((slot) => {
        slot.items.forEach((item) => {
          if (item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
            foundSlot = slot.slotNumber;
            foundContainer = c.id;
          }
        });
      });
    });

    if (!foundSlot) {
      setSearchResult("Item not found.");
      return;
    }

    setSearchResult(`Found in ${foundContainer}, Slot ${foundSlot}`);

    const el = document.getElementById(`rack-${foundContainer}-slot-${foundSlot}`);

    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });

      el.style.transition = "box-shadow 0.4s ease";
      el.style.boxShadow = "0 0 12px 5px skyblue";

      // Remove highlight after 2 seconds
      setTimeout(() => {
        el.style.boxShadow = "none";
      }, 2000);
    }
  };

  return (
    <div className="container my-4">
      <h2 className="fw-bold mb-2">Racks & Items</h2>
      <p className="text-muted">View of racks and items</p>

      {/* 🔍 Search Bar */}
      <div className="d-flex gap-2 mb-3 ">
        <input
          type="text"
          placeholder="Search item name..."
          className="form-control"
          style={{
            maxWidth: 300,
            background: "hsl(215,25%,12%)",
            color: "white",
            border: "1px solid hsl(215,20%,25%)",
            width: "100%",
          }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>

      {searchResult && <p className="text-info small">{searchResult}</p>}

      <div className="row g-3">
        {containers.map((c) => (
          <div key={c.id} className="col-12">
            <div
              className="card p-3 mb-3"
              style={{
                background: "hsl(215,25%,12%)",
                border: "1px solid hsl(215,20%,25%)",
                color: "white",
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="mb-0">{c.name}</h5>
                <div className="text-muted small">Slots: {c.slots.length}</div>
              </div>

              <div className="row g-2">
                {c.slots.map((slot) => (
                  <div
                    key={slot.slotNumber}
                    id={`rack-${c.id}-slot-${slot.slotNumber}`}
                    className="col-12 col-sm-6 col-md-4 col-lg-3"
                    style={{ scrollMarginTop: "120px" }}
                  >
                    <div style={{ padding: 10 }}>
                      <div className="text-muted small mb-1">
                        Slot #{slot.slotNumber}
                      </div>

                      {slot.items.length === 0 ? (
                        <div className="small text-muted">No items</div>
                      ) : (
                        slot.items.map((it) => (
                          <ItemCard key={it.id} item={it} />
                        ))
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserRacks;
