// src/components/users/UserNavbar.jsx
import React from "react";
import { LogOut, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserNavbar = ({ onMenuClick }) => {
  const navigate = useNavigate();

  return (
    <header
      className="border-bottom shadow-sm py-3 px-3 px-md-4 position-sticky top-0 w-100 fixed-top"
      style={{
        background:
          "linear-gradient(90deg, hsl(215, 25%, 12%) 0%, hsl(215, 25%, 10%) 100%)",
        color: "hsl(210, 40%, 98%)",
        borderBottom: "1px solid hsl(215, 20%, 25%)",
        zIndex: 1055,
      }}
    >
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-3">
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

          <img src="/GTLogos.png" alt="Logo" style={{ height: "60px", borderRadius: 8 }} />
        </div>

        <div className="d-flex align-items-center gap-2">
          <button
            className="btn btn-outline-danger p-2 d-flex align-items-center justify-content-center"
            title="Logout"
            style={{ borderColor: "hsl(0, 72%, 51%)", color: "hsl(0, 72%, 51%)" }}
            onClick={() => navigate("/login")}
          >
            {/* <div className="text-muted p-1">Logout</div> */}
            <LogOut size={18} />
            
          </button>
          
        </div>
        
      </div>
    </header>
  );
};

export default UserNavbar;
