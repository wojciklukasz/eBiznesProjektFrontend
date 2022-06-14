import React, {useContext} from "react";
import ShopContextProvider from "../contexts/ShopContext";
import {Link} from "react-router-dom";

export const Basket = () => {
    const {basket, removeProduct, total} = useContext(ShopContextProvider)

    return (
        <>
            <pre>   Produkt | Cena</pre>
            <ul>
                { basket.map((product) => (
                    <li key={product.ID}>
                            <pre>
                                {product.name} | {product.price} |{" "}
                                <button onClick={() => removeProduct(product.ID)}>Usuń z koszyka</button>
                            </pre>
                    </li>
                ))}
            </ul>
            <pre>   Do zapłaty: {total}</pre>
            <Link to="/payment/">Do kasy</Link>
        </>
    )
}