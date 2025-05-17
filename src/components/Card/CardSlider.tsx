import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "../../slider.css";
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
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 650,
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
    return NoItemsComponent ? <NoItemsComponent/> : <div>No items available</div>;
  }

  return (
    <Slider {...settings} className="card-slider">
      {items.map((item, index) => (
        <CardComponent key={index} {...item} />
      ))}
    </Slider>
  );
}

export default CardSlider;