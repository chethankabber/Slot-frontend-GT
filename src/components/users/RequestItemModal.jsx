import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

/**
 * Props:
 *  - show, onClose
 *  - onSubmit(requestObj) -> parent will add to permissionRequests
 *  - currentUser { name, email } (optional)
 */
const RequestItemModal = ({ show, onClose, onSubmit, currentUser = { name: "User A", email: "user@gmail.com" } }) => {
  const [form, setForm] = useState({
    itemName: "",
    quantity: 1,
    whichProject: "",
    itemType: "Returnable",
    returnDate: "",
    message: "",
  });

  useEffect(() => {
    if (!show) {
      setForm({
        itemName: "",
        quantity: 1,
        whichProject: "",
        itemType: "Returnable",
        returnDate: "",
        message: "",
      });
    }
  }, [show]);

  const submit = () => {
    if (!form.itemName.trim()) {
      alert("Enter item name");
      return;
    }

    const req = {
      id: Date.now().toString(),
      userName: currentUser.name,
      userEmail: currentUser.email,
      itemName: form.itemName.trim(),
      quantity: Number(form.quantity || 1),
      itemType: form.itemType,
      returnDate: form.itemType === "Returnable" ? form.returnDate || null : null,
      whichProject: form.whichProject || "",
      message: form.message || "",
      dateRequested: new Date().toISOString().split("T")[0],
      status: "Pending",
    };

    onSubmit && onSubmit(req);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Request Item</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Item Name</Form.Label>
            <Form.Control value={form.itemName} onChange={(e) => setForm({ ...form, itemName: e.target.value })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control type="number" min={1} value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Project</Form.Label>
            <Form.Control value={form.whichProject} onChange={(e) => setForm({ ...form, whichProject: e.target.value })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Returnable</Form.Label>
            <Form.Select value={form.itemType} onChange={(e) => setForm({ ...form, itemType: e.target.value })}>
              <option value="Returnable">Returnable</option>
              <option value="Non-returnable">Non-returnable</option>
            </Form.Select>
          </Form.Group>

          {form.itemType === "Returnable" && (
            <Form.Group className="mb-3">
              <Form.Label>Return Date</Form.Label>
              <Form.Control type="date" value={form.returnDate} onChange={(e) => setForm({ ...form, returnDate: e.target.value })} />
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={submit}>Send Request</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RequestItemModal;
