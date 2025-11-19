
// Handles: Add Rack, Add Slot, Add Item, Delete Slot, Delete Rack,
// Filters, Search Integration (if needed).


import React, { useState } from "react";
import { mockContainers as initialMock } from "../data/Mockdata";
import SearchBar from "../components/admin/SearchBar";

import AddRackModal from "../components/admin/racks/AddRackModal";
import ContainerGrid from "../components/admin/racks/ContainerGrid";


const Containers = () => {
 
  // It loads initialMock, but makes sure every slot has an items[] array
  // (Convert mock data to ensure each slot has items array) 
  const [containers, setContainers] = useState(() =>
    initialMock.map((c) => ({
      ...c,
      slots: c.slots.map((s) => ({
        ...s,
        items: s.items ? [...s.items] : [],
      })),
    }))
  );

  const [activeFilter, setActiveFilter] = useState("All");           
  const [searchResult, setSearchResult] = useState("");            //Used to show small messages
  const [showRackModal, setShowRackModal] = useState(false);         //Modal state for Add Rack

  // ADD RACK
  const handleCreateRack = (rackName) => {
    const newId = (containers.length + 1).toString();
       
    const newRack = {
      id: newId,
      name: rackName,
      slots: [
        {
          slotNumber: 1,
          items: [],
        },
      ],
    };

    setContainers((prev) => [...prev, newRack]);
    setSearchResult(`Created ${rackName}`);

    setTimeout(() => setSearchResult(""), 2000);
  };


  // ADD SLOT
  const handleAddSlot = (containerId) => {
    setContainers((prev) =>
      prev.map((c) => {
        if (c.id !== containerId) return c;
        const newSlotNumber = c.slots.length + 1;

        return {
          ...c,
          slots: [...c.slots, { slotNumber: newSlotNumber, items: [] }],
        };
      })
    );

    setSearchResult("Slot added");
    setTimeout(() => setSearchResult(""), 1500);
  };

  
  // ADD ITEM INTO SLOT
  
  const handleAddItem = (containerId, slotNumber, itemObj) => {
    setContainers((prev) =>
      prev.map((c) => {
        if (c.id !== containerId) return c;

        return {
          ...c,
          slots: c.slots.map((slot) =>
            slot.slotNumber === slotNumber
              ? { ...slot, items: [...slot.items, itemObj] }
              : slot
          ),
        };
      })
    );
  };

  // DELETE SLOT
  const handleDeleteSlot = (containerId, slotNumber) => {
    setContainers((prev) =>
      prev.map((c) => {
        if (c.id !== containerId) return c;

        return {
          ...c,
          slots: c.slots.filter((slot) => slot.slotNumber !== slotNumber),
        };
      })
    );
  };

  
  // DELETE RACK
  const handleDeleteRack = (containerId) => {
    setContainers((prev) =>
      prev.filter((c) => c.id !== containerId)
    );
  };


  // FILTER CHANGE
  const onFilterChange = (f) => {
    setActiveFilter(f);
    setSearchResult(`Filter: ${f}`);
    setTimeout(() => setSearchResult(""), 1200);
  };

  return (
    <div className="container my-4">
      <div className="mb-4 d-flex justify-content-between align-items-start flex-column flex-md-row gap-3">
        <div>
          <h2 className="fw-bold mb-1">Container Management</h2>
          <p className="text-muted">Manage all your racks and slots</p>
        </div>

        <div className="d-flex gap-2 align-items-center">
          <button
            className="btn btn-secondary"
            onClick={() => setShowRackModal(true)}
          >
            + Add Rack
          </button>
        </div>
      </div>

      {/* ---SEARCH BAR ------ */}
      <div className="mb-4">
        <SearchBar
          containers={containers}
          onFilterChange={onFilterChange}
          setSearchResult={setSearchResult}
        />

        {searchResult && (
          <div className="alert alert-info mt-3" role="alert">
            {searchResult}
          </div>
        )}
      </div>

      {/* -------- RACK LIST ---------- */}
      <div className="d-flex flex-column gap-4">
        {containers.map((container) => (
          <ContainerGrid
            key={container.id}
            container={container}
            activeFilter={activeFilter}
            onAddSlot={handleAddSlot}
            onDeleteRack={handleDeleteRack}
            onDeleteSlot={handleDeleteSlot}
            onAddItem={handleAddItem}
          />
        ))}
      </div>

      {/* ----- ADD RACK MODAL ------ */}
      <AddRackModal
        show={showRackModal}
        onClose={() => setShowRackModal(false)}
        onCreate={(rack) => setContainers([...containers, rack])}
      />
    </div>
  );
};

export default Containers;
