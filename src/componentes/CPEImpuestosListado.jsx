import React, { useState, useEffect } from 'react';
import "../assets/scss/_03-Componentes/_CPEImpuestosListado.scss";

const impuestoIcons = {
  'IVA': 'bi bi-percentage',
  'Ganancias': 'bi bi-file-earmark-bar-graph',
  'Bienes Personales': 'bi bi-file-earmark-spreadsheet',
  'Monotributo': 'bi bi-cash-stack',
  'Ingresos Brutos': 'bi bi-currency-exchange',
  'Sellos': 'bi bi-pen',
  'Otros Impuestos': 'bi bi-bank2',
  'Aportes': 'bi bi-clipboard-check',
  'Propiedades': 'bi bi-house-door',
  'Servicios Públicos': 'bi bi-receipt',
  'Seguridad Social': 'bi bi-shield-lock',
  'Automotores': 'bi bi-car-front',
};

const meses = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const mesCorriente = new Date().getMonth(); 

const CPEImpuestosListado = () => {
  const [data, setData] = useState([]);
  const [selectedImpuesto, setSelectedImpuesto] = useState(null);

  useEffect(() => {
    fetch("/infocuentas.json")
      .then(response => response.json())
      .then(data => {
        const updatedData = data.map(item => ({
          ...item,
          pagada: false,
          digitalRecibida: "No llega", 
          informacionExtra: "Impuesto Activo", 
          mesConsumo: meses[mesCorriente]
        }));
        setData(updatedData);
      })
      .catch(error => console.error("Error al cargar los datos:", error));
  }, []);

  const groupedData = data.reduce((acc, item) => {
    const impuesto = item.Impuesto || "Sin Impuesto";
    if (!acc[impuesto]) {
      acc[impuesto] = [];
    }
    acc[impuesto].push(item);
    return acc;
  }, {});

  const handleImpuestoClick = (impuesto) => {
    setSelectedImpuesto(impuesto);
  };

  const handleBackClick = () => {
    setSelectedImpuesto(null);
  };

  const toggleFacturaPagada = (itemId) => {
    setData(prevData =>
      prevData.map(item =>
        item.id === itemId ? { ...item, pagada: !item.pagada } : item
      )
    );
  };

  const handleDigitalRecibidaChange = (itemId, status) => {
    setData(prevData =>
      prevData.map(item =>
        item.id === itemId ? { ...item, digitalRecibida: status } : item
      )
    );
  };

  const handleInformacionExtraChange = (itemId, status) => {
    setData(prevData =>
      prevData.map(item =>
        item.id === itemId ? { ...item, informacionExtra: status } : item
      )
    );
  };

  const handleMesChange = (itemId, mes) => {
    setData(prevData =>
      prevData.map(item =>
        item.id === itemId ? { ...item, mesConsumo: mes } : item
      )
    );
  };

  return (
    <div className="cpe-impuestos-listado">
      {!selectedImpuesto ? (
        Object.keys(groupedData).map(impuesto => (
          <div key={impuesto} className="cpe-impuesto-card" onClick={() => handleImpuestoClick(impuesto)}>
            <div className="cpe-impuesto-icon">
              <i className={impuestoIcons[impuesto] || 'bi bi-question-circle'}></i>
            </div>
            <div className="cpe-impuesto-info">
              <span>{impuesto}</span>
              <span className="cpe-impuesto-count">{groupedData[impuesto].length}</span>
            </div>
          </div>
        ))
      ) : (
        <div>
          <h2 className='titulosDetallesImpuesto'>Detalles del Impuesto: {selectedImpuesto}  <span className='separador'><button className="cpe-back-button" onClick={handleBackClick}>Volver</button></span>  </h2>
         
          <table className="cpe-detalle-impuesto-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Organismo</th>
                <th>Sección</th>
                <th>Numero de Cuenta</th>
                <th>CPE</th>
                <th>Titular</th>
                <th>Vencimiento</th>
                <th>Consumo Mes</th>
                <th>Factura Pagada</th>
                <th>Importe Pagado</th>
                <th>Factura Imagen</th>
                <th>Factura Digital Recibida</th>
                <th>Factura Digital al mail</th>
                <th>Información Extra</th>
              </tr>
            </thead>
            <tbody>
              {groupedData[selectedImpuesto].map((item) => (
                <tr key={item.id}>
                  <td>{item.Nombre}</td>
                  <td>{item.Tipo}</td>
                  <td>{item.Organismo}</td>
                  <td>{item.Sección}</td>
                  <td>{item["Numero de Cuenta"]}</td>
                  <td>{item["CPE (Codigo Pago Electronico)"]}</td>
                  <td>{item.Titular}</td>
                  <td>{item.Vencimiento}</td>
                  
                  <td>
                    <div className="dropdown">
                      <button className="dropbtn">{item.mesConsumo}</button>
                      <div className="dropdown-content">
                        {meses.map((mes) => (
                          <a key={mes} onClick={() => handleMesChange(item.id, mes)}>{mes}</a>
                        ))}
                      </div>
                    </div>
                  </td>

                  <td className={`factura-pagada ${item.pagada ? 'pagada' : 'no-pagada'}`} onClick={() => toggleFacturaPagada(item.id)}>
                    {item.pagada ? '✔️' : '❌'}
                  </td>
                  <td>{item["Importe Pagado"]}</td>
                  <td>{item["Factura Imagen"]}</td>
                  <td className={`digital-recibida ${item.digitalRecibida}`} onClick={() => handleDigitalRecibidaChange(item.id, item.digitalRecibida === "Llega al mail" ? "Llega al domicilio" : item.digitalRecibida === "Llega al domicilio" ? "No llega" : "Llega al mail")}>
                    {item.digitalRecibida}
                  </td>
                  <td>{item["Factura Digital al mail"]}</td>
                  <td className={`informacion-extra ${item.informacionExtra}`} onClick={() => handleInformacionExtraChange(item.id, item.informacionExtra === "Impuesto Activo" ? "Impuesto Inactivo" : item.informacionExtra === "Impuesto Inactivo" ? "Impuesto Deshabilitado" : "Impuesto Activo")}>
                    {item.informacionExtra}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CPEImpuestosListado;
