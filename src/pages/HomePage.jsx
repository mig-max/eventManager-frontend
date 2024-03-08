import EventListPage from "./EventListPage";
import VenuePage from "./VenuePage";
import AddVenue from "../components/AddVenue";
import AddEvent from "../components/AddEvent";
import { useEffect } from 'react'
import { themeChange } from 'theme-change'



function HomePage() {

    useEffect(() => {
        themeChange(false)
        // 👆 false parameter is required for react project
      }, [])

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