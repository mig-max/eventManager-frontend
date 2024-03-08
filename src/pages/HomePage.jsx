import EventListPage from "./EventListPage";
import VenuePage from "./VenuePage";


function HomePage() {
    return (
        <div>
            <h1>All your events in<br/><span>XXXXX (city name)</span></h1>

         <EventListPage />
         <VenuePage />

 

        </div>
    );
}

export default HomePage;