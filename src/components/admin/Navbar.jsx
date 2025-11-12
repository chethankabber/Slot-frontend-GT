import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { LogOut, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ admin, onMenuClick, isMobile }) => {
  const navigate = useNavigate();

  //  Get initials from admin name
  const getInitials = (name) => {
    if (!name) return "A";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <header
      className="border-bottom shadow-sm py-3 px-3 px-md-4 position-sticky top-0 w-100"
      style={{
        background:
          "linear-gradient(90deg, hsl(215, 25%, 12%) 0%, hsl(215, 25%, 10%) 100%)",
        color: "hsl(210, 40%, 98%)",
        borderBottom: "1px solid hsl(215, 20%, 25%)",
        zIndex: 1055,
        transition: "all 0.3s ease",
        marginLeft: 0, // no independent margin
      }}
    >
      <div className="d-flex align-items-center justify-content-between flex-wrap">
        {/* Left Section */}
        <div className="d-flex align-items-center gap-3 flex-wrap">
          {/* Mobile Menu Button */}
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
              src="/Gtlog000.jpg"
              alt="Logo"
              style={{ height: "40px", borderRadius: "8px" }}
            />
            <h5 className="mb-0 fw-bold text-light d-none d-sm-block">
              Gandeevan Technologies
            </h5>
          </div>
        </div>

        {/* Right Section */}
        <div className="d-flex align-items-center gap-3 mt-2 mt-md-0">
          {/* Admin Info */}
          <div className="text-end d-none d-md-block">
            <p className="mb-0 fw-semibold text-light">
              {admin?.name || "Admin User"}
            </p>
            <small className="text-muted">
              {admin?.email || "admin@gmail.com"}
            </small>
          </div>

          {/* Avatar */}
          <div
            className="rounded-circle bg-primary text-white border border-primary d-flex justify-content-center align-items-center fw-bold"
            style={{
              width: "40px",
              height: "40px",
              fontSize: "14px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.4)",
            }}
          >
            {getInitials(admin?.name)}
          </div>

          {/* Dark Mode */}
          <button
            className="btn btn-outline-primary p-2"
            style={{
              borderColor: "hsl(215, 20%, 25%)",
              color: "hsl(210, 40%, 98%)",
            }}
          >
            🌙
          </button>

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

export default Navbar;
