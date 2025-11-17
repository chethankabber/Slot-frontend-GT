// AllUsers.jsx
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  User,
  Mail,
  Shield,
  Calendar,
  Trash2,
  PlusCircle,
  Key,
  Copy,
} from "lucide-react";

const generatePassword = (length = 12) => {
  // Ensure at least one char from each group to make a strong password
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  const symbols = "!@#$%&*()_=+[]{}?";
  const all = upper + lower + digits + symbols;

  // pick at least one from each set
  let pwd = [
    upper[Math.floor(Math.random() * upper.length)],
    lower[Math.floor(Math.random() * lower.length)],
    digits[Math.floor(Math.random() * digits.length)],
    symbols[Math.floor(Math.random() * symbols.length)],
  ];

  for (let i = pwd.length; i < length; i++) {
    pwd.push(all[Math.floor(Math.random() * all.length)]);
  }

  // shuffle
  for (let i = pwd.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pwd[i], pwd[j]] = [pwd[j], pwd[i]];
  }
  return pwd.join("");
};

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [currentUserRole] = useState("Admin"); // assume admin for demo

  // Modal & form state
  const [showModal, setShowModal] = useState(false);

  // NEW: Edit mode
  const [editMode, setEditMode] = useState(false); // to toggle Add/Edit
  const [editUserId, setEditUserId] = useState(null); // store which user is being edited

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "User",
    phone: "",
  });

  const [generatedPassword, setGeneratedPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("allUsers_demo");
    if (saved) setUsers(JSON.parse(saved));
    else {
      // initial data
      setUsers([
        {
          id: 1,
          name: "Alice",
          email: "alice@example.com",
          role: "Manager",
          phone: "9876543210",
          joinDate: "2025-01-10",
        },
        {
          id: 2,
          name: "Bob",
          email: "bob@example.com",
          role: "User",
          phone: "9123456780",
          joinDate: "2025-01-11",
        },
      ]);
    }
  }, []);

  // persist on change
  //This runs every time the users array changes.
  //Converts the users array to a string using JSON.stringify // Saves it inside browser local storage
  useEffect(() => {
    localStorage.setItem("allUsers_demo", JSON.stringify(users));
  }, [users]);

  // Basic validators
  const validate = () => {
    const e = {}; //store all errors inside this.
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Invalid email";
    if (!form.phone.trim()) e.phone = "Phone is required";
    else if (!/^\d{7,15}$/.test(form.phone.replace(/\s+/g, "")))
      e.phone = "Phone must be 7–15 digits";
    return e;
  };

  //form becomes clean again.
  const resetForm = () => {
    setForm({ name: "", email: "", role: "User", phone: "" });
    setGeneratedPassword("");
    setShowPassword(false);
    setErrors({});
  };

  // open edit modal
  const openEditModal = (user) => {
    setEditMode(true);
    setEditUserId(user.id);

    // Pre-fill form with existing data
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
    });

    // password not shown until regenerated
    setGeneratedPassword("");

    setShowModal(true);
  };

  // Add OR Edit user
  const handleAddUser = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }

    // check duplicate email (except editing same user)
    if (
      users.some(
        (u) => u.email.toLowerCase() === form.email.toLowerCase() && u.id !== editUserId
      )
    ) {
      setErrors({ email: "Email already used" });
      return;
    }

    if (editMode) {
      
      //  EDIT USER MODE
      
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editUserId
            ? {
                ...u,
                name: form.name,
                email: form.email,
                role: form.role,
                phone: form.phone,
                password: generatedPassword || u.password, // Update password only if new generated
              }
            : u
        )
      );

      setAlert({ type: "success", message: "User updated successfully" });
    } else {
      
      // ADD NEW USER MODE
      
      const newUser = {
        id: Date.now(),
        name: form.name.trim(),
        email: form.email.trim(),
        role: form.role,
        phone: form.phone.trim(),
        joinDate: new Date().toISOString().slice(0, 10),
        // NOTE: storing passwords in client state is for demo only
        password: generatedPassword || generatePassword(12),
      };

      //So the newest user appears first on UI.
      setUsers((prev) => [newUser, ...prev]);
      setAlert({ type: "success", message: `User "${newUser.name}" added` });
    }

    resetForm();
    setShowModal(false);
    setEditMode(false);
    setEditUserId(null);

    setTimeout(() => setAlert(null), 3000);
  };

  const handleRemove = (id) => {
    //window.confirm() shows a browser popup with OK / Cancel.
    if (!window.confirm("Are you sure you want to remove this user?")) return;
    setUsers((prev) => prev.filter((u) => u.id !== id)); //Thus the selected user is deleted.
  };

  const handleGenerate = (len = 12) => {
    //calls the generatePassword function to create a new password. Returns a string like "Gt9@fK12#Ld!"
    const pw = generatePassword(len);
    setGeneratedPassword(pw);
    setShowPassword(true);
  };

  const handleCopyPassword = async () => {
    try {
      await navigator.clipboard.writeText(generatedPassword); //This copies the generated password to the clipboard.
      setAlert({ type: "success", message: "Password copied to clipboard" });
      setTimeout(() => setAlert(null), 2000); //Shows green success message. Auto hides after 2 seconds
    } catch {
      setAlert({
        type: "danger",
        message: "Copy failed (browser blocked clipboard)",
      });
      setTimeout(() => setAlert(null), 2000);
    }
  };

  return (
    <div className="container my-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-start mb-4 flex-column flex-md-row gap-3">
        <div>
          <h2 className="fw-bold mb-1">All Users</h2>
          <p className="text-muted mb-0">
            View all registered users and manage access permissions
          </p>
        </div>

        <div className="d-flex gap-2 align-items-center">
          {alert && (
            <div
              className={`alert alert-${alert.type} py-2 mb-0`}
              role="alert"
              style={{ minWidth: 200 }}
            >
              {alert.message}
            </div>
          )}
          {currentUserRole === "Admin" && (
            <button
              className="btn btn-primary d-flex align-items-center"
              onClick={() => {
                resetForm();
                setEditMode(false); // add mode
                setShowModal(true);
              }}
            >
              <PlusCircle size={16} className="me-2" />
              Add User
            </button>
          )}
        </div>
      </div>

      {/* User List */}
      <div className="d-flex flex-column gap-3">
        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user.id}
              className="card p-3 shadow-sm"
              style={{
                background:
                  "linear-gradient(90deg, hsl(215, 25%, 12%) 0%, hsl(215, 25%, 10%) 100%)",
                color: "hsl(210, 40%, 98%)",
                border: "1px solid hsl(215, 20%, 25%)",
              }}
            >
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                {/* Left: info */}
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="rounded-circle d-flex justify-content-center align-items-center"
                    style={{
                      width: "45px",
                      height: "45px",
                      backgroundColor: "hsl(215, 25%, 15%)",
                    }}
                  >
                    <User size={20} className="text-primary" />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">{user.name}</h6>
                    <div className="text-muted small d-flex align-items-center gap-2">
                      <Mail size={14} />
                      <span>{user.email}</span>
                    </div>
                    <div className="text-muted small d-flex align-items-center gap-2">
                      <span>📞</span>
                      <span>{user.phone || "-"}</span>
                    </div>
                  </div>
                </div>

                {/* Middle: role/join */}
                <div className="text-end mt-2 mt-md-0 me-auto ms-3">
                  <div className="d-flex align-items-center justify-content-end gap-2 mb-1">
                    <Shield size={14} />
                    <span className="small">{user.role}</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-end gap-2 text-muted small">
                    <Calendar size={14} />
                    <span>Joined: {user.joinDate}</span>
                  </div>
                </div>

                {/* NEW: Edit + Remove */}
                {currentUserRole === "Admin" && (
                  <div className="d-flex gap-2 mt-2 mt-md-0">
                    <button
                      className="btn btn-secondary border-light btn-sm"
                      onClick={() => openEditModal(user)}
                    >
                       Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemove(user.id)}
                    >
                      <Trash2 size={14} className="me-1" />
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted mt-4">
            No users found.
          </div>
        )}
      </div>

      {/* Modal - simple controlled modal */}
      {showModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          role="dialog"
          onMouseDown={(e) => {
            // click outside to close
            if (e.target.classList.contains("modal")) setShowModal(false);
          }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <form onSubmit={handleAddUser}>
                <div className="modal-header">
                  <h5 className="modal-title d-flex align-items-center">
                    <PlusCircle size={18} className="me-2" />
                    {editMode ? "Edit User" : "Add New User"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setShowModal(false)}
                  />
                </div>

                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label className="form-label">Name</label>
                      <input
                        className={`form-control ${
                          errors.name ? "is-invalid" : ""
                        }`}
                        value={form.name}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, name: e.target.value }))
                        }
                        placeholder="Full name"
                      />
                      {errors.name && (
                        <div className="invalid-feedback">{errors.name}</div>
                      )}
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label">Email</label>
                      <input
                        className={`form-control ${
                          errors.email ? "is-invalid" : ""
                        }`}
                        value={form.email}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, email: e.target.value }))
                        }
                        placeholder="user@example.com"
                        type="email"
                      />
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )}
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label">Role</label>
                      <select
                        className="form-select"
                        value={form.role}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, role: e.target.value }))
                        }
                      >
                        <option value="User">User</option>
                        <option value="Manager">Manager</option>
                      </select>
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label">Phone</label>
                      <input
                        className={`form-control ${
                          errors.phone ? "is-invalid" : ""
                        }`}
                        value={form.phone}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, phone: e.target.value }))
                        }
                        placeholder="9988006677"
                        inputMode="tel"
                      />
                      {errors.phone && (
                        <div className="invalid-feedback">{errors.phone}</div>
                      )}
                    </div>

                    {/* Password generator */}
                    <div className="col-12">
                      <div className="d-flex align-items-start gap-3">
                        <div style={{ flex: 1 }}>
                          <label className="form-label">
                            {editMode ? "New Password (optional)" : "Auto-generated password"}
                          </label>

                          <div className="input-group">
                            <input
                              className="form-control"
                              value={generatedPassword}
                              readOnly
                              type={showPassword ? "text" : "password"}
                              placeholder={
                                editMode
                                  ? "Click Generate to change password"
                                  : "Click Generate"
                              }
                            />

                            <button
                              type="button"
                              className="btn btn-outline-secondary"
                              onClick={() => handleGenerate(12)}
                              title="Generate password"
                            >
                              <Key size={14} className="me-1" />
                              Generate
                            </button>

                            <button
                              type="button"
                              className="btn btn-outline-secondary"
                              onClick={() => setShowPassword((s) => !s)}
                              title={showPassword ? "Hide" : "Show"}
                            >
                              {showPassword ? "Hide" : "Show"}
                            </button>

                            <button
                              type="button"
                              className="btn btn-outline-secondary"
                              onClick={handleCopyPassword}
                              disabled={!generatedPassword}
                              title="Copy password"
                            >
                              <Copy size={14} />
                            </button>
                          </div>

                          
                        </div>

                        
                        
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editMode ? "Save Changes" : "Add user"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
