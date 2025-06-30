import React from "react"; // Importa React
import "../assets/scss/_03-Componentes/_ContactoLogoRedes.scss";

// Componente ContactoLogoRedes
const ContactoLogoRedes = () => {
  return (
    <div>
      <div className="gridPadreContacto1">
        <div className="contact-logo-rede-container">
          <div className="logo-column">
            <a href="#">
              <img
                alt="icono"
                className="logo-img logo-main"
                src="/img/02-logos/logomisgastos1.png"
              />
            </a>
            {/* <div className="logo-secondary-container">
              <a href="#">
                <img
                  alt="icono"
                  className="logo-img logo-secondary"
                  src="/img/05-img-costados-larga/2.png"
                />
              </a>

              <a href="#">
                <img
                  alt="icono"
                  className="logoPuchulita"
                  src="/img/05-img-costados-larga/0a.png"
                />
              </a>

              <a href="#">
                <img
                  alt="icono"
                  className="logo-img logo-secondary"
                  src="/img/05-img-costados-larga/4.png"
                />
              </a>
            </div> */}
{/* 
            <div className="logo-secondary-container">
              <a href="#">
                <img
                  alt="icono"
                  className="logo-img logo-secondary"
                  src="/img/05-img-costados-larga/1a.png"
                />
              </a>

              <a href="#">
                <img
                  alt="icono"
                  className="logo-img logo-secondary"
                  src="/img/05-img-costados-larga/3.png"
                />
              </a>
            </div> */}

            <div className="logo-secondary-container">
              <a href="#">
                <img
                  alt="icono"
                  className="logo-img logo-secondary"
                  src="/img/05-img-costados-larga/3.png"
                />
              </a>

              <a href="#">
                <img
                  alt="icono"
                  className="logo-img logo-secondary"
                  src="/img/05-img-costados-larga/4.png"
                />
              </a>
            </div>
          </div>
          {/* Columna de iconos de contacto */}
          <div className="contact-icons">
            <div className="contact-item">
              <a
                href="https://www.facebook.com/alegondramusic"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-facebook" /> Facebook
              </a>
            </div>
            <div className="contact-item">
              <a
                href="https://www.instagram.com/alegondramusic/?hl=es"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-instagram" /> Instagram
              </a>
            </div>
            <div className="contact-item">
              <a
                href="https://www.youtube.com/channel/UCBhJkysp3SnHU1tR3qAA5pQ"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-youtube" /> YouTube
              </a>
            </div>
            <div className="contact-item">
              <a
                href="https://open.spotify.com/artist/7qo7PxAcvyyyZb6XztH7zE"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-spotify" /> Spotify
              </a>
            </div>
            <div className="contact-item">
              <a
                href="mailto:bavaroalejandro@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-person-arms-up" /> Escríbenos un mail <i className="bi bi-envelope" />
              </a>
            </div>
            <div className="contact-item">
              <a
                href="https://www.paypal.com/paypalme/alegondramusic?country.x=AR&locale.x=es_XC"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-paypal" /> COLABORÁ CON NOSOTROS
              </a>
            </div>
            <div className="contact-item">
              <a
                href="https://www.youtube.com/watch?v=c6fE_Y4ol98"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-yt" /> Ver Videos
              </a>
            </div>
          </div>
        </div>
      </div>
      <hr className="transparent-hr" />
    </div>
  );
};

export default ContactoLogoRedes; 