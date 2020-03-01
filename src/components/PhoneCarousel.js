import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PhoneThumbnail from "./PhoneThumbnail";

class PhoneCarousel extends React.Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <Slider {...settings}>
        {this.props.topics.map((topic, index) => (
          <PhoneThumbnail
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

export default PhoneCarousel;
