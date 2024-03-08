import EventListPage from "./EventListPage";
import VenuePage from "./VenuePage";
import AddVenue from "../components/AddVenue";
import AddEvent from "../components/AddEvent";

function HomePage() {
    return (
        <div>
            <h1>All your events in<br/><span>XXXXX (city name)</span></h1>

         <EventListPage />
         <VenuePage />

         <AddVenue />
         <AddEvent />

 

        </div>
    );
}

export default HomePage;