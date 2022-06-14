import React, {useContext} from "react";
import ShopContextProvider from "../contexts/ShopContext";
import {NavLink} from "react-router-dom";

export const Products = () => {
    const { products, addProduct, isLoaded } = useContext(ShopContextProvider);

    if(isLoaded === false) {
        return <>Ładowanie...</>
    } else {
        return (
            <>
                <pre>   Produkt | Cena</pre>
                <ul>
                    {products.map((product) => (
                        <li key={product.ID}>
                            <pre>
                                <NavLink to={`${product.ID}`}>{product.name}</NavLink> |
                                {product.price} |{" "}
                                <button onClick={() => addProduct(product)}>Dodaj do koszyka</button>
                            </pre>
                        </li>
                    ))}
                </ul>
            </>
        );
    }
};