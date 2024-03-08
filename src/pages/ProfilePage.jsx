import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import UserCard from "../components/UserCard";

function ProfilePage() {
    const { user } = useContext(AuthContext); 

    if (!user) {
        return <div>Loading...</div>; 
    }

    return (
        <div className="UserPage">
            <UserCard user={user}/>
        </div>
    );
}

export default ProfilePage;
