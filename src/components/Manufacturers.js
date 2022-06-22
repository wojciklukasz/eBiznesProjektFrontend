import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {fetchManufacturers} from "../api/ManufacturersAPI";

export const Manufacturers = () => {
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ manufacturers, setManufacturers ] = useState([]);

    useEffect(() => {
        fetchManufacturers()
            .then((c) => {
                setManufacturers(c);
                setIsLoaded(true);
            });
    }, [])

    if(!isLoaded) {
        return <>Ładowanie...</>;
    } else {
        return (
            <div className='manufacturers-page'>
                <pre className='label'>   Dostępni producenci</pre>
                <ul className='manufacturers-list'>
                    {manufacturers.map((manufacturer) => (
                        <li key={manufacturer.ID} className='manufacturer'>
                            <pre className='manufacturer-details'>
                                <NavLink to={`${manufacturer.ID}`} className='manufacturer-name'>{manufacturer.name}</NavLink>
                            </pre>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
};