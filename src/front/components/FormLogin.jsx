import React, { useState } from "react";
import { createUser } from "../services/fetchApi";

export const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null); // para mostrar mensajes del servidor
  const [messageType, setMessageType] = useState("success"); // "success" o "error"

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Both fields are required");
      setMessageType("error");
      return;
    }

    try {
      await createUser(email, password);
      setMessage("User created successfully");
      setMessageType("success");
      setEmail("");
      setPassword("");
    } catch (error) {
      setMessage(error.message);
      setMessageType("error");
    }
  };

  return (
    <form className="w-50 mx-auto" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-describedby="emailHelp"
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
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
        Submit
      </button>
    </form>
  );
};
