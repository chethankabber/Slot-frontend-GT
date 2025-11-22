import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  History,
  Users,
  ChevronLeft,
} from "lucide-react";
import { Button } from "react-bootstrap";

const navigationItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Racks", url: "/admin/racks", icon: Package },
  { title: "History", url: "/admin/history", icon: History },
  { title: "Users", url: "/admin/users", icon: Users },
];

export function AppSidebar({ isOpen, onClose }) {
  return (
    <>
      {/*  Mobile Overlay */}
      {isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-lg-none"
          style={{
            backdropFilter: "blur(4px)",
            zIndex: 1090, // increased  to appear over navbar
          }}
          onClick={onClose}
        ></div>
      )}

      {/* ✅ Sidebar */}
      <aside
        className="position-fixed top-0 start-0 h-100 d-flex flex-column justify-content-between shadow-sm"
        style={{
          width: isOpen ? "240px" : "70px",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "width 0.3s ease, transform 0.3s ease",
          overflow: "hidden",
          zIndex: 1100, // ⬆️ keeps sidebar above navbar in mobile view
          background:
            "linear-gradient(180deg, hsl(215, 25%, 12%) 0%, hsl(215, 25%, 10%) 100%)",
          color: "hsl(210, 40%, 98%)",
          borderRight: "1px solid hsl(215, 20%, 25%)",
        }}
      >
        {/* Header */}
        <div
          className="px-3 py-3 d-flex align-items-center justify-content-between"
          style={{
            borderBottom: "1px solid hsl(215, 20%, 25%)",
          }}
        >
          {isOpen && (
            <h6
              className="text-muted text-uppercase mb-0"
              style={{ fontFamily: "Merriweather, serif" }}
            >
              Slot Management
            </h6>
          )}
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={onClose}
            title={isOpen ? "Collapse Sidebar" : "Expand Sidebar"}
            className={`rounded-circle border-0 ${
              !isOpen ? "mx-auto" : "ms-auto"
            }`}
            style={{
              width: "30px",
              height: "30px",
              backgroundColor: "hsl(215, 25%, 14%)",
              color: "hsl(210, 40%, 98%)",
            }}
          >
            <ChevronLeft
              size={16}
              className={`transition-transform ${!isOpen ? "rotate-180" : ""}`}
            />
          </Button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-grow-1 px-2 py-3 overflow-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.title}
                to={item.url}
                end
                onClick={() => {
                  if (window.innerWidth < 992) onClose();
                }}
                className={({ isActive }) =>
                  `d-flex align-items-center text-decoration-none rounded py-2 px-3 mb-1 ${
                    isActive
                      ? "bg-primary text-white fw-semibold"
                      : "text-light bg-transparent"
                  } ${!isOpen ? "justify-content-center" : "gap-2"}`
                }
                title={!isOpen ? item.title : ""}
                style={{
                  transition: "background-color 0.2s ease, color 0.2s ease",
                }}
              >
                <Icon
                  size={18}
                  className={`flex-shrink-0 ${
                    isOpen ? "me-2" : ""
                  } text-light`}
                />
                {isOpen && <span>{item.title}</span>}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

export default AppSidebar;
