import React, {useEffect, useState} from "react";
import {fetchCategory, fetchCategoryItems} from "../api/CategoriesAPI";
import {NavLink, useParams} from "react-router-dom";

export const CategoryDetails = () => {
    const [ category, setCategory ] = useState('');
    const [ products, setProducts ] = useState('');
    const [ isLoaded, setIsLoaded ] = useState(false);
    const id = useParams();

    useEffect(() => {
        let cID = 0;
        fetchCategory(id.id)
            .then((c) => {
                cID = c.ID;
                setCategory(c);
            })
            .then(() => {
                fetchCategoryItems(cID)
                    .then((p) => {
                        if(!Array.isArray(p))
                            setProducts([p]);
                        else
                            setProducts(p);
                        setIsLoaded(true);
                    })
            })
    }, [id.id])

    if(isLoaded === false) {
        return <>Ładowanie...</>
    } else {
        return (
            <div style={{paddingLeft: 10}} className='category-details-page'>
                <h1 className='category-name'>{category.name}</h1>
                <span className='category-description'>{category.description}</span>
                <br/>
                <br/>
                <pre>Produkty w tej kategorii</pre>
                <ul className='products-in-category-list'>
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
};