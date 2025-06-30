import React, { useState, useEffect } from "react";
import "../assets/scss/_03-Componentes/_CPECargarNuevoCPE.scss";

const CPECargarNuevoCPE = () => {
  const [codigo, setCodigo] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [error, setError] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [impuestos, setImpuestos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serviciosResponse = await fetch("/servicios.json");
        const serviciosData = await serviciosResponse.json();
        setServicios(serviciosData);

        const impuestosResponse = await fetch("/impuestos.json");
        const impuestosData = await impuestosResponse.json();
        setImpuestos(impuestosData);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, []);

  const handleCodigoChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setCodigo(value);
      setError("");
    }
  };

  const handleEmpresaChange = (e) => {
    setEmpresa(e.target.value);
    setShowOptions(true);
  };

  const handleOptionClick = (option) => {
    setEmpresa(option.nombre);
    setShowOptions(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (codigo.length !== 17) {
      setError("El código de pago electrónico debe tener 17 dígitos.");
      return;
    }

    console.log("Validando código:", codigo);
  };

  useEffect(() => {
    const filterOptions = (value) => {
      const searchValue = value.toLowerCase();
      const matchedServicios = servicios.filter(servicio =>
        servicio.nombre.toLowerCase().includes(searchValue)
      );
      const matchedImpuestos = impuestos.filter(impuesto =>
        impuesto.nombre.toLowerCase().includes(searchValue)
      );
      setOptions([...matchedServicios, ...matchedImpuestos]);
    };

    filterOptions(empresa);
  }, [empresa, servicios, impuestos]);

  return (
    <div className="cargar-cpe-container">
      <h2>Cargar Nuevo CPE</h2>
      <h6>(Código de pago Electrónico)</h6>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="empresa">Buscar Empresa o Impuesto a Adherir</label>
          <input
            type="text"
            id="empresa"
            value={empresa}
            onChange={handleEmpresaChange}
            placeholder="Buscar empresa"
            onFocus={() => setShowOptions(true)}
            onBlur={() => setTimeout(() => setShowOptions(false), 200)}
          />
          {showOptions && options.length > 0 && (
            <div className="options-list">
              {options.map(option => (
                <div
                  key={option.id}
                  className="option-item"
                  onClick={() => handleOptionClick(option)}
                >
                  {option.nombre} - {option.categoria}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="codigo">Número de cuenta</label>
          <div className="input-group">
            <input
              type="text"
              id="codigo"
              value={codigo}
              onChange={handleCodigoChange}
              placeholder="Escribí el código aquí"
              className={error ? "input-error" : ""}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <button
              type="button"
              onClick={handleSubmit}
              className="btn-validate"
            >
              Validar
            </button>
          </div>
          {error && <span className="error-message">{error}</span>}
          {!codigo && !isFocused && (
            <span className="required-message">El campo es requerido</span>
          )}
        </div>
        <div className="alias-group">
          <label htmlFor="alias">Alias (Opcional)</label>
          <input type="text" id="alias" placeholder="Agregá un nombre para recordarlo" />
        </div>
        <div className="action-buttons">
          <button type="submit" className="btn-submit">Guardar</button>
          <button type="reset" className="btn-reset">Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default CPECargarNuevoCPE;
