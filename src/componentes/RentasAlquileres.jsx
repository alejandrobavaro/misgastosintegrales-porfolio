import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "../assets/scss/_03-Componentes/_RentasAlquileres.scss";

// Función para obtener el nombre del mes actual
const getMesActual = () => {
  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const mesActual = new Date().getMonth();
  return meses[mesActual];
};

const RentasAlquileres = () => {
  const [propiedades, setPropiedades] = useState([]);
  const [importeInput, setImporteInput] = useState({});
  const [fechaCobroInput, setFechaCobroInput] = useState({});
  const [alquilado, setAlquilado] = useState({});

  const cargarPropiedadesIniciales = async () => {
    try {
      const response = await fetch("/infocuentas.json");
      const data = await response.json();
      const propiedades = data.filter(item => item.Categoria === "Propiedades");
      setPropiedades(propiedades);
      localStorage.setItem("propiedades", JSON.stringify(propiedades));
    } catch (error) {
      console.error("Error al cargar el archivo JSON:", error);
    }
  };

  useEffect(() => {
    const propiedadesLocalStorage = localStorage.getItem("propiedades");
    if (propiedadesLocalStorage) {
      setPropiedades(JSON.parse(propiedadesLocalStorage));
    } else {
      cargarPropiedadesIniciales();
    }
  }, []);

  const marcarComoCobrado = (id) => {
    const importeCobrado = importeInput[id] || "";
    const fechaCobro = fechaCobroInput[id] || "";

    if (!importeCobrado || isNaN(importeCobrado) || importeCobrado.trim() === "" || !fechaCobro) {
      Swal.fire({
        icon: "warning",
        title: "Debe ingresar el importe cobrado y la fecha de cobro antes de marcar la propiedad como cobrada",
      });
      return;
    }

    const propiedadesLocalStorage = localStorage.getItem("propiedades");
    if (propiedadesLocalStorage) {
      const propiedades = JSON.parse(propiedadesLocalStorage);
      const actualizadas = propiedades.map((propiedad) => {
        if (propiedad.id === id) {
          return {
            ...propiedad,
            Cobrado: "Sí",
            ImporteCobrado: importeCobrado,
            FechaCobro: fechaCobro,
            Alquilado: alquilado[id] || "No alquilado",
            bloqueado: true,
          };
        }
        return propiedad;
      });

      localStorage.setItem("propiedades", JSON.stringify(actualizadas));
      setPropiedades(actualizadas);
    }
  };

  const handleAlquiladoChange = (id, valor) => {
    setAlquilado({
      ...alquilado,
      [id]: valor,
    });
  };

  const handleAlquilerChange = (id, tipo, valor) => {
    if (tipo === "importe") {
      setImporteInput({ ...importeInput, [id]: valor });
    } else if (tipo === "fecha") {
      setFechaCobroInput({ ...fechaCobroInput, [id]: valor });
    }
  };

  const getTotales = () => {
    const cobradas = propiedades.filter(p => p.Cobrado === "Sí");
    const totales = {
      cantidadCobradas: cobradas.length,
      cantidadFaltanPagar: propiedades.length - cobradas.length,
      totalImporteCobrado: cobradas.reduce((total, propiedad) => total + parseFloat(propiedad.ImporteCobrado || 0), 0)
    };
    return totales;
  };

  const { cantidadCobradas, cantidadFaltanPagar, totalImporteCobrado } = getTotales();

  return (
    <div className="alquileres">
      <h2>Rentas del mes de {getMesActual()}</h2>
      <div className="totales">
        <span>Total Importe Cobrado: ${totalImporteCobrado.toFixed(2)}</span>
        <span>Propiedades Cobradas: {cantidadCobradas}</span>
        <span>Propiedades por Pagar: {cantidadFaltanPagar}</span>
      </div>
      <form>
        <h1>Alquileres</h1>
        <div className="lista-propiedades">
          <div className="propiedad-header">
            <span>ID</span>
            <span>Nombre</span>
            <span>Alquilado</span>
            <span>Pagado con</span>
            <span>Titular</span>
            <span>Importe Cobrado</span>
            <span>Fecha de Cobro</span>
            <span>Marcar como Cobrado</span>
          </div>

          {propiedades.map((propiedad) => (
            <div
              key={propiedad.id}
              className={`propiedad-item ${propiedad.bloqueado ? "bloqueado" : ""}`}
            >
              <span>{propiedad.id}</span>
              <span>{propiedad.Nombre}</span>
              <span>
                <select
                  value={alquilado[propiedad.id] || "Alquilado"}
                  onChange={(e) => handleAlquiladoChange(propiedad.id, e.target.value)}
                  disabled={propiedad.bloqueado}
                >
                  <option value="Alquilado">Alquilado</option>
                  <option value="No alquilado">No alquilado</option>
                </select>
              </span>
              <span>
                <select
                  value={propiedad["Pagado con"] || "Efectivo"}
                  onChange={(e) => {
                    const newPropiedades = propiedades.map(p =>
                      p.id === propiedad.id ? { ...p, "Pagado con": e.target.value } : p
                    );
                    localStorage.setItem("propiedades", JSON.stringify(newPropiedades));
                    setPropiedades(newPropiedades);
                  }}
                  disabled={propiedad.bloqueado}
                >
                  <option value="Efectivo">Efectivo</option>
                  <option value="Transferencia">Transferencia</option>
                  <option value="Deposito Bancario">Depósito Bancario</option>
                  <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
                  <option value="Otro">Otro</option>
                </select>
              </span>
              <span>{propiedad.Titular}</span>
              {propiedad.bloqueado ? (
                <span className="importe-cobrado">Importe Cobrado: ${propiedad.ImporteCobrado}</span>
              ) : (
                <div className="input-container">
                  <span>$</span>
                  <input
                    type="text"
                    placeholder="0"
                    value={importeInput[propiedad.id] || ""}
                    onChange={(e) => handleAlquilerChange(propiedad.id, "importe", e.target.value)}
                  />
                </div>
              )}
              {propiedad.bloqueado ? (
                <span>Fecha Cobro: {propiedad.FechaCobro}</span>
              ) : (
                <input
                  type="date"
                  value={fechaCobroInput[propiedad.id] || ""}
                  onChange={(e) => handleAlquilerChange(propiedad.id, "fecha", e.target.value)}
                />
              )}
              <button
                onClick={() => {
                  if (alquilado[propiedad.id] === "No alquilado") {
                    Swal.fire({
                      icon: "warning",
                      title: "Debe poner el item como 'Alquilado' para poder continuar cargando información.",
                    });
                    return;
                  }
                  marcarComoCobrado(propiedad.id);
                }}
                disabled={propiedad.bloqueado}
              >
                Cobrado
              </button>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default RentasAlquileres;
