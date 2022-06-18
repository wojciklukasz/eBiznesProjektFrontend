import {useState} from "react";

export const getBasketFromStorage = () => {
    try {
        const items = localStorage.getItem('items').split(',');
        const counts = localStorage.getItem('counts').split(',');
        const map = new Map();
        for (let i = 0; i < items.length; i++)
            map.set(items[i], counts[i]);
        return map;
    } catch (TypeError) {
        return new Map();
    }
}

export const getTotalFromStorage = () => {
    const total = localStorage.getItem('total');
    if(total == null) {
        return 0;
    }
    return parseInt(localStorage.getItem('total'));
}

const useBasket = () => {
    const [basket, setBasket] = useState(getBasketFromStorage);
    const [total, setTotal] = useState(getTotalFromStorage);

    const addProduct = (product) => {
        const newMap = new Map(basket);
        if(newMap.get(product.ID) === undefined) {
            newMap.set(product.ID, 1);
            setTotal(total + product.price);
        }
        else {
            newMap.set(product.ID, newMap.get(product.ID) + 1);
            setTotal(total + product.price);
        }
        setBasket(new Map(newMap));
        localStorage.setItem('items', Array.from(newMap.keys()).join());
        localStorage.setItem('counts', Array.from(newMap.values()).join());
        localStorage.setItem('total', total.toString());
    }

    const removeProduct = (product, products) => {
        const filteredProduct = products.filter(p => p.ID === parseInt(product));
        const newMap = new Map(basket);
        if(newMap.get(product) === 1) {
            newMap.delete(product);
            setTotal(total - filteredProduct[0].price);
        } else {
            newMap.set(product, newMap.get(product) - 1);
            setTotal(total - filteredProduct[0].price);
        }
        setBasket(new Map(newMap));
        if(Array.from(newMap.keys()).length === 0) {
            localStorage.removeItem('items');
            localStorage.removeItem('counts');
            localStorage.removeItem('total');
        } else {
            localStorage.setItem('items', Array.from(newMap.keys()).join());
            localStorage.setItem('counts', Array.from(newMap.values()).join());
            localStorage.setItem('total', total.toString());
        }
    }

    return {
        basket,
        setBasket,
        addProduct,
        removeProduct,
        total,
        setTotal
    };
}

export default useBasket;