import React, { useState, useEffect } from "react";
import "../assets/scss/_03-Componentes/_ConsultasComprobantes.scss";

const ConsultasComprobantes = () => {
  const [comprobantes, setComprobantes] = useState([]);

  const cargarComprobantes = async () => {
    try {
      const response = await fetch("/infocuentas.json"); // Asegúrate de que la ruta sea correcta
      const data = await response.json();
      setComprobantes(data);
      localStorage.setItem("comprobantes", JSON.stringify(data));
    } catch (error) {
      console.error("Error al cargar el archivo JSON:", error);
    }
  };

  useEffect(() => {
    const comprobantesLocalStorage = localStorage.getItem("comprobantes");
    if (comprobantesLocalStorage) {
      const comprobantes = JSON.parse(comprobantesLocalStorage);
      setComprobantes(comprobantes);
    } else {
      cargarComprobantes();
    }
  }, []);

  return (
    <div className="comprobantes">
      <h2>Comprobantes</h2>
      {/* Aquí puedes agregar un componente similar al MainCalendarioPagos si lo deseas */}

      <div className="lista-comprobantes">
        <div className="comprobante-header">
          <span>ID</span>
          <span>Nombre</span>
          <span>Fecha</span>
          <span>Tipo</span>
          <span>Monto</span>
          <span>Estado</span>
        </div>

        {comprobantes.map((comprobante) => (
          <div key={comprobante.id} className="comprobante-item">
            <span className="id-col">{comprobante.id}</span>
            <span>{comprobante.Nombre}</span>
            <span>{comprobante.Fecha}</span>
            <span>{comprobante.Tipo}</span>
            <span>{comprobante.Monto}</span>
            <span>{comprobante.Estado}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsultasComprobantes;
