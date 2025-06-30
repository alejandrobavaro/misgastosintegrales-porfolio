import React from "react";
import { Link } from "react-router-dom";
import FooterGondraWorldDev from './FooterGondraWorldDev';
import { FiHelpCircle } from "react-icons/fi";
import "../assets/scss/_03-Componentes/_Footer.scss";

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-columns">
          <div className="footer-column">
            <a href="#" className="footer-logo-link">
              <img
                className="footer-logo"
                src="/img/02-logos/logoheader1-izquierda.png"
                alt="Logo izquierdo"
              />
            </a>
          </div>
          
          <div className="footer-column">
            <div className="social-links">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <i className="bi bi-instagram" /> Instagram
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <i className="bi bi-youtube" /> YouTube
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <i className="bi bi-facebook" /> Facebook
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <i className="bi bi-twitter" /> Twitter
              </a>
              <Link to="/ayuda" className="social-link help-link">
                <FiHelpCircle className="me-2" />
                Ayuda
              </Link>
            </div>
          </div>
          
          <div className="footer-column">
            <a href="#" className="footer-logo-link">
              <img
                className="footer-logo"
                src="/img/02-logos/logoheader2-derecha.png"
                alt="Logo derecho"
              />
            </a>
          </div>
        </div>
        
        <div className="footer-divider"></div>
        
        <div className="footer-copyright">
          <FooterGondraWorldDev />
        </div>
      </div>
    </footer>
  );
}

export default Footer;