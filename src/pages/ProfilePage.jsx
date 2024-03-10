import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Button } from 'react-daisyui';
import authService from "../services/auth.service";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook from react-router-dom

function ProfilePage() {
    const { user, setUser } = useContext(AuthContext); // Assuming you have setUser function in your context
    const navigate = useNavigate(); // Initialize navigate function using useNavigate hook

    const handleLogout = () => {
        authService.logout() // Call the logout function from your authentication service
            .then(() => {
                setUser(null); // Clear the user context
                navigate("/"); // Redirect the user to the login page using navigate function
            })
            .catch(error => {
                console.error("Logout error:", error);
                // Handle logout error if needed
            });
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="ProfilePage p-6 bg-white shadow-md rounded-md max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h1>
            <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Email:</h2>
                <p>{user.email}</p>
            </div>
            {/* Additional user details */}
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
            {/* Add a button to log out */}
            <Button className="btn btn-active btn-primary" onClick={handleLogout}>
                Logout
            </Button>
        </div>
    );
}

export default ProfilePage;
