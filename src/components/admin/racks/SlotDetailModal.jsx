// Slot Detail + Add Item + Take Item Modal
// Shows ALL items in a slot and allows giving items to someone.

import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const SlotDetailModal = ({
  show,
  onClose,
  slot,
  containerId,
  onAddItem,
}) => {
  // Hooks (Show/Hide Add Item Form)
  const [showAddForm, setShowAddForm] = useState(false);

  // Take modal state
  const [showTakeModal, setShowTakeModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [takeQty, setTakeQty] = useState(1);
  const [takeReturnable, setTakeReturnable] = useState(false);
  const [takeReturnDate, setTakeReturnDate] = useState("");
  const [givenTo, setGivenTo] = useState(""); // ⭐ NEW FIELD

  // New item state
  const [newItem, setNewItem] = useState({
    name: "",
    quantity: 1,
  });

  // reset when modal closes
  useEffect(() => {
    if (!show) {
      setShowAddForm(false);
      setShowTakeModal(false);
      setSelectedItemId(null);
      setNewItem({ name: "", quantity: 1 });
      setTakeQty(1);
      setTakeReturnable(false);
      setTakeReturnDate("");
      setGivenTo(""); // ⭐ RESET
    }
  }, [show]);

  if (!slot) return null;

  const items = slot.items || [];

  const findItemById = (id) => items.find((it) => it.id === id) || null;

  const remainingQty = (it) => {
    if (!it) return 0;
    const used = (it.taken || []).reduce((s, t) => s + Number(t.qty || 0), 0);
    return Number(it.quantity || 0) - used;
  };

  const submitAddItem = () => {
    if (!newItem.name.trim()) return;

    const itemObj = {
      id: Date.now().toString(),
      name: newItem.name.trim(),
      quantity: Number(newItem.quantity) || 1,
      isReturnable: false,
      taken: [],
    };

    onAddItem(containerId, slot.slotNumber, itemObj);

    setShowAddForm(false);
    onClose();
  };

  // Open Take modal
  const openTakeModalFor = (item) => {
    setSelectedItemId(item.id);
    setTakeQty(1);
    setTakeReturnable(false);
    setTakeReturnDate("");
    setGivenTo(""); // ⭐ RESET
    setShowTakeModal(true);
  };

  // Confirm taking item
  const handleTakeItem = () => {
    const item = findItemById(selectedItemId);
    if (!item) return;

    const available = remainingQty(item);
    const qtyToTake = Number(takeQty) || 0;

    if (qtyToTake < 1 || qtyToTake > available) {
      alert(`Enter a valid quantity (1 .. ${available})`);
      return;
    }

    if (!givenTo.trim()) {
      alert("Please enter the name of the person receiving the item.");
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    const record = {
      user: givenTo.trim(), // ⭐ NEW FIELD STORED
      qty: qtyToTake,
      date: today,
      returnDate: takeReturnable ? takeReturnDate || null : null,
    };

    item.taken = item.taken || [];
    item.taken.push(record);

    // Close
    setShowTakeModal(false);
    onClose();
  };

  return (
    <>
      <Modal show={show} onHide={onClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Slot {slot.slotNumber} — Details</Modal.Title>
        </Modal.Header>

        <Modal.Body
          style={{
            backgroundColor: "hsl(215, 25%, 12%)",
            color: "white",
          }}
        >
          {items.length === 0 && !showAddForm && (
            <p className="text-muted">This slot is empty.</p>
          )}

          {!showAddForm &&
            items.map((it) => (
              <div
                key={it.id}
                className="p-3 mb-3 rounded"
                style={{
                  backgroundColor: "hsl(215, 25%, 16%)",
                  border: "1px solid hsl(215, 20%, 25%)",
                }}
              >
                <div className="d-flex justify-content-between">
                  <div>
                    <strong>{it.name}</strong>
                    <div className="small text-muted">Total: {it.quantity}</div>
                  </div>

                  <div className="text-end small">
                    <div>Remaining: {remainingQty(it)}</div>
                  </div>
                </div>

                {it.taken?.length > 0 && (
                  <div className="mt-3 small">
                    <strong>Taken history:</strong>
                    {it.taken.map((t, idx) => (
                      <div key={idx} className="text-muted">
                        • {t.user} — Qty {t.qty} — {t.date}{" "}
                        {t.returnDate
                          ? `→ Return: ${t.returnDate}`
                          : "(Not returned)"}
                      </div>
                    ))}
                  </div>
                )}

                <div className="d-flex justify-content-end mt-2 gap-2">
                  <Button
                    variant="secondary"
                    disabled={remainingQty(it) === 0}
                    onClick={() => openTakeModalFor(it)}
                  >
                    Give
                  </Button>
                </div>
              </div>
            ))}

          {/* Add new item */}
          {showAddForm && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem({ ...newItem, name: e.target.value })
                  }
                  placeholder="Enter item name"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  value={newItem.quantity}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      quantity: Number(e.target.value),
                    })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>

        <Modal.Footer>
          {!showAddForm && (
            <Button variant="primary" onClick={() => setShowAddForm(true)}>
              + Add Item
            </Button>
          )}

          {showAddForm && (
            <>
              <Button variant="secondary" onClick={() => setShowAddForm(false)}>
                Back
              </Button>
              <Button variant="primary" onClick={submitAddItem}>
                Save Item
              </Button>
            </>
          )}

          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Take Item Modal */}
      <Modal
        show={showTakeModal}
        onHide={() => setShowTakeModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Take Item — {findItemById(selectedItemId)?.name || ""}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            <strong>Available:</strong>{" "}
            {remainingQty(findItemById(selectedItemId))}
          </p>

          <Form.Group className="mb-3">
            <Form.Label>Qty to Take</Form.Label>
            <Form.Control
              type="number"
              min="1"
              max={remainingQty(findItemById(selectedItemId))}
              value={takeQty}
              onChange={(e) => setTakeQty(Number(e.target.value))}
            />
          </Form.Group>

          {/* ⭐ NEW FIELD: GIVEN TO */}
          <Form.Group className="mb-3">
            <Form.Label>Given To (Person Name)</Form.Label>
            <Form.Control
              placeholder="Enter person name"
              value={givenTo}
              onChange={(e) => setGivenTo(e.target.value)}
            />
          </Form.Group>

          <Form.Check
            type="switch"
            label={takeReturnable ? "Returnable" : "Non-returnable"}
            checked={takeReturnable}
            onChange={() => setTakeReturnable((s) => !s)}
          />

          {takeReturnable && (
            <Form.Group className="mt-3">
              <Form.Label>Return Date</Form.Label>
              <Form.Control
                type="date"
                value={takeReturnDate}
                onChange={(e) => setTakeReturnDate(e.target.value)}
              />
            </Form.Group>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTakeModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleTakeItem}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SlotDetailModal;
