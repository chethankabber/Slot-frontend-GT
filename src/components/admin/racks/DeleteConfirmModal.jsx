
// Universal delete confirmation modal.
// Can be used for deleting a rack, slot, or item.
// Props:
//   show        -> boolean (open/close)
//   title       -> string (e.g., "Delete Rack?")
//   message     -> string (e.g., "Are you sure you want to delete Rack C1?")
//   onConfirm() -> callback for YES
//   onCancel()  -> callback for CANCEL
// ----------------------------------------------------

import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteConfirmModal = ({ show, title, message, onConfirm, onCancel }) => {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-danger">{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="mb-0">{message}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>

        <Button variant="danger" onClick={onConfirm}>
          Yes, Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmModal;
