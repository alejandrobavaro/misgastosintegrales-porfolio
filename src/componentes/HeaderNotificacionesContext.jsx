import React, { createContext, useState, useContext, useCallback } from 'react';
import '../assets/scss/_03-Componentes/_HeaderNotificaciones.scss'; // Importa los estilos

// Contexto
const HeaderNotificationsContext = createContext();

// Proveedor del contexto
export const HeaderNotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState({});

  // Usar useCallback para evitar la recreación de funciones en cada render
  const addNotification = useCallback((key, count) => {
    setNotifications(prev => ({ ...prev, [key]: count }));
  }, []);

  const removeNotification = useCallback((key) => {
    setNotifications(prev => {
      const newNotifications = { ...prev };
      delete newNotifications[key];
      return newNotifications;
    });
  }, []);

  return (
    <div className="nav-linkHeader">
      <HeaderNotificationsContext.Provider value={{ notifications, addNotification, removeNotification }}>
        {children}
      </HeaderNotificationsContext.Provider>
    </div>
  );
};

// Hook personalizado para usar el contexto
export const useHeaderNotifications = () => {
  return useContext(HeaderNotificationsContext);
};
