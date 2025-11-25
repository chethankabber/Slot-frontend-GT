// src/pages/users/UserDashboard.jsx
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import UserBorrowedItems from "./UserBorrowedItems";
import { dummyBorrowedItems } from "../../data/Mockdata";

/* ---------------- STATUS TAG ---------------- */
const StatusTag = ({ status }) => {
  const base = {
    padding: "4px 10px",
    borderRadius: 14,
    fontSize: 12,
    fontWeight: 700,
    display: "inline-block",
    minWidth: 72,
    textAlign: "center",
  };

  if (status === "Pending")
    return <span style={{ ...base, background: "hsl(45,100%,65%)", color: "#222" }}>{status}</span>;
  if (status === "Approved")
    return <span style={{ ...base, background: "hsl(140,40%,30%)", color: "white" }}>{status}</span>;

  return <span style={{ ...base, background: "hsl(10,80%,40%)", color: "white" }}>{status}</span>;
};

/* ---------------- USER DASHBOARD ---------------- */
const UserDashboard = ({ permissionRequests = [], onCreateRequest, onCancelRequest, currentUser }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [form, setForm] = useState({
    itemName: "",
    quantity: 1,
    projectName: "",
    returnable: false,
    returnDate: "",
    message: "",
  });

  const [selectedReq, setSelectedReq] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const userRequests = permissionRequests || [];

  /* ---------------- CREATE REQUEST SUBMIT ---------------- */
  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!form.itemName || !form.quantity || !form.projectName) {
      alert("Please fill required fields");
      return;
    }
    onCreateRequest(form);
    setShowCreateModal(false);
    setForm({
      itemName: "",
      quantity: 1,
      projectName: "",
      returnable: false,
      returnDate: "",
      message: "",
    });
  };

  /* ---------------- OPEN DETAILS MODAL ---------------- */
  const openDetail = (req) => {
    setSelectedReq(req);
    setShowDetailModal(true);
  };

  /* ---------------- CANCEL REQUEST ---------------- */
  const cancelRequest = (id) => {
    if (!window.confirm("Cancel this request?")) return;
    onCancelRequest(id);

    if (selectedReq?.id === id) {
      setShowDetailModal(false);
      setSelectedReq(null);
    }
  };

  return (
    <div className="container my-4">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div>
          <p className="text-muted">User Dashboard</p>
          <h2 className="fw-bold mb-1">
            Welcome, {currentUser?.name || "User"}
          </h2>
        </div>

        <Button className="btn-primary" onClick={() => setShowCreateModal(true)}>
          Request New Item
        </Button>
      </div>

      {/* ---------------- MY REQUESTS CARD ---------------- */}
      <div
        className="card p-3 mb-4"
        style={{
          background: "hsl(215,25%,12%)",
          border: "1px solid hsl(215,20%,25%)",
          color: "white",
        }}
      >
        <h5 className="fw-bold mb-3">My Requests</h5>

        {userRequests.length === 0 ? (
          <p className="text-muted">You have not made any requests yet.</p>
        ) : (
          userRequests.map((req) => (
            <div
              key={req.id}
              className="p-3 mb-3 rounded"
              style={{
                background: "hsl(215,25%,16%)",
                border: "1px solid hsl(215,20%,25%)",
                cursor: "pointer",
              }}
              onClick={() => openDetail(req)}
            >
              {/* ---------- ROW 1 ---------- */}
              <div className="d-flex justify-content-between">
                <div>
                  <strong>Item :</strong> {req.itemName}
                </div>

                {/* Qty */}
                <div>
                  <strong>Qty :</strong> {req.quantity}
                </div>
                
                
                {/* Cancel button (only pending) */}
                {/* {req.status === "Pending" && (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      cancelRequest(req.id);
                    }}
                  >
                    Cancel Request
                  </Button>
                )} */}
              </div>

              {/* ---------- ROW 2 ---------- */}
              <div className="d-flex justify-content-between mt-2">
                <div>
                  <strong>Project :</strong> {req.whichProject}
                </div>

                <div className="d-flex justify-content-center mt-2">
                  <strong>Status :</strong> <StatusTag status={req.status} />
                </div>
                  
                  {req.status === "Pending" && (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      cancelRequest(req.id);
                    }}
                  >
                    Cancel Request
                  </Button>
                )}
                {/* <div className="text-muted" style={{ cursor: "pointer" }}>
                   -                 →
                </div> */}
              </div>
            </div>
          ))
        )}
      </div>

      {/* =======================================================
           CREATE REQUEST MODAL
      ======================================================= */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} centered>
        <Modal.Header closeButton style={{ background: "hsl(215,25%,12%)", color: "white" }}>
          <Modal.Title>Request New Item</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ background: "hsl(215,25%,14%)", color: "white" }}>
          <Form onSubmit={handleCreateSubmit}>

            {/* Item Name */}
            <Form.Group className="mb-2">
              <Form.Label>Item Name *</Form.Label>
              <Form.Control
                value={form.itemName}
                onChange={(e) => setForm({ ...form, itemName: e.target.value })}
                style={{
                  background: "hsl(215,25%,12%)",
                  color: "white",
                  border: "1px solid hsl(215,20%,25%)",
                }}
              />
            </Form.Group>

            {/* Quantity */}
            <Form.Group className="mb-2">
              <Form.Label>Quantity *</Form.Label>
              <Form.Control
                type="number"
                min={1}
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                style={{
                  background: "hsl(215,25%,12%)",
                  color: "white",
                  border: "1px solid hsl(215,20%,25%)",
                }}
              />
            </Form.Group>

            {/* Project */}
            <Form.Group className="mb-2">
              <Form.Label>Project Name *</Form.Label>
              <Form.Control
                value={form.projectName}
                onChange={(e) => setForm({ ...form, projectName: e.target.value })}
                style={{
                  background: "hsl(215,25%,12%)",
                  color: "white",
                  border: "1px solid hsl(215,20%,25%)",
                }}
              />
            </Form.Group>

            {/* Returnable + Date */}
            <Form.Group className="mb-2 d-flex align-items-center">
              <Form.Check
                type="checkbox"
                label="Returnable?"
                checked={form.returnable}
                onChange={(e) => setForm({ ...form, returnable: e.target.checked })}
              />

              {form.returnable && (
                <input
                  type="date"
                  className="form-control ms-2"
                  value={form.returnDate}
                  onChange={(e) => setForm({ ...form, returnDate: e.target.value })}
                  style={{
                    maxWidth: 220,
                    background: "hsl(215,25%,12%)",
                    color: "white",
                    border: "1px solid hsl(215,20%,25%)",
                  }}
                />
              )}
            </Form.Group>

            {/* Message */}
            <Form.Group className="mb-2">
              <Form.Label>Message (optional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                style={{
                  background: "hsl(215,25%,12%)",
                  color: "white",
                  border: "1px solid hsl(215,20%,25%)",
                }}
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2 mt-3">
              <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Submit Request
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* =======================================================
           DETAIL MODAL
      ======================================================= */}
      <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} centered>
        <Modal.Header closeButton style={{ background: "hsl(215,25%,12%)", color: "white" }}>
          <Modal.Title>Request Details</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ background: "hsl(215,25%,14%)", color: "white" }}>
          {selectedReq && (
            <div>
              {/* <p>
                <strong>Requested by:</strong> {selectedReq.userName}
                <br />
                <small className="text-muted">{selectedReq.userEmail}</small>
              </p> */}

              {/* <hr /> */}
              <p><strong>Item:</strong> {selectedReq.itemName}</p>
              <p><strong>Quantity:</strong> {selectedReq.quantity}</p>
              <p><strong>Project:</strong> {selectedReq.whichProject}</p>
              <p><strong>Returnable:</strong> {selectedReq.itemType}</p>

              {selectedReq.itemType === "Returnable" && (
                <p><strong>Return Date:</strong> {selectedReq.returnDate}</p>
              )}

              <p><strong>Requested on:</strong> {selectedReq.dateRequested}</p>
              <p><strong>Status:</strong> <StatusTag status={selectedReq.status} /></p>

              {/* <hr /> */}
              <p><strong>Message:</strong></p>
              <div
                style={{
                  background: "hsl(215,25%,12%)",
                  padding: 10,
                  borderRadius: 6,
                }}
              >
                {selectedReq.message || "No message provided"}
              </div>
            </div>
          )}
        </Modal.Body>

        <Modal.Footer style={{ background: "hsl(215,25%,12%)" }}>
          <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
            Close
          </Button>

          {selectedReq?.status === "Pending" && (
            <Button variant="danger" onClick={() => cancelRequest(selectedReq.id)}>
              Cancel Request
            </Button>
          )}
        </Modal.Footer>
      </Modal> 
       {/* ====== My Active Borrowed Items ====== */}
           <div className="card p-0 mb-0">
              <UserBorrowedItems borrowed={dummyBorrowedItems} />
           </div>

    </div>
  );
};

export default UserDashboard;
