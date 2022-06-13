import React, {createContext} from "react";
import useBasket from "../hooks/useBasket";

const defaultValue = {
    basket: [],
    addProduct: () => { return 0; },
    removeProduct: () => { return 0; },
    total: Number
};

export const BasketContext = createContext(defaultValue);

export const BasketContextProvider = ({children}) => {
    const {basket, addProduct, removeProduct, total} = useBasket();

    return (
        <BasketContext.Provider value={{
            basket,
            total,
            addProduct,
            removeProduct
        }
        }>{children}</BasketContext.Provider>
    )
};

export default BasketContext;