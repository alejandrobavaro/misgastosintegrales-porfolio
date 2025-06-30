import React, { useState, useEffect } from "react";
import "../assets/scss/_03-Componentes/_MainContentNovedades.scss";

function MainContentNovedades() {
  // Estado para el carrusel
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Imágenes para el carrusel
  const carouselImages = [
    "/img/03-img-banners1/banner-1.png",
    "/img/03-img-banners1/banner-2.png",
    "/img/03-img-banners1/banner-3.png",
    "/img/03-img-banners1/banner-4.png"
  ];

  // Efecto para cambiar automáticamente las imágenes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const novedades = [
    {
      id: 1,
      titulo: "Guía para administrar gastos familiares",
      descripcion: "Aprende a registrar y categorizar los gastos de tu hogar para un mejor control financiero.",
      categoria: "Familia",
      fecha: "15/05/2023",
      destacado: true
    },
    {
      id: 2,
      titulo: "Tutorial: Cómo registrar pagos recurrentes",
      descripcion: "Configura pagos automáticos para tus servicios y nunca más olvides un vencimiento.",
      categoria: "General",
      fecha: "10/05/2023",
      destacado: true
    },
    {
      id: 3,
      titulo: "Gestión de gastos empresariales paso a paso",
      descripcion: "Optimiza el control financiero de tu empresa con estas herramientas integradas.",
      categoria: "Empresa",
      fecha: "05/05/2023",
      destacado: false
    },
    {
      id: 4,
      titulo: "Consejos para el control de gastos personales",
      descripcion: "Métodos efectivos para administrar tus finanzas personales y ahorrar más.",
      categoria: "Personal",
      fecha: "01/05/2023",
      destacado: false
    },
    {
      id: 5,
      titulo: "Nueva función: Exportar reportes a Excel",
      descripcion: "Ahora puedes exportar tus reportes financieros para un análisis más detallado.",
      categoria: "Actualización",
      fecha: "25/04/2023",
      destacado: true
    }
  ];

  const tutorialesPorCategoria = {
    familia: [
      {
        titulo: "Presupuesto familiar mensual",
        pasos: [
          "Registra todos los ingresos familiares",
          "Categoriza tus gastos (alimentación, educación, etc.)",
          "Establece límites para cada categoría",
          "Revisa periódicamente tus desviaciones"
        ]
      },
      {
        titulo: "Control de gastos escolares",
        pasos: [
          "Crea una categoría específica para educación",
          "Registra todos los gastos relacionados",
          "Configura recordatorios para pagos periódicos",
          "Compara gastos mes a mes"
        ]
      }
    ],
    empresa: [
      {
        titulo: "Gestión de gastos operativos",
        pasos: [
          "Clasifica gastos por departamento o proyecto",
          "Establece aprobaciones para gastos mayores",
          "Integra con tu sistema contable",
          "Genera reportes por períodos fiscales"
        ]
      }
    ],
    personal: [
      {
        titulo: "Ahorro personal sistemático",
        pasos: [
          "Define tus metas de ahorro",
          "Automatiza transferencias a tu cuenta de ahorros",
          "Monitorea tu progreso mensual",
          "Ajusta tus gastos según tus objetivos"
        ]
      }
    ]
  };

  return (
    <div className="main-content-novedades">
      {/* Carrusel de imágenes */}
      <div className="hero-carousel">
        {carouselImages.map((image, index) => (
          <div 
            key={index}
            className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
        <div className="carousel-dots">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Contenido principal */}
      <div className="content-wrapper">
        <section className="novedades-section">
          <div className="section-header">
            <h1><i className="bi bi-megaphone"></i> Novedades y Tutoriales</h1>
            <p className="lead">Aprende a sacar el máximo provecho de Gastos Integrales con nuestras guías y tutoriales.</p>
          </div>
          
          <div className="content-row">
            {/* Columna principal */}
            <div className="main-column">
              <div className="featured-news">
                <h2><i className="bi bi-star-fill"></i> Novedades destacadas</h2>
                <div className="news-grid">
                  {novedades.filter(item => item.destacado).map(item => (
                    <div key={item.id} className="news-card">
                      <div className="card-content">
                        <span className="category-badge">{item.categoria}</span>
                        <h3>{item.titulo}</h3>
                        <p>{item.descripcion}</p>
                        <div className="card-footer">
                          <small>Publicado: {item.fecha}</small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="all-news">
                <h2><i className="bi bi-collection"></i> Todas las novedades</h2>
                <div className="news-list">
                  {novedades.map(item => (
                    <a key={item.id} href="#!" className="news-item">
                      <div className="news-header">
                        <h3>{item.titulo}</h3>
                        <small>{item.fecha}</small>
                      </div>
                      <p>{item.descripcion}</p>
                      <span className="category-tag">{item.categoria}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Barra lateral */}
            <div className="sidebar">
              <div className="sidebar-content">
                <div className="tutorials-card">
                  <div className="card-header">
                    <h2><i className="bi bi-book"></i> Tutoriales rápidos</h2>
                  </div>
                  <div className="card-body">
                    <div className="tutorials-accordion">
                      {Object.entries(tutorialesPorCategoria).map(([categoria, tutoriales]) => (
                        <div key={categoria} className="accordion-item">
                          <h3 className="accordion-header">
                            <button className="accordion-button">
                              {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                            </button>
                          </h3>
                          <div className="accordion-content">
                            {tutoriales.map((tutorial, index) => (
                              <div key={index} className="tutorial">
                                <h4>{tutorial.titulo}</h4>
                                <ol>
                                  {tutorial.pasos.map((paso, i) => (
                                    <li key={i}>{paso}</li>
                                  ))}
                                </ol>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="help-card">
                  <div className="card-header">
                    <h2><i className="bi bi-question-circle"></i> ¿Necesitas ayuda?</h2>
                  </div>
                  <div className="card-body">
                    <p>Si no encuentras lo que buscas o necesitas asistencia personalizada:</p>
                    <ul className="contact-list">
                      <li>
                        <i className="bi bi-envelope"></i>
                        <a href="mailto:bavaroalejandro@gmail.com">bavaroalejandro@gmail.com</a>
                      </li>
                      <li>
                        <i className="bi bi-telephone"></i>
                        <a href="tel:+5492235455451">+5492235455451</a>
                      </li>
                      <li>
                        <i className="bi bi-whatsapp"></i>
                        <a href="https://wa.me/5492235455451">WhatsApp</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default MainContentNovedades;