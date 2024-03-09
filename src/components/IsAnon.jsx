/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";


function IsAnon({children}) {

    const{isLoggedIn, isLoading, user} = useContext(AuthContext);

    if (isLoading) return <p>Loading...</p>;

    // if the user is logged in, redirect to the home page
    if (isLoggedIn) {
        return <Navigate to={`/`}/>;
    } else {
        return children;
    }


}

export default IsAnon;