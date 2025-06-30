import React, { useState, useEffect, useRef } from 'react';
import '../assets/scss/_03-Componentes/_BancoSaldos.scss'; // Importa el archivo SCSS
import Chart from 'chart.js/auto';

const BancoSaldos = () => {
  const [saldosData, setSaldosData] = useState([]);
  const [saldos, setSaldos] = useState(0);
  const [mensaje, setMensaje] = useState('Sin datos conectados al banco por ahora.');
  const [chartType, setChartType] = useState('Banco');
  const [selectedBank, setSelectedBank] = useState('Todos');
  const [selectedAccountType, setSelectedAccountType] = useState('Todos');
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  // Función para manejar la importación de un PDF
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setMensaje('Importando datos desde el resumen de cuenta...');
      // Simulación de importación: tras un tiempo ficticio, mostrar mensaje
      setTimeout(() => {
        setSaldos(12500.50); // Ejemplo de saldo actualizado tras la importación
        setMensaje('Datos importados correctamente.');
      }, 2000);
    }
  };

  // Simulación de datos bancarios (vacío inicialmente)
  useEffect(() => {
    setSaldosData([]);
  }, []);

  // Filtrar los datos según el banco y tipo de cuenta seleccionados
  const filteredData = saldosData.filter(item => {
    return (selectedBank === 'Todos' || item.Banco === selectedBank) &&
           (selectedAccountType === 'Todos' || item.Cuenta === selectedAccountType);
  });

  // Calcular los saldos totales
  const calculateSaldos = (field) => {
    return filteredData.reduce((acc, item) => {
      const key = item[field] || 'Desconocido';
      const saldo = parseFloat(item.Saldo) || 0;
      if (!acc[key]) acc[key] = 0;
      acc[key] += saldo;
      return acc;
    }, {});
  };

  // Crear o actualizar el gráfico
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const saldos = calculateSaldos(chartType);

    chartRef.current = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels: Object.keys(saldos),
        datasets: [
          {
            label: 'Saldos',
            data: Object.values(saldos),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#fff',
            },
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `Saldo: $${tooltipItem.raw}`;
              },
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: '#fff',
            },
            grid: {
              color: '#444',
            },
          },
          y: {
            ticks: {
              color: '#fff',
            },
            grid: {
              color: '#444',
            },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [filteredData, chartType]);

  return (
    <div className="banco-saldos">
      <h2>Saldos y Disponibles</h2>
      <p className="mensaje">{mensaje}</p>
      <div className="saldo">
        <span>Saldo disponible: </span>
        <strong>${saldos.toFixed(2)}</strong>
      </div>
      <div className="importar-pdf">
        <label htmlFor="upload">Importar resumen bancario (PDF): </label>
        <input type="file" id="upload" accept="application/pdf" onChange={handleFileUpload} />
      </div>

      {/* Filtros por banco y tipo de cuenta */}
      <div className="filters">
        <select value={selectedBank} onChange={(e) => setSelectedBank(e.target.value)}>
          <option value="Todos">Todos los Bancos</option>
          <option value="Banco A">Banco A</option>
          <option value="Banco B">Banco B</option>
          <option value="Banco C">Banco C</option>
        </select>

        <select value={selectedAccountType} onChange={(e) => setSelectedAccountType(e.target.value)}>
          <option value="Todos">Todos los Tipos de Cuenta</option>
          <option value="Ahorros">Ahorros</option>
          <option value="Corriente">Corriente</option>
        </select>
      </div>

      {/* Gráfico de saldos */}
      <div className="charts">
        <canvas ref={canvasRef} />
      </div>

      {/* Lista de saldos */}
      <div className="saldos-list">
        <h3>Saldos Filtrados</h3>
        <ul>
          {filteredData.map(({ Banco, Cuenta, Numero, Saldo }) => (
            <li key={Numero}>
              <strong>{Banco} - {Cuenta} ({Numero})</strong>: ${Saldo.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BancoSaldos;
