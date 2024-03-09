/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function IsLoggedIn({children}) {

    const{isLoggedIn, isLoading, user} = useContext(AuthContext);

    
    if (isLoading) return <p>Loading...</p>;

    // if the user is not logged in, redirect to login page
    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    } else {  // else can stay
        return children;
    }

}

export default IsLoggedIn;

