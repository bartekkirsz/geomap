// src/components/NavBar.js

import React from "react";
import {useAuth0} from "../react-auth0-spa";
import {Link} from "react-router-dom";
import {Button, Form, FormControl, Nav, Navbar, NavbarBrand} from "react-bootstrap";
import Profile from "./Profile";

const NavBar = () => {
    const {isAuthenticated, loginWithRedirect, logout, user} = useAuth0();
    // const [registered, setRegistered] = useState(false);
    return (
        <div>
            {!isAuthenticated && (
                <button onClick={() => loginWithRedirect({})}>Log in</button>
            )}

            {isAuthenticated && (
                <Navbar bg="primary" variant="dark" style={{height: '12vh', width: '100vw'}}>
                    <NavbarBrand><img style={{width: "100px", height: "100px"}} src={"https://scontent.fwaw3-1.fna.fbcdn.net/v/t1.0-9/p960x960/91713171_2909757425776962_4931498341373575168_o.png?_nc_cat=106&_nc_sid=85a577&_nc_oc=AQm2-KhEogITq3fmc9ZVX1bfHrqT9OEQiZVh5gU419JGopDC5qqZm1CksUETVA3xyUE&_nc_ht=scontent.fwaw3-1.fna&oh=5116d88d41f30834c79f0ce882ebc58c&oe=5F203BB6"}/></NavbarBrand>
                    <Nav style={{color: "white"}} className="mr-auto">
                        <Nav.Link style={{color: "white"}}><Link style={{color: "white"}} to="/">Mapa</Link></Nav.Link>
                        <Nav.Link style={{color: "white"}}><Link style={{color: "white"}} to="/">Kontakt</Link></Nav.Link>
                        <Nav.Link style={{color: "white"}}><Link style={{color: "white"}} to="/">Profil</Link></Nav.Link>
                        <Nav.Link style={{color: "white"}}><Link style={{color: "white"}} to="/">Pomoc</Link></Nav.Link>
                        <i>
                            <p style={{fontSize:"15px" , marginBottom: "0px", marginLeft: "70px"}}>"Mapa i baza odnawialnych żródeł energii" wykonana w ramach pracy magisterskiej na Wydziale Energetyki i Paliw AGH.</p>
                            <p style={{fontSize:"15px", marginBottom: "0px", marginLeft: "70px"}}>Projekt i wykonanie inż. Bartłomiej Kirsz</p>
                            <p style={{fontSize:"15px", marginBottom: "0px", marginLeft: "70px"}}>Opiekun pracy dr inż. Janusz Zyśk.</p>
                        </i>
                    </Nav>
                    <Form inline>
                        <Profile/>
                        <Button onClick={() => logout()}>Wyloguj</Button>
                    </Form>
                </Navbar>

            )}
        </div>
    );
};

export default NavBar;
