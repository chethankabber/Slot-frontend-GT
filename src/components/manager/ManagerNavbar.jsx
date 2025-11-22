// src/components/manager/ManagerNavbar.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { LogOut, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ManagerNavbar = ({ manager, onMenuClick, isMobile }) => {
  const navigate = useNavigate();

  const getInitials = (name) => {
    if (!name) return "M";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <header
      className="border-bottom shadow-sm py-3 px-3 px-md-4 position-sticky top-0 w-100 fixed-top"
      style={{
        background:
          "linear-gradient(90deg, hsl(215, 25%, 12%) 0%, hsl(215, 25%, 10%) 100%)",
        color: "hsl(210, 40%, 98%)",
        borderBottom: "1px solid hsl(215, 20%, 25%)",
        zIndex: 1055,
        transition: "all 0.3s ease",
      }}
    >
      <div className="d-flex align-items-center justify-content-between flex-wrap">
        {/* LEFT SECTION */}
        <div className="d-flex align-items-center gap-3 flex-wrap">
          {/* Mobile menu button */}
          <button
            className="btn btn-outline-secondary d-lg-none p-2"
            onClick={onMenuClick}
            title="Toggle Sidebar"
            style={{
              backgroundColor: "hsl(215, 25%, 14%)",
              borderColor: "hsl(215, 20%, 25%)",
              color: "hsl(210, 40%, 98%)",
            }}
          >
            <Menu size={20} />
          </button>

          {/* Logo */}
          <div className="d-flex align-items-center gap-2">
            <img
              src="/GTLogos.png"
              alt="Logo"
              style={{ height: "60px", borderRadius: "8px" }}
            />
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="d-flex align-items-center gap-3 mt-2 mt-md-0">
          {/* Manager info */}
          <div className="text-end d-none d-md-block">
            <p className="mb-0 fw-semibold text-light">
              {manager?.name || "Manager"}
            </p>
            <small className="text-muted">
              {manager?.email || "manager@gmail.com"}
            </small>
          </div>

          {/* Avatar */}
          <div
            className="rounded-circle bg-info text-white border border-info d-flex justify-content-center align-items-center fw-bold"
            style={{
              width: "40px",
              height: "40px",
              fontSize: "14px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.4)",
            }}
          >
            {getInitials(manager?.name)}
          </div>

          {/* Logout */}
          <button
            className="btn btn-outline-danger p-2 d-flex align-items-center justify-content-center"
            title="Logout"
            style={{
              borderColor: "hsl(0, 72%, 51%)",
              color: "hsl(0, 72%, 51%)",
            }}
            onClick={() => navigate("/login")}
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default ManagerNavbar;
