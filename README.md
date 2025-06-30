Documentación de Componentes de la App
📍 Índice General
1.	index.js
2.	App.jsx
3.	Componentes por Sección
o	Home / Main
o	Contacto
o	Gestión de Gastos
o	CPE - Comprobantes Electrónicos
o	Consultas
o	Banco
o	Rentas
o	Data
o	Header y Footer
4.	Rutas Protegidas
________________________________________
index.js
•	Función principal: Punto de entrada de la aplicación.
•	Renderiza <App /> dentro del elemento #root.
•	Usa:
o	<React.StrictMode> para ayudar en desarrollo.
o	<AuthProvider> para gestionar el contexto de autenticación.
________________________________________
App.jsx
•	Función principal: Define las rutas de navegación usando react-router-dom.
•	Contiene rutas públicas (login, registro) y privadas (paneles internos).
•	Estructura:
o	<Routes> con distintas rutas y componentes asociados.
o	<ProtectedRoute> impide acceso a rutas privadas sin autenticación.
________________________________________
Componentes por Sección
Home / Main
•	MainContent: Pantalla principal tras login.
•	MainWhatsappIcon: Botón flotante para contacto directo por WhatsApp.
•	MainCalendarioPagos: Calendario con vencimientos y pagos.
•	MainPublicidadSlider: Carrusel de imágenes publicitarias.
•	MainTareasEnProceso: Panel de seguimiento de tareas activas.
•	MainNotas: Área para notas y recordatorios.
•	MainCalculadora: Calculadora integrada (posiblemente financiera).
•	MainTemporizadorTareas: Temporizador para organización del tiempo.
Contacto
•	ContactoLogoRedes: Muestra íconos y enlaces a redes sociales.
•	ContactoFormularioSlider: Formulario de contacto en slider.
Gestión de Gastos
•	GastosTotales: Vista general de todos los gastos.
•	GastosPorPagar: Lista de facturas o ítems pendientes.
•	GastosPagados: Historial de pagos realizados.
•	GestionFinanzas: Panel general de administración financiera.
CPE - Comprobantes Electrónicos
•	CPEServiciosListado: Servicios activos con comprobantes asociados.
•	CPEImpuestosListado: Listado y control de impuestos.
•	CPECargarNuevoCPE: Carga de nuevos comprobantes electrónicos.
Consultas
•	ConsultasVencimientos: Consulta de fechas de vencimiento de pagos o servicios.
•	ConsultasComprobantes: Revisión de comprobantes ya ingresados.
•	ConsultasFacturas: Búsqueda y consulta de facturas.
•	ConsultasAyuda: Acceso a ayuda o preguntas frecuentes.
Banco
•	BancoSaldos: Muestra saldos bancarios o movimiento de cuentas.
Rentas
•	RentasAlquileres: Gestión de propiedades alquiladas.
•	RentasCobranza: Seguimiento de cobros de alquileres.
•	RentasInfoExtra: Datos complementarios sobre propiedades o contratos.
Data
•	DataInfoCuentas: Información técnica o contable de cuentas asociadas.
Header y Footer
•	HeaderUnificado: Encabezado con navegación y buscador.
•	Footer: Pie de página de la app.
________________________________________
Rutas Protegidas
ProtectedRoute
const ProtectedRoute = ({ element }) => {
  const { state } = useAuth();
  return state.isAuthenticated ? element : <Navigate to="/login" />;
};
•	Redirecciona al login si el usuario no está autenticado.
•	Permite mostrar el componente protegido si el usuario está logueado.
________________________________________
📌 Estado: Documento en progreso
Este documento se irá completando a medida que se documente cada componente en profundidad.

