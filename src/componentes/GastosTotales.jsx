import React, { useState, useEffect, useRef } from 'react';
import '../assets/scss/_03-Componentes/_GastosTotales.scss';
import Chart from 'chart.js/auto';

const GastosTotales = () => {
  const [data, setData] = useState([]);
  const [chartType, setChartType] = useState('Categoria');
  const [filters, setFilters] = useState([
    'Categoria', 'Tipo', 'Servicio', 'Impuesto', 'Empresa', 'Nombre', 'Titular'
  ]);
  const chartRef = useRef(null); // Ref para almacenar la instancia del gráfico
  const canvasRef = useRef(null); // Ref para el canvas en el DOM

  // Fetch de los datos iniciales desde localStorage
  useEffect(() => {
    const cuentasLocalStorage = localStorage.getItem('cuentas');
    if (cuentasLocalStorage) {
      const cuentas = JSON.parse(cuentasLocalStorage);
      setData(cuentas);
    } else {
      console.error('No se encontraron datos en localStorage');
    }
  }, []);

  // Calcular los totales por categoría, nombre, tipo, etc.
  const calculateTotals = (field) => {
    return data.reduce((acc, item) => {
      const key = item[field] || 'Desconocido';
      const importe = parseFloat(item['ImportePagado']) || 0;
      if (!acc[key]) acc[key] = 0;
      acc[key] += importe;
      return acc;
    }, {});
  };

  // Crear o actualizar el gráfico cuando los datos cambien
  useEffect(() => {
    // Destruir gráfico anterior si existe
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const totals = calculateTotals(chartType);

    // Crear nuevo gráfico
    chartRef.current = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels: Object.keys(totals),
        datasets: [
          {
            label: 'Totales',
            data: Object.values(totals),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
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
              color: '#fff', // Color de las etiquetas de la leyenda
            },
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `Total: $${tooltipItem.raw}`;
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

    // Limpiar el gráfico al desmontar el componente
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data, chartType]);

  // Generar listas de totales
  const renderTotalsList = (field) => {
    const totals = calculateTotals(field);
    return (
      <div className="totals-list">
        <h3>Totales por {field}</h3>
        <ul>
          {Object.entries(totals).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> ${value.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="gastos-totales">
      <h2>Gastos Totales</h2>
      <div className="chart-buttons">
        {filters.map(type => (
          <button
            key={type}
            className={`chart-button ${chartType === type ? 'active' : ''}`}
            onClick={() => setChartType(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="charts">
        <canvas ref={canvasRef} />
      </div>

      {renderTotalsList(chartType)}
    </div>
  );
};

export default GastosTotales;
