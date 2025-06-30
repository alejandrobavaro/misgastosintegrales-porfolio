import React, { useState, useEffect } from "react";
import MainCalendarioPagos from "./MainCalendarioPagos"; // Asegúrate de que la ruta sea correcta
import "../assets/scss/_03-Componentes/_ConsultasVencimientos.scss";

const ConsultasVencimientos = () => {
  const [vencimientos, setVencimientos] = useState([]);

  const cargarVencimientos = async () => {
    try {
      const response = await fetch("/infocuentas.json");
      const data = await response.json();
      setVencimientos(data);
      localStorage.setItem("vencimientos", JSON.stringify(data));
    } catch (error) {
      console.error("Error al cargar el archivo JSON:", error);
    }
  };

  useEffect(() => {
    const vencimientosLocalStorage = localStorage.getItem("vencimientos");
    if (vencimientosLocalStorage) {
      const vencimientos = JSON.parse(vencimientosLocalStorage);
      setVencimientos(vencimientos);
    } else {
      cargarVencimientos();
    }
  }, []);

  return (
    <div className="vencimientos">
      <div>
        <h2>Vencimientos</h2>
      </div>

      <MainCalendarioPagos /> {/* Aquí agregamos el calendario */}

      <div className="lista-vencimientos">
        <div className="vencimiento-header">
          <span>ID</span>
          <span>Nombre</span>
          <span>Servicio</span>
          <span>Empresa / Agente Recaudador</span>
          <span>Numero de Cuenta</span>
          <span>Vencimiento</span>
        </div>

        {vencimientos.map((vencimiento) => (
          <div key={vencimiento.id} className="vencimiento-item">
            <span className="id-col">{vencimiento.id}</span>
            <span>{vencimiento.Nombre}</span>
            <span>{vencimiento.Servicio}</span>
            <span>{vencimiento["Empresa / Agente Recaudador"]}</span>
            <span>{vencimiento["Numero de Cuenta"]}</span>
            <span>{vencimiento.Vencimiento}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsultasVencimientos;
