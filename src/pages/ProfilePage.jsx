import { useContext } from "react";
import { AuthContext } from "../context/auth.context";


function ProfilePage() {
    const { user } = useContext(AuthContext); 

    if (!user) {
        return <div>Loading...</div>; 
    }

    return (
        <div className="UserPage">
         {user.avatar} 
            <h1>Welcome, {user.name}!</h1>
            <h1>{user.email}</h1>
        </div>
    );
}

export default ProfilePage;
