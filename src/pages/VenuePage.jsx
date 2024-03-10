import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Heading, Center, Badge } from "@chakra-ui/react";
import VenueSummary from "../components/VenueSummary";
import venuesService from "../services/venue.service";
import NextArrow from "../components/NextArrow";
import PreviousArrow from "../components/PreviousArrow";

function VenuePage() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await venuesService.getAllVenues();
        setVenues(response.data);
      } catch (error) {
        console.error("Error fetching venues:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVenues();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PreviousArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Center>
      <Box w="90%" mt={8} px={{ base: 2, md: 4 }}>
        <Badge colorScheme="purple" mb={4}>
          <Heading as="h1" size="lg">
            Venues
          </Heading>
        </Badge>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Slider {...settings} style={{ margin: "0 auto" }}>
            {venues.map((venue) => (
              <div key={venue._id}>
                <Box px={{ base: 1, md: 2 }}>
                  <VenueSummary venue={venue} />
                </Box>
              </div>
            ))}
          </Slider>
        )}
      </Box>
    </Center>
  );
}

export default VenuePage;
