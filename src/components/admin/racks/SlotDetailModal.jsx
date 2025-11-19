
// Slot Detail + Add Item + Take Item Modal
// Shows ALL items in a slot (was showing only items[0])

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
  const [showTakeModal, setShowTakeModal] = useState(false);       //which item/ how many/ returnable or not/ when return
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [takeQty, setTakeQty] = useState(1);
  const [takeReturnable, setTakeReturnable] = useState(false);
  const [takeReturnDate, setTakeReturnDate] = useState("");

  // New item state (minimal fields only)
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
    }
  }, [show]);

  // If no slot selected, return nothing
  if (!slot) return null;

  const items = slot.items || [];         //Prepare items

  // helper: find item object by id
  const findItemById = (id) => items.find((it) => it.id === id) || null;

  // Remaining qty for a given item object
  const remainingQty = (it) => {
    if (!it) return 0;
    const used = (it.taken || []).reduce((s, t) => s + Number(t.qty || 0), 0);
    return Number(it.quantity || 0) - used;
  };

  // Add item handler (keeps minimal fields only)
  const submitAddItem = () => {
    if (!newItem.name.trim()) return;

    const itemObj = {
      id: Date.now().toString(),
      name: newItem.name.trim(),
      quantity: Number(newItem.quantity) || 1,
      isReturnable: false,
      taken: [],
    };

    // parent will handle adding item into slot
    onAddItem(containerId, slot.slotNumber, itemObj);

    setShowAddForm(false);
    onClose();
  };

 //Open Take Item Modal
  const openTakeModalFor = (item) => {
    setSelectedItemId(item.id);
    setTakeQty(1);
    setTakeReturnable(false);
    setTakeReturnDate("");
    setShowTakeModal(true);
  };

 
  // Confirm taking item
  const handleTakeItem = () => {
    const item = findItemById(selectedItemId);
    if (!item) return;

    const available = remainingQty(item);
    const qtyToTake = Number(takeQty) || 0;
    if (qtyToTake < 1 || qtyToTake > available) {
      // basic guard: don't proceed if invalid
      // you can replace with UI toast
      alert(`Enter a valid quantity (1 .. ${available})`);
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    const record = {
      user: "Ramesh",
      qty: qtyToTake,
      date: today,
      returnDate: takeReturnable ? takeReturnDate || null : null,
    };

    // mutate the in-memory mock data for now (same pattern as earlier)
    item.taken = item.taken || [];
    item.taken.push(record);

    // NOTE: item.quantity represents original total. We keep it,
    // remaining is calculated from taken[]. If you used earlier pattern
    // where item.quantity is reduced directly, uncomment below:
    // item.quantity = Number(item.quantity) - qtyToTake;

    // close the modal and parent detail modal to refresh UI
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
          {/* Empty slot message */}
          {items.length === 0 && !showAddForm && (
            <p className="text-muted">This slot is empty.</p>
          )}

          {/* Display ALL items */}
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
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <strong>{it.name}</strong>
                    <div className="small text-muted">Total: {it.quantity}</div>
                  </div>

                  <div className="text-end small">
                    {/* {it.isReturnable ? (
                      <span className="text-info">Returnable</span>
                    ) : (
                      <span className="text-warning">Non-returnable</span>
                    )} */}
                    <div>Remaining: {remainingQty(it)}</div>
                  </div>
                </div>

                {/* taken history */}
                {it.taken?.length > 0 && (
                  <div className="mt-3 small">
                    <strong>Taken history:</strong>
                    {it.taken.map((t, idx) => (
                      <div key={idx} className="text-muted">
                        • {t.user} — Qty {t.qty} — {t.date}{" "}
                        {t.returnDate ? `→ Return: ${t.returnDate}` : "(Not returned)"}
                      </div>
                    ))}
                  </div>
                )}

                {/* Actions for this item */}
                <div className="d-flex justify-content-end mt-2 gap-2">
              <Button
                variant="secondary"
                    disabled={remainingQty(it) === 0}
                     onClick={() => {
                     if (remainingQty(it) > 0) { openTakeModalFor(it);
                        }
                       }}>
                          Take
              </Button>

             
                  {/* Add item button stays global below — don't add second add here */}
                </div>
              </div>
            ))}

          {/* Add new item form (minimal: name + qty) */}
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
                    setNewItem({ ...newItem, quantity: Number(e.target.value) })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>

        <Modal.Footer>
          {/* Take is shown per-item above, keep Add Item global */}
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

      {/* Take modal (operates on selectedItemId) */}
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
