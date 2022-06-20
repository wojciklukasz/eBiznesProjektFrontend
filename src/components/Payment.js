import React, {useEffect, useState} from "react";
import {loadStripe} from "@stripe/stripe-js";
import {useParams} from "react-router-dom";
import {Elements} from "@stripe/react-stripe-js";
import {PaymentCheckoutForm} from "./PaymentCheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

export const Payment = () => {
    const [clientSecret, setClientSecret] = useState("");
    const param = useParams()

    useEffect(() => {
        // TO DO: CHANGE WHEN DEPLOYING
        fetch('http://localhost:3051/api/v1/payment/' + param.orderID, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({"orderID": param.orderID})
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret))
    }, [param.orderID]);

    const appearance = {
        theme: 'stripe'
    }

    const options = {
        clientSecret,
        appearance
    }

    return(
        <>
            {clientSecret && param.orderID && (
            <Elements options={options} stripe={stripePromise}>
                <PaymentCheckoutForm />
            </Elements>
            )}
        </>
    )
};