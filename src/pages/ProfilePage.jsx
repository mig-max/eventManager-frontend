import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import authService from "../services/auth.service";
import userService from "../services/user.service";

function ProfilePage() {
    const { userId } = useParams();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Ensure user is logged in before fetching user data
        const isLoggedIn = authService.isLoggedIn();
        if (!isLoggedIn) {
            navigate("/login"); // Redirect to login page if not logged in
            return;
        }
        
        // Fetch user data
        getUser();
    }, [navigate]);

    const getUser = () => {
        userService.getUser(userId)
            .then((response) => {
                const oneUser = response.data;
                setUser(oneUser);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleLogout = () => {
        authService.logout();
        navigate("/");
    };

    return (
        <div className="profile-page">
            <h1>Profile Page 💀</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <h2>Name: {user.name}</h2>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>Avatar: {user.avatar}</p>

                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    );
}

export default ProfilePage;
