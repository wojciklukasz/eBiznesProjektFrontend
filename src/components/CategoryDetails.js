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
            <div style={{paddingLeft: 10}}>
                <h1>{category.name}</h1>
                {category.description}
                <br/>
                <br/>
                <pre>Produkty w tej kategorii</pre>
                <ul>
                    {products.map((product) => (
                        <li key={product.ID}>
                            <pre>
                                <NavLink to={`/products/${product.ID}`}>{product.name}</NavLink>
                            </pre>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
};