import { Routes, Route } from "react-router-dom";

import "./index.css";


import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';

import HomePage from './pages/HomePage';
import EventListPage from "./pages/EventListPage";
import AddEvent from "./components/AddEvent";
import EventDetailsPage from "./pages/EventDetailsPage";
import EditEvent from "./pages/EditEventPage";
import FreeEventsPage from "./pages/FreeEventsPage";

import VenuePage from "./pages/VenuePage";
import VenueDetailsPage from "./pages/VenueDetailsPage";
import AddVenue from "./components/AddVenue";
import EditVenue from "./pages/EditVenuePage";

import Navbar from "./components/Navbar";
import FindPage from "./pages/FindPage";
import NotFoundPage from "./pages/NotFound";

import IsLoggedIn from "./components/IsLoggedIn";
import IsAnon from "./components/IsAnon";

function App() {
  return (
    <>

      <Navbar />
      
      <Routes>

        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={ <IsAnon> <SignupPage/> </IsAnon>} />
        <Route path='/login' element={ <IsAnon>  <LoginPage/> </IsAnon> } />
        <Route path='/user' element={ <IsLoggedIn> <ProfilePage/> </IsLoggedIn> } />
      
        <Route path='/events' element={<EventListPage />} />
        <Route path='/events/add' element={<IsLoggedIn> <AddEvent/> </IsLoggedIn> } />
        <Route path='/events/:eventId' element={ <EventDetailsPage/> } />
        <Route path='/events/:eventId/edit' element={ <IsLoggedIn> <EditEvent/> </IsLoggedIn>} />
        <Route path='/events/free' element={<FreeEventsPage />} />
        
        <Route path='/venues' element={<VenuePage />} />
        <Route path='/venues/add' element={<IsLoggedIn> <AddVenue /> </IsLoggedIn> } />
        <Route path='/venues/:venueId' element={<VenueDetailsPage />} />
        <Route path='/venues/:venueId/edit' element={ <IsLoggedIn> <EditVenue /> </IsLoggedIn> } />

        <Route path='/find' element={<FindPage />} />

        <Route path='*' element={<NotFoundPage />} />

      </Routes>

 


      


    </>
  )
}

export default App;
