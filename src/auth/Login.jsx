// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // ROUTING BASED ON EMAIL ONLY (NO PASSWORD CHECK)
    if (email === "admin@gmail.com") {
      navigate("/admin");
    } 
    else if (email === "manager@gmail.com") {
      navigate("/manager");
    } 
    
  };

  return (
    <div
      className="d-flex"
      style={{
        minHeight: "100vh",
        overflow: "hidden",
        backgroundColor: "hsl(215, 30%, 10%)",
        color: "hsl(210, 40%, 98%)",
      }}
    >
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div
          className="card p-4"
          style={{
            backgroundColor: "hsl(215, 25%, 14%)",
            color: "hsl(210, 40%, 98%)",
            border: "1px solid hsl(215, 20%, 25%)",
            width: "60%",
            maxWidth: "400px",
          }}
        >
             <div className="d-flex align-items-center text-center justify-content-center">
            <img
              src="/GTLogos.png"
              alt="Logo"
              style={{ height: "80px", borderRadius: "8px" }}
            />
            {/* <h5 className="mb-0 fw-bold text-light d-none d-sm-block">
              Gandeevan Technologies
            </h5> */}
          </div>
          {/* <h5 className="mb-2 fw-bold text-light text-center">Gandeevan Technologies</h5>  */}
          <h2 className="mb-4 text-center">Login</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  backgroundColor: "hsl(215, 25%, 12%)",
                  color: "hsl(210, 40%, 98%)",
                  border: "1px solid hsl(215, 20%, 25%)",
                }}
              />
            </div>

            <div className="mb-5">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                style={{
                  backgroundColor: "hsl(215, 25%, 12%)",
                  color: "hsl(210, 40%, 98%)",
                  border: "1px solid hsl(215, 20%, 25%)",
                }}
              />
            </div>

            <button
              type="submit"
              className="btn w-100"
              style={{
                backgroundColor: "hsl(210, 40%, 50%)",
                color: "hsl(215, 25%, 12%)",
                border: "1px solid hsl(215, 20%, 25%)",
              }}
            >
              Login
            </button>
          </form>

          <div
            className="text-center mt-3"
            style={{
              cursor: "pointer",
              color: "hsl(210, 40%, 80%)",
            }}
          >
            <p>
              Don’t have an account?{" "}
              <span
                className="text-info"
                onClick={() => navigate("/register")}
              >
                REGISTER
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
