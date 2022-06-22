import React, {useEffect, useState} from "react";
import {fetchCategories} from "../api/CategoriesAPI";
import {NavLink} from "react-router-dom";

export const Categories = () => {
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ categories, setCategories ] = useState([]);

    useEffect(() => {
        fetchCategories()
            .then((c) => {
                setCategories(c);
                setIsLoaded(true);
            });
    }, []);

    if(!isLoaded) {
        return <>Ładowanie...</>;
    } else {
        return (
            <div className='categories-page'>
                <pre className='label'>   Dostępne kategorie</pre>
                <ul className='categories-list'>
                    {categories.map((category) => (
                        <li key={category.ID} className='category'>
                            <pre className='category-details'>
                                <NavLink to={`${category.ID}`} className='category-name'>{category.name}</NavLink>
                            </pre>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
};