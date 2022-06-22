import React, {useContext, useEffect, useState} from "react";
import loginContext from "../contexts/LoginContext";
import {validateUserToken} from "../api/UserAPI";
import ShopContextProvider from "../contexts/ShopContext";
import {useNavigate} from "react-router-dom";

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

    const [error, setError] = useState('');

    const {basket} = useContext(ShopContextProvider);

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!/^\d{9}$/.test(phone)) {
            setError('Numer telefonu nie jest poprawny');
            return;
        }

        if(!/^\d{2}-\d{3}$/.test(code)) {
            setError('Kod pocztowy nie jest poprawny');
            return;
        }

        if(!/^\d+[a-zA-Z]?$/.test(nr)) {
            setError('Numer budynku nie jest poprawny');
            return;
        }

        const items = Object.fromEntries(basket);
        // TO DO: CHANGE BEFORE DEPLOYMENT
        fetch("http://localhost:3051/api/v1/order", {
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
        }).then(res => res.json()).then((res) => {
            navigate('/payment/' + res.UUID)
        })
    };

    useEffect(() => {
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
    }, [token, email])

    if(basket.size <= 0) {
        return <div className='empty-basket-message'>Koszyk jest pusty!</div>
    } else if(!isLoaded) {
        return <>Ładowanie...</>
    } else if(!isValid) {
        return <><h2 className='login-error-message'>Zaloguj się aby przejść dalej</h2></>
    } else {
        return (
            <div className='order-page'>
                Do zapłaty: <span className='total-cost'>{total + 14}</span><br/><br/>
                <form onSubmit={handleSubmit} className='input-form'>
                    <input
                        className='name'
                        type="text"
                        value={name}
                        placeholder="Imię"
                        onChange={(v) => setName(v.target.value)}
                        required
                    /><br/>
                    <input
                        className='surname'
                        type="text"
                        value={surname}
                        placeholder="Nazwisko"
                        onChange={(v) => setSurname(v.target.value)}
                        required
                    /><br/>
                    <input
                        className='road'
                        type="text"
                        value={road}
                        placeholder="Ulica"
                        onChange={(v) => setRoad(v.target.value)}
                        required
                    /><br/>
                    <input
                        className='nr'
                        type="text"
                        value={nr}
                        placeholder="Numer budynku"
                        onChange={(v) => setNr(v.target.value)}
                        required
                    /><br/>
                    <input
                        className='code'
                        type="text"
                        value={code}
                        placeholder="Kod pocztowy"
                        onChange={(v) => setCode(v.target.value)}
                        required
                    /><br/>
                    <input
                        className='city'
                        type="text"
                        value={city}
                        placeholder="Miasto"
                        onChange={(v) => setCity(v.target.value)}
                        required
                    /><br/>
                    <input
                        className='phone'
                        type="text"
                        value={phone}
                        placeholder="Telefon"
                        onChange={(v) => setPhone(v.target.value)}
                        required
                    /><br/><br/>
                    <input type="submit" value="Kontynuuj" className='submit-button'/>
                </form>
                <h3 className="error-message">{error}</h3>
            </div>
        )
    }
}