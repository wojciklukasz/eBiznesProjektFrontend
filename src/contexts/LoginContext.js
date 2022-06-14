import React, {useState} from "react";

const getTokenFromStorage = () => {
    return localStorage.getItem('token');
};

const getEmailFromStorage = () => {
    return localStorage.getItem('email');
};

const defaultValue = {
    token: getTokenFromStorage(),
    setToken: () => {return 'a';},
    email: getEmailFromStorage(),
    setEmail: () => {return 'a';}
};

export const LoginContext = React.createContext(defaultValue);

export const LoginContextProvider = ({children}) => {
    const [token, setToken] = useState(getTokenFromStorage);
    const [email, setEmail] = useState(getEmailFromStorage);

    const providerValue = {
        token,
        setToken,
        email,
        setEmail
    };

    return <LoginContext.Provider value={providerValue}>{children}</LoginContext.Provider>
};

export default LoginContext;