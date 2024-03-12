import { useState, useEffect } from 'react';
import { Box, Heading, Center } from '@chakra-ui/react';
import eventsService from '../services/events.service';
import FreeEventsCarousel from '../components/FreeEventsCarousel';

const FreeEventsPage = () => {
    const [freeEvents, setFreeEvents] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFreeEvents = async () => {
            try {
                const response = await eventsService.getAllEvents();
                const filteredEvents = response.data.filter(event => event.isFree); 
                setFreeEvents(filteredEvents); 
            } catch (error) {
                console.error('Error fetching free events:', error);
                setError('Error fetching free events. Please try again later.');
            }
        };

        fetchFreeEvents();
    }, []);

    return (
        <Center>
            <Box w="90%" mt={8} px={{ base: 2, md: 4 }}>
          <Heading as="h1" size="lg">
                        Free Events
                    </Heading>
                <Box>
                    {error && <p>Error: {error}</p>}
                    <FreeEventsCarousel freeEvents={freeEvents} />
                </Box>
            </Box>
        </Center>
    );
};

export default FreeEventsPage;
