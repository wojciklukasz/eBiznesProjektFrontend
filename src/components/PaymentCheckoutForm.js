import React, {useEffect, useState} from "react";
import {PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {useParams} from "react-router-dom";

export const PaymentCheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const param = useParams();

    const [ message, setMessage ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        if(!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if(!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Płatność przebiegła pomyślnie!");
                    break;
                case "processing":
                    setMessage("Płatność jest przetwarzana.");
                    break;
                case "requires_payment_method":
                    setMessage("Płatność nie powiodła się, spróbuj ponownie.");
                    break;
                default:
                    setMessage("Coś poszło nie tak...")
                    break;
            }
        });
    }, [stripe]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!stripe || ! elements) {
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "https://ebiznesprojekt.azurewebsites.net/success/" + param.orderID,
            },
        });

        if(error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("Coś poszło nie tak...");
        }

        setIsLoading(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />
            <button disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner"/> : "Zapłać teraz"}
                </span>
            </button>
            {message && <div id="payment-message">{message}</div>}
        </form>
    )
}