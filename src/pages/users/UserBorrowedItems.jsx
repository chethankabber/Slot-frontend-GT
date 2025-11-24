// src/pages/users/UserBorrowedItems.jsx
import React from "react";

/**
 * UserBorrowedItems (Option A Layout)
 * Shows only currently borrowed returnable items by the logged-in user.
 * Non-returnable items and already returned items are excluded.
 */
const UserBorrowedItems = ({ borrowed = [] }) => {
  return (
    <div className="container my-2">
      <h4 className="fw-bold mb-3">My Borrowed Items</h4>

      <div
        className="card p-3"
        style={{
          background: "hsl(215,25%,12%)",
          border: "1px solid hsl(215,20%,25%)",
          color: "white",
        }}
      >
        {borrowed.length === 0 ? (
          <p className="text-muted mb-0">You have no active borrowed items.</p>
        ) : (
          borrowed.map((item, index) => {
            return (
              <div
                key={index}
                className="p-3 mb-3 rounded"
                style={{
                  background: "hsl(215,25%,16%)",
                  border: "1px solid hsl(215,20%,25%)",
                }}
              >
                <div className="d-flex justify-content-between">
                  <div>
                    <div className="fw-bold">Item: {item.itemName}</div>
                    <div className="text-muted small">
                      Return Date: {item.returnDate}
                    </div>
                  </div>

                  <div className="text-end">
                    <div className="fw-bold">Days Left: {item.daysLeft}</div>
                    <span
                      className="badge"
                      style={{
                        background:
                          item.daysLeft > 0
                            ? "hsl(140,40%,30%)" // green
                            : "hsl(0,70%,40%)", // red
                        padding: "6px 10px",
                        borderRadius: 6,
                      }}
                    >
                      {item.daysLeft > 0 ? "On Time" : "Overdue"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default UserBorrowedItems;
