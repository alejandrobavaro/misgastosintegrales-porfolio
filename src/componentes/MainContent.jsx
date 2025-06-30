import React from "react";
import MainContentNovedades from "./MainContentNovedades";
import "../assets/scss/_03-Componentes/_MainContent.scss";

function MainContent() {
  return (
    <main className="main-content-container">
      <div className="content-wrapper">
         <MainContentNovedades /> 
      </div>
    </main>
  );
}

export default MainContent;