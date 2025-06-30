import React, { useState, useEffect } from 'react';
import "../assets/scss/_03-Componentes/_CPEServiciosListado.scss";

const serviceIcons = {
  'Tarjetas de Credito': 'credit-card',
  'Gas': 'fire',
  'Agua': 'tint',
  'Electricidad': 'lightbulb',
  'Medicina Prepaga': 'stethoscope',
  'Telefonía': 'phone',
  'Consorcios': 'building',
  'Otros Servicios': 'cogs',
};

const meses = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

  // Obtener el mes corriente
  const mesCorriente = new Date().getMonth(); 

const CPEServiciosListado = () => {
  const [data, setData] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    fetch("/infocuentas.json")
      .then(response => response.json())
      .then(data => {
      
        const updatedData = data.map(item => ({
          ...item,
          pagada: false,
          digitalRecibida: "No llega", // Valor por defecto
          informacionExtra: "Servicio Habilitado", // Valor por defecto

                   mesConsumo: meses[mesCorriente]  // Asigna el mes corriente por defecto

        }));
        setData(updatedData);
      })
      .catch(error => console.error("Error al cargar los datos:", error));
  }, []);

  const groupedData = data.reduce((acc, item) => {
    const service = item.Servicio || "Sin Servicio";
    if (!acc[service]) {
      acc[service] = [];
    }
    acc[service].push(item);
    return acc;
  }, {});

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  const handleBackClick = () => {
    setSelectedService(null);
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
    <div className="cpe-empresas-listado">
      {!selectedService ? (
        Object.keys(groupedData).map(service => (
          <div key={service} className="cpe-empresa-card" onClick={() => handleServiceClick(service)}>
            <div className="cpe-empresa-icon">
              <i className={`bi bi-${serviceIcons[service] || 'question-circle'}`}></i>
            </div>
            <div className="cpe-empresa-info">
              <span>{service}</span>
              <span className="cpe-empresa-count">{groupedData[service].length}</span>
            </div>
          </div>
        ))
      ) : (
        <div>
          <h2 className='titulosDetallesServicio'>Detalles del Servicio: {selectedService}  <span className='separador'><button className="cpe-back-button" onClick={handleBackClick}>Volver</button></span>  </h2>
         
          <table className="cpe-detalle-servicio-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Empresa</th>
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
                <th>Factura Digital al mail</th>
                <th>Información Extra</th>
              </tr>
            </thead>
            <tbody>
              {groupedData[selectedService].map((item) => (
                <tr key={item.id}>
                  <td>{item.Nombre}</td>
                  <td>{item.Tipo}</td>
                  <td>{item.Empresa}</td>
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
                  <td className={`informacion-extra ${item.informacionExtra}`} onClick={() => handleInformacionExtraChange(item.id, item.informacionExtra === "Servicio Habilitado" ? "Servicio Cortado" : item.informacionExtra === "Servicio Cortado" ? "Servicio Deshabilitado" : "Servicio Habilitado")}>
                    {item.informacionExtra}
                  </td>
                  <td>{item["Factura Digital Recibida"]}</td>
                  <td>{item["Factura Digital al mail"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CPEServiciosListado;
