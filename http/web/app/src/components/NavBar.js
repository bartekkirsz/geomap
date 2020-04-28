// src/components/NavBar.js

import React, {useState} from "react";
import {useAuth0} from "../react-auth0-spa";
import {Link} from "react-router-dom";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import {Formik} from "formik";
import * as yup from "yup";

const schema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    username: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    zip: yup.string().required()
});

const NavBar = () => {
    const {isAuthenticated, loginWithRedirect, logout, user} = useAuth0();
    const [registered, setRegistered] = useState(false);

    return (
        <div>
            {!isAuthenticated && (
                <button onClick={() => loginWithRedirect({})}>Log in</button>
            )}

            {isAuthenticated && registered && <button onClick={() => logout()}>Log out</button>}


            {isAuthenticated && !registered && (
                <Formik
                    initialValues={{email: "", lastName: "", username: "", firstName: "", city: "", state: "", zip: ""}}
                    onSubmit={async values => {
                        const response = await fetch('/users', {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify(values),
                        })
                        console.log(await response.json())
                        setRegistered(true);
                        await new Promise(resolve => setTimeout(resolve, 500));
                        alert(JSON.stringify(values, null, 2));
                    }}
                    // validationSchema={schema}
                >
                    {props => {
                        const {
                            values,
                            touched,
                            errors,
                            dirty,
                            isSubmitting,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            handleReset
                        } = props;
                        return (
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="email" style={{display: "block"}}>
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="text"
                                    value={user.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />

                                <label htmlFor="firstName" style={{display: "block"}}>
                                    FirstName
                                </label>
                                <input
                                    id="firstName"
                                    type="text"
                                    value={user.given_name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />

                                <label htmlFor="secondName" style={{display: "block"}}>
                                    SecondName
                                </label>
                                <input
                                    id="secondName"
                                    type="text"
                                    value={user.family_name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />

                                <label htmlFor="username" style={{display: "block"}}>
                                    Username
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    value={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />

                                <label htmlFor="city" style={{display: "block"}}>
                                    City
                                </label>
                                <input
                                    id="city"
                                    type="text"
                                    value={values.city}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />

                                <label htmlFor="state" style={{display: "block"}}>
                                    State
                                </label>
                                <input
                                    id="state"
                                    type="text"
                                    value={values.state}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />

                                <label htmlFor="zip" style={{display: "block"}}>
                                    Zip
                                </label>
                                <input
                                    id="zip"
                                    type="text"
                                    value={values.zip}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />


                                <button
                                    type="button"
                                    className="outline"
                                    onClick={handleReset}
                                    disabled={!dirty || isSubmitting}
                                >
                                    Reset
                                </button>
                                <button type="submit" disabled={isSubmitting}>
                                    Submit
                                </button>
                            </form>
                        );
                    }}
                </Formik>
            )}
            {/* NEW - add a link to the home and profile pages */}
            {isAuthenticated && registered && (
                <span>
                    <Link to="/">Home</Link>&nbsp;
                    <Link to="/profile">Profile</Link>
                </span>
            )}
        </div>
    );
};

export default NavBar;
