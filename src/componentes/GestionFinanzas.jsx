import { useState, useEffect } from 'react';
import GestionFinanzasFormularioGastos from './GestionFinanzasFormularioGastos';
import GestionFinanzasResumenGastos from './GestionFinanzasResumenGastos';
import TutorialGestionFinanzas from './GestionFinanzasTutorial';
import '../assets/scss/_03-Componentes/_GestionFinanzas.scss';

const GestionFinanzas = () => {
  const [data, setData] = useState({
    rubros: {
      propietarios: [],
      propiedades: [],
      estados_propiedad: [],
      estados_cobro: [],
      metodos_cobro: [],
      servicios: [],
      estados_pago: [],
      metodos_pago: [],
      tipos_totales: []
    },
    transacciones: [],
    config: { moneda: 'ARS', decimales: 2 }
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/rubros.json');
        const jsonData = await response.json();
        setData({
          rubros: jsonData.rubros || {},
          config: jsonData.config || { moneda: 'ARS', decimales: 2 },
          transacciones: jsonData.transacciones || []
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddTransaccion = (nuevaTransaccion) => {
    setData(prev => ({
      ...prev,
      transacciones: [nuevaTransaccion, ...prev.transacciones]
    }));
  };

  if (loading) return <div className="loading-spinner"></div>;
  if (error) return <div className="error-message">⚠️ Error: {error}</div>;

  return (
    <div className="gestion-finanzas-container">
      <TutorialGestionFinanzas />
      <main className="finance-main">
        <div className="finance-layout">
          <GestionFinanzasFormularioGastos 
            rubros={data.rubros} 
            onAddTransaccion={handleAddTransaccion} 
          />
          <GestionFinanzasResumenGastos 
            rubros={data.rubros} 
            transacciones={data.transacciones} 
            config={data.config} 
          />
        </div>
      </main>
    </div>
  );
};

export default GestionFinanzas;
