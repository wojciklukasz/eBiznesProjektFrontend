import React, {useContext} from "react";
import {Link, Outlet} from "react-router-dom";
import loginContext from "../contexts/LoginContext";

export const Layout = () => {
    const {token, email} = useContext(loginContext);
    if(token !== null) {
        return (
            <>
                <nav className="navbar"
                     style={{
                         borderBottom: "solid 1px",
                         paddingBottom: "1rem",
                         paddingLeft: "1rem",
                         paddingRight: "1rem",
                         paddingTop: "1rem",
                     }}
                >
                    <Link to="/">Strona główna</Link> |{" "}
                    <Link to="/products">Produkty</Link> |{" "}
                    <Link to="/categories">Kategorie</Link> |{" "}
                    <Link to="/basket">Koszyk</Link>
                    <Link to="/logout" style={{float: "right"}}>Wyloguj</Link>
                    <center>Witaj {email}</center>
                </nav>
                <Outlet/>
            </>
        );
    } else {
        return (
            <>
                <nav className="navbar"
                     style={{
                         borderBottom: "solid 1px",
                         paddingBottom: "1rem",
                         paddingLeft: "1rem",
                         paddingRight: "1rem",
                         paddingTop: "1rem",
                     }}
                >
                    <Link to="/">Strona główna</Link> |{" "}
                    <Link to="/products">Produkty</Link> |{" "}
                    <Link to="/categories">Kategorie</Link> |{" "}
                    <Link to="/basket">Koszyk</Link>
                    <Link to="/login" style={{float: "right"}}>Logowanie</Link>
                </nav>
                <Outlet/>
            </>
        );
    }
};
