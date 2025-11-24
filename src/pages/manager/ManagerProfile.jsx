import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { CircleUserRound } from "lucide-react";

const ManagerProfile = ({ currentUser, onUpdateUser }) => {
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    name: currentUser?.name || "Manoj",
    email: currentUser?.email || "manager@gmail.com",
    phone: currentUser?.phone || "9988009854",
    role: currentUser?.role || "Manager",
  });

  const handleSave = () => {
    if (!form.name || !form.email || !form.phone) {
      alert("Please fill all fields.");
      return;
    }
    onUpdateUser(form);
    setEditMode(false);
  };

  return (
    <div className="container my-4">
      <div
        className="card mx-auto"
        style={{
          maxWidth: 660,
          background: "hsl(215, 25%, 12%)",
          color: "white",
          borderRadius: 14,
          border: "1px solid hsl(215, 20%, 25%)",
          boxShadow: "0 6px 30px rgba(0,0,0,0.6)",
          overflow: "hidden",
        }}
      >
        {/* Top Bar: Avatar, Info, Edit Button */}
        <div className="d-flex align-items-center p-4" style={{ borderBottom: "1px solid hsl(215,20%,22%)" }}>
          <div
            className="rounded-circle d-flex justify-content-center align-items-center"
            style={{
              width: 54,
              height: 54,
              background: "hsl(215, 25%, 16%)",
              border: "2px solid hsl(215, 20%, 25%)",
              marginRight: 20,
            }}
          >
            <CircleUserRound size={30} />
          </div>
          <div style={{ flex: 1 }}>
            <div className="fw-bold" style={{ fontSize: "1.2rem", marginBottom: "2px" }}>
              {form.name || "Your Name"}
            </div>
            <div style={{ color: "hsl(215,15%,75%)", fontWeight: 500 }}>{form.role}</div>
          </div>
          <Button variant="primary" onClick={() => setEditMode((e) => !e)}>
            {editMode ? "Done" : "Edit"}
          </Button>
        </div>

        {/* Grid Section */}
        <Form className="p-4">
          <div className="row">
            <div className="col-12 col-md-6 mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={form.email}
                disabled={!editMode}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                style={{
                  backgroundColor: "hsl(215, 25%, 10%)",
                  color: "white",
                  border: "1px solid hsl(215, 20%, 25%)",
                }}
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                value={form.phone}
                disabled={!editMode}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                style={{
                  backgroundColor: "hsl(215, 25%, 10%)",
                  color: "white",
                  border: "1px solid hsl(215, 20%, 25%)",
                }}
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={form.name}
                disabled={!editMode}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={{
                  backgroundColor: "hsl(215, 25%, 10%)",
                  color: "white",
                  border: "1px solid hsl(215, 20%, 25%)",
                }}
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                value={form.role}
                disabled
                style={{
                  backgroundColor: "hsl(215, 25%, 10%)",
                  color: "white",
                  border: "1px solid hsl(215, 20%, 25%)",
                  opacity: 0.7,
                }}
              />
            </div>
          </div>

          {/* Save/Cancel only in edit mode */}
          {editMode && (
            <div className="d-flex flex-row gap-2 justify-content-end mt-3">
              <Button variant="secondary" onClick={() => setEditMode(false)}>
                Cancel
              </Button>
              <Button variant="success" onClick={handleSave}>
                Save
              </Button>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};

export default ManagerProfile;
