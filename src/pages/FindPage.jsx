import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "semantic-ui-react";
import { Box, Heading } from "@chakra-ui/react";
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
        title: event.title,
        description: event.description,
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
      const response = await eventsService.getEventsForDate(date); // Make sure this function exists in your service
      // Process response and update state accordingly
      setLoading(false);
    } catch (error) {
      console.log("Error fetching events:", error);
      setLoading(false);
    }
  };

  return (
    <Box p={4} bg="gray.100" borderRadius="md" boxShadow="md" mt={8}>
      <Heading as="h2" size="lg" color="black" mb={4}>
        Discover events
      </Heading>
      <Search
        fluid={true}
        size="lg"
        minCharacters={3}
        loading={loading}
        placeholder="Search for events here..."
        onSearchChange={handleSearch}
        onResultSelect={handleResultSelect}
        results={results}
        value={value}
        noResultsMessage="No events found"
      />
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        className="react-calendar"
      />
    </Box>
  );
}

export default FindPage;
