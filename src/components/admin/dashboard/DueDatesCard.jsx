// components/admin/dashboard/ItemDueCard.jsx
import React from "react";

const ItemDueCard = ({ containers = [] }) => {
  const rows = [];

  containers.forEach((rack) => {
    rack.slots.forEach((slot) => {
      (slot.items || []).forEach((item) => {
        (item.taken || []).forEach((t) => {
          const today = new Date();
          const returnDate = t.returnDate ? new Date(t.returnDate) : null;

          let overdue = 0;
          if (returnDate) {
            overdue = Math.max(
              0,
              Math.floor((today - returnDate) / (1000 * 60 * 60 * 24))
            );
          }

          rows.push({
            itemName: item.name,
            user: t.user,
            takenDate: t.date,
            returnDate: t.returnDate || "-",
            overdue,
          });
        });
      });
    });
  });

  return (
    <div
  className="card shadow-sm"
  style={{
    background: "hsl(215, 25%, 12%)",
    border: "1px solid hsl(215, 20%, 25%)",
    color: "white",
    height: "100%",
  }}
>
  <div
    className="card-header fw-bold"
    style={{ borderColor: "hsl(215,25%,25%)" }}
  >
    Item Due Dates
  </div>
  <div
    className="card-body"
    style={{
      maxHeight: "320px",
      overflowY: "auto",
      overflowX: "auto",
      paddingRight: "6px",
    }}
  >
    {/* Table container removed extra background */}
    <div style={{ borderRadius: 8, overflowx: "hidden", overflowY: "hidden", border: "1px solid rgba(0,0,0,0.06)" }}>
      <table className=" table-bordered mb-0" style={{ width: "100%", backgroundColor: "#191f24" }}>
        <thead
          style={{
            position: "sticky",
            top: 0,
            zIndex: 3,
            background: "hsl(215, 25%, 18%)",
          }}
        >
          <tr>
            <th style={{ padding: "10px 12px", fontWeight: 700 }}>Item</th>
            <th style={{ padding: "10px 12px", fontWeight: 700 }}>Taken By</th>
            <th style={{ padding: "10px 12px", fontWeight: 700 }}>Taken</th>
            <th style={{ padding: "10px 12px", fontWeight: 700 }}>Return</th>
            <th style={{ padding: "10px 12px", fontWeight: 700 }}>Overdue</th>
            <th style={{ padding: "10px 12px" }}></th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ padding: 20, color: "#bbb", textAlign: "center" }}>
                No due items
              </td>
            </tr>
          ) : (
            rows.map((r, i) => (
              <tr key={i}
                style={{
                  background: i % 2 === 0 ? "hsl(215, 25%, 14%)" : "hsl(215, 25%, 16%)",
                }}
              >
                <td style={{ padding: "10px 12px", verticalAlign: "middle" }}>{r.itemName}</td>
                <td style={{ padding: "10px 12px", verticalAlign: "middle" }}>{r.user}</td>
                <td style={{ padding: "10px 12px", verticalAlign: "middle" }}>{r.takenDate}</td>
                <td style={{ padding: "10px 12px", verticalAlign: "middle" }}>{r.returnDate}</td>
                <td style={{ padding: "10px 12px", verticalAlign: "middle" }}>{r.overdue} days</td>
                <td style={{ padding: "10px 12px", verticalAlign: "middle" }}>
                  <button className="btn btn-primary btn-sm">Reminder</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
</div>
  )
};

export default ItemDueCard;
