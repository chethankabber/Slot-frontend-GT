// src/pages/dashboard/UniversalDashboard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircle } from "lucide-react";

/* ==== Admin Components ==== */
import ContainerSummaryCard from "../../components/admin/dashboard/ContainerSummaryCard";
import PermissionRequests from "../../components/admin/dashboard/PermissionRequests";
import ItemDueCard from "../../components/admin/dashboard/DueDatesCard";
import LowStockCard from "../../components/admin/dashboard/LowStockCard";

/* ==== Manager Components ==== */
import ManagerPermissionModal from "../../components/manager/ManagerPermissionModal";

/* ==== User Components ==== */
import UserBorrowedItems from "../users/UserBorrowedItems";
import { dummyBorrowedItems } from "../../data/Mockdata";
import { Modal, Button, Form } from "react-bootstrap";

/* ---------------- STATUS TAG (used in Manager + User UI) ---------------- */
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
  if (status === "Rejected")
  return <span style={{ ...base, background: "hsl(10,80%,40%)", color: "white" }}>{status}</span>;
};

/* ===========================================
   UNIVERSAL DASHBOARD (Admin + Manager + User)
*/
const UniversalDashboard = ({
  role,
  containers = [],
  permissionRequests = [],
  approvedPermissions = [],
  onPermissionApprove,
  onPermissionReject,
  onCreateRequest,
  onCancelRequest,
  currentUser,
}) => {
  const navigate = useNavigate();

  /* ======= USER MODAL STATES ======= */
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

  /* ===== MANAGER MODAL ===== */
  const [showManagerModal, setShowManagerModal] = useState(false);

  /* ---------- Common Utility ---------- */
  const jumpToSlot = (containerId, slotNumber) => {
    navigate(`/${role}/racks?jumpRack=${containerId}&jumpSlot=${slotNumber}`);
  };

  /* ---------- Helpers used in user area ---------- */
  const openDetail = (req) => {
    setSelectedReq(req);
    setShowDetailModal(true);
  };

  const cancelRequest = (id) => {
    if (!window.confirm("Cancel this request?")) return;
    if (typeof onCancelRequest === "function") {
      onCancelRequest(id);
    }
    // If the details modal was open for the cancelled request, close it
    if (selectedReq?.id === id) {
      setShowDetailModal(false);
      setSelectedReq(null);
    }
  };
  /* ================================================================
                                ADMIN RENDER                        */
  if (role === "admin") {
    const pending = permissionRequests.filter((r) => r.status === "Pending");

    return (
      <div className="container my-4">
        <h2 className="fw-bold mb-1">Dashboard</h2>
        <p className="text-muted">Overview of your container management system</p>

        <div className="mb-4">
          {pending.length > 0 ? (
            <PermissionRequests
              permissionRequests={pending}
              onApprove={onPermissionApprove}
              onReject={onPermissionReject}
            />
          ) : (
            <p className="text-muted">No pending requests.</p>
          )}
        </div>

        <div className="row g-4 mb-4">
          {containers.map((container) => (
            <div key={container.id} className="col-12 col-sm-6 col-lg-4">
              <ContainerSummaryCard container={container} />
            </div>
          ))}
        </div>

        <div className="row g-4 mt-4">
          <div className="col-lg-6">
            <ItemDueCard containers={containers} />
          </div>

          <div className="col-lg-6">
            <LowStockCard containers={containers} onJumpToSlot={jumpToSlot} />
          </div>
        </div>
      </div>
    );
  }
  /* ========================================================================== */
  /*                             MANAGER RENDER                                  */
  if (role === "manager") {
    return (
      <div className="container my-4">
        <h2 className="fw-bold mb-3">Manager Dashboard</h2>
        <p className="text-muted">Overview of racks, items and approvals</p>

        {/* APPROVED REQUESTS */}
        <div
          className="card p-3 mb-4"
          style={{
            background: "hsl(215,25%,12%)",
            border: "1px solid hsl(215,20%,25%)",
            color: "white",
          }}
        >
          <h5 className="fw-bold mb-3">Approved Requests</h5>

          {approvedPermissions.length === 0 ? (
            <p className="text-muted">No approved permissions yet.</p>
          ) : (
            approvedPermissions.map((req) => (
              <div
                key={req.id}
                className="d-flex justify-content-between align-items-center p-3 mb-3 rounded"
                style={{
                  background: "hsl(215,25%,16%)",
                  border: "1px solid hsl(215,20%,25%)",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSelectedReq(req);
                  setShowManagerModal(true);
                }}
              >
                <div>
                  <div className="fw-bold">
                    <UserCircle size={20} className="me-2" />
                    {req.userName}
                  </div>
                  <div className="text-muted">{req.userEmail}</div>
                  <div className="text-muted">Project: {req.whichProject}</div>
                </div>

                <div>
                  <div className="text-muted">Item: {req.itemName}</div>
                  <div className="text-muted">Qty: {req.quantity}</div>
                </div>

                <div className="text-end text-secondary fw-bold">View Details</div>
              </div>
            ))
          )}
        </div>

        {/* RACK SUMMARY */}
        <div className="row g-3 mb-4">
          {containers.map((rack) => (
            <div className="col-12 col-sm-6 col-lg-4" key={rack.id}>
              <ContainerSummaryCard container={rack} basePath="/manager/racks" />
            </div>
          ))}
        </div>

        <div className="row g-4">
          <div className="col-lg-6">
            <ItemDueCard containers={containers} />
          </div>

          <div className="col-lg-6">
            <LowStockCard containers={containers} onJumpToSlot={jumpToSlot} />
          </div>
        </div>

        <ManagerPermissionModal
          show={showManagerModal}
          onClose={() => setShowManagerModal(false)}
          request={selectedReq}
          onGiven={() => window.location.reload()}
        />
      </div>
    );
  }
  /* ========================================================================== */
  /*                               USER RENDER                                   */
  if (role === "user") {
    const userRequests = permissionRequests || [];

    const handleCreateSubmit = (e) => {
      e.preventDefault();
      // basic validation
      if (!form.itemName || !form.projectName || !form.quantity) {
        alert("Please fill required fields");
        return;
      }
      if (typeof onCreateRequest === "function") {
        onCreateRequest(form);
      }
      setShowCreateModal(false);
      // reset form after submit
      setForm({
        itemName: "",
        quantity: 1,
        projectName: "",
        returnable: false,
        returnDate: "",
        message: "",
      });
    };

    return (
      <div className="container my-4">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <p className="text-muted">User Dashboard</p>
            <h2 className="fw-bold mb-1">Welcome, {currentUser?.name}</h2>
          </div>

          <Button
            className="btn-primary"
            onClick={() => {
              // reset form each time before opening
              setForm({
                itemName: "",
                quantity: 1,
                projectName: "",
                returnable: false,
                returnDate: "",
                message: "",
              });
              setShowCreateModal(true);
            }}
          >
            Request New Item
          </Button>
        </div>

        {/* MY REQUESTS */}
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
                {/* ROW 1: Item + Project (Left) | Qty + Status + Cancel (Right) */}
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <p className="mb-1">
                      <strong>Item:</strong> {req.itemName}
                    </p>
                    <p className="mb-1">
                      <strong>Project:</strong> {req.whichProject}
                    </p>
                    <p className="mb-1">
                      <strong>Qty:</strong> {req.quantity}
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="mb-4 d-flex align-items-center justify-content-end gap-2">
                      <strong>Status:</strong>
                      <StatusTag status={req.status} />
                    </p>

                    {req.status === "Pending" && (
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          cancelRequest(req.id);
                        }}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ACTIVE BORROWED ITEMS */}
        <div className="card p-0 mb-0">
          <UserBorrowedItems borrowed={dummyBorrowedItems} />
        </div>

        {/* +++ User Request Modal +++ */}
        <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} centered>
          <Modal.Header closeButton style={{ background: "hsl(215,25%,12%)", color: "white" }}>
            <Modal.Title>Request New Item</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ background: "hsl(215,25%,14%)", color: "white" }}>
            <Form onSubmit={handleCreateSubmit}>
              <Form.Group className="mb-2">
                <Form.Label>Item Name *</Form.Label>
                <Form.Control
                  value={form.itemName}
                  onChange={(e) => setForm({ ...form, itemName: e.target.value })}
                  style={{ background: "hsl(215,25%,12%)", color: "white" }}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Quantity *</Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  value={form.quantity}
                  onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                  style={{ background: "hsl(215,25%,12%)", color: "white" }}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Project *</Form.Label>
                <Form.Control
                  value={form.projectName}
                  onChange={(e) => setForm({ ...form, projectName: e.target.value })}
                  style={{ background: "hsl(215,25%,12%)", color: "white" }}
                />
              </Form.Group>

              <div className="d-flex align-items-center mb-2">
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
                    style={{ maxWidth: 200, background: "hsl(215,25%,12%)", color: "white" }}
                  />
                )}
              </div>

              <Form.Group className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{ background: "hsl(215,25%,12%)", color: "white" }}
                />
              </Form.Group>

              <div className="d-flex justify-content-end">
                <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
                  Close
                </Button>
                <Button className="ms-2" variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

        {/* +++ User Detail Modal +++ */}
        <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} centered>
          <Modal.Header closeButton style={{ background: "hsl(215,25%,12%)", color: "white" }}>
            <Modal.Title>Request Details</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ background: "hsl(215,25%,14%)", color: "white" }}>
            {selectedReq && (
              <div>
                <p>
                  <strong>Item:</strong> {selectedReq.itemName}
                </p>
                <p>
                  <strong>Quantity:</strong> {selectedReq.quantity}
                </p>
                <p>
                  <strong>Project:</strong> {selectedReq.whichProject}
                </p>
                 <p>
                  <strong>Retrun Date:</strong> {selectedReq.returnDate || "Non-Returnable"}
                </p>
                <p>
                  <strong>Status:</strong> <StatusTag status={selectedReq.status} />
                </p>
                <hr className="text-muted"/>
                <p>
                  <strong>Message:</strong>
                </p>
                <div className="p-2 rounded" style={{ background: "hsl(215,25%,12%)" }}>
                  {selectedReq.message || "No message"}
                </div>
                 <hr className="text-muted"/>
                <div className="mt-3 d-flex justify-content-end">
                {selectedReq.status === "Pending" && (
                  <Button 
                    variant="primary"
                    className="mt"
                    onClick={() => {
                      cancelRequest(selectedReq.id);
                      setShowDetailModal(false);
                    }}
                  >
                    Cancel Request
                  </Button>
                )}
                </div>
              </div>
            )}
          </Modal.Body>
        </Modal>
      </div>
    );
  }

  return null;
};

export default UniversalDashboard;
