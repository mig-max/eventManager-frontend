import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "semantic-ui-react";
import { Box, Heading, Button, Flex, Text } from "@chakra-ui/react";
import eventsService from "../services/events.service";
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function FindPage() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [value, setValue] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

  const handleSearch = async (event, data) => {
    const searchValue = data.value;
    setValue(searchValue);
  
    try {
      setLoading(true);
      const response = await eventsService.getAllEvents();
      const eventNames = response.data.map((event) => ({
        id: event._id,
        title: event.title, // Only retrieve the title
      }));
  
      const filteredResults = eventNames.filter((event) => {
        const eventTitle = event.title.toLowerCase();
        const searchValueLower = searchValue.toLowerCase();
        const minSimilarLetters = 3;
  
        // Count the number of similar letters
        let similarLettersCount = 0;
        for (let i = 0; i < eventTitle.length; i++) {
          if (searchValueLower.includes(eventTitle[i])) {
            similarLettersCount++;
          }
        }
  
        return similarLettersCount >= minSimilarLetters;
      });
  
      setResults(filteredResults);
      setLoading(false);
    } catch (error) {
      console.log("Error searching for events:", error);
      setLoading(false);
    }
  };
  
  const handleResultSelect = (event, data) => {
    const selectedEvent = data.result;
    setValue(selectedEvent.title);
    setResults([]);
  
    if (selectedEvent && selectedEvent.id) {
      const selectedEventId = selectedEvent.id;
      navigate(`/events/${selectedEventId}`);
    } else {
      console.error("Selected event or its ID is undefined:", selectedEvent);
    }
  };
  
  const handleDateChange = (date) => {
    // Convert date to UTC format
    const utcDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    setSelectedDate(utcDate);
    fetchEventsForDate(utcDate.toISOString());
  };
  
  const fetchEventsForDate = async (date) => {
    try {
      setLoading(true);
      const response = await eventsService.getEventsForDate(date); 
      setLoading(false);
    } catch (error) {
      console.log("Error fetching events:", error);
      setLoading(false);
    }
  };

  return (
    <Box p={8} bg="white" rounded="lg" boxShadow="md" mt={8} maxW="xl" mx="auto" marginTop="100px">
      <Heading as="h1" size="xl" mb={4} color="black" align="center">
        Discover events
      </Heading>
      <Flex direction="column" align="center" justify="center">
      <Search
  fluid
  size="large"
  minCharacters={3}
  loading={loading}
  placeholder="Search for events here..."
  onSearchChange={handleSearch}
  onResultSelect={handleResultSelect}
  results={results}
  value={value}
  noResultsMessage="No events found"
  resultRenderer={(result) => (
    <Button
      variant="unstyled"
      onClick={() => handleResultSelect(null, { result })}
      _hover={{ cursor: "pointer" }} // Change cursor to pointer on hover
    >
      <Text>{result.title}</Text> {/* Display only the title */}
    </Button>
  )}
/>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          className="react-calendar"
          style={{ margin: "0 auto" }}
        />
      </Flex>
      <Box mt={4} textAlign="center">
        <Button size="sm" colorScheme="blue" onClick={() => navigate(`/events`)}>
          All Events
        </Button>
        <Button size="sm" colorScheme="gray" onClick={() => navigate(`/`)}>
          Home
        </Button>
      </Box>
    </Box>
  );
}

export default FindPage;
