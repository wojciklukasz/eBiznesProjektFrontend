import React, {useContext, useEffect, useState} from "react";
import loginContext from "../contexts/LoginContext";
import {validateUserToken} from "../api/UserAPI";
import ShopContextProvider from "../contexts/ShopContext";

export const Order = () => {
    const {token, email} = useContext(loginContext);
    const [isValid, setIsValid] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const { total } = useContext(ShopContextProvider);
    const [ name, setName ] = useState('');
    const [ surname, setSurname ] = useState('');
    const [ road, setRoad ] = useState('');
    const [ nr, setNr ] = useState('');
    const [ code, setCode ] = useState('');
    const [ city, setCity ] = useState('');
    const [ phone, setPhone ] = useState('');

    const {basket} = useContext(ShopContextProvider);

    const handleSubmit = async() => {
        const items = Object.fromEntries(basket);
        // TO DO: CHANGE BEFORE DEPLOYMENT
        const res = await fetch("http://localhost:3051/api/v1/order", {
            method: "POST",
            body: JSON.stringify({
                name: name,
                surname: surname,
                email: email,
                road: road,
                nr: nr,
                code: code,
                city: city,
                phone: phone,
                items: items
            })
        });

        if(res.status === 200) {
            alert("Zamówienie przyjęte");
        } else {
            alert("BŁĄD!");
        }
    };

    useEffect(() => {
        console.log(basket);

        if(token != null) {
            validateUserToken(token)
                .then((m) => {
                    if(Object.keys(m)[0] === 'email') {
                        if(Object.values(m)[0] === email) {
                            setIsValid(true);
                            setIsLoaded(true);
                        } else {
                            setIsValid(false);
                            setIsLoaded(true);
                        }
                    } else {
                        setIsValid(false);
                        setIsLoaded(true);
                    }
                });
        } else {
            setIsValid(false);
            setIsLoaded(true);
        }
    }, [token, email, basket])

    if(!isLoaded) {
        return <>Ładowanie...</>
    }
    if(!isValid) {
        return <><h2>Zaloguj się aby przejść dalej</h2></>
    } else {
        return (
            <>
                Do zapłaty: {total}<br/><br/>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={name}
                        placeholder="Imię"
                        onChange={(v) => setName(v.target.value)}
                        required
                    /><br/>
                    <input
                        type="text"
                        value={surname}
                        placeholder="Nazwisko"
                        onChange={(v) => setSurname(v.target.value)}
                        required
                    /><br/>
                    <input
                        type="text"
                        value={road}
                        placeholder="Ulica"
                        onChange={(v) => setRoad(v.target.value)}
                        required
                    /><br/>
                    <input
                        type="text"
                        value={nr}
                        placeholder="Numer budynku"
                        onChange={(v) => setNr(v.target.value)}
                        required
                    /><br/>
                    <input
                        type="text"
                        value={code}
                        placeholder="Kod pocztowy"
                        onChange={(v) => setCode(v.target.value)}
                        required
                    /><br/>
                    <input
                        type="text"
                        value={city}
                        placeholder="Miasto"
                        onChange={(v) => setCity(v.target.value)}
                        required
                    /><br/>
                    <input
                        type="text"
                        value={phone}
                        placeholder="Telefon"
                        onChange={(v) => setPhone(v.target.value)}
                        required
                    /><br/><br/>
                    <input type="submit" value="Kontynuuj"/>
                </form>
            </>
        )
    }
}