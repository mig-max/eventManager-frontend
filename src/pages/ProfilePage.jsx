/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Button } from 'react-daisyui';
import { useNavigate } from "react-router-dom"; 
//testing
import eventsService from "../services/events.service";
import { useEffect } from "react";
import UserEventsCard from "../components/UserEventsCard";

function ProfilePage() {
    const { user, logOutUser } = useContext(AuthContext); 
    const [isLoggingOut, setIsLoggingOut] = useState(false); 
    //testing
    const [userEvents, setUserEvents] = useState([]);
    const navigate = useNavigate(); 

    const handleLogout = () => {
        logOutUser();
        navigate("/"); 
    };

    if (!user) {
        return <div>Loading...</div>;
    }
    console.log(user);

    //testing
    useEffect(() => {
        const fetchEvents = async () => {
          try {
            const response = await eventsService.getUserEvents(user._id);
             console.log(user._id)
            setUserEvents(response.data);
          } catch (error) {
            console.error("Error fetching user events", error);
          }
        };
    
        fetchEvents();
      }, [user]);


    return (
        <div className="ProfilePage ">
            <div className="flex">
            <section className="profile p-6 bg-white shadow-md rounded-md max-w-md mx-auto mr-4">
            <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h1>
            <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Email:</h2>
                <p>{user.email}</p>
            </div>
    
            {user.username && (
                <div className="mb-4">
                    <h2 className="text-lg font-semibold mb-2">Username:</h2>
                    <p>{user.username}</p>
                </div>
            )}
            {user.avatar && (
                <div className="mb-4">
                    <h2 className="text-lg font-semibold mb-2">Avatar:</h2>
                    <img src={user.avatar} alt="User Avatar" className="w-16 h-16 rounded-full" />
                </div>
            )}
            {user.about && (
                <div className="mb-4">
                    <h2 className="text-lg font-semibold mb-2">About:</h2>
                    <p>{user.about}</p>
                </div>
            )}
         
            <Button
                className="btn btn-active btn-primary"
                onClick={handleLogout}
                disabled={isLoggingOut} 
            >
                {isLoggingOut ? "Logging Out..." : "Logout"}
            </Button>
            </section>

                <section className="events p-6 bg-white shadow-md rounded-md  mx-auto">
            <h2 className="text-lg font-semibold mb-2">My Events:</h2>
            {userEvents.length > 0 && (
                <div className="user-events-cards">  
                {userEvents.map((event) => (
                    <UserEventsCard key={event._id} event={event} /> 
                ))}
                </div>
               
             )}
              </section>
              </div>
              </div>
              
 )}

export default ProfilePage;
