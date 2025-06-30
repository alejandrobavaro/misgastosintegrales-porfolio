import React, { useState, useEffect } from "react";
import "../assets/scss/_03-Componentes/_DataInfoCuentas.scss";

const DataInfoCuentas = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("TODOS");
  const [filterField, setFilterField] = useState("Categoria"); // Estado para el campo de filtro seleccionado

  useEffect(() => {
    fetch("/infocuentas.json")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log("Datos cargados:", data);
      })
      .catch((error) => console.error("Error al cargar los datos:", error));
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchTerm("");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterFieldChange = (e) => {
    setFilterField(e.target.value);
    // Al cambiar el campo de filtro, selecciona automáticamente "TODOS"
    setSelectedCategory("TODOS");
  };

  const filteredData = data.filter((item) => {
    const matchesCategory =
      selectedCategory === "TODOS" || item[filterField] === selectedCategory;
    const matchesSearchTerm =
      searchTerm === "" ||
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );

    return matchesCategory && matchesSearchTerm;
  });

  const categories = [...new Set(data.map((item) => item[filterField]))];

  // Función para obtener el mes corriente en formato numérico (MM)
  const getCurrentMonthNumeric = () => {
    const date = new Date();
    return (date.getMonth() + 1).toString().padStart(2, "0");
  };

  // Función para obtener el año corriente (YYYY)
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  // Función para obtener el mes corriente en palabras
  const getCurrentMonthInWords = () => {
    const date = new Date();
    const options = { month: "long" };
    return date.toLocaleDateString("es-ES", options).toUpperCase();
  };

  return (
    <div className="data">
      <div className="search-filter-container">
        <div className="filters">
          <div className="category-buttons">
            <button
              className={selectedCategory === "TODOS" ? "selected" : ""}
              onClick={() => handleCategoryChange("TODOS")}
            >
              TODOS
            </button>

            <div className="filter-field-select">
              <label htmlFor="filterField">
                {""}
                <h6>Filtrar por:</h6>
              </label>
              <select
                id="filterField"
                value={filterField}
                onChange={handleFilterFieldChange}
              >
                <option value="Categoria">Categoría</option>
                <option value="Tipo">Tipo</option>
                <option value="Servicio">Servicio</option>
                <option value="Impuesto">Impuesto</option>
                <option value="Empresa">Empresa</option>
                <option value="Nombre">Nombre</option>
                <option value="Sección">Sección</option>
                <option value="Titular">Titular</option>
                <option value="Consumo Mes">Consumo Mes</option>
                <option value="Factura Pagada">Factura Pagada</option>
                <option value="Pagado con">Pagado con</option>
              </select>
            </div>

            {categories.map(
              (category) =>
                category !== "TODOS" && (
                  <button
                    key={category}
                    className={selectedCategory === category ? "selected" : ""}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </button>
                )
            )}

            <div className="search-bar">
              <input
                type="text"
                placeholder="Buscar en los datos..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
      </div>

      {filteredData.length === 0 ? (
        <h4>No se encontraron datos en la búsqueda. Verifique su selección.</h4>
      ) : (
        <div className="data-container">
          {filteredData.map((item) => (
            <div key={item.id} className="data-item">
              <h3>{item.Nombre}</h3>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <strong>Categoria:</strong>
                    </td>
                    <td>{item.Categoria}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Tipo:</strong>
                    </td>
                    <td>{item.Tipo}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Servicio:</strong>
                    </td>
                    <td>{item.Servicio}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Empresa:</strong>
                    </td>
                    <td>{item.Empresa}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Impuesto:</strong>
                    </td>
                    <td>{item.Impuesto}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Agente Recaudador:</strong>
                    </td>
                    <td>{item["Agente Recaudador"]}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Sección:</strong>
                    </td>
                    <td>{item.Sección}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Número de Cuenta:</strong>
                    </td>
                    <td>{item["Numero de Cuenta"]}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>CPE:</strong>
                    </td>
                    <td>{item["CPE (Codigo Pago Electronico)"]}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Titular:</strong>
                    </td>
                    <td>{item.Titular}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Vencimiento:</strong>
                    </td>
                    <td>{`${item.Vencimiento}/${getCurrentMonthNumeric()}/${getCurrentYear()}`}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Consumo Mes:</strong>
                    </td>
                    <td>{getCurrentMonthInWords()}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Factura Pagada:</strong>
                    </td>
                    <td>{item["Factura Pagada"]}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Pagado con:</strong>
                    </td>
                    <td>{item["Pagado con"]}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Importe Pagado:</strong>
                    </td>
                    <td>{item["Importe Pagado"]}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Factura Digital Recibida:</strong>
                    </td>
                    <td>{item["Factura Digital Recibida"]}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Factura Digital al mail:</strong>
                    </td>
                    <td>{item["Factura Digital al mail"]}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Información Extra:</strong>
                    </td>
                    <td>{item["Información Extra"]}</td>
                  </tr>
                </tbody>
              </table>
              <a
                href={`/facturas${item["Factura Imagen"]}`}
                target="_blank"
                rel="noopener noreferrer"
                download={item["Factura Imagen"]}
              >
                Ver Factura
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DataInfoCuentas;
