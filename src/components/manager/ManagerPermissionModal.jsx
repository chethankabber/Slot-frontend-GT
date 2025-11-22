import React from "react";
import { Modal, Button } from "react-bootstrap";

const ManagerPermissionModal = ({ show, onClose, request, onGiven }) => {
  if (!request) return null;

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header
        closeButton
        style={{
          background: "hsl(215,25%,12%)",
          borderBottom: "1px solid hsl(215,20%,25%)",
          color: "white",
        }}
      >
        <Modal.Title>Approved Request Details</Modal.Title>
      </Modal.Header>

      <Modal.Body
        style={{
          background: "hsl(215,25%,14%)",
          color: "white",
        }}
      >
        <p><strong>User Name:</strong> {request.userName}</p>
        <p><strong>Email:</strong> {request.userEmail}</p>
        <hr/>
        <p><strong>Item Name:</strong> {request.itemName}</p>
        <p><strong>Quantity:</strong> {request.quantity}</p>
        <p><strong>Project:</strong> {request.whichProject}</p>
        <p><strong>Item Type:</strong> {request.itemType}</p>
        <p><strong>Return Date:</strong> {request.returnDate || "Not required"}</p>
        <hr/>
        <p><strong>Message:</strong> {request.message}</p>
      </Modal.Body>

      <Modal.Footer
        style={{
          background: "hsl(215,25%,12%)",
          borderTop: "1px solid hsl(215,20%,25%)",
        }}
      >
        <Button
          variant="success"
          onClick={() => {
            onGiven(request.id); // delete from list
            alert("Item given to user!");
          }}
        >
          Give Item to User ✓
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ManagerPermissionModal;
