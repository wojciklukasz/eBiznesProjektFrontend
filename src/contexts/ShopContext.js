import React, {useEffect, useState} from "react";
import {fetchProducts} from "../api/ProductsAPI";
import useBasket from "../hooks/useBasket";

const defaultValue = {
    products: [],
    basket: [],
    addProduct: () => {return 'a';},
    removeProduct: () => {return 'a';},
    total: Number,
    isLoaded: false
};

export const ShopContext = React.createContext(defaultValue);

export const ShopContextProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const { basket, setBasket, addProduct, removeProduct, total, setTotal } = useBasket();

    const providerValue = {
        products,
        basket,
        addProduct,
        removeProduct,
        total,
        isLoaded
    };

    useEffect(() => {
        fetchProducts()
            .then((p) => {
                setProducts(p);
                setBasket([]);
                setTotal(0);
                setIsLoaded(true);
            })
    }, [setBasket, setTotal]);

    return (
        <ShopContext.Provider value={providerValue}>{children}</ShopContext.Provider>
    );
}

export default ShopContext;