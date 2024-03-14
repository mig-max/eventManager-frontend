import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "semantic-ui-react";
import { Box, Heading, Button, Flex, Text } from "@chakra-ui/react";
import eventsService from "../services/events.service";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";

function FindPage() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [value, setValue] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventDates, setEventDates] = useState([]); 
  const navigate = useNavigate();

  // FETCH EVENT DATES:
  useEffect(() => {
    fetchEventDates(); 
  }, []);

  const fetchEventDates = async () => {
    try {
      setLoading(true);
      const response = await eventsService.getAllEvents();
      const eventDates = response.data.map(event => new Date(event.date)); 
      setEventDates(eventDates);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching events:", error);
      setLoading(false);
    }
  };

  // SEARCH BAR FUNCTIONS:
  const handleSearch = async (event, data) => {
    const searchValue = data.value;
    setValue(searchValue);

    try {
      setLoading(true);
      const response = await eventsService.getAllEvents();
      const eventNames = response.data.map(event => ({
        id: event._id,
        title: event.title,
      }));

      const filteredResults = eventNames.filter(event => {
        const eventTitle = event.title.toLowerCase();
        const searchValueLower = searchValue.toLowerCase();
        
        const minSimilarLetters = 3;

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

  // CALENDAR FUNCTIONS:

  // Shows a dot in the days with events
  const tileContent = ( {date} ) => {
    return eventDates.some(eventDate => isSameDay(date, eventDate)) ? <div className="event-dot"/> : null;
  }

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const handleDateChange = async date => {
    try {
      const utcDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      setSelectedDate(utcDate);
      setLoading(true);
      const response = await eventsService.getEventsForDate(utcDate.toISOString());
      setLoading(false);

      if (response.data.length > 0) {
        navigate(`/events/${response.data[0]._id}`);
      } else {
        console.log("No events found for the selected date.");
      }
    } catch (error) {
      console.log("Error fetching events:", error);
      setLoading(false);
    }
  };

  return (
    <>
    <Heading as="h1" size="lg">Find events </Heading>

      {/* SEARCH BAR */}
      <Box
        p={8}
        bg="white"
        rounded="lg"
        boxShadow="md"
        mt={8}
        maxW="xl"
        mx="auto"
        marginTop="100px"
      >
        
        <Flex direction="column" align="center" justify="center">
          <Search
            className="search-bar"
            fluid
            size="large"
            minCharacters={3}
            loading={loading}
            placeholder="Search for events here..."
            onSearchChange={handleSearch}
            onResultSelect={handleResultSelect}
            results={results}
            value={value}
            noResultsMessage=" "
            resultRenderer={result => (
              <Button variant="link" onClick={() => handleResultSelect(null, { result })} _hover={{ cursor: "pointer" }}>
                <Text>{result.title}</Text>
              </Button>
            )}
          />
        </Flex>
      </Box>
      
      {/* CALENDAR */}
      <Box
        p={8}
        bg="white"
        rounded="lg"
        boxShadow="md"
        mt={8}
        maxW="xl"
        mx="auto"
        marginTop="100px"
      >
        <Flex direction="column" align="center" justify="center">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            className="react-calendar"
            tileContent={tileContent}
            style={{ margin: "0 auto" }}
          />
          
          {/*

          {loading ? (
            <div>Loading...</div>
          ) : results.length > 0 ? (
            <ul>
              {results.map(event => (
                <li key={event.id}>{event.title}</li>
              ))}
            </ul>
          ) : (
            <div>No events found for the selected date.</div>
          )}

          */}



        </Flex>
      </Box>
    </>
  );
}

export default FindPage;
