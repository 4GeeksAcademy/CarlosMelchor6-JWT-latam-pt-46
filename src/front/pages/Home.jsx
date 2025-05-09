import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { FormLoginSession } from "../components/FormLogin.jsx";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  useEffect(() => {
    if (store.token) {
      navigate("/dashboard"); 
    }
  }, [store.token, navigate]);

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <div className="text-center mt-5">
      <FormLoginSession />
      
      {!store.token && (
        <div>
          <button onClick={handleRegisterRedirect} className="btn btn-secondary mt-3">
            No tienes cuenta? Regístrate
          </button>
        </div>
      )}
    </div>
  );
};
