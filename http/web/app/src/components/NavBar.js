// src/components/NavBar.js

import React from "react";
import {useAuth0} from "../react-auth0-spa";
import {Link} from "react-router-dom";
import RegisterForm from "./RegisterForm";
import {useSelector} from "react-redux";
import {Button, Form, FormControl, Nav, Navbar, NavbarBrand} from "react-bootstrap";

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

            {isAuthenticated && (
                <Navbar bg="primary" variant="dark">
                    <NavbarBrand href="#home"><img style={{width: "150px", height: "75px"}} src={"https://konferencje.inzynieria.com/cipp2019/wp-content/uploads/2016/05/malopolska.png"}/></NavbarBrand>
                    <Nav style={{color: "white"}} className="mr-auto">
                        <Nav.Link style={{color: "white"}}><Link style={{color: "white"}} to="/">Mapa</Link></Nav.Link>
                        <Nav.Link style={{color: "white"}}><Link style={{color: "white"}} to="/contact">Kontakt</Link></Nav.Link>
                        <Nav.Link style={{color: "white"}}><Link style={{color: "white"}} to="/profile">Profil</Link></Nav.Link>
                        <Nav.Link style={{color: "white"}}><Link style={{color: "white"}} to="/pomoc">Pomoc</Link></Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                        <Button variant="outline-light">Search</Button>
                        <Button onClick={() => logout()}>Wyloguj</Button>
                    </Form>
                </Navbar>

            )}
        </div>
    );
};

export default NavBar;
