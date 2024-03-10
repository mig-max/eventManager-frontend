import  { useState, useEffect } from 'react';
import { Box, Heading, Center, Badge } from '@chakra-ui/react';
import VenuesCarousel from "../components/Venuescarousel"
import venuesService from '../services/venue.service';

const VenuesListPage = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await venuesService.getAllVenues();
        console.log('Response Object:', response); // Log the entire response object for debugging
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
        <Badge colorScheme="purple" mb={4}>
          <Heading as="h1" size="lg">
            Venues
          </Heading>
        </Badge>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <VenuesCarousel venues={venues} /> // Render the VenuesCarousel component with venues data
        )}
      </Box>
    </Center>
  );
};

export default VenuesListPage;
