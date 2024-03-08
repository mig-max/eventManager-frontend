/*import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserCard from "../components/UserCard";
import authService from "../services/auth.service";
import userService from "../services/user.service";
import { AuthContext } from "../context/auth.context";

function ProfilePage() {
    
    //const { _id } = useParams();
    console.log("userId:", _id); // Check if userId is correctly obtained

    //const [user, setUser] = useState(null);
    /*const [loading, setLoading] = useState(true);
    const navigate = useNavigate();*/
    //const { user } = useContext(AuthContext);
    /*console.log(user)
    useEffect(() => {

        const getUser = (_id) => {
            console.log("Fetching user with userId:", _id);
            userService.getUser(_id)
                .then((response) => {
                    const oneUser = response.data;
                    setUser(oneUser);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching user:", error);
                    setLoading(false);
                });
        }; 

        const isLoggedIn = authService.isLoggedIn();
        if (!isLoggedIn) {
            navigate("/login");
            return;
        }

        

        // Check if userId is defined before making the API request
        if (_id) {
            getUser(_id);
        } else {
            console.error("No userId provided");
            setLoading(false);
        }
    }, [_id, navigate]);

    

    const handleLogout = () => {
        authService.logout();
        navigate("/");
    };*/

    //return (
       /* <div className="profile-page">
            <h1>Profile Page</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {user ? (
                        <>
                            <UserCard user={user} />
                        </>
                    ) : (
                        <p>No user found</p>
                    )}
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    );
}

//export default ProfilePage;