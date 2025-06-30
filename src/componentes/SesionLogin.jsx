import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "./SesionAuthContext";
import LoadingSpinner from "./SesionLoadingSpinner";
import "../assets/scss/_03-Componentes/_SesionLoginRegister.scss";

const SesionLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();

  if (state.isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      dispatch({ type: "LOGIN", payload: { email } });
      setLoading(false);
      navigate("/");
    }, 2000);
  };

  return (
    <div className="auth-overlay">
      <div className="auth-container">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="auth-content">
            <img
              className="auth-image top-image"
              src="/img/05-img-costados-larga/3.png"
              alt=""
            />
            <form onSubmit={handleLogin} className="auth-form">
              <h2>Login</h2>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Login</button>
              <hr />

              <div className="auth-links">
                <p>
                  Para Registrarte, <a href="/register">ingresa aquí.</a>
                </p>
                <hr />
                <p>
                  Para ingresar como Invitado,{""}
                  <a href="/submit">Ingresa aquí.</a>
                </p>
              </div>
            </form>
            <img
              className="auth-image bottom-image"
              src="/img/05-img-costados-larga/4.png"
              alt=""
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SesionLogin;
