/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function IsOwner({children}) {

    const{isOwner, user} = useContext(AuthContext);



    // if the user is the owner
    if (isOwner) {

        return children;
    }
       
    } else {  // else can stay
     

}

export default IsOwner;
