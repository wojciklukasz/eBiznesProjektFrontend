import React, {useEffect, useState} from "react";
import {fetchProducts} from "../api/ProductsAPI";
import useBasket, {getBasketFromStorage} from "../hooks/useBasket";

const defaultValue = {
    products: [],
    basket: getBasketFromStorage(),
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
        setTotal,
        isLoaded
    };

    useEffect(() => {
        fetchProducts()
            .then((p) => {
                setProducts(p);
                setBasket(getBasketFromStorage);
                setIsLoaded(true);
            })
    }, [setBasket]);

    return (
        <ShopContext.Provider value={providerValue}>{children}</ShopContext.Provider>
    );
}

export default ShopContext;