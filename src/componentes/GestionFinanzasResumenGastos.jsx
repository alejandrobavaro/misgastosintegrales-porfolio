import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import * as XLSX from 'xlsx';
import '../assets/scss/_03-Componentes/_GestionFinanzasResumenGastos.scss';

const GestionFinanzasResumenGastos = ({ rubros, transacciones, config }) => {
  const [showExcelPreview, setShowExcelPreview] = useState(true);
  const [filtrosExcel, setFiltrosExcel] = useState({
    fechaDesde: '',
    fechaHasta: '',
    montoMinimo: '',
    montoMaximo: '',
    soloPendientes: false
  });

  const getNombrePropietario = (id) => 
    rubros.propietarios.find(p => p.id === id)?.nombre || 'N/A';
  
  const getNombrePropiedad = (id) => 
    rubros.propiedades.find(p => p.id === id)?.nombre || 'N/A';

  const getNombreServicio = (id) =>
    rubros.servicios.find(s => s.id === id)?.nombre || 'N/A';

  const getEstadoPropiedad = (id) =>
    rubros.estados_propiedad.find(e => e.id === id)?.nombre || 'N/A';

  const getEstadoCobro = (id) =>
    rubros.estados_cobro.find(e => e.id === id)?.nombre || 'N/A';

  const getMetodoCobro = (id) =>
    rubros.metodos_cobro.find(m => m.id === id)?.nombre || 'N/A';

  const getEstadoPago = (id) =>
    rubros.estados_pago.find(e => e.id === id)?.nombre || 'N/A';

  const getMetodoPago = (id) =>
    rubros.metodos_pago.find(m => m.id === id)?.nombre || 'N/A';

  const totalIngresos = useMemo(() => 
    transacciones
      .filter(t => t.tipo === 'ingreso')
      .reduce((sum, t) => sum + (t.monto_cobrado || 0), 0), 
  [transacciones]);

  const totalEgresos = useMemo(() => 
    transacciones
      .filter(t => t.tipo === 'egreso')
      .reduce((sum, t) => sum + (t.monto_pagado || 0), 0), 
  [transacciones]);

  const balance = totalIngresos - totalEgresos;

  const totalesPorCategoria = useMemo(() => {
    return Object.entries(
      transacciones.reduce((acc, t) => {
        const key = t.tipo === 'egreso' ? 
          `EGRESO:${getNombreServicio(t.servicio)}` : 
          `INGRESO:${getNombrePropiedad(t.propiedad)}`;
        acc[key] = (acc[key] || 0) + (t.tipo === 'ingreso' ? t.monto_cobrado : t.monto_pagado);
        return acc;
      }, {})
    ).sort((a, b) => b[1] - a[1]);
  }, [transacciones]);

  const excelData = useMemo(() => {
    const groupedData = {};
    
    rubros.propiedades.forEach(propiedad => {
      const ingresos = transacciones.filter(t => 
        t.tipo === 'ingreso' && t.propiedad === propiedad.id
      );
      const egresos = transacciones.filter(t => 
        t.tipo === 'egreso' && t.propiedad === propiedad.id
      );
      
      groupedData[propiedad.id] = {
        propiedad,
        ingresos,
        egresos,
        totalIngresos: ingresos.reduce((sum, t) => sum + (t.monto_cobrado || 0), 0),
        totalEgresos: egresos.reduce((sum, t) => sum + (t.monto_pagado || 0), 0)
      };
    });
    
    return groupedData;
  }, [transacciones, rubros.propiedades]);

  const handleChangeFiltroExcel = (e) => {
    const { name, value, type, checked } = e.target;
    setFiltrosExcel({
      ...filtrosExcel,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const exportToExcel = () => {
    const transaccionesFiltradas = transacciones.filter(t => {
      const fechaTrans = new Date(t.fecha);
      const cumpleFecha = (
        (!filtrosExcel.fechaDesde || fechaTrans >= new Date(filtrosExcel.fechaDesde)) &&
        (!filtrosExcel.fechaHasta || fechaTrans <= new Date(filtrosExcel.fechaHasta))
      );
      const monto = t.tipo === 'ingreso' ? t.monto_cobrado : t.monto_pagado;
      const cumpleMonto = (
        (!filtrosExcel.montoMinimo || monto >= parseFloat(filtrosExcel.montoMinimo)) &&
        (!filtrosExcel.montoMaximo || monto <= parseFloat(filtrosExcel.montoMaximo))
      );
      const cumpleEstado = !filtrosExcel.soloPendientes || 
        (t.tipo === 'ingreso' ? t.estado_cobro !== 1 : t.estado_pago !== 1);
      
      return cumpleFecha && cumpleMonto && cumpleEstado;
    });

    const workbook = XLSX.utils.book_new();
    
    // [Resto de la lógica de exportToExcel...]
    // ... (mantener el resto de la función exportToExcel igual)
  };

  return (
    <div className="resumen-gastos">
      <div className="finance-header-container">
        <header className="finance-header">
          <h1><i className="bi bi-graph-up"></i> Resumen de Gastos</h1>
        </header>
        <button 
          onClick={exportToExcel} 
          className="excel-export-button"
          title="Exportar a Excel"
        >
          <i className="bi bi-file-earmark-excel"></i> Exportar
        </button>
      </div>

      <div className="filtros-excel">
        <h4><i className="bi bi-funnel"></i> Filtros para Exportación</h4>
        <div className="filtros-grid">
          <div className="form-group">
            <label htmlFor="fechaDesde">Desde:</label>
            <input
              type="date"
              id="fechaDesde"
              name="fechaDesde"
              value={filtrosExcel.fechaDesde}
              onChange={handleChangeFiltroExcel}
            />
          </div>
          <div className="form-group">
            <label htmlFor="fechaHasta">Hasta:</label>
            <input
              type="date"
              id="fechaHasta"
              name="fechaHasta"
              value={filtrosExcel.fechaHasta}
              onChange={handleChangeFiltroExcel}
            />
          </div>
          <div className="form-group">
            <label htmlFor="montoMinimo">Monto Mínimo:</label>
            <input
              type="number"
              id="montoMinimo"
              name="montoMinimo"
              value={filtrosExcel.montoMinimo}
              onChange={handleChangeFiltroExcel}
              min="0"
              step="0.01"
            />
          </div>
          <div className="form-group">
            <label htmlFor="montoMaximo">Monto Máximo:</label>
            <input
              type="number"
              id="montoMaximo"
              name="montoMaximo"
              value={filtrosExcel.montoMaximo}
              onChange={handleChangeFiltroExcel}
              min="0"
              step="0.01"
            />
          </div>
          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                name="soloPendientes"
                checked={filtrosExcel.soloPendientes}
                onChange={handleChangeFiltroExcel}
              />
              Solo Pendientes
            </label>
          </div>
        </div>
      </div>

      <div className="summary-cards">
        <div className="summary-card income">
          <div className="card-icon">
            <i className="bi bi-arrow-down-circle"></i>
          </div>
          <div className="card-content">
            <h3>Ingresos</h3>
            <p>{config.moneda} {totalIngresos.toLocaleString('es-AR', {
              minimumFractionDigits: config.decimales,
              maximumFractionDigits: config.decimales
            })}</p>
          </div>
        </div>

        <div className="summary-card expense">
          <div className="card-icon">
            <i className="bi bi-arrow-up-circle"></i>
          </div>
          <div className="card-content">
            <h3>Egresos</h3>
            <p>{config.moneda} {totalEgresos.toLocaleString('es-AR', {
              minimumFractionDigits: config.decimales,
              maximumFractionDigits: config.decimales
            })}</p>
          </div>
        </div>

        <div className="summary-card balance">
          <div className="card-icon">
            <i className="bi bi-graph-up"></i>
          </div>
          <div className="card-content">
            <h3>Balance</h3>
            <p className={balance >= 0 ? 'positive' : 'negative'}>
              {config.moneda} {Math.abs(balance).toLocaleString('es-AR', {
                minimumFractionDigits: config.decimales,
                maximumFractionDigits: config.decimales
              })}
              <span> {balance >= 0 ? '🡅' : '🡇'}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="detailed-totals">
        <h4><i className="bi bi-list-check"></i> Totales por Categoría</h4>
        <div className="total-categories">
          {totalesPorCategoria.map(([categoria, total]) => (
            <div key={categoria} className="total-category">
              <span>{categoria.split(':')[1]}</span>
              <span className="amount">
                {config.moneda} {total.toLocaleString('es-AR', {
                  minimumFractionDigits: config.decimales,
                  maximumFractionDigits: config.decimales
                })}
              </span>
            </div>
          ))}
        </div>
      </div>

      {showExcelPreview && (
        <div className="excel-preview-panel">
          <div className="excel-preview">
            <div className="excel-header">
              <h3><i className="bi bi-file-earmark-excel"></i> Vista Previa Excel</h3>
              <button 
                className="toggle-excel"
                onClick={() => setShowExcelPreview(!showExcelPreview)}
              >
                <i className={`bi ${showExcelPreview ? 'bi-arrows-angle-contract' : 'bi-arrows-angle-expand'}`}></i>
              </button>
            </div>
            
            <div className="excel-content">
              {Object.values(excelData).map(({ propiedad, ingresos, egresos, totalIngresos, totalEgresos }) => (
                <div key={propiedad.id} className="property-section">
                  <div className="property-header">
                    <h4>{propiedad.nombre}</h4>
                    <span className={`property-balance ${totalIngresos - totalEgresos >= 0 ? 'positive' : 'negative'}`}>
                      {config.moneda} {Math.abs(totalIngresos - totalEgresos).toLocaleString('es-AR', {
                        minimumFractionDigits: config.decimales,
                        maximumFractionDigits: config.decimales
                      })}
                    </span>
                  </div>
                  
                  {ingresos.length > 0 && (
                    <div className="ingresos-section">
                      <h5>INGRESOS - SUMA</h5>
                      <table>
                        <thead>
                          <tr>
                            <th>Estado</th>
                            <th>Cobrado</th>
                            <th>Método</th>
                            <th>Monto</th>
                            <th>Mes Ant.</th>
                            <th>Notas</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ingresos.map((ingreso, index) => (
                            <tr key={index}>
                              <td>{getEstadoPropiedad(ingreso.estado_alquiler)}</td>
                              <td>{getEstadoCobro(ingreso.estado_cobro)}</td>
                              <td>{getMetodoCobro(ingreso.metodo_cobro)}</td>
                              <td>{config.moneda} {(ingreso.monto_cobrado || 0).toLocaleString('es-AR', {
                                minimumFractionDigits: config.decimales,
                                maximumFractionDigits: config.decimales
                              })}</td>
                              <td>{config.moneda} {(ingreso.monto_cobrado_mes_anterior || 0).toLocaleString('es-AR', {
                                minimumFractionDigits: config.decimales,
                                maximumFractionDigits: config.decimales
                              })}</td>
                              <td>{ingreso.anotaciones_ingreso}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  
                  {egresos.length > 0 && (
                    <div className="egresos-section">
                      <h5>EGRESOS - RESTAN</h5>
                      <table>
                        <thead>
                          <tr>
                            <th>Servicio</th>
                            <th>Pagado</th>
                            <th>Método</th>
                            <th>Monto</th>
                            <th>Mes Ant.</th>
                            <th>Notas</th>
                          </tr>
                        </thead>
                        <tbody>
                          {egresos.map((egreso, index) => (
                            <tr key={index}>
                              <td>{getNombreServicio(egreso.servicio)}</td>
                              <td>{getEstadoPago(egreso.estado_pago)}</td>
                              <td>{getMetodoPago(egreso.metodo_pago)}</td>
                              <td>{config.moneda} {(egreso.monto_pagado || 0).toLocaleString('es-AR', {
                                minimumFractionDigits: config.decimales,
                                maximumFractionDigits: config.decimales
                              })}</td>
                              <td>{config.moneda} {(egreso.importe_mes_anterior || 0).toLocaleString('es-AR', {
                                minimumFractionDigits: config.decimales,
                                maximumFractionDigits: config.decimales
                              })}</td>
                              <td>{egreso.anotaciones_egreso}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  
                  <div className="property-totals">
                    <div className="total-ingresos">
                      <span>Total Ingresos:</span>
                      <span>{config.moneda} {totalIngresos.toLocaleString('es-AR', {
                        minimumFractionDigits: config.decimales,
                        maximumFractionDigits: config.decimales
                      })}</span>
                    </div>
                    <div className="total-egresos">
                      <span>Total Egresos:</span>
                      <span>{config.moneda} {totalEgresos.toLocaleString('es-AR', {
                        minimumFractionDigits: config.decimales,
                        maximumFractionDigits: config.decimales
                      })}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

GestionFinanzasResumenGastos.propTypes = {
  rubros: PropTypes.object.isRequired,
  transacciones: PropTypes.array.isRequired,
  config: PropTypes.object.isRequired
};

export default GestionFinanzasResumenGastos;