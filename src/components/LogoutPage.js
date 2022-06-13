import React, {useContext, useEffect} from "react";
import loginContext from "../contexts/LoginContext";

export const LogoutPage = () => {
    const {setEmail, setToken} = useContext(loginContext)

    useEffect(() => {
        setToken(null);
        setEmail(null);
        localStorage.removeItem('token');
        localStorage.removeItem('email');
    })

    return (
        <h1>Wylogowano pomyślnie</h1>
    );
};