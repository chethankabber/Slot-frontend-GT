// src/components/users/UserSidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Package, History,UserCheck, UserPlus, UserPen } from "lucide-react";
import { Button } from "react-bootstrap";
import { ChevronLeft } from "lucide-react";

const userNav = [
  { title: "Dashboard", url: "/users", icon: LayoutDashboard },
  { title: "Racks", url: "/users/racks", icon: Package },
  { title: "My History", url: "/users/history", icon: History },
  { title: "My profile", url: "/Users/profile", icon: UserCheck }
];

const UserSidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-lg-none"
          onClick={onClose}
          style={{ zIndex: 1090 }}
        />
      )}

      <aside
        className="position-fixed top-0 start-0 h-100 d-flex flex-column shadow-sm"
        style={{
          width: isOpen ? "240px" : "70px",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "width 0.3s ease, transform 0.3s ease",
          background:
            "linear-gradient(180deg, hsl(215,25%,12%) 0%, hsl(215,25%,10%) 100%)",
          borderRight: "1px solid hsl(215,20%,25%)",
          color: "white",
          zIndex: 1100,
        }}
      >
        <div
          className="px-3 py-3 d-flex align-items-center justify-content-between"
          style={{ borderBottom: "1px solid hsl(215,20%,25%)" }}
        >
          {isOpen && <h6 className="text-muted text-uppercase mb-0">Slot Management</h6>}
          <Button
            variant="outline-secondary"
            onClick={onClose}
            size="sm"
            className="rounded-circle border-0"
            style={{ width: 30, height: 30, background: "hsl(215,25%,14%)", color: "white" }}
          >
            <ChevronLeft size={16} className={!isOpen ? "rotate-180" : ""} />
          </Button>
        </div>

        <nav className="px-2 py-2 flex-grow-1 overflow-auto">
          {userNav.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.url}
                to={item.url}
                end={item.url === "/users"}
                className={({ isActive }) =>
                  `d-flex align-items-center rounded py-2 px-3 mb-1 ${
                    isActive ? "bg-primary fw-semibold text-white" : "text-light"
                  } ${!isOpen ? "justify-content-center" : "gap-2"}`
                }
                onClick={() => {
                  if (window.innerWidth < 992) onClose();
                }}
                title={!isOpen ? item.title : ""}
                style={{ transition: "background-color 0.2s ease" }}
              >
                <Icon size={18} /> {isOpen && item.title}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default UserSidebar;
