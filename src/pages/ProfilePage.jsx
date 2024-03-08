import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import UserCard from "../components/UserCard";
import authService from "../services/auth.service";
import userService from "../services/user.service";

function ProfilePage() {
    const { authToken } = useContext(AuthContext);
    const { userId } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUser = (userId) => {
            console.log("Fetching user with userId:", userId);
            userService.getUser(userId)
                .then((response) => {
                    const oneUser = response.data;
                    setUser(oneUser);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching user:", error);
                    setError("Error fetching user data.");
                    setLoading(false);
                });
        };

        const isLoggedIn = authService.isLoggedIn();
        if (!isLoggedIn) {
            navigate("/login");
            return;
        }

        // Check if userId is defined before making the API request
        if (userId) {
            getUser(userId);
        } else {
            console.error("No userId provided");
            setError("No user ID provided.");
            setLoading(false);
        }
    }, [userId, navigate]);

    const handleLogout = () => {
        authService.logout();
        navigate("/");
    };

    return (
        <div className="profile-page">
            <h1>Profile Page</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {error ? (
                        <p>{error}</p>
                    ) : (
                        <div>
                            {user ? (
                                <UserCard user={user} />
                            ) : (
                                <p>No user found</p>
                            )}
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default ProfilePage;
