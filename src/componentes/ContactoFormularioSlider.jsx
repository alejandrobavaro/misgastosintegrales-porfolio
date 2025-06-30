import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/scss/_03-Componentes/_ContactoFormularioSlider.scss";

const ContactoFormularioSlider = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch("/productos.json");
        const productos = await response.json();
        setProductos(productos);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      }
    };

    fetchProductos();
  }, []);

  const settings = {
    dots: false, // Cambiado a false para ocultar puntos de navegación
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="gridPadreContacto2">
      <div className="contact-form-slider-container">
        <div className="form-column box-shadow">
          <form
            className="contact-form"
            action="https://formspree.io/f/xbjnlgzz"
            target="_blank"
            method="post"
          >
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                placeholder="Ingresa tu nombre"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="telefono">Teléfono:</label>
              <input
                type="tel"
                className="form-control"
                id="telefono"
                name="telefono"
                placeholder="Ingresa tu teléfono"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Ingresa tu correo electrónico"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="asunto">Asunto del Mensaje:</label>
              <input
                type="text"
                className="form-control"
                id="asunto"
                name="asunto"
                placeholder="Ingresa el asunto del mensaje"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="mensaje">Mensaje:</label>
              <textarea
                className="form-control"
                id="mensaje"
                name="mensaje"
                rows={4}
                placeholder="Escribe tu mensaje aquí"
                required
              />
            </div>
            <div className="text-end">
              <button type="submit" className="btn-submit">
                ENVIAR
              </button>
            </div>
          </form>
        </div>
        <div className="slider-column box-shadow">
          <h2 className="slider-title">
            <i className="bi bi-person-arms-up" /> ADMINISTRA TU DINERO{""}
            <i className="bi bi-person-arms-up" />
          </h2>
         <img className="gifTamaño" src="../../img/05-gif/dinero-animado.gif" alt="" />
        </div>
      </div>
    </div>
  );
};

export default ContactoFormularioSlider;
