
// This modal is used for adding a new item to a slot.
// Supports: name, qty, returnable, taken history (optional)
// Parent component handles the actual update in state.

import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

// Props received:
// show → whether modal should be visible
// onClose() → close the modal
// onSubmit(itemObj) → return created item to parent component
// slotNumber → which slot this item will be added to
const AddItemModal = ({ show, onClose, onSubmit, slotNumber }) => {
  const [data, setData] = useState({
    name: "",                                            //This object stores everything typed in the form.
    quantity: 1,
    isReturnable: true,
    takenBy: "",
    takenQty: 0,
    takenDate: "",
    returnDate: "",
  });

  // Reset the form every time modal closes
  const resetForm = () => {
    setData({
      name: "",
      quantity: 1,
      isReturnable: true,
      takenBy: "",
      takenQty: 0,
      takenDate: "",
      returnDate: "",
    });
  };

  // Submit handler If no name → do nothing. 
  const handleSubmit = () => {
    if (!data.name.trim()) return;

    const newItem = {                    //Create new item object. unique ID using timestamp
      id: Date.now().toString(),
      name: data.name,
      quantity: Number(data.quantity),
      isReturnable: data.isReturnable,
      taken: [],                         //taken → array for taken history
    };

    // Optional taken entry. If the user filled taken details
    if (data.takenBy && data.takenQty > 0) {
      newItem.taken.push({
        user: data.takenBy,
        qty: Number(data.takenQty),
        date: data.takenDate,
        returnDate: data.isReturnable ? data.returnDate : null,
      });
    }

    onSubmit(newItem); // send item to parent AND close modal
    resetForm();
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered size="md">
      <Modal.Header closeButton>
        <Modal.Title>Add Item to Slot {slotNumber}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {/* Item Name */}
          <Form.Group className="mb-3">
            <Form.Label>Item Name</Form.Label>
            <Form.Control
              value={data.name}
              onChange={(e) =>
                setData({ ...data, name: e.target.value })
              }
              placeholder="Enter item name"
            />
          </Form.Group>

          {/* Quantity */}
          <Form.Group className="mb-3">
            <Form.Label>Total Quantity</Form.Label>
            <Form.Control
              type="number"
              min="1"
              value={data.quantity}
              onChange={(e) =>
                setData({ ...data, quantity: Number(e.target.value) })
              }
            />
          </Form.Group>

          {/* Returnable Switch */}
          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              label={
                data.isReturnable
                  ? "Returnable Item"
                  : "Non-returnable Item"
              }
              checked={data.isReturnable}
              onChange={(e) =>
                setData({ ...data, isReturnable: e.target.checked })
              }
            />
          </Form.Group>

          {/* Optional taken section */}
          <hr />
          <div className="text-muted small mb-2">
            Optional — Add taken history now:
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Taken By</Form.Label>
            <Form.Control
              value={data.takenBy}
              onChange={(e) =>
                setData({ ...data, takenBy: e.target.value })
              }
              placeholder="User name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Taken Quantity</Form.Label>
            <Form.Control
              type="number"
              min="0"
              value={data.takenQty}
              onChange={(e) =>
                setData({ ...data, takenQty: Number(e.target.value) })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Taken Date</Form.Label>
            <Form.Control
              type="date"
              value={data.takenDate}
              onChange={(e) =>
                setData({ ...data, takenDate: e.target.value })
              }
            />
          </Form.Group>

          {/* Return date only if returnable */}
          {data.isReturnable && (
            <Form.Group className="mb-3">
              <Form.Label>Expected Return Date</Form.Label>
              <Form.Control
                type="date"
                value={data.returnDate}
                onChange={(e) =>
                  setData({ ...data, returnDate: e.target.value })
                }
              />
            </Form.Group>
          )}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>

        <Button variant="primary" onClick={handleSubmit}>
          Add Item
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddItemModal;
