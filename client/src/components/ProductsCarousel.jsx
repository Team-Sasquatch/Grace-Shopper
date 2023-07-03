import React, { useState } from "react";
import PropTypes from "prop-types";
import "../ImageCarousel.css";

const ProductsCarousel = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="image-carousel">
      <div className="carousel-image">
        <img src={images[activeIndex]} alt="Product" />
      </div>
      <div className="carousel-controls">
        <button className="prev-button" onClick={handlePrev}>
          &lt;
        </button>
        <button className="next-button" onClick={handleNext}>
          &gt;
        </button>
      </div>
    </div>
  );
};

ProductsCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProductsCarousel;
