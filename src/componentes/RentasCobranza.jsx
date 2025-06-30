import React, { useState, useEffect, useRef } from 'react';
import '../assets/scss/_03-Componentes/_RentasCobranza.scss';
import Chart from 'chart.js/auto';

const RentasCobranza = () => {
  const [propiedades, setPropiedades] = useState([]);
  const [chartType, setChartType] = useState('Pagado con');
  const [totalCobrado, setTotalCobrado] = useState(0);
  const [cobradasCount, setCobradasCount] = useState(0);
  const [faltantesCount, setFaltantesCount] = useState(0);
  const barChartRef = useRef(null);
  const lineChartRef = useRef(null);
  const barCanvasRef = useRef(null);
  const lineCanvasRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/infocuentas.json');
        const data = await response.json();
        const propiedades = data.filter(item => item.Categoria === 'Propiedades');
        setPropiedades(propiedades);
        updateStatistics(propiedades);
      } catch (error) {
        console.error('Error al cargar el archivo JSON:', error);
      }
    };

    fetchData();
  }, []);

  const updateStatistics = (data) => {
    const total = data.reduce((acc, item) => acc + parseFloat(item.ImporteCobrado || 0), 0);
    const cobradas = data.filter(item => item['Marcar como Cobrado'] === 'Sí').length;
    const faltantes = data.filter(item => item['Marcar como Cobrado'] !== 'Sí').length;

    setTotalCobrado(total);
    setCobradasCount(cobradas);
    setFaltantesCount(faltantes);
  };

  const calculateTotals = (field) => {
    return propiedades.reduce((acc, item) => {
      const key = item[field] || 'Desconocido';
      const importe = parseFloat(item.ImporteCobrado) || 0;
      if (!acc[key]) acc[key] = 0;
      acc[key] += importe;
      return acc;
    }, {});
  };

  useEffect(() => {
    if (barChartRef.current) {
      barChartRef.current.destroy();
    }

    const totals = calculateTotals(chartType);

    barChartRef.current = new Chart(barCanvasRef.current, {
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
              color: '#fff',
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

    return () => {
      if (barChartRef.current) {
        barChartRef.current.destroy();
      }
    };
  }, [propiedades, chartType]);

  useEffect(() => {
    if (lineChartRef.current) {
      lineChartRef.current.destroy();
    }

    const dates = propiedades.map(item => item.FechaCobro);
    const importes = propiedades.map(item => parseFloat(item.ImporteCobrado) || 0);

    lineChartRef.current = new Chart(lineCanvasRef.current, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Importe Cobrado',
            data: importes,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
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
                return `Importe: $${tooltipItem.raw}`;
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
      if (lineChartRef.current) {
        lineChartRef.current.destroy();
      }
    };
  }, [propiedades]);

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
    <div className="cobranza">
      <h2>Rentas Cobranza</h2>
      <div className="stats">
        <p><strong>Total Cobrado:</strong> ${totalCobrado.toFixed(2)}</p>
        <p><strong>Propiedades Cobradas:</strong> {cobradasCount}</p>
        <p><strong>Propiedades Faltantes:</strong> {faltantesCount}</p>
      </div>
      <div className="chart-buttons">
        {['Pagado con', 'Alquilado'].map(type => (
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
        <div className="chart-container">
          <canvas ref={barCanvasRef} />
          <p>Distribución por {chartType}</p>
        </div>
        <div className="chart-container">
          <canvas ref={lineCanvasRef} />
          <p>Evolución del Importe Cobrado</p>
        </div>
      </div>

      {renderTotalsList(chartType)}
    </div>
  );
};

export default RentasCobranza;
