import React, {useEffect, useState} from "react";
import {fetchProduct} from "../api/ProductsAPI";
import {NavLink, useParams} from "react-router-dom";
import {fetchCategory} from "../api/CategoriesAPI";
import {fetchManufacturer} from "../api/ManufacturersAPI";
import {wait} from "@testing-library/user-event/dist/utils";

export const ProductDetails = () => {
    const [ product, setProduct ] = useState('');
    const [ category, setCategory ] = useState('');
    const [ manufacturer, setManufacturer ] = useState('');
    const [ isLoaded, setIsLoaded ] = useState(false);
    const id = useParams();

    useEffect(() => {
        let cID = 0;
        let mID = 0;
        fetchProduct(id.id)
            .then((p) => {
                cID = p.categoryID;
                mID = p.manufacturerID;
                setProduct(p);
            });
        wait(250)
            .then(() => {
            fetchCategory(cID)
                .then((c) => {
                    setCategory(c);
                });
        });
        wait(250)
            .then(() => {
                fetchManufacturer(mID)
                    .then((m) => {
                        setManufacturer(m);
                        setIsLoaded(true);
                    });
            });
    }, [id.id, product.categoryID, product.manufacturerID]);

    if(isLoaded === false) {
        return (
            <>
                Ładowanie...
            </>
        );
    } else if(product.name === "") {
        return (
            <>
                Nie znaleziono produktu
            </>
        );
    } else {
        return (
            <div style={{paddingLeft: 10}} className='product-details-page'>
                <h1 className='product-name'>{product.name}</h1>
                <span className='product-description'>{product.description}</span>
                <h3 className='product-category'>Kategoria: <NavLink to={`/categories/${product.categoryID}`}>{category.name}</NavLink></h3>
                <h3 className='product-manufacturer'>Producent: <NavLink to={`/manufacturers/${product.manufacturerID}`}>{manufacturer.name}</NavLink></h3>
            </div>
        );
    }
};