import React, {useContext, useEffect, useState} from "react";
import {useParams, useSearchParams} from "react-router-dom";
import ShopContextProvider from "../contexts/ShopContext";
import loginContext from "../contexts/LoginContext";

export const OrderSuccessful = () => {
    const [params] = useSearchParams();
    const status = params.get("redirect_status");
    const paymentId = params.get("payment_intent");
    const param = useParams();
    const email = useContext(loginContext);
    const [isLoaded, setIsLoaded] = useState(false);
    const {setBasket, setTotal} = useContext(ShopContextProvider);

    useEffect(() => {
        if(status === "succeeded") {
            fetch('https://ebiznesprojektbackend.azurewebsites.net/api/v1/order/' + param.orderID + "/" + paymentId + "/" + email.email, {
                method: "POST",
            })
                .then((res) => res.json())
                .then(() => {
                    localStorage.removeItem('items');
                    localStorage.removeItem('counts');
                    localStorage.removeItem('total');
                    setBasket(new Map());
                    setTotal(0);
                    setIsLoaded(true);
                })
        }
    }, [email, param.orderID, paymentId, setBasket, setTotal, status])
    if(!isLoaded) {
        return <>Przetwarzanie zamówienia...</>
    } else {
        switch (status) {
            case "succeeded":
                return <><h1>Zamówienie złożono pomyślnie</h1></>
            case "processing":
                return <><h1>Płatność jest przetwarzana.</h1></>
            case "requires_payment_method":
                return <><h1>Płatność nie powiodła się, spróbuj ponownie.</h1></>
            default:
                return <><h1>Coś poszło nie tak</h1></>
        }
    }
}