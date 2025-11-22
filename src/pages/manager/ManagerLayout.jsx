// src/pages/manager/ManagerLayout.jsx
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import ManagerNavbar from "../../components/manager/ManagerNavbar";
import SidebarManager from "../../components/manager/ManagerSidebar";
import {
  mockManager,
} from "../../data/Mockdata";

const ManagerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div
      className="d-flex position-relative"
      style={{
        minHeight: "100vh",
        backgroundColor: "hsl(215, 30%, 10%)",
        color: "hsl(210, 40%, 98%)",
        overflow: "hidden",
      }}
    >
      {/* SIDEBAR */}
      <SidebarManager isOpen={sidebarOpen} onClose={toggleSidebar} />

      {/* MAIN AREA */}
      <div
        className="d-flex flex-column flex-grow-1"
        style={{
          transition: "margin-left 0.3s ease",
          marginLeft: isMobile ? 0 : sidebarOpen ? "240px" : "70px",
          width: "100%",
        }}
      >
        {/* NAVBAR */}
        <ManagerNavbar
          manager={{ name: mockManager.name, email: mockManager.email, }}
          onMenuClick={toggleSidebar}
          isMobile={isMobile}
        />

        {/* PAGE CONTENT */}
        <main
          className="flex-grow-1 p-4"
          style={{
            backgroundColor: "hsl(215, 25%, 14%)",
            overflowY: "auto",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ManagerLayout;
