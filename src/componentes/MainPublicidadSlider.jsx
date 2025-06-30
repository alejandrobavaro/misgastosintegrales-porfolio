import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/scss/_03-Componentes/_MainPublicidadSlider.scss";

const MainPublicidadSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const banners = [
    "/img/04-img-banners/banner1.png",
    "/img/04-img-banners/banner2.png",
    "/img/04-img-banners/banner3.png",
    "/img/04-img-banners/banner4.png",
    "/img/04-img-banners/banner5.png",
    "/img/04-img-banners/banner6.png",
    "/img/04-img-banners/banner7.png",
    "/img/04-img-banners/banner8.png",
    "/img/04-img-banners/banner9.png",
    "/img/04-img-banners/banner10.png",
    "/img/04-img-banners/banner11.png",
    "/img/04-img-banners/banner12.png",
    "/img/04-img-banners/banner13.png",
    "/img/04-img-banners/banner14.png",
    "/img/04-img-banners/banner15.png",
    "/img/04-img-banners/banner16.png",
    "/img/04-img-banners/banner17.png",
    "/img/04-img-banners/banner18.png",
    "/img/04-img-banners/banner19.png",
    "/img/04-img-banners/banner20.png",
    "/img/04-img-banners/banner21.png",
    "/img/04-img-banners/banner22.png",
    "/img/04-img-banners/banner23.png",
    "/img/04-img-banners/banner24.png",
    "/img/04-img-banners/banner25.png",
    "/img/04-img-banners/banner26.png",
    "/img/04-img-banners/banner27.png",
    "/img/04-img-banners/banner28.png",
    "/img/04-img-banners/banner29.png",
    "/img/04-img-banners/banner30.png",
    "/img/04-img-banners/banner31.png",
  ];

  return (
    <div className="gridPadrePublicidad1">
      <div className="publicidad-grid-contenedor">
        <div className="publicidad-grid fila-publicidad">
          <div className="publicidad-container">
            <Slider {...settings}>
              {banners.map((banner, index) => (
                <div key={index} className="slide-item">
                  <img
                    src={banner}
                    alt={`Banner ${index + 1}`}
                    className="imagen-publicidad objetoCentrado1"
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className="publicidad-container">
            <Slider {...settings}>
              {banners
                .slice()
                .reverse()
                .map((banner, index) => (
                  <div key={index} className="slide-item">
                    <img
                      src={banner}
                      alt={`Banner ${banners.length - index}`}
                      className="imagen-publicidad objetoCentrado1"
                    />
                  </div>
                ))}
            </Slider>
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default MainPublicidadSlider;
