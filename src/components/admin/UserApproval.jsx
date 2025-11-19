// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Check, X, Mail, Calendar } from "lucide-react";



// const UserApproval = ({ pendingUsers, onApprove, onReject }) => {
//   const handleApprove = (user) => {
//     onApprove(user.id);
//     alert(`${user.name} has been approved successfully.`);
//   };

//   const handleReject = (user) => {
//     onReject(user.id);
//     alert(`${user.name} has been rejected.`);
//   };

//   // ✅ No pending users
//   if (!pendingUsers || pendingUsers.length === 0) {
//     return (
//       <div
//         className="card shadow-sm my-3"
//         style={{
//           backgroundColor: "hsl(215, 25%, 14%)",
//           color: "hsl(210, 40%, 98%)",
//           border: "1px solid hsl(215, 20%, 25%)",
//         }}
//       >
//         <div
//           className="card-header"
//           style={{
//             backgroundColor: "hsl(215, 25%, 12%)",
//             color: "hsl(210, 40%, 98%)",
//             borderBottom: "1px solid hsl(215, 20%, 25%)",
//           }}
//         >
//           <h5 className="mb-0">Pending User Approvals</h5>
//         </div>
//         <div className="card-body text-center text-secondary py-4">
//           No pending approvals
//         </div>
//       </div>
//     );
//   }

//   // ✅ Pending users list
//   return (
//     <div
//       className="card shadow-sm my-3"
//       style={{
//         backgroundColor: "hsl(215, 25%, 14%)",
//         color: "hsl(210, 40%, 98%)",
//         border: "1px solid hsl(215, 20%, 25%)",
//       }}
//     >
//       {/* Header */}
//       <div
//         className="card-header d-flex justify-content-between align-items-center flex-wrap gap-2"
//         style={{
//           backgroundColor: "hsl(215, 25%, 12%)",
//           color: "hsl(210, 40%, 98%)",
//           borderBottom: "1px solid hsl(215, 20%, 25%)",
//         }}
//       >
//         <h5 className="mb-0">Pending Approvals</h5>
//         <span
//           className="badge"
//           style={{
//             backgroundColor: "hsl(215, 20%, 20%)",
//             color: "hsl(210, 40%, 98%)",
//             border: "1px solid hsl(215, 20%, 25%)",
//           }}
//         >
//           {pendingUsers.length} pending
//         </span>
//       </div>

//       {/* Card Content */}
//       <div className="card-body">
//         {pendingUsers.map((user) => (
//           <div
//             key={user.id}
//             className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center border rounded p-3 mb-2 shadow-sm gap-2"
//             style={{
//               backgroundColor: "hsl(215, 25%, 12%)",
//               borderColor: "hsl(215, 20%, 25%)",
//               transition: "background-color 0.2s ease, transform 0.2s ease",
//             }}
//             onMouseEnter={(e) =>
//               (e.currentTarget.style.backgroundColor = "hsl(215, 25%, 16%)")
//             }
//             onMouseLeave={(e) =>
//               (e.currentTarget.style.backgroundColor = "hsl(215, 25%, 12%)")
//             }
//           >
//             {/* Left: User Info */}
//             <div className="flex-grow-1 text-start">
//               <p className="fw-semibold mb-1 text-light">{user.name}</p>
//               <div className="d-flex flex-wrap gap-3 small text-secondary">
//                 <span className="d-flex align-items-center gap-1">
//                   <Mail size={14} />
//                   {user.email}
//                 </span>
//                 <span className="d-flex align-items-center gap-1">
//                   <Calendar size={14} />
//                   {user.registeredDate}
//                 </span>
//               </div>
//             </div>

//             {/* Right: Action Buttons */}
//             <div className="d-flex flex-wrap gap-2 justify-content-start justify-content-sm-end w-100 w-sm-auto">
//               <button
//                 className="btn btn-success btn-sm d-flex align-items-center gap-1 flex-grow-1 flex-sm-grow-0"
//                 onClick={() => handleApprove(user)}
//                 style={{
//                   boxShadow: "0 0 10px rgba(25, 135, 84, 0.4)",
//                 }}
//               >
//                 <Check size={16} />
//                 Approve
//               </button>
//               <button
//                 className="btn btn-danger btn-sm d-flex align-items-center gap-1 flex-grow-1 flex-sm-grow-0"
//                 onClick={() => handleReject(user)}
//                 style={{
//                   boxShadow: "0 0 10px rgba(220, 53, 69, 0.4)",
//                 }}
//               >
//                 <X size={16} />
//                 Reject
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
      
//     </div>
//   );
// }; 

// export default UserApproval;


