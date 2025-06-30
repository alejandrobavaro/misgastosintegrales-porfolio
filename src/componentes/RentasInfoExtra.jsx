import React, { useState, useEffect } from "react";
import "../assets/scss/_03-Componentes/_RentasInfoExtra.scss";
import { BsWhatsapp, BsTwitter, BsFacebook, BsInstagram, BsLinkedin, BsEnvelope } from "react-icons/bs"; // Importar íconos de Bootstrap

const RentasInfoExtra = () => {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("TODOS");
  const [filterField, setFilterField] = useState("Categoria");
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  useEffect(() => {
    fetch("/inforentas.json")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        const initialIndexes = {};
        data.forEach((item) => {
          initialIndexes[item.id] = 0;
        });
        setCurrentImageIndex(initialIndexes);
        console.log("Datos cargados:", data);
      })
      .catch((error) => console.error("Error al cargar los datos:", error));
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredData = data.filter((item) => {
    const matchesCategory =
      selectedCategory === "TODOS" || item[filterField] === selectedCategory;
    return matchesCategory;
  });

  const categories = [...new Set(data.map((item) => item[filterField]))];

  const handleNextImage = (id, totalImages) => {
    setCurrentImageIndex((prevState) => ({
      ...prevState,
      [id]: (prevState[id] + 1) % totalImages,
    }));
  };

  const handlePrevImage = (id, totalImages) => {
    setCurrentImageIndex((prevState) => ({
      ...prevState,
      [id]: (prevState[id] - 1 + totalImages) % totalImages,
    }));
  };

  const shareOnWhatsApp = (item) => {
    const message = `Mirá esta propiedad: ${item.Nombre}.\nDescripción: ${item.Tipo}\nValor alquiler: ${item.Alquilado}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  // const shareOnTwitter = (item) => {
  //   const message = `Mirá esta propiedad: ${item.Nombre}.\nDescripción: ${item.Tipo}\nValor alquiler: ${item.Alquilado}`;
  //   const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
  //     message
  //   )}`;
  //   window.open(twitterUrl, "_blank");
  // };

  const shareOnFacebook = (item) => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      window.location.href
    )}`;
    window.open(facebookUrl, "_blank");
  };

  const shareOnInstagram = (item) => {
    const message = `Mirá esta propiedad: ${item.Nombre}.`;
    const instagramUrl = `https://www.instagram.com/?url=${encodeURIComponent(
      message
    )}`;
    window.open(instagramUrl, "_blank");
  };



  const shareOnEmail = (item) => {
    const subject = `Interesado en la propiedad: ${item.Nombre}`;
    const body = `Mirá esta propiedad: ${item.Nombre}.\nDescripción: ${item.Tipo}\nValor alquiler: ${item.Alquilado}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="rentas-info-extra">
      <div className="filter-buttons">
        <button
          className={selectedCategory === "TODOS" ? "selected" : ""}
          onClick={() => handleCategoryChange("TODOS")}
        >
          TODOS
        </button>
        <button
          className={selectedCategory === "Tipo" ? "selected" : ""}
          onClick={() => handleCategoryChange("Tipo")}
        >
          Tipo
        </button>
        <button
          className={selectedCategory === "Titular" ? "selected" : ""}
          onClick={() => handleCategoryChange("Titular")}
        >
          Titular
        </button>
        <button
          className={selectedCategory === "Alquilado" ? "selected" : ""}
          onClick={() => handleCategoryChange("Alquilado")}
        >
          Alquilado
        </button>
        <button
          className={selectedCategory === "No Alquilado" ? "selected" : ""}
          onClick={() => handleCategoryChange("No Alquilado")}
        >
          No Alquilado
        </button>
        <button
          className={selectedCategory === "Alquilado por" ? "selected" : ""}
          onClick={() => handleCategoryChange("Alquilado por")}
        >
          Alquilado por
        </button>
      </div>

      {filteredData.length === 0 ? (
        <h4>No se encontraron datos en la búsqueda. Verifique su selección.</h4>
      ) : (
        <div className="data-container">
          {filteredData.map((item) => (
            <div key={item.id} className="data-item">
              <h3>{item.Nombre}</h3>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <strong>Categoria:</strong>
                    </td>
                    <td>{item.Categoria}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Tipo:</strong>
                    </td>
                    <td>{item.Tipo}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Titular:</strong>
                    </td>
                    <td>{item.Titular}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Alquilado:</strong>
                    </td>
                    <td>{item.Alquilado}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Alquilado a:</strong>
                    </td>
                    <td>{item["Alquilado a"]}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Alquilado por:</strong>
                    </td>
                    <td>{item["Alquilado por"]}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Contrato:</strong>
                    </td>
                    <td>
                      <div className="pdf-options">
                        <button>
                          <a
                            href={`/contratos-alquiler${item["Contrato Imagen"]}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            download={item["Contrato Imagen"]}
                          >
                            Descargar Contrato
                          </a>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Fecha de Cobro:</strong>
                    </td>
                    <td>{item["Fecha de Cobro"]}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Facturado:</strong>
                    </td>
                    <td>{item.Facturado}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Impuestos Pagados:</strong>
                    </td>
                    <td>{item["Impuestos Pagados"]}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Servicios Pagados:</strong>
                    </td>
                    <td>{item["Servicios Pagados"]}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Total Ganancia Renta:</strong>
                    </td>
                    <td>{item["Total Ganancia Renta"]}</td>
                  </tr>
                </tbody>
              </table>

              {/* Carousel de imágenes */}
              <div className="image-thumbnails">
                {item["Ver Fotos Propiedad"] &&
                  item["Ver Fotos Propiedad"].length > 0 && (
                    <div className="carousel">
                      <button
                        onClick={() =>
                          handlePrevImage(
                            item.id,
                            item["Ver Fotos Propiedad"].length
                          )
                        }
                      >
                        &#9664;
                      </button>
                      <img
                        src={
                          item["Ver Fotos Propiedad"][
                            currentImageIndex[item.id]
                          ]
                        }
                        alt={`Foto de ${item.Nombre} ${
                          currentImageIndex[item.id] + 1
                        }`}
                        className="thumbnail"
                      />
                      <button
                        onClick={() =>
                          handleNextImage(
                            item.id,
                            item["Ver Fotos Propiedad"].length
                          )
                        }
                      >
                        &#9654;
                      </button>
                    </div>
                  )}
              </div>

              {/* Botones para compartir en redes sociales */}
              <div className="share-buttons">
    
                <button onClick={() => shareOnWhatsApp(item)}>
                  <BsWhatsapp />
                </button>
                {/* <button onClick={() => shareOnTwitter(item)}>
                  <BsTwitter />
                </button> */}
                <button onClick={() => shareOnFacebook(item)}>
                  <BsFacebook />
                </button>
                <button onClick={() => shareOnInstagram(item)}>
                  <BsInstagram />
                </button>
                
                <button onClick={() => shareOnEmail(item)}>
                  <BsEnvelope />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RentasInfoExtra;
