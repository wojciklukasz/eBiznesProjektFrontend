import React, {useContext} from "react";
import ShopContextProvider from "../contexts/ShopContext";
import {NavLink} from "react-router-dom";

export const Products = () => {
    const { products, addProduct, isLoaded } = useContext(ShopContextProvider);

    if(isLoaded === false) {
        return <>Ładowanie...</>
    } else {
        return (
            <div className='products-page'>
                <pre className='labels'>   Produkt | Cena</pre>
                <ul className='products-list'>
                    {products.map((product) => (
                        <li key={product.ID} className='product'>
                            <pre className='product-details'>
                                <NavLink to={`${product.ID}`} className='product-name'>{product.name}</NavLink> |
                                {" "}<span className='product-price'>{product.price}</span> |{" "}
                                <button className='add-to-basket' onClick={() => addProduct(product)}>Dodaj do koszyka</button>
                            </pre>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
};