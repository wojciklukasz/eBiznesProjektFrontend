import React, {useEffect, useState} from "react";
import {NavLink, useParams} from "react-router-dom";
import {fetchManufacturer, fetchManufacturerItems} from "../api/ManufacturersAPI";

export const ManufacturerDetails = () => {
    const [ manufacturer, setManufacturer ] = useState('');
    const [ products, setProducts ] = useState('');
    const [ isLoaded, setIsLoaded ] = useState(false);
    const id = useParams();

    useEffect(() => {
        let mID = 0;
        fetchManufacturer(id.id)
            .then((m) => {
                mID = m.ID;
                setManufacturer(m);
            })
            .then(() => {
                fetchManufacturerItems(mID)
                    .then((p) => {
                        if(!Array.isArray(p))
                            setProducts([p]);
                        else
                            setProducts(p);
                        setIsLoaded(true);
                    });
            });
    }, [id.id])

    if(isLoaded === false) {
        return <>Ładowanie...</>
    } else {
        return (
            <div style={{paddingLeft: 10}} className='manufacturer-details-page'>
                <h1 className='manufacturer-name'>{manufacturer.name}</h1>
                <span className='manufacturer-description'>{manufacturer.description}</span>
                <br/>
                <br/>
                <pre>Produkty od tego producenta</pre>
                <ul className='products-from-manufacturer-list'>
                    {products.map((product) => (
                        <li key={product.ID} className='product'>
                            <pre>
                                <NavLink to={`/products/${product.ID}`} className='product-name'>{product.name}</NavLink>
                            </pre>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}