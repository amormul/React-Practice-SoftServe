import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./CardSlider.css";
import React from "react";

interface CardSliderProps {
  items: Array<{ id: number; title: string; description: string }>;
  CardComponent: React.ComponentType<any>;
  NoItemsComponent?: React.ComponentType;
}

function CardSlider({items, CardComponent, NoItemsComponent}: CardSliderProps) {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    // Responsive not works properly
    responsive: [
        {
          breakpoint: 1300,
          settings: {
            slidesToShow: 5,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
          },
        },
      ]
  };

  console.log(items.length)
  if (items.length === 0) {
    return NoItemsComponent ? <NoItemsComponent /> : <div>No items available</div>;
  }

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {items.map((item, index) => (
          <CardComponent key={index} {...item} />
        ))}
      </Slider>
    </div>
  );
}

export default CardSlider;