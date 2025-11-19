import React, { useState, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const SearchBar = ({ containers = [], onFilterChange, setSearchResult }) => {
  const [term, setTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [showResults, setShowResults] = useState(false);

  
  // JUMP + SCROLL + HIGHLIGHT FUNCTION HERE

  const jumpToSlot = (containerId, slotNumber) => {
    const elementId = `rack-${containerId}-slot-${slotNumber}`;
    const el = document.getElementById(elementId);

    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });

      // highlight (flash yellow border)
      el.style.transition = "box-shadow 0.4s ease";
      el.style.boxShadow = "0 0 12px 5px black";

      setTimeout(() => {
        el.style.boxShadow = "none";
      }, 1500);

      setSearchResult?.(`Jumped to Rack ${containerId} • Slot ${slotNumber}`);
      setTimeout(() => setSearchResult?.(""), 1500);
    }
  };
  // ---------------------------------------------

  // SEARCH LOGIC — supports slot.items[]
  const matches = useMemo(() => {
    const q = term.trim().toLowerCase();
    if (!q || q.length < 2) return [];

    const out = [];
    containers.forEach((container) => {
      container.slots.forEach((slot) => {
        if (!slot.items || slot.items.length === 0) return;

        slot.items.forEach((item) => {
          if (item.name?.toLowerCase().includes(q)) {
            out.push({
              containerId: container.id,
              containerName: container.name,
              slotNumber: slot.slotNumber,
              itemName: item.name,
              status: item.isReturnable ? "Returnable" : "Non-returnable",
            });
          }
        });
      });
    });

    return out;
  }, [term, containers]);

  const handleFilter = (value) => {
    setFilter(value);
    onFilterChange?.(value);
    setSearchResult?.(`Filter: ${value}`);
    setTimeout(() => setSearchResult?.(""), 1500);
  };

  const clear = () => {
    setTerm("");
    setShowResults(false);
    setSearchResult?.("");
  };

  const onResultClick = (containerId, slotNumber) => {
    jumpToSlot(containerId, slotNumber);
    setShowResults(false);
  };

  return (
    <div>
      {/* Search + Filter */}
      <div className="d-flex gap-2 align-items-center flex-wrap">
        <div style={{ flex: 1 }}>
          <input
            value={term}
            onChange={(e) => {
              setTerm(e.target.value);
              setShowResults(true);
            }}
            className="form-control"
            placeholder="Search items (min 2 letters)"
          />
        </div>

        <div style={{ minWidth: 180 }}>
          <select
            className="form-select"
            value={filter}
            onChange={(e) => handleFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Returnable">Returnable</option>
            <option value="Non-returnable">Non-returnable</option>
            <option value="Occupied">Occupied</option>
            <option value="Empty">Empty</option>
          </select>
        </div>

        <button className="btn btn-outline-secondary" onClick={clear}>
          Reset
        </button>
      </div>

      {/* Search Results */}
      {showResults && term.trim().length > 1 && (
        <div
          className="mt-2 p-2 rounded"
          style={{
            backgroundColor: "hsl(215, 25%, 14%)",
            border: "1px solid hsl(215, 20%, 25%)",
            boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
          }}
        >
          {matches.length === 0 ? (
            <div className="small text-muted px-2 py-1">No items found.</div>
          ) : (
            matches.map((m, idx) => (
              <button
                key={`${m.containerId}-${m.slotNumber}-${idx}`}
                type="button"
                className="w-100 text-start border-0 rounded mb-2 p-3"
                onClick={() => onResultClick(m.containerId, m.slotNumber)}
                style={{
                  backgroundColor: "hsl(215, 25%, 16%)",
                  color: "hsl(210, 40%, 98%)",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "hsl(215, 25%, 22%)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "hsl(215, 25%, 16%)")
                }
              >
                <div className="fw-semibold">{m.itemName}</div>
                <div className="small text-secondary">
                  {m.containerName} • Slot {m.slotNumber} • {m.status}
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
