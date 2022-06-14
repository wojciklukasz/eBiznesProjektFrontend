import React, {useContext} from "react";
import ShopContextProvider from "../contexts/ShopContext";

export const Products = () => {
    const { products, addProduct, isLoaded } = useContext(ShopContextProvider);

    if(isLoaded === false) {
        return <>Loading...</>
    } else {
        return (
            <>
                <pre>   Produkt | Cena</pre>
                <ul>
                    {products.map((product) => (
                        <li key={product.ID}>
                            <pre>
                                {product.name} | {product.price} |{" "}
                                <button onClick={() => addProduct(product)}>Dodaj do koszyka</button>
                            </pre>
                        </li>
                    ))}
                </ul>
            </>
        );
    }
};