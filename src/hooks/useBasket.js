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
    return parseInt(total);
}

const useBasket = () => {
    const [basket, setBasket] = useState(getBasketFromStorage);
    const [total, setTotal] = useState(getTotalFromStorage);

    const addProduct = (product) => {
        const newMap = new Map(basket);
        if(newMap.get(product.ID.toString()) === undefined) {
            newMap.set(product.ID.toString(), '1');
            setTotal(total + parseInt(product.price));
        }
        else {
            newMap.set(product.ID.toString(), (parseInt(newMap.get(product.ID.toString())) + 1).toString());
            setTotal(total + product.price);
        }
        setBasket(new Map(newMap));
        setTotal((t) => {
            localStorage.setItem('items', Array.from(newMap.keys()).join());
            localStorage.setItem('counts', Array.from(newMap.values()).join());
            localStorage.setItem('total', t.toString());
            return t;
        })
    }

    const removeProduct = (product, products) => {
        const filteredProduct = products.filter(p => p.ID === parseInt(product));
        const newMap = new Map(basket);
        if(newMap.get(product) === '1') {
            newMap.delete(product.toString());
            setTotal(total - filteredProduct[0].price);
        } else {
            newMap.set(product.toString(), (parseInt(newMap.get(product)) - 1).toString());
            setTotal(total - filteredProduct[0].price);
        }
        setBasket(new Map(newMap));
        setTotal((t) => {
            if(Array.from(newMap.keys()).length === 0) {
                localStorage.removeItem('items');
                localStorage.removeItem('counts');
                localStorage.removeItem('total');
            } else {
                localStorage.setItem('items', Array.from(newMap.keys()).join());
                localStorage.setItem('counts', Array.from(newMap.values()).join());
                localStorage.setItem('total', t.toString());
            }
            return t;
        })
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