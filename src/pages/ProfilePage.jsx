/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Button } from 'react-daisyui';
import { useNavigate } from "react-router-dom"; 

function ProfilePage() {
    const { user, logOutUser } = useContext(AuthContext); 
    const [isLoggingOut, setIsLoggingOut] = useState(false); 
    const navigate = useNavigate(); 

    const handleLogout = () => {
        logOutUser();
        navigate("/"); 
    };

    if (!user) {
        return <div>Loading...</div>;
    }
    console.log(user);

    return (
        <div className="ProfilePage p-6 bg-white shadow-md rounded-md max-w-md mx-auto">
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
        </div>
    );
}

export default ProfilePage;
