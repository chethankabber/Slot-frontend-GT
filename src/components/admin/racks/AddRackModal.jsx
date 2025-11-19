import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddRackModal = ({ show, onClose, onCreate }) => {
  const [rackName, setRackName] = useState("");
  const [slotCount, setSlotCount] = useState(1); // NEW: user enters number of slots

  const handleCreate = () => {
    if (!rackName.trim()) {
      alert("Please enter a rack name");
      return;
    }
    if (slotCount < 1) {
      alert("Slot count must be at least 1");
      return;
    }

    const newRack = {
      id: Date.now().toString(),
      name: rackName,
      slots: Array.from({ length: slotCount }, (_, i) => ({
        slotNumber: i + 1,
        items: [], // empty slot
      })),
    };

    onCreate(newRack);

    setRackName("");
    setSlotCount(1);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Rack</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {/* Rack Name */}
          <Form.Group>
            <Form.Label>Rack Name</Form.Label>
            <Form.Control
              placeholder="Enter rack name"
              value={rackName}
              onChange={(e) => setRackName(e.target.value)}
            />
          </Form.Group>

          {/* Number of Slots (NEW FIELD) */}
          <Form.Group className="mt-3">
            <Form.Label>Number of Slots</Form.Label>
            <Form.Control
              type="number"
              min="1"
              placeholder="Enter number of slots"
              value={slotCount}
              onChange={(e) => setSlotCount(Number(e.target.value))}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleCreate}>
          Create Rack
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddRackModal;
