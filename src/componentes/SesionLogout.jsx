import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './SesionAuthContext';
import LoadingSpinner from './SesionLoadingSpinner';
import '../assets/scss/_03-Componentes/_SesionLoginRegister.scss';

const SesionLogout = () => {
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch({ type: 'LOGOUT' });
    setTimeout(() => {
      navigate('/login'); // Cambiado para redirigir a la página de inicio de sesión
    }, 2000); // Simula un retraso
  }, [dispatch, navigate]);

  return <LoadingSpinner />;
};

export default SesionLogout;
