import React, { useState, useEffect } from "react";
import "../assets/scss/_03-Componentes/_ConsultasFacturas.scss";

const ConsultasFacturas = () => {
  const [facturas, setFacturas] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [pagina, setPagina] = useState(1);
  const [facturasPorPagina] = useState(10); // Facturas mostradas por página
  const [orden, setOrden] = useState("asc"); // Orden ascendente por defecto

  const cargarFacturas = async () => {
    try {
      const response = await fetch("/infocuentas.json"); // Asegúrate de que la ruta sea correcta
      const data = await response.json();
      setFacturas(data);
      localStorage.setItem("facturas", JSON.stringify(data));
    } catch (error) {
      console.error("Error al cargar el archivo JSON:", error);
    }
  };

  useEffect(() => {
    const facturasLocalStorage = localStorage.getItem("facturas");
    if (facturasLocalStorage) {
      const facturas = JSON.parse(facturasLocalStorage);
      setFacturas(facturas);
    } else {
      cargarFacturas();
    }
  }, []);

  const filtrarFacturas = () => {
    return facturas.filter(factura =>
      factura.Nombre.toLowerCase().includes(filtro.toLowerCase())
    );
  };

  const ordenarFacturas = (a, b) => {
    if (orden === "asc") {
      return new Date(a.Vencimiento) - new Date(b.Vencimiento);
    } else {
      return new Date(b.Vencimiento) - new Date(a.Vencimiento);
    }
  };

  const facturasFiltradas = filtrarFacturas().sort(ordenarFacturas);

  // Calcular paginación
  const indiceUltimaFactura = pagina * facturasPorPagina;
  const indicePrimeraFactura = indiceUltimaFactura - facturasPorPagina;
  const facturasMostradas = facturasFiltradas.slice(indicePrimeraFactura, indiceUltimaFactura);

  const cambiarPagina = (numeroPagina) => {
    setPagina(numeroPagina);
  };

  return (
    <div className="facturas">
      <h2>Facturas</h2>
      
      {/* Campo de búsqueda */}
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="filtro-input"
      />

      {/* Botón para ordenar */}
      <button onClick={() => setOrden(orden === "asc" ? "desc" : "asc")} className="ordenar-btn">
        Ordenar por Vencimiento ({orden === "asc" ? "Ascendente" : "Descendente"})
      </button>

      <div className="lista-facturas">
        <div className="factura-header">
          <span>ID</span>
          <span>Nombre</span>
          <span>Vencimiento</span>
          <span>Importe Pagado</span>
          <span>Impuesto</span>
          <span>Agente Recaudador</span>
          <span>Estado</span>
          <span>Acciones</span>
        </div>

        {facturasMostradas.map((factura) => (
          <div key={factura.id} className="factura-item">
            <span className="id-col">{factura.id}</span>
            <span>{factura.Nombre}</span>
            <span>{factura.Vencimiento || "No disponible"}</span>
            <span>{factura["Importe Pagado"] || "No disponible"}</span>
            <span>{factura.Impuesto}</span>
            <span>{factura["Agente Recaudador"]}</span>
            <span className={factura["Factura Pagada"] ? "pagada" : "pendiente"}>
              {factura["Factura Pagada"] ? "Pagada" : "Pendiente"}
            </span>
            <span>
              {factura["Factura Imagen"] && (
                <a href={factura["Factura Imagen"]} download className="descargar-btn">
                  Descargar
                </a>
              )}
            </span>
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div className="paginacion">
        {[...Array(Math.ceil(facturasFiltradas.length / facturasPorPagina)).keys()].map(num => (
          <button key={num} onClick={() => cambiarPagina(num + 1)} className="pagina-btn">
            {num + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ConsultasFacturas;
