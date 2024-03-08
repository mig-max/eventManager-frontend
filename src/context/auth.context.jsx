/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import authService from "../services/auth.service";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [IsloggedIn, setIsLoggedIn] = useState(false);
    const [IsOwner, setIsOwner] = useState(false);
    const [IsAnon, setIsAnon] = useState(false);
  


    const storeToken = (token) => {
        localStorage.setItem("authToken", token);
    };


    const authenticateUser = () => {
        const storedToken = localStorage.getItem("authToken");

        if (storedToken) {
            
            authService
            .verify()
            .then((response) => {
                // if the token is valid
                setIsLoggedIn(true);
                setUser(response.data);
                setLoading(false);
            })
            .catch((error) => {
                // if the token is invalid
                setIsLoggedIn(false);
                setUser(null);
                setLoading(false);
            });

        } else {
            // if the token is unavailable
            setIsLoggedIn(false);
            setUser(null);
            setLoading(false);
        }
    };

    const removeToken = () => {
        // remove the token from the local storage after logout
        localStorage.removeItem("authToken");
    };

    const logOutUser = () => {
        removeToken();
        authenticateUser();
    };

    useEffect(() => {
        authenticateUser();
    }, []);


    return (
        <AuthContext.Provider
            value={{
                authenticateUser,
                user,
                loading,
                IsloggedIn,
                IsOwner,
                IsAnon,
                logOutUser,
                storeToken
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );

    
}



export { AuthProviderWrapper, AuthContext};