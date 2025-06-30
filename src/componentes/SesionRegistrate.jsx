import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './SesionAuthContext';
import LoadingSpinner from './SesionLoadingSpinner';
import '../assets/scss/_03-Componentes/_SesionLoginRegister.scss';

const SesionRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      dispatch({ type: 'REGISTER', payload: { email } });
      setLoading(false);
      navigate('/');
    }, 2000);
  };

  return (
    <div className="auth-overlay">
      <div className="auth-container">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="auth-content">
            <img className='auth-image top-image' src="/img/05-img-costados-larga/4.png" alt="" />
            <form onSubmit={handleRegister} className="auth-form">
              <h2>Registrate</h2>
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
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button type="submit">Register</button>
            </form>
            <img className='auth-image bottom-image' src="/img/05-img-costados-larga/3.png" alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SesionRegister;
