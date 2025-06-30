import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../assets/scss/_03-Componentes/_GestionFinanzasFormularioGastos.scss';

const GestionFinanzasFormularioGastos = ({ rubros, onAddTransaccion }) => {
  // Estados principales
  const [propietarioSeleccionado, setPropietarioSeleccionado] = useState('');
  const [propiedadSeleccionada, setPropiedadSeleccionada] = useState('');
  const [activeTab, setActiveTab] = useState('ingresos');
  const [servicioSearch, setServicioSearch] = useState('');
  const [mostrarRecordatorios, setMostrarRecordatorios] = useState(false);
  
  // Estados para valores predeterminados
  const [defaultValues, setDefaultValues] = useState(() => {
    const saved = localStorage.getItem('defaultFinanceValues');
    return saved ? JSON.parse(saved) : {
      estado_alquiler: '',
      estado_cobro: '',
      metodo_cobro: '',
      estado_pago: '',
      metodo_pago: ''
    };
  });

  // Estados para recordatorios
  const [recordatorios, setRecordatorios] = useState([]);

  // Formularios
  const [formIngreso, setFormIngreso] = useState({
    estado_alquiler: defaultValues.estado_alquiler,
    estado_cobro: defaultValues.estado_cobro,
    metodo_cobro: defaultValues.metodo_cobro,
    monto_cobrado: '',
    monto_cobrado_mes_anterior: '',
    anotaciones_ingreso: ''
  });

  const [formEgreso, setFormEgreso] = useState({
    servicio: '',
    estado_pago: defaultValues.estado_pago,
    metodo_pago: defaultValues.metodo_pago,
    monto_pagado: '',
    importe_mes_anterior: '',
    anotaciones_egreso: ''
  });

  // Cargar valores iniciales
  useEffect(() => {
    if (rubros.propietarios.length > 0) {
      setPropietarioSeleccionado(rubros.propietarios[0].id);
    }
    if (rubros.propiedades.length > 0) {
      setPropiedadSeleccionada(rubros.propiedades[0].id);
    }
    
    // Cargar recordatorios (simulación)
    const recordatoriosEjemplo = [
      { id: 1, servicio: 'Expensas', vencimiento: '2023-10-05', monto: 15000, pagado: false },
      { id: 2, servicio: 'Luz', vencimiento: '2023-10-15', monto: 8500, pagado: false },
      { id: 3, servicio: 'ABL', vencimiento: '2023-10-20', monto: 3200, pagado: true }
    ];
    setRecordatorios(recordatoriosEjemplo);
  }, [rubros]);

  // Guardar valores predeterminados cuando cambian
  useEffect(() => {
    localStorage.setItem('defaultFinanceValues', JSON.stringify(defaultValues));
  }, [defaultValues]);

  // Handlers
  const handleChangePropietario = (e) => setPropietarioSeleccionado(e.target.value);
  const handleChangePropiedad = (e) => setPropiedadSeleccionada(e.target.value);

  const handleChangeIngreso = (e) => {
    const { name, value } = e.target;
    setFormIngreso({...formIngreso, [name]: value});
    
    // Guardar como predeterminado si es un campo configurable
    if (['estado_alquiler', 'estado_cobro', 'metodo_cobro'].includes(name)) {
      setDefaultValues({...defaultValues, [name]: value});
    }
  };

  const handleChangeEgreso = (e) => {
    const { name, value } = e.target;
    setFormEgreso({...formEgreso, [name]: value});
    
    // Guardar como predeterminado si es un campo configurable
    if (['estado_pago', 'metodo_pago'].includes(name)) {
      setDefaultValues({...defaultValues, [name]: value});
    }
  };

  const handleSubmitIngreso = (e) => {
    e.preventDefault();
    const nuevaTransaccion = {
      id: Date.now(),
      tipo: 'ingreso',
      fecha: new Date().toLocaleDateString('es-AR'),
      propietario: parseInt(propietarioSeleccionado),
      propiedad: parseInt(propiedadSeleccionada),
      ...formIngreso,
      monto_cobrado: parseFloat(formIngreso.monto_cobrado) || 0,
      monto_cobrado_mes_anterior: parseFloat(formIngreso.monto_cobrado_mes_anterior) || 0
    };
    onAddTransaccion(nuevaTransaccion);
    setFormIngreso({
      estado_alquiler: defaultValues.estado_alquiler,
      estado_cobro: defaultValues.estado_cobro,
      metodo_cobro: defaultValues.metodo_cobro,
      monto_cobrado: '',
      monto_cobrado_mes_anterior: '',
      anotaciones_ingreso: ''
    });
  };

  const handleSubmitEgreso = (e) => {
    e.preventDefault();
    const nuevaTransaccion = {
      id: Date.now(),
      tipo: 'egreso',
      fecha: new Date().toLocaleDateString('es-AR'),
      propietario: parseInt(propietarioSeleccionado),
      propiedad: parseInt(propiedadSeleccionada),
      ...formEgreso,
      monto_pagado: parseFloat(formEgreso.monto_pagado) || 0,
      importe_mes_anterior: parseFloat(formEgreso.importe_mes_anterior) || 0
    };
    onAddTransaccion(nuevaTransaccion);
    setFormEgreso({
      servicio: '',
      estado_pago: defaultValues.estado_pago,
      metodo_pago: defaultValues.metodo_pago,
      monto_pagado: '',
      importe_mes_anterior: '',
      anotaciones_egreso: ''
    });
    setServicioSearch('');
  };

  // Helper functions
  const getNombrePropietario = (id) => 
    rubros.propietarios.find(p => p.id === id)?.nombre || 'N/A';
  
  const getNombrePropiedad = (id) => 
    rubros.propiedades.find(p => p.id === id)?.nombre || 'N/A';

  const getNombreServicio = (id) =>
    rubros.servicios.find(s => s.id === id)?.nombre || 'N/A';

  // Marcar recordatorio como pagado
  const handlePagarRecordatorio = (id) => {
    setRecordatorios(recordatorios.map(r => 
      r.id === id ? {...r, pagado: true} : r
    ));
  };

  return (
    <div className="formulario-gastos">
      <div className="finance-header-container">
        <header className="finance-header">
          <h1><i className="bi bi-cash-stack"></i> Carga de Gastos</h1>
          <div className="header-info">
            <div className="info-item">
              <span className="info-label">Propietario:</span>
              <span className="info-value">
                {getNombrePropietario(parseInt(propietarioSeleccionado))}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Propiedad:</span>
              <span className="info-value">
                {getNombrePropiedad(parseInt(propiedadSeleccionada))}
              </span>
            </div>
          </div>
        </header>
      </div>

      <div className="finance-controls">
        <div className="selectors">
          <div className="selector-group">
            <label htmlFor="propietario"><i className="bi bi-person"></i> Propietario</label>
            <select 
              id="propietario"
              value={propietarioSeleccionado}
              onChange={handleChangePropietario}
            >
              {rubros.propietarios.map(p => (
                <option key={p.id} value={p.id}>{p.nombre}</option>
              ))}
            </select>
          </div>

          <div className="selector-group">
            <label htmlFor="propiedad"><i className="bi bi-house"></i> Propiedad</label>
            <select 
              id="propiedad"
              value={propiedadSeleccionada}
              onChange={handleChangePropiedad}
            >
              {rubros.propiedades.map(p => (
                <option key={p.id} value={p.id}>{p.nombre}</option>
              ))}
            </select>
          </div>
        </div>

        <button 
          className={`recordatorios-button ${mostrarRecordatorios ? 'active' : ''}`}
          onClick={() => setMostrarRecordatorios(!mostrarRecordatorios)}
        >
          <i className="bi bi-alarm"></i> 
          {mostrarRecordatorios ? 'Ocultar Recordatorios' : 'Mostrar Recordatorios'}
          {recordatorios.filter(r => !r.pagado).length > 0 && (
            <span className="badge">{recordatorios.filter(r => !r.pagado).length}</span>
          )}
        </button>
      </div>

      {mostrarRecordatorios && (
        <div className="recordatorios-panel">
          <h3><i className="bi bi-list-check"></i> Pagos Pendientes</h3>
          <div className="recordatorios-grid">
            {recordatorios.filter(r => !r.pagado).map(recordatorio => (
              <div key={recordatorio.id} className="recordatorio-card">
                <div className="recordatorio-info">
                  <h4>{recordatorio.servicio}</h4>
                  <p>
                    <i className="bi bi-calendar-x"></i> Vence: {recordatorio.vencimiento}
                  </p>
                  <p>
                    <i className="bi bi-cash-stack"></i> ${recordatorio.monto.toLocaleString('es-AR')}
                  </p>
                </div>
                <div className="recordatorio-actions">
                  <button 
                    className="pagar-button"
                    onClick={() => handlePagarRecordatorio(recordatorio.id)}
                  >
                    <i className="bi bi-check-circle"></i> Marcar como Pagado
                  </button>
                  <button 
                    className="cargar-button"
                    onClick={() => {
                      setActiveTab('egresos');
                      setFormEgreso({
                        ...formEgreso,
                        servicio: recordatorio.servicio,
                        monto_pagado: recordatorio.monto
                      });
                      setMostrarRecordatorios(false);
                    }}
                  >
                    <i className="bi bi-plus-circle"></i> Cargar Ahora
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="finance-tabs">
        <button 
          className={`tab-button ${activeTab === 'ingresos' ? 'active' : ''}`}
          onClick={() => setActiveTab('ingresos')}
        >
          <i className="bi bi-plus-circle"></i> Ingresos
        </button>
        <button 
          className={`tab-button ${activeTab === 'egresos' ? 'active' : ''}`}
          onClick={() => setActiveTab('egresos')}
        >
          <i className="bi bi-dash-circle"></i> Egresos
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'ingresos' && (
          <form className="finance-form" onSubmit={handleSubmitIngreso}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="estado_alquiler"><i className="bi bi-building"></i> Estado Alquiler</label>
                <select
                  id="estado_alquiler"
                  name="estado_alquiler"
                  value={formIngreso.estado_alquiler}
                  onChange={handleChangeIngreso}
                  required
                >
                  <option value="">Seleccionar...</option>
                  {rubros.estados_propiedad.map(estado => (
                    <option key={estado.id} value={estado.id}>{estado.nombre}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="estado_cobro"><i className="bi bi-cash-coin"></i> Estado Cobro</label>
                <select
                  id="estado_cobro"
                  name="estado_cobro"
                  value={formIngreso.estado_cobro}
                  onChange={handleChangeIngreso}
                  required
                >
                  <option value="">Seleccionar...</option>
                  {rubros.estados_cobro.map(estado => (
                    <option key={estado.id} value={estado.id}>{estado.nombre}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="metodo_cobro"><i className="bi bi-credit-card"></i> Método Cobro</label>
                <select
                  id="metodo_cobro"
                  name="metodo_cobro"
                  value={formIngreso.metodo_cobro}
                  onChange={handleChangeIngreso}
                  required
                >
                  <option value="">Seleccionar...</option>
                  {rubros.metodos_cobro.map(metodo => (
                    <option key={metodo.id} value={metodo.id}>{metodo.nombre}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="monto_cobrado"><i className="bi bi-currency-dollar"></i> Monto Cobrado</label>
                <div className="input-with-icon">
                  <span className="currency-symbol">ARS</span>
                  <input
                    type="number"
                    id="monto_cobrado"
                    name="monto_cobrado"
                    value={formIngreso.monto_cobrado}
                    onChange={handleChangeIngreso}
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="monto_cobrado_mes_anterior"><i className="bi bi-calendar-minus"></i> Mes Anterior</label>
                <div className="input-with-icon">
                  <span className="currency-symbol">ARS</span>
                  <input
                    type="number"
                    id="monto_cobrado_mes_anterior"
                    name="monto_cobrado_mes_anterior"
                    value={formIngreso.monto_cobrado_mes_anterior}
                    onChange={handleChangeIngreso}
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="anotaciones_ingreso"><i className="bi bi-journal-text"></i> Anotaciones</label>
                <textarea
                  id="anotaciones_ingreso"
                  name="anotaciones_ingreso"
                  value={formIngreso.anotaciones_ingreso}
                  onChange={handleChangeIngreso}
                  placeholder="Notas adicionales sobre el ingreso..."
                />
              </div>
            </div>

            <button type="submit" className="submit-button">
              <i className="bi bi-save"></i> Registrar Ingreso
            </button>
          </form>
        )}

        {activeTab === 'egresos' && (
          <form className="finance-form" onSubmit={handleSubmitEgreso}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="servicio"><i className="bi bi-tools"></i> Servicio (Buscar por nombre o código)</label>
                <div className="searchable-select">
                  <input
                    type="text"
                    placeholder="Buscar servicio..."
                    value={servicioSearch}
                    onChange={(e) => setServicioSearch(e.target.value)}
                    className="search-input"
                  />
                  <select
                    id="servicio"
                    name="servicio"
                    value={formEgreso.servicio}
                    onChange={handleChangeEgreso}
                    required
                  >
                    <option value="">Seleccionar...</option>
                    {rubros.servicios
                      .filter(serv => 
                        serv.nombre.toLowerCase().includes(servicioSearch.toLowerCase()) || 
                        serv.id.toString().includes(servicioSearch)
                      )
                      .map(servicio => (
                        <option key={servicio.id} value={servicio.id}>
                          #{servicio.id} - {servicio.nombre}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="estado_pago"><i className="bi bi-cash-stack"></i> Estado Pago</label>
                <select
                  id="estado_pago"
                  name="estado_pago"
                  value={formEgreso.estado_pago}
                  onChange={handleChangeEgreso}
                  required
                >
                  <option value="">Seleccionar...</option>
                  {rubros.estados_pago.map(estado => (
                    <option key={estado.id} value={estado.id}>{estado.nombre}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="metodo_pago"><i className="bi bi-credit-card-2-front"></i> Método Pago</label>
                <select
                  id="metodo_pago"
                  name="metodo_pago"
                  value={formEgreso.metodo_pago}
                  onChange={handleChangeEgreso}
                  required
                >
                  <option value="">Seleccionar...</option>
                  {rubros.metodos_pago.map(metodo => (
                    <option key={metodo.id} value={metodo.id}>{metodo.nombre}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="monto_pagado"><i className="bi bi-currency-dollar"></i> Monto Pagado</label>
                <div className="input-with-icon">
                  <span className="currency-symbol">ARS</span>
                  <input
                    type="number"
                    id="monto_pagado"
                    name="monto_pagado"
                    value={formEgreso.monto_pagado}
                    onChange={handleChangeEgreso}
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="importe_mes_anterior"><i className="bi bi-calendar-minus"></i> Mes Anterior</label>
                <div className="input-with-icon">
                  <span className="currency-symbol">ARS</span>
                  <input
                    type="number"
                    id="importe_mes_anterior"
                    name="importe_mes_anterior"
                    value={formEgreso.importe_mes_anterior}
                    onChange={handleChangeEgreso}
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="anotaciones_egreso"><i className="bi bi-journal-text"></i> Anotaciones</label>
                <textarea
                  id="anotaciones_egreso"
                  name="anotaciones_egreso"
                  value={formEgreso.anotaciones_egreso}
                  onChange={handleChangeEgreso}
                  placeholder="Notas adicionales sobre el egreso..."
                />
              </div>
            </div>

            <button type="submit" className="submit-button">
              <i className="bi bi-save"></i> Registrar Egreso
            </button>
          </form>
        )}
      </div>

      <div className="default-values-manager">
        <h4><i className="bi bi-gear"></i> Configuración Predeterminada</h4>
        <div className="default-values-grid">
          <div className="default-value">
            <label>Estado Alquiler:</label>
            <select
              value={defaultValues.estado_alquiler}
              onChange={(e) => setDefaultValues({...defaultValues, estado_alquiler: e.target.value})}
            >
              <option value="">No establecer</option>
              {rubros.estados_propiedad.map(estado => (
                <option key={estado.id} value={estado.id}>{estado.nombre}</option>
              ))}
            </select>
          </div>
          
          <div className="default-value">
            <label>Estado Cobro:</label>
            <select
              value={defaultValues.estado_cobro}
              onChange={(e) => setDefaultValues({...defaultValues, estado_cobro: e.target.value})}
            >
              <option value="">No establecer</option>
              {rubros.estados_cobro.map(estado => (
                <option key={estado.id} value={estado.id}>{estado.nombre}</option>
              ))}
            </select>
          </div>
          
          <div className="default-value">
            <label>Método Cobro:</label>
            <select
              value={defaultValues.metodo_cobro}
              onChange={(e) => setDefaultValues({...defaultValues, metodo_cobro: e.target.value})}
            >
              <option value="">No establecer</option>
              {rubros.metodos_cobro.map(metodo => (
                <option key={metodo.id} value={metodo.id}>{metodo.nombre}</option>
              ))}
            </select>
          </div>
          
          <div className="default-value">
            <label>Estado Pago:</label>
            <select
              value={defaultValues.estado_pago}
              onChange={(e) => setDefaultValues({...defaultValues, estado_pago: e.target.value})}
            >
              <option value="">No establecer</option>
              {rubros.estados_pago.map(estado => (
                <option key={estado.id} value={estado.id}>{estado.nombre}</option>
              ))}
            </select>
          </div>
          
          <div className="default-value">
            <label>Método Pago:</label>
            <select
              value={defaultValues.metodo_pago}
              onChange={(e) => setDefaultValues({...defaultValues, metodo_pago: e.target.value})}
            >
              <option value="">No establecer</option>
              {rubros.metodos_pago.map(metodo => (
                <option key={metodo.id} value={metodo.id}>{metodo.nombre}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

GestionFinanzasFormularioGastos.propTypes = {
  rubros: PropTypes.shape({
    propietarios: PropTypes.array.isRequired,
    propiedades: PropTypes.array.isRequired,
    estados_propiedad: PropTypes.array.isRequired,
    estados_cobro: PropTypes.array.isRequired,
    metodos_cobro: PropTypes.array.isRequired,
    servicios: PropTypes.array.isRequired,
    estados_pago: PropTypes.array.isRequired,
    metodos_pago: PropTypes.array.isRequired
  }).isRequired,
  onAddTransaccion: PropTypes.func.isRequired
};

export default GestionFinanzasFormularioGastos;