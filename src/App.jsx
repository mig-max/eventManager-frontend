import { Routes, Route } from "react-router-dom";

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';

import EventListPage from "./pages/EventListPage";
import AddEvent from "./components/AddEvent";
import EventDetailsPage from "./pages/EventDetailsPage";
import EditEvent from "./pages/EditEventPage";

import VenuePage from "./pages/VenuePage";
import VenueDetailsPage from "./pages/VenueDetailsPage";
import AddVenue from "./components/AddVenue";
import EditVenue from "./pages/EditVenuePage";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>

      <Navbar />
      
      <Routes>

        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path="/user" element={<ProfilePage />} />
        <Route path='/users/:userId' element={<ProfilePage />} />
        <Route path='/events' element={<EventListPage />} />
        <Route path='/events/add' element={<AddEvent />} />
        <Route path='/events/:eventId' element={<EventDetailsPage />} />
        <Route path='/events/:eventId/edit' element={<EditEvent />} />
        <Route path='/venues' element={<VenuePage />} />
        <Route path='/venues/add' element={<AddVenue />} />
        <Route path='/venues/:venueId' element={<VenueDetailsPage />} />
        <Route path='/venues/:venueId/edit' element={<EditVenue />} />

      </Routes>

      <Footer />


    </>
  )
}

export default App;
