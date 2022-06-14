import React, {useContext, useEffect} from "react";
import {useParams} from "react-router-dom";
import loginContext from "../contexts/LoginContext";

export const LoginSuccessful = () => {
    const {setToken, setEmail} = useContext(loginContext);
    const {token, email} = useParams();

    useEffect(() => {
        setToken(token);
        setEmail(email);
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
    })

    return (
        <>
            <h1>Zalogowano pomyślnie</h1>
        </>
    );
}