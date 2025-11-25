import React from "react";
import { Modal, Button } from "react-bootstrap";
import { User } from 'lucide-react'

const PermissionRequestModal = ({ request, onClose, onApprove, onReject }) => {   // request = selectedRequest object
  return (
    // modal is always visible when this component renders.
    <Modal show={true} onHide={onClose} centered>  
      <Modal.Header closeButton>
        <Modal.Title>Permission Request Details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        
        <p> <strong>User:</strong> {request.userName}</p>
        <p><strong>Email:</strong> {request.userEmail}</p>

        <hr />

        <p><strong>Item:</strong> {request.itemName}</p>
        <p><strong>Quantity:</strong> {request.quantity}</p>
        <p><strong>Request Date:</strong> {request.dateRequested}</p>
        <p><strong>For Which Project:</strong> {request.whichProject}</p>
        <p><strong>Message:</strong></p>
        <div
  style={{
    background: "hsl(215, 25%, 14%)",
    color: "hsl(210, 40%, 98%)",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid hsl(215, 20%, 25%)",
    minHeight: "60px",
  }}
>
  {request.message || "No additional message provided."}
</div>

        <hr />

        <p>
          <strong>Returnable:</strong>{" "}
          {request.itemType === "Returnable" ? "Yes" : "No"}
        </p>

        {request.itemType === "Returnable" && (
                <p><strong>Return Date:</strong> {request.returnDate}</p>
          )}
        
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>

        <Button variant="danger" onClick={() => onReject(request.id)}>
          Reject
        </Button>

        <Button variant="success" onClick={() => onApprove(request.id)}>
          Approve
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PermissionRequestModal;
