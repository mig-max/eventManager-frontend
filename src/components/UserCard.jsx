/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
function UserCard ({ user }) {

    const { userId } = useParams();
    console.log("userId:", userId); // Check if userId is correctly obtained from URL parameter



    return (
        <div className="user-card">
        <img src={user.avatar} alt="User Avatar" />
        <h2>{user.name}</h2>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        {/* add more info  */}
        </div>

    )
} 

export default UserCard;