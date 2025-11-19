// components/admin/RecentActivity.jsx
//-----------------------------------------------------------
// Auto-generates activity from containers + items[] + taken[].
//
// Shows activity like:
//  • Item Added
//  • Item Taken
//  • Item Returned
//-----------------------------------------------------------

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Calendar, User, Package } from "lucide-react";

const RecentActivity = ({ containers }) => {
  if (!containers || containers.length === 0) return null;

  const activities = [];

  // -------------------------------------------------------------
  // BUILD ACTIVITY LIST FROM ALL CONTAINERS
  // -------------------------------------------------------------
  containers.forEach((container) => {
    container.slots.forEach((slot) => {
      slot.items?.forEach((item) => {
        // 1. Item Added
        activities.push({
          type: "Item Added",
          details: `${item.name} added to Slot ${slot.slotNumber} (${container.name})`,
          user: "Admin",
          date: item.addedDate || "2025-01-01",
        });

        // 2. Taken History
        item.taken?.forEach((t) => {
          activities.push({
            type: "Item Taken",
            details: `${t.user} took ${t.qty} × ${item.name} from Slot ${slot.slotNumber}`,
            user: t.user,
            date: t.date,
          });

          // 3. If Returned
          if (t.returnDate) {
            activities.push({
              type: "Item Returned",
              details: `${t.user} returned ${t.qty} × ${item.name}`,
              user: t.user,
              date: t.returnDate,
            });
          }
        });
      });
    });
  });

  // Sort by date (descending)
  const sortedActivities = activities.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div>
      <h4 className="fw-bold mb-3">Recent Activity</h4>

      <div className="d-flex flex-column gap-3">
        {sortedActivities.slice(0, 6).map((item, index) => (
          <div
            key={index}
            className="card p-3 shadow-sm"
            style={{
              background:
                "linear-gradient(90deg, hsl(215, 25%, 12%) 0%, hsl(215, 25%, 10%) 100%)",
              color: "hsl(210, 40%, 98%)",
              border: "1px solid hsl(215, 20%, 25%)",
            }}
          >
            <div className="d-flex justify-content-between">
              <div>
                <h6 className="fw-bold mb-1">{item.type}</h6>
                <p className="text-muted small mb-2">{item.details}</p>

                <div className="text-muted small d-flex align-items-center gap-2">
                  <User size={14} />
                  {item.user}
                  <Calendar size={14} className="ms-3" />
                  {item.date}
                </div>
              </div>

              <Package size={20} className="text-primary" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
