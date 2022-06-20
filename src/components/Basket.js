import React, {useContext} from "react";
import ShopContextProvider from "../contexts/ShopContext";
import {Link, NavLink} from "react-router-dom";

export const Basket = () => {
    const {basket, removeProduct, total, products, isLoaded} = useContext(ShopContextProvider);

    const renderItems = () => {
        const basketMap = new Map(basket);
        const productIDs = Array.from(basketMap.keys());
        const counts = Array.from(basketMap.values());
        return productIDs.map((product, index) =>
            <li key={product}>
                <pre>
                    <NavLink to={"/products/" + product}>{products.filter(p => p.ID === parseInt(product))[0].name}</NavLink>
                    {" "}| {counts[index]} |{" "}
                    <button onClick={() => removeProduct(product, products)}>Usuń z koszyka</button>
                </pre>
            </li>
        )
    }

    if(!isLoaded) {
        return <>Ładowanie...</>
    } else {
        return (
            <>
                <pre>   Produkt | Ilość</pre>
                <ul>
                    {renderItems()}
                </ul>
                <pre>   Koszt produktów: {total}</pre>
                {basket.size > 0 ? <pre>   Kosz wysyłki: 14</pre> : ""}
                {basket.size > 0 ? <pre>   Do zapłaty: {total + 14}</pre> : ""}
                {basket.size > 0 ? <Link to="/order/">Do kasy</Link> : ""}
            </>
        );
    }
}