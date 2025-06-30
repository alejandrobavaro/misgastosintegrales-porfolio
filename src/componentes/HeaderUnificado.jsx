import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "./SesionAuthContext";
import HeaderNotificaciones from "./HeaderNotificaciones";
import { useHeaderNotifications } from "./HeaderNotificacionesContext";
import {
  FiSearch,
  FiChevronDown,
  FiDollarSign,
  FiPackage,
  FiBriefcase,
  FiBarChart2,
  FiPieChart,
  FiCreditCard,
} from "react-icons/fi";
import {
  BsFillPersonPlusFill,
  BsBoxArrowRight,
  BsList,
  BsClock,
  BsPiggyBank,
  BsCalculator,
  BsHouse,
  BsEnvelope,
  BsCardChecklist,
  BsJournalText,
  BsPerson,
} from "react-icons/bs";
import { Navbar, Nav, Container, Dropdown, Modal } from "react-bootstrap";
import "../assets/scss/_03-Componentes/_HeaderUnificado.scss";

const HeaderUnificado = ({
  categories = [],
  onCategoryChange = () => {},
  searchQuery = "",
  setSearchQuery = () => {},
  placeholder = "Buscar...",
}) => {
  const { state, dispatch } = useAuth();
  const { notifications } = useHeaderNotifications();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeSection, setActiveSection] = useState(null);
  const [showDolarModal, setShowDolarModal] = useState(false);
  const [dollarData, setDollarData] = useState([]);
  const [loadingDolar, setLoadingDolar] = useState(true);
  const [dolarError, setDolarError] = useState(null);

  // Timer para la hora actual
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch de datos del dólar cuando se abre el modal
  useEffect(() => {
    const fetchDollarData = async () => {
      try {
        const response = await fetch("https://dolarapi.com/v1/dolares");
        if (!response.ok) throw new Error("Error al obtener datos del dólar");

        const data = await response.json();
        const filteredData = data
          .filter((d) =>
            [
              "oficial",
              "blue",
              "bolsa",
              "contadoconliqui",
              "mayorista",
              "tarjeta",
            ].includes(d.casa)
          )
          .map((d) => ({
            nombre:
              d.casa === "contadoconliqui"
                ? "Liquid"
                : d.casa === "oficial"
                ? "Oficial"
                : d.casa === "blue"
                ? "Blue"
                : d.casa === "bolsa"
                ? "Bolsa"
                : d.casa === "mayorista"
                ? "Mayorista"
                : "Tarjeta",
            compra: d.compra?.toFixed(2),
            venta: d.venta?.toFixed(2),
          }));

        setDollarData(filteredData);
        setDolarError(null);
      } catch (error) {
        setDolarError(error.message);
      } finally {
        setLoadingDolar(false);
      }
    };

    if (showDolarModal) {
      setLoadingDolar(true);
      fetchDollarData();
      const interval = setInterval(fetchDollarData, 300000);
      return () => clearInterval(interval);
    }
  }, [showDolarModal]);

  const handleToggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleSection = (index) =>
    setActiveSection(activeSection === index ? null : index);

  const formatTime = (date) =>
    date.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
  const formatDate = (date) =>
    date.toLocaleDateString("es-AR", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  const handleCategoryChange = (event) => onCategoryChange(event.target.value);
  const handleSearchChange = (event) => setSearchQuery(event.target.value);

  const menuSections = [
    {
      title: "Gastos",
      icon: <FiBriefcase size={14} />,
      items: [
        { path: "/por-pagar", label: "Por Pagar" },
        { path: "/pagados", label: "Pagados" },
        { path: "/totales", label: "TOTALES", icon: <FiBarChart2 size={14} /> },
      ],
    },
    {
      title: "Data",
      icon: <FiCreditCard size={14} />,
      items: [{ path: "/data", label: "Info Cuentas" }],
    },
    {
      title: "CPE",
      icon: <FiPieChart size={14} />,
      items: [
        { path: "/servicios", label: "Servicios" },
        { path: "/impuestos", label: "Impuestos" },
        { path: "/nuevo-cpe", label: "Nuevo CPE" },
      ],
    },
    {
      title: "Consultas",
      icon: <FiPackage size={14} />,
      items: [
        { path: "/vencimientos", label: "Vencimientos" },
        { path: "/comprobantes", label: "Comprobantes" },
        { path: "/facturas", label: "Facturas" },
      ],
    },
    {
      title: "Rentas",
      icon: <FiBriefcase size={14} />,
      items: [
        { path: "/alquileres", label: "Alquileres" },
        { path: "/rentas-cobranza", label: "Cobranza" },
        { path: "/rentas-info-extra", label: "Info Extra" },
      ],
    },
    {
      title: "Banco",
      icon: <FiDollarSign size={14} />,
      items: [{ path: "/banco-saldos", label: "Saldos" }],
    },
  ];

  return (
    <div className="header-completo">
      {/* Header Principal (Primera línea) */}
      <header className="compact-header header-principal">
        <Navbar expand="lg" className="navbar">
          <Container fluid className="header-container">
            <Navbar.Collapse
              id="basic-navbar-nav"
              className={`${isMobileMenuOpen ? "show" : ""}`}
            >
              <Nav className="main-nav">
                <div>
                  <Navbar.Brand as={Link} to="/" className="logo-container">
                    <img
                      src="/img/02-logos/logomisgastos1.png"
                      alt="Logo"
                      className="logoHeader"
                    />
                  </Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav">
                    <BsList
                      className="menu-icon"
                      onClick={handleToggleMobileMenu}
                    />
                  </Navbar.Toggle>
                </div>

                <Nav.Link
                  as={Link}
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <BsHouse className="nav-icon" />
                  <span className="nav-text">Inicio</span>
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/contacto"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <BsEnvelope className="nav-icon" />
                  <span className="nav-text">Contacto</span>
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/MainCalculadora"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <BsCalculator className="nav-icon" />
                  <span className="nav-text">Calculadora</span>
                </Nav.Link>

                

                <Nav.Link
                  as={Link}
                  to="/main-notas"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <BsJournalText className="nav-icon" />
                  <span className="nav-text">Notas</span>
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/MainTareasEnProceso"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <BsCardChecklist className="nav-icon" />
                  <span className="nav-text">Tareas</span>
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/MainTemporizadorTareas"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <BsClock className="nav-icon" />
                  <span className="nav-text">Temporizador</span>
                </Nav.Link>

                <div className="header-actions">
                  <button
                    onClick={() => setShowDolarModal(true)}
                    className="dolar-hoy-button"
                  >
                    Dólar hoy
                  </button>
                </div>

                <div className="header-time">
                  <span className="time">{formatTime(currentTime)}</span>
                  <span className="date">{formatDate(currentTime)}</span>
                </div>
              </Nav>

              <div className="auth-section">
                {state.isAuthenticated ? (
                  <Dropdown className="user-dropdown">
                    <Dropdown.Toggle
                      variant="link"
                      id="dropdown-user"
                      className="user-toggle"
                    >
                      <div className="user-info">
                        <BsPerson className="user-icon" />
                        <span className="user-greeting">
                          {state.user.email.split("@")[0]}
                        </span>
                      </div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        as={Link}
                        to="/logout"
                        onClick={() => dispatch({ type: "LOGOUT" })}
                      >
                        <BsBoxArrowRight className="me-2" />
                        Cerrar Sesión
                      </Dropdown.Item>
                    </Dropdown.Menu>

                  </Dropdown>
                ) : (
                  <div className="auth-links">
                    <Link to="/login" className="login-link">
                      <BsFillPersonPlusFill className="login-icon" />
                      <span>Ingresar</span>
                    </Link>
                    <Link to="/register" className="register-link">
                      Registrarse
                    </Link>
                  </div>
                )}
              </div>
              
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      {/* Header Secundario (Segunda línea) */}
      <header className="compact-header header-secundario">
        <Navbar expand="lg" className="navbar">
          <Container fluid className="header-container">
            <div className="navbar-sections">
              <div className="main-sections">
                {menuSections.map((section, index) => (
                  <div key={`menu-${index}`} className="navbar-section">
                    <button
                      className="section-title"
                      onClick={() => toggleSection(index)}
                    >
                      {section.icon}
                      <span className="section-text">{section.title}</span>
                      <FiChevronDown
                        className={`dropdown-icon ${
                          activeSection === index ? "active" : ""
                        }`}
                      />
                    </button>
                    {activeSection === index && (
                      <div className="section-items">
                        {section.items.map((item, i) => (
                          <Link
                            key={`item-${i}`}
                            to={item.path}
                            className="nav-item"
                          >
                            {item.icon || section.icon}
                            <span>{item.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
              <Nav.Link
                  as={Link}
                  to="/gestion-finanzas"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <BsPiggyBank className="nav-icon" />
                  <span className="nav-text">Finanzas</span>
                </Nav.Link>
              </div>


              <div className="search-section">
                <div className="compact-searchbar">
                  {categories.length > 0 && (
                    <div className="category-selector">
                      <select
                        onChange={handleCategoryChange}
                        className="category-dropdown"
                      >
                        <option value="">Todos</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                      <FiChevronDown className="dropdown-icon" />
                    </div>
                  )}
                  <div className="search-input-container">
                    <FiSearch className="search-icon" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      placeholder={placeholder}
                      className="search-input"
                    />
                  </div>
                </div>
              </div>

              <Link to="/calendario-pagos">
                <HeaderNotificaciones
                  reminderCount={notifications.today}
                  compact
                />
              </Link>
            </div>
          </Container>
        </Navbar>
      </header>

      {/* Modal del Dólar */}
      <Modal
        show={showDolarModal}
        onHide={() => setShowDolarModal(false)}
        centered
        className="dolar-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Cotizaciones del Dólar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loadingDolar ? (
            <div className="loading-message">Cargando cotizaciones...</div>
          ) : dolarError ? (
            <div className="error-message">{dolarError}</div>
          ) : (
            <div className="dolar-container">
              {dollarData.map((dolar, index) => (
                <div key={index} className="dolar-item">
                  <span className="dolar-name">{dolar.nombre}</span>
                  <div className="dolar-values">
                    <span>Compra: ${dolar.compra}</span>
                    <span>Venta: ${dolar.venta}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

HeaderUnificado.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string),
  onCategoryChange: PropTypes.func,
  searchQuery: PropTypes.string,
  setSearchQuery: PropTypes.func,
  placeholder: PropTypes.string,
};

export default HeaderUnificado;
