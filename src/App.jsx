import {Routes, Route} from "react-router-dom";

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import EventListPage from "./pages/EventListPage";
import VenuePage from "./pages/VenuePage";
import VenueDetailsPage from "./pages/VenueDetailsPage";
import AddVenue from "./components/AddVenue";
import EditVenue from "./pages/EditVenuePage";
//import IsLoggedIn from "./components/IsLoggedIn";

function App() {
 

  return (
    <>
     <h1>This is the app and: </h1>

     <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/signup' element={<SignupPage/>} />
        <Route path='/login' element={ <LoginPage/> } />
        <Route path="/user" element={<ProfilePage />} />
        <Route path="/events" element={ <EventListPage/> } />
        <Route path='/venues' element={<VenuePage/>} />
        <Route path='/venues/:venueId' element={<VenueDetailsPage/>} />
        <Route path='/addvenue' element={<AddVenue/>} />
        <Route path='/venues/:venueId/edit' element={<EditVenue/>} />
     </Routes>
    </>
  )
}

export default App
