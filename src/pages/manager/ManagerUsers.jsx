// src/pages/manager/ManagerUsers.jsx
import React from "react";
import {
  mockAdmin,
  mockManager,
  mockUsers, // 👈 add this
} from "../../data/Mockdata";

const ManagerUsers = () => {
  // Admin user
  const adminUser = {
    id: "admin",
    name: mockAdmin.name,
    email: mockAdmin.email,
    phone: "9876000000",
    role: "Admin",
  };

  // Manager user
  const managerUser = {
    id: "manager",
    name: mockManager.name,
    email: mockManager.email,
    phone: "9876111111",
    role: "Manager",
  };

  // Combine all users
  const allUsers = [adminUser, managerUser, ...mockUsers];

  return (
    <div className="container my-4">
      <h2 className="fw-bold mb-3">All Users</h2>

      <div
        className="card"
        style={{
          background: "hsl(215,25%,12%)",
          border: "1px solid hsl(215,20%,25%)",
          color: "white",
        }}
      >
        

        <table className="table-bordered mb-0" style={{ width: "100%", backgroundColor: "#202830ff" }}>
          <thead style={{
                background: "hsl(215,25%,18%)",
                position: "sticky",
                top: 0,
                zIndex: 10,
              }}>
            <tr  >
              <th style={{ padding: "14px" }}>Name</th>
              <th style={{ padding: "14px" }}>Role</th>
              <th style={{ padding: "14px" }}>Email</th>
              {/* <th style={{ padding: "14px" }}>Phone</th> */}
            </tr>
          </thead>

          <tbody>
            {allUsers.map((u) => (
              <tr key={u.id} >
                <td style={{ padding: "17px" }}>{u.name}</td>
                <td style={{ padding: "17px" }}>{u.role}</td>
                <td style={{ padding: "17px" }}>{u.email}</td>
                {/* <td style={{ padding: "17px" }}>{u.phone}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagerUsers;
