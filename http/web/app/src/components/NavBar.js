// src/components/NavBar.js

import React from "react";
import {useAuth0} from "../react-auth0-spa";
import {Link} from "react-router-dom";
import RegisterForm from "./RegisterForm";
import {useSelector} from "react-redux";

const NavBar = () => {
    const {isAuthenticated, loginWithRedirect, logout, user} = useAuth0();
    // const [registered, setRegistered] = useState(false);
    const logged = useSelector(state => state.reducer);
    console.log(logged);
    return (
        <div>
            {!isAuthenticated && (
                <button onClick={() => loginWithRedirect({})}>Log in</button>
            )}

            {isAuthenticated && <button onClick={() => logout()}>Log out</button>}


            {/*{isAuthenticated && (*/}
            {/*    <RegisterForm user={user}/>*/}
            {/*)}*/}
            {/* NEW - add a link to the home and profile pages */}
            {isAuthenticated && (
                <span>
                    <Link to="/">Mapa</Link>&nbsp;
                    <Link to="/">Dodaj zrodlo energii</Link>&nbsp;
                    <Link to="/profile">Profile</Link>
                </span>
            )}
        </div>
    );
};

export default NavBar;
