import  { useState, useEffect } from 'react';
import { Box, Heading, Center } from '@chakra-ui/react';
import VenuesCarousel from "../components/Venuescarousel"
import venuesService from '../services/venue.service';

const VenuesListPage = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await venuesService.getAllVenues();
        console.log('Response Object:', response); 
        setVenues(response.data);
      } catch (error) {
        console.error('Error fetching venues:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVenues();
  }, []);

  return (
    <Center>
      <Box w="90%" mt={8} px={{ base: 2, md: 4 }}>
          <Heading as="h1" size="lg">
            Venues
          </Heading>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <VenuesCarousel venues={venues} /> 
        )}
      </Box>
    </Center>
  );
};

export default VenuesListPage;
