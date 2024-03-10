import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Heading, Center, Badge } from "@chakra-ui/react";
import EventSummary from "../components/EventSummary";
import eventsService from "../services/events.service";
import NextArrow from "../components/NextArrow";
import PreviousArrow from "../components/PreviousArrow";

function EventListPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await eventsService.getAllEvents();
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
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
                        Events
                    </Heading>
                </Badge>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <Slider {...settings} style={{ margin: "0 auto" }}>
                        {events.map((event) => (
                            <Box key={event._id} px={{ base: 1, md: 2 }} style={{ margin: "0 8px" }}>
                                <EventSummary event={event} />
                            </Box>
                        ))}
                    </Slider>
                )}
            </Box>
        </Center>
    );
}

export default EventListPage;
