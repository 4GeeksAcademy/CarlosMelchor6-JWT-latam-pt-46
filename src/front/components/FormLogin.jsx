import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { tokenLogin } from "../services/fetchApi";

export const FormLoginSession = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Both fields are required");
      setMessageType("error");
      return;
    }

    try {
      const data = await tokenLogin(email, password);
      localStorage.setItem("token", data.token); 

      setMessage("Login successful");
      setMessageType("success");

      setTimeout(() => {
        navigate("/dashboard"); 
      }, 1000);
    } catch (error) {
      setMessage(error.message || "Login failed");
      setMessageType("error");
    }
  };

  return (
    <form className="w-50 mx-auto" onSubmit={handleLogin}>
      <div className="mb-3">
        <label htmlFor="loginEmail" className="form-label">
          Email address
        </label>
        <input
          type="email"
          placeholder="enteryouremail@example.com"
          className="form-control"
          id="loginEmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="loginPassword" className="form-label">
          Password
        </label>
        <input
          type="password"
          placeholder="password"
          className="form-control"
          id="loginPassword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {message && (
        <div
          className={`alert ${
            messageType === "success" ? "alert-success" : "alert-danger"
          }`}
          role="alert"
        >
          {message}
        </div>
      )}

      <button type="submit" className="btn btn-primary">
        Log In
      </button>
    </form>
  );
};