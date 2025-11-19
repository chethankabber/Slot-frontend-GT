import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddRackModal = ({ show, onClose, onCreate }) => {
  const [rackName, setRackName] = useState("");

  const handleSubmit = () => {
    if (!rackName.trim()) return;

    // send the name back to parent
    onCreate(rackName.trim());

    setRackName("");
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Rack</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Rack Name</Form.Label>
            <Form.Control
              placeholder="Enter rack name"
              value={rackName}
              onChange={(e) => setRackName(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>

        <Button variant="primary" onClick={handleSubmit}>
          Create Rack
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddRackModal;
