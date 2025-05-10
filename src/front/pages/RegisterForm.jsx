import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../services/fetchApi";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(email, password);
      setMessage("Registro exitoso, por favor inicie sesión.");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      alert("Error al registrarse: " + error.message);
    }
  };

  return (
    <form className="d-flex flex-column w-50 mx-auto text-center " onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="loginEmail" className="form-label">
          Email address
        </label>
        <input
          placeholder="registeryouremail@example.com"
          type="email"
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

      <div className="d-flex justify-content-center">
        <button className="btn btn-success w-50" type="submit">Registrarse</button>
      </div>

      {message && <p>{message}</p>}
    </form>
  );
};