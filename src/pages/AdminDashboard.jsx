import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router-dom";
import Navbar from "../components/admin/Navbar";
import AppSidebar from "../components/admin/AppSidebar";
import { mockAdmin } from "../data/Mockdata";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Detect screen size to switch layout automatically
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      {/* Sidebar */}
      <AppSidebar isOpen={sidebarOpen} onClose={toggleSidebar} />

      {/* Main Content Area */}
      <div
        className="d-flex flex-column flex-grow-1"
        style={{
          transition: "margin-left 0.3s ease",
          marginLeft: isMobile ? 0 : sidebarOpen ? "240px" : "70px",
          width: "100%",
        }}
      >
        {/* Navbar */}
        <Navbar
          admin={mockAdmin}
          onMenuClick={toggleSidebar}
          sidebarOpen={sidebarOpen}
          isMobile={isMobile}
        />

        {/* Page Content */}
        <main
          className="flex-grow-1 p-4"
          style={{
            backgroundColor: "hsl(215, 25%, 14%)",
            color: "hsl(210, 40%, 98%)",
            overflowY: "auto",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
