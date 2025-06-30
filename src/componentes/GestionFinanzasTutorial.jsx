import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../assets/scss/_03-Componentes/_GestionFinanzasTutorial.scss';

const TutorialGestionFinanzas = () => {
  const [show, setShow] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const steps = [
    {
      title: "Bienvenido a Gestión Financiera",
      content: (
        <div>
          <p>Este módulo te permite registrar y administrar todos tus ingresos y egresos organizados por propiedades y propietarios.</p>
          <p>El sistema está dividido en 3 secciones principales:</p>
          <ol>
            <li><strong>Registro de Ingresos</strong>: Para registrar cobros de alquileres</li>
            <li><strong>Registro de Egresos</strong>: Para registrar pagos de servicios</li>
            <li><strong>Historial</strong>: Visualiza todas tus transacciones</li>
          </ol>
        </div>
      ),
      image: "/images/tutorial/1-intro.png"
    },
    {
      title: "Selección de Propiedad y Propietario",
      content: (
        <div>
          <p>Antes de registrar cualquier transacción, selecciona:</p>
          <ul>
            <li><strong>Propietario</strong>: Quién recibe o realiza el pago</li>
            <li><strong>Propiedad</strong>: A qué propiedad pertenece</li>
          </ul>
          <p>Los resúmenes financieros se actualizarán automáticamente.</p>
        </div>
      ),
      image: "/images/tutorial/2-seleccion.png"
    },
    {
      title: "Registrar Ingresos",
      content: (
        <div>
          <p>Para registrar un ingreso (alquiler):</p>
          <ol>
            <li>Selecciona el estado del alquiler</li>
            <li>Indica si ya fue cobrado</li>
            <li>Selecciona el método de cobro</li>
            <li>Ingresa el monto cobrado</li>
            <li>Opcional: compara con el mes anterior</li>
            <li>Agrega notas si es necesario</li>
          </ol>
        </div>
      ),
      image: "/images/tutorial/3-ingresos.png"
    },
    {
      title: "Registrar Egresos",
      content: (
        <div>
          <p>Para registrar un egreso (gasto):</p>
          <ol>
            <li>Busca el servicio por nombre o código</li>
            <li>Indica si ya fue pagado</li>
            <li>Selecciona el método de pago</li>
            <li>Ingresa el monto pagado</li>
            <li>Opcional: compara con el mes anterior</li>
            <li>Agrega notas si es necesario</li>
          </ol>
          <p className="tip">
            <i className="bi bi-lightbulb"></i> <strong>Tip:</strong> Usa el campo de búsqueda para encontrar rápidamente servicios entre los 44 rubros disponibles.
          </p>
        </div>
      ),
      image: "/images/tutorial/4-egresos.png"
    },
    {
      title: "Historial y Exportación",
      content: (
        <div>
          <p>En la pestaña de Historial puedes:</p>
          <ul>
            <li>Ver todas las transacciones registradas</li>
            <li>Filtrar por fechas o montos</li>
            <li>Exportar a Excel con los filtros aplicados</li>
          </ul>
          <p>El reporte de Excel incluye:</p>
          <ul>
            <li>Una hoja por propiedad con ingresos y egresos</li>
            <li>Análisis de gastos por categoría</li>
            <li>Totales y balances</li>
            <li>Hoja resumen general</li>
          </ul>
        </div>
      ),
      image: "/images/tutorial/5-historial.png"
    },
    {
      title: "Filtros Avanzados",
      content: (
        <div>
          <p>Antes de exportar a Excel puedes aplicar filtros:</p>
          <ul>
            <li><strong>Por fecha</strong>: Define un rango específico</li>
            <li><strong>Por monto</strong>: Mínimo y máximo</li>
            <li><strong>Solo pendientes</strong>: Transacciones no cobradas/pagadas</li>
          </ul>
          <p className="tip">
            <i className="bi bi-lightbulb"></i> <strong>Tip:</strong> Los filtros también afectan a los totales mostrados en pantalla.
          </p>
        </div>
      ),
      image: "/images/tutorial/6-filtros.png"
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      <button 
        className="tutorial-button"
        onClick={handleShow}
        title="Ver tutorial"
      >
        <i className="bi bi-question-circle"></i> Ayuda
      </button>

      <Modal 
        show={show} 
        onHide={handleClose}
        size="lg"
        centered
        className="tutorial-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-info-circle"></i> {steps[currentStep].title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="tutorial-content">
            <div className="tutorial-text">
              {steps[currentStep].content}
            </div>
            <div className="tutorial-image">
              <img 
                src={steps[currentStep].image} 
                alt={`Paso ${currentStep + 1}`} 
                className="img-fluid"
              />
            </div>
          </div>
          <div className="step-indicator">
            Paso {currentStep + 1} de {steps.length}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={prevStep} disabled={currentStep === 0}>
            <i className="bi bi-arrow-left"></i> Anterior
          </Button>
          <Button variant="primary" onClick={nextStep}>
            {currentStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'} <i className="bi bi-arrow-right"></i>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TutorialGestionFinanzas;