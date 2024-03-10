import EventSummary from './EventSummary';
import Slider from 'react-slick'; 
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

const EventsCarousel = ({ events }) => {

  const PrevArrow = (props) => {
    const { onClick } = props;
    return <FaArrowAltCircleLeft className="slick-arrow prev-arrow" onClick={onClick} />;
  };


  const NextArrow = (props) => {
    const { onClick } = props;
    return <FaArrowAltCircleRight className="slick-arrow next-arrow" onClick={onClick} />;
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    draggable: true, 
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Slider {...settings}>
      {events.map(event => (
        <div key={event._id}>
          <EventSummary event={event} />
        </div>
      ))}
    </Slider>
  );
};

export default EventsCarousel;
