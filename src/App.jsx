import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

//------------ESTILOS--------------//
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./assets/scss/_01-General/_BodyIndexApp.scss";
//------------HEADER--------------//
import { HeaderNotificationsProvider } from "./componentes/HeaderNotificacionesContext";
import HeaderUnificado from "./componentes/HeaderUnificado";
//-----------HOME - MAIN-----------------//
import MainContent from "./componentes/MainContent";
import MainWhatsappIcon from "./componentes/MainWhatsappIcon";
import MainCalendarioPagos from "./componentes/MainCalendarioPagos";
import MainPublicidadSlider from "./componentes/MainPublicidadSlider";
import MainTareasEnProceso from "./componentes/MainTareasEnProceso";
import MainNotas from "./componentes/MainNotas";
import MainCalculadora from "./componentes/MainCalculadora";
import MainTemporizadorTareas from "./componentes/MainTemporizadorTareas";
//--------------FOOTER----------------//
import Footer from "./componentes/Footer";
//-----------CONTACTO-----------------//
import ContactoLogoRedes from "./componentes/ContactoLogoRedes";
import ContactoFormularioSlider from "./componentes/ContactoFormularioSlider";
//-----------GASTOS--------------//
import GastosPagados from "./componentes/GastosPagados";
import GastosPorPagar from "./componentes/GastosPorPagar";
import GastosTotales from "./componentes/GastosTotales";
import GestionFinanzas from "./componentes/GestionFinanzas";
//-----------CPE ADHERIDOS--------------//
import CPEServiciosListado from "./componentes/CPEServiciosListado";
import CPEImpuestosListado from "./componentes/CPEImpuestosListado";
import CPECargarNuevoCPE from "./componentes/CPECargarNuevoCPE";
//-----------CONSULTAS--------------//
import ConsultasVencimientos from "./componentes/ConsultasVencimientos";
import ConsultasComprobantes from "./componentes/ConsultasComprobantes";
import ConsultasFacturas from "./componentes/ConsultasFacturas";
//-----------BANCO--------------//
import BancoSaldos from "./componentes/BancoSaldos";
//-----------RENTAS--------------//
import RentasAlquileres from "./componentes/RentasAlquileres";
import RentasCobranza from "./componentes/RentasCobranza";
import RentasInfoExtra from "./componentes/RentasInfoExtra";
//-----------DATA------------//
import DataInfoCuentas from "./componentes/DataInfoCuentas";
//-----------LOGIN-LOGOUT-REGISTRO-----------------//
import { AuthProvider, useAuth } from "./componentes/SesionAuthContext";
import SesionRegister from "./componentes/SesionRegistrate";
import SesionLogout from "./componentes/SesionLogout";
import SesionLogin from "./componentes/SesionLogin";
//-----------OTROS--------------//
import ConsultasAyuda from "./componentes/ConsultasAyuda";

const ProtectedRoute = ({ element, ...rest }) => {
  const { state } = useAuth();
  return state.isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('');

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <AuthProvider>
      <HeaderNotificationsProvider>
        <Router>
          {/* Header unificado que reemplaza a los dos anteriores */}
          <HeaderUnificado 
            categories={['Servicios', 'Impuestos', 'Alquileres']} 
            onCategoryChange={handleCategoryChange}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          
          <hr className="border border-0 opacity-20" />
          
          <div className="main-content">
            <div className="content">
              <Routes>
                <Route path="/login" element={<SesionLogin />} />
                <Route path="/register" element={<SesionRegister />} />
                <Route path="/logout" element={<SesionLogout />} />
                <Route
                  path="/"
                  element={<ProtectedRoute element={<MainContent />} />}
                />
                <Route
                  path="/calendario-pagos"
                  element={<ProtectedRoute element={<MainCalendarioPagos />} />}
                />
                <Route
                  path="/contacto"
                  element={
                    <ProtectedRoute
                      element={
                        <>
                          <ContactoLogoRedes />
                          <ContactoFormularioSlider />
                        </>
                      }
                    />
                  }
                />
                <Route
                  path="/totales"
                  element={<ProtectedRoute element={<GastosTotales />} />}
                />
                <Route
                  path="/data"
                  element={<ProtectedRoute element={<DataInfoCuentas />} />}
                />
                <Route
                  path="/por-pagar"
                  element={<ProtectedRoute element={<GastosPorPagar />} />}
                />
                <Route
                  path="/pagados"
                  element={<ProtectedRoute element={<GastosPagados />} />}
                />
                <Route
                  path="/servicios"
                  element={<ProtectedRoute element={<CPEServiciosListado />} />}
                />
                <Route
                  path="/impuestos"
                  element={<ProtectedRoute element={<CPEImpuestosListado />} />}
                />
                <Route
                  path="/nuevo-cpe"
                  element={<ProtectedRoute element={<CPECargarNuevoCPE />} />}
                />
                <Route
                  path="/vencimientos"
                  element={
                    <ProtectedRoute element={<ConsultasVencimientos />} />
                  }
                />
                <Route
                  path="/comprobantes"
                  element={
                    <ProtectedRoute element={<ConsultasComprobantes />} />
                  }
                />
                <Route
                  path="/ayuda"
                  element={<ProtectedRoute element={<ConsultasAyuda />} />}
                />
                <Route
                  path="/banco-saldos"
                  element={<ProtectedRoute element={<BancoSaldos />} />}
                />
                <Route
                  path="/facturas"
                  element={<ProtectedRoute element={<ConsultasFacturas />} />}
                />
                <Route
                  path="/alquileres"
                  element={<ProtectedRoute element={<RentasAlquileres />} />}
                />
                <Route
                  path="/rentas-cobranza"
                  element={<ProtectedRoute element={<RentasCobranza />} />}
                />
                <Route
                  path="/rentas-info-extra"
                  element={<ProtectedRoute element={<RentasInfoExtra />} />}
                />
                <Route
                  path="/MainTareasEnProceso"
                  element={<ProtectedRoute element={<MainTareasEnProceso />} />}
                />
                <Route
                  path="/main-notas"
                  element={<ProtectedRoute element={<MainNotas />} />}
                />
                <Route
                  path="/MainCalculadora"
                  element={<ProtectedRoute element={<MainCalculadora />} />}
                />
                <Route
                  path="/MainTemporizadorTareas"
                  element={
                    <ProtectedRoute element={<MainTemporizadorTareas />} />
                  }
                />
                <Route
                  path="/gestion-finanzas"
                  element={<ProtectedRoute element={<GestionFinanzas />} />}
                />
              </Routes>
            </div>
          </div>
          <hr className="border border-0 opacity-20" />
          <MainPublicidadSlider />
          <Footer />
          <MainWhatsappIcon />
        </Router>
      </HeaderNotificationsProvider>
    </AuthProvider>
  );
}

export default App;