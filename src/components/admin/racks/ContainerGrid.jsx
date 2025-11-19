// components/admin/racks/ContainerGrid.jsx
//--------------------------------------------------
// CLEAN + FIXED + WORKS WITH items[] structure
// Handles: Add Slot, Delete Rack, Delete Slot,
// Slot Detail Modal, Add Item Modal, Filters
//--------------------------------------------------

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import SlotCard from "./SlotCard";
import SlotDetailModal from "./SlotDetailModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

const ContainerGrid = ({
  container,
  activeFilter = "All",
  onAddSlot,
  onDeleteRack,
  onDeleteSlot,
  onAddItem,
}) => {
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [showSlotModal, setShowSlotModal] = useState(false);
  const [showDeleteRackModal, setShowDeleteRackModal] = useState(false);
  const [showDeleteSlotModal, setShowDeleteSlotModal] = useState(false);

  const [slotToDelete, setSlotToDelete] = useState(null);

  // -----------------------------
  // FILTER LOGIC
  // -----------------------------
  const matchesFilter = (slot) => {
    const items = slot.items || [];
    const first = items[0];

    switch (activeFilter) {
      case "Returnable":
        return first && first.isReturnable;
      case "Non-returnable":
        return first && !first.isReturnable;
      case "Occupied":
        return items.length > 0;
      case "Empty":
        return items.length === 0;
      default:
        return true;
    }
  };

  // -----------------------------
  // SLOT CLICK HANDLER
  // -----------------------------
  const handleSlotClick = (slotNumber) => {
    const slotObj = container.slots.find((s) => s.slotNumber === slotNumber);
    if (!slotObj) return;

    setSelectedSlot(slotObj);
    setShowSlotModal(true);
  };

  // -----------------------------
  // DELETE SLOT HANDLER
  // -----------------------------
  const confirmDeleteSlot = () => {
    if (slotToDelete) {
      onDeleteSlot(container.id, slotToDelete);
    }
    setShowDeleteSlotModal(false);
  };

  // -----------------------------
  // DELETE RACK HANDLER
  // -----------------------------
  const confirmDeleteRack = () => {
    onDeleteRack(container.id);
    setShowDeleteRackModal(false);
  };

  return (
    <>
      {/* RACK CARD */}
      <div
        className="card shadow-sm my-3"
        style={{
          background:
            "linear-gradient(90deg, hsl(215, 25%, 12%) 0%, hsl(215, 25%, 10%) 100%)",
          color: "white",
          borderRadius: "10px",
        }}
      >
        <div className="card-header d-flex justify-content-between">
          <h5>{container.name}</h5>

          <div className="d-flex gap-2">
            {/* ADD SLOT */}
            <button
              className="btn btn-sm btn-outline-light"
              onClick={() => onAddSlot(container.id)}
            >
              + Slot
            </button>

            {/* DELETE RACK */}
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => setShowDeleteRackModal(true)}
            >
              🗑
            </button>
          </div>
        </div>

        {/* SLOTS */}
        <div className="card-body">
          <div className="row g-3">
            {container.slots.map((slot) => (
              <div
                key={slot.slotNumber}
                className="col-12 col-sm-6 col-md-4 col-lg-3"
                onClick={() => handleSlotClick(slot.slotNumber)}
                style={{
                  cursor: "pointer",
                  opacity: matchesFilter(slot) ? 1 : 0.35,
                }}
              >
                <SlotCard
                  slot={slot}
                  containerName={container.name}
                  containerId={container.id}
                  onAddItemButton={(id, slotNum) => {
                    const slotObj = container.slots.find(
                      (s) => s.slotNumber === slotNum
                    );
                    setSelectedSlot(slotObj);
                    setShowSlotModal(true);
                  }}
                  onDeleteSlot={(id, slotNum) => {
                    setSlotToDelete(slotNum);
                    setShowDeleteSlotModal(true);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------------------------- */}
      {/* SLOT DETAIL MODAL */}
      {/* ---------------------------- */}
      <SlotDetailModal
        show={showSlotModal}
        onClose={() => setShowSlotModal(false)}
        slot={selectedSlot}
        containerId={container.id}
        onAddItem={onAddItem}
        onDeleteSlot={() => {
          setSlotToDelete(selectedSlot?.slotNumber);
          setShowSlotModal(false);
          setShowDeleteSlotModal(true);
        }}
      />

      {/* ---------------------------- */}
      {/* CONFIRM DELETE RACK */}
      {/* ---------------------------- */}
      <DeleteConfirmModal
        show={showDeleteRackModal}
        title="Delete Rack?"
        message={`Are you sure you want to delete rack "${container.name}"?`}
        onConfirm={confirmDeleteRack}
        onCancel={() => setShowDeleteRackModal(false)}
      />

      {/* ---------------------------- */}
      {/* CONFIRM DELETE SLOT */}
      {/* ---------------------------- */}
      <DeleteConfirmModal
        show={showDeleteSlotModal}
        title="Delete Slot?"
        message={`Delete slot ${slotToDelete}? All items inside will be removed.`}
        onConfirm={confirmDeleteSlot}
        onCancel={() => setShowDeleteSlotModal(false)}
      />
    </>
  );
};

export default ContainerGrid;
