import React, { useState, useEffect } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js';
import '../assets/scss/_03-Componentes/_GastosPagados.scss';

// Registrar los elementos de Chart.js necesarios
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const GastosPagados = () => {
  const [cuentasPagadas, setCuentasPagadas] = useState([]);
  const [totalPagado, setTotalPagado] = useState(0);
  const [cuentasTotales, setCuentasTotales] = useState(0);

  const obtenerMesActual = () => {
    const fecha = new Date();
    const opciones = { month: 'long' };
    return fecha.toLocaleDateString('es-ES', opciones).toUpperCase();
  };

  const obtenerFechaActual = () => {
    const fecha = new Date();
    return fecha.toLocaleDateString('es-ES');
  };

  useEffect(() => {
    const cuentasLocalStorage = localStorage.getItem('cuentas');
    if (cuentasLocalStorage) {
      const cuentas = JSON.parse(cuentasLocalStorage);
      const pagadas = cuentas.filter((cuenta) => cuenta.FacturaPagada === 'Si');
      const total = pagadas.reduce((acc, cuenta) => acc + parseFloat(cuenta.ImportePagado || 0), 0);
      setCuentasPagadas(pagadas);
      setTotalPagado(total);
      setCuentasTotales(cuentas.length);
    }
  }, []);

  const marcarComoNoPagada = (id) => {
    const cuentasLocalStorage = localStorage.getItem('cuentas');
    if (cuentasLocalStorage) {
      const cuentas = JSON.parse(cuentasLocalStorage);
      const actualizadas = cuentas.map((cuenta) => {
        if (cuenta.id === id) {
          return {
            ...cuenta,
            FacturaPagada: 'No',
            ImportePagado: '',
            FechaPagado: '',
            bloqueado: false,
          };
        }
        return cuenta;
      });
      localStorage.setItem('cuentas', JSON.stringify(actualizadas));
      const noPagadas = actualizadas.filter((cuenta) => cuenta.FacturaPagada === 'Si');
      setCuentasPagadas(noPagadas);
      setTotalPagado(noPagadas.reduce((acc, cuenta) => acc + parseFloat(cuenta.ImportePagado || 0), 0));
    }
  };

  const porcentajePagadas = (cuentasPagadas.length / cuentasTotales) * 100;

  const dataDoughnut = {
    labels: ['Cuentas Pagadas', 'Cuentas No Pagadas'],
    datasets: [
      {
        label: '# de Cuentas',
        data: [cuentasPagadas.length, cuentasTotales - cuentasPagadas.length],
        backgroundColor: ['#00fbff', '#00f7ff7c'],
        borderColor: ['#00fbff', '#00f7ff7c'],
        borderWidth: 2,
      },
    ],
  };

  const optionsDoughnut = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          }
        }
      },
      hover: {
        mode: 'nearest',
        intersect: true,
      }
    },
    elements: {
      arc: {
        borderWidth: 2,
      },
    },
  };

  const dataBar = {
    labels: ['Total Pagado'],
    datasets: [
      {
        label: 'Dinero Gastado',
        data: [totalPagado],
        backgroundColor: '#00fbff',
        borderColor: '#00f7ff',
        borderWidth: 2,
        borderRadius: 10,
      },
    ],
  };

  const optionsBar = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `Total: ${tooltipItem.raw}`;
          }
        }
      }
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return `${value} ${value > 1000 ? 'k' : ''}`;
          }
        }
      }
    },
  };

  return (
    <div className="pagados">

      <div className="totales-pagados-grid">
        <div className="totales-pagados-info">
        
          <div className="grafico-barra">
            <Bar data={dataBar} options={optionsBar} />
          </div>
        </div>

        <div className="totales-pagados-info">
          <div className="progreso-cuentas">

          <h2>
        Gastos Pagados en <span className="mes-corriente">{obtenerMesActual()}</span>
      </h2>
      <hr />
            <span>{cuentasPagadas.length} de {cuentasTotales} cuentas pagadas</span>
            <div className="barra-progreso">
              <div className="relleno-progreso" style={{ width: `${porcentajePagadas}%` }}></div>
            </div>
            <hr />
            <h3>
            TOTALES PAGADOS AL DÍA ({obtenerFechaActual()}): <span>${totalPagado.toFixed(2)}</span>
          </h3>
        
   
          </div>
        </div>

        <div className="grafico-circular">
          <h3>Distribución de Cuentas Pagadas</h3>
          <Doughnut data={dataDoughnut} options={optionsDoughnut} />
        </div>
      </div>

      <div className="lista-cuentas">
        <div className="cuenta-header">
          <span>ID</span>
          <span>Nombre</span>
          <span>Servicio o Impuesto</span>
          <span>Número de Cuenta</span>
          <span>Número de Factura</span>
          <span>Importe Pagado</span>
          <span>Fecha Pagado</span>
          <span>Marcar como No Pagada</span>
        </div>

        {cuentasPagadas.map((cuenta) => (
          <div key={cuenta.id} className="cuenta-item bloqueado">
            <span className="id-col">{cuenta.id}</span>
            <span>{cuenta.Nombre}</span>
            <span>{cuenta.Servicio || cuenta.Impuesto}</span>
            <span>{cuenta['Numero de Cuenta']}</span>
            <span>{cuenta.NumeroFactura}</span>
            <span>${cuenta.ImportePagado}</span>
            <span>{cuenta.FechaPagado}</span>
            <button onClick={() => marcarComoNoPagada(cuenta.id)}>
              No Pagada
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GastosPagados;
