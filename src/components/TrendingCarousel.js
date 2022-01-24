import React from "react";
import Slider from "react-slick";

import styles from "./TrendingCarousel.module.css";

const TrendingCarousel = (props) => {
  var settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    rows: 2,
    responsive: [
      {
        breakpoint: 1124,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings} className={styles.slider}>
      {props.children}
    </Slider>
  );
};

export default TrendingCarousel;
