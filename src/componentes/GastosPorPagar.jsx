import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "../assets/scss/_03-Componentes/_GastosPorPagar.scss";

const GastosPorPagar = () => {
  const [cuentasPorPagar, setCuentasPorPagar] = useState([]);
  const [facturaInput, setFacturaInput] = useState({});
  const [importeInput, setImporteInput] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('pendientes');

  const cargarCuentasIniciales = async () => {
    try {
      const response = await fetch("/infocuentas.json");
      if (!response.ok) {
        throw new Error(`Error HTTP! estado: ${response.status}`);
      }
      const cuentas = await response.json();
      
      const cuentasConIdsUnicos = cuentas.map((cuenta, index) => ({
        ...cuenta,
        uniqueId: `${cuenta.id}-${index}`
      }));
      
      setCuentasPorPagar(cuentasConIdsUnicos);
      localStorage.setItem("cuentas", JSON.stringify(cuentasConIdsUnicos));
      setError(null);
    } catch (error) {
      console.error("Error al cargar el archivo JSON:", error);
      setError("Error al cargar los datos de cuentas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cuentasLocalStorage = localStorage.getItem("cuentas");
    if (cuentasLocalStorage) {
      try {
        const cuentas = JSON.parse(cuentasLocalStorage);
        const noPagadas = cuentas.filter(
          (cuenta) => cuenta.FacturaPagada !== "Si"
        );
        setCuentasPorPagar(noPagadas);
        setLoading(false);
      } catch (err) {
        setError("Error al leer datos del almacenamiento local");
        cargarCuentasIniciales();
      }
    } else {
      cargarCuentasIniciales();
    }
  }, []);

  const handleImporteChange = (id, valor) => {
    if (/^\d*\.?\d*$/.test(valor)) {
      setImporteInput(prev => ({
        ...prev,
        [id]: valor
      }));
    }
  };

  const marcarComoPagada = (id) => {
    const importePagado = importeInput[id];
    const numeroFactura = facturaInput[id] || "";
  
    if (!importePagado || isNaN(importePagado)) {
      Swal.fire({
        icon: "warning",
        title: "Ingrese un importe válido",
        text: "Debe ingresar el importe pagado en números antes de marcar como pagada",
      });
      return;
    }
    
    const cuentasLocalStorage = localStorage.getItem("cuentas");
    if (cuentasLocalStorage) {
      const cuentas = JSON.parse(cuentasLocalStorage);
      const actualizadas = cuentas.map((cuenta) => {
        if (cuenta.uniqueId === id) {
          return {
            ...cuenta,
            FacturaPagada: "Si",
            ImportePagado: importePagado,
            FechaPagado: new Date().toLocaleDateString("es-AR"),
            NumeroFactura: numeroFactura,
            bloqueado: true,
          };
        }
        return cuenta;
      });
  
      localStorage.setItem("cuentas", JSON.stringify(actualizadas));
      setCuentasPorPagar(
        actualizadas.filter((cuenta) => cuenta.FacturaPagada !== "Si")
      );
  
      const totales = actualizadas.reduce((acc, cuenta) => {
        if (cuenta.FacturaPagada === "Si") {
          return acc + parseFloat(cuenta.ImportePagado) || 0;
        }
        return acc;
      }, 0);
      localStorage.setItem("totales", JSON.stringify(totales));
      
      Swal.fire({
        icon: "success",
        title: "¡Pago registrado!",
        text: `Se marcó la factura ${numeroFactura || '(sin número)'} como pagada`,
      });
    }
  };

  const limpiarLocalStorage = () => {
    Swal.fire({
      title: "¿Restablecer datos?",
      text: "Esto borrará todos los pagos registrados",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4a6fa5",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Sí, restablecer",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("cuentas");
        localStorage.removeItem("totales");
        cargarCuentasIniciales();
        Swal.fire("Restablecido", "Los datos han sido reiniciados", "success");
      }
    });
  };

  const descargarJSON = () => {
    const cuentasLocalStorage = localStorage.getItem("cuentas");
    if (cuentasLocalStorage) {
      const cuentas = JSON.stringify(JSON.parse(cuentasLocalStorage), null, 2);
      const blob = new Blob([cuentas], { type: "application/json" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `cuentas_${new Date().toISOString().split('T')[0]}.json`;
      link.click();
    } else {
      Swal.fire({
        icon: "info",
        title: "No hay datos para descargar",
      });
    }
  };

  const obtenerFechaVencimiento = (diaVencimiento) => {
    const fecha = new Date();
    const mesActual = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const anioActual = fecha.getFullYear();
    const dia = diaVencimiento && diaVencimiento.trim() !== "" ? diaVencimiento : "01";
    return `${dia.padStart(2, "0")}/${mesActual}/${anioActual}`;
  };

  const obtenerMesEnPalabras = () => {
    return new Date().toLocaleDateString("es-AR", { month: "long" }).toUpperCase();
  };

  // Estadísticas
  const totalPendientes = cuentasPorPagar.length;
  const totalPagados = cuentasPorPagar.filter(c => c.FacturaPagada === "Si").length;
  const totalImportePendiente = cuentasPorPagar.reduce((sum, c) => sum + (parseFloat(c.Importe) || 0), 0);

  if (loading) return <div className="loading-spinner"></div>;
  if (error) return <div className="error-message">⚠️ Error: {error}</div>;

  return (
    <div className="gastos-container">
      <main className="finance-main">
        <div className="finance-header-container">
          <header className="finance-header">
            <h1><i className="bi bi-credit-card"></i> Gastos por Pagar - {obtenerMesEnPalabras()}</h1>
          </header>

          <div className="finance-stats-panel">
            <div className="stats-header">
              <h3><i className="bi bi-bar-chart"></i> Estadísticas</h3>
              <button 
                className="export-button"
                onClick={descargarJSON}
              >
                <i className="bi bi-file-earmark-excel"></i> Exportar
              </button>
            </div>

            <div className="stats-content">
              <div className="stat-item">
                <span className="stat-label">Pendientes</span>
                <span className="stat-value">{totalPendientes}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Pagados</span>
                <span className="stat-value">{totalPagados}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Total Pendiente</span>
                <span className="stat-value">
                  ${totalImportePendiente.toLocaleString('es-AR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </span>
              </div>
              <button 
                className="action-button full-width"
                onClick={limpiarLocalStorage}
              >
                <i className="bi bi-arrow-counterclockwise"></i> Restablecer datos
              </button>
            </div>
          </div>
        </div>

        <div className="finance-tabs">
          <button 
            className={`tab-button ${activeTab === 'pendientes' ? 'active' : ''}`}
            onClick={() => setActiveTab('pendientes')}
          >
            <i className="bi bi-clock"></i> Pendientes
          </button>
          <button 
            className={`tab-button ${activeTab === 'pagados' ? 'active' : ''}`}
            onClick={() => setActiveTab('pagados')}
          >
            <i className="bi bi-check-circle"></i> Pagados
          </button>
        </div>

        <div className="tab-content">
          <div className="table-container">
            <table className="finance-table">
              <thead>
                <tr>
                  <th><i className="bi bi-hash"></i> ID</th>
                  <th><i className="bi bi-building"></i> Nombre</th>
                  <th><i className="bi bi-receipt"></i> Concepto</th>
                  <th><i className="bi bi-credit-card"></i> Cuenta</th>
                  <th><i className="bi bi-file-text"></i> Factura</th>
                  <th><i className="bi bi-calendar"></i> Vencimiento</th>
                  <th><i className="bi bi-cash"></i> Importe</th>
                  <th><i className="bi bi-gear"></i> Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cuentasPorPagar
                  .filter(cuenta => activeTab === 'pendientes' ? cuenta.FacturaPagada !== "Si" : cuenta.FacturaPagada === "Si")
                  .map((cuenta) => (
                    <tr key={cuenta.uniqueId} className={cuenta.bloqueado ? "pagada" : ""}>
                      <td>{cuenta.id}</td>
                      <td>{cuenta.Nombre}</td>
                      <td>{cuenta.Servicio || cuenta.Impuesto}</td>
                      <td>{cuenta["Numero de Cuenta"]}</td>
                      <td>
                        {cuenta.bloqueado ? (
                          cuenta.NumeroFactura || "-"
                        ) : (
                          <input
                            type="text"
                            className="factura-input"
                            placeholder="Nº Factura"
                            value={facturaInput[cuenta.uniqueId] || ""}
                            onChange={(e) => {
                              const valor = e.target.value;
                              if (/^\d*$/.test(valor)) {
                                setFacturaInput({
                                  ...facturaInput,
                                  [cuenta.uniqueId]: valor,
                                });
                              }
                            }}
                          />
                        )}
                      </td>
                      <td>{obtenerFechaVencimiento(cuenta.Vencimiento)}</td>
                      <td>
                        {cuenta.bloqueado ? (
                          `$${cuenta.ImportePagado}`
                        ) : (
                          <div className="input-with-icon">
                            <span className="currency-symbol">$</span>
                            <input
                              type="text"
                              placeholder="0.00"
                              value={importeInput[cuenta.uniqueId] || ""}
                              onChange={(e) => handleImporteChange(cuenta.uniqueId, e.target.value)}
                            />
                          </div>
                        )}
                      </td>
                      <td>
                        {cuenta.bloqueado ? (
                          <span className="badge success">
                            <i className="bi bi-check-circle"></i> Pagada
                          </span>
                        ) : (
                          <button 
                            className="action-button small"
                            onClick={() => marcarComoPagada(cuenta.uniqueId)}
                          >
                            <i className="bi bi-check-circle"></i> Pagar
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GastosPorPagar;