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
            <li key={product} className='product'>
                <pre className='product-details'>
                    <NavLink to={"/products/" + product} className='product-name'>{products.filter(p => p.ID === parseInt(product))[0].name}</NavLink>
                    {" "}| <span className='product-price'>{products.filter(p => p.ID === parseInt(product))[0].price}</span>
                    {" "}| x<span className='product-quantity'>{counts[index]}</span> |{" "}
                    <button className='remove-from-basket' onClick={() => removeProduct(product, products)}>Usuń z koszyka</button>
                </pre>
            </li>
        )
    }

    if(!isLoaded) {
        return <>Ładowanie...</>
    } else {
        return (
            <div className='basket-page'>
                <pre className='labels'>   Produkt | Cena | Ilość</pre>
                <ul className='products-list'>
                    {renderItems()}
                </ul>
                <pre className='products-cost'>   Koszt produktów: {total}</pre>
                {basket.size > 0 ? <pre className='shipping-cost'>   Kosz wysyłki: 14</pre> : ""}
                {basket.size > 0 ? <pre className='total-cost'>   Do zapłaty: {total + 14}</pre> : ""}
                {basket.size > 0 ? <Link to="/order">Do kasy</Link> : ""}
            </div>
        );
    }
}