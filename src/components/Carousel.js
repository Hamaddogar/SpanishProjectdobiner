import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/carousel.css";
import ThumbnailCard from "./ThumbnailCard";

class SimpleSlider extends React.Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 3,
      slidesToScroll: 3,
      arrow: true
    };
    return (
      <Slider {...settings}>
        {this.props.topics.map((topic, index) => (
          <ThumbnailCard
            topics={topic}
            index={index}
            key={index}
            favorite={this.props.favorite}
            user={this.props.user}
          />
        ))}
      </Slider>
    );
  }
}

export default SimpleSlider;
