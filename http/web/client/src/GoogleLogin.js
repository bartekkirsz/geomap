import {useAuth0} from "./react-auth0-spa";
import history from "./utils/history";
import NavBar from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoutes";
import Profile from "./components/Profile";
import React from "react";
import {Route, Router} from "react-router-dom";
import Home from "./Home";
import {Switch} from "react-bootstrap";

export function GoogleLogin() {
    // const {isAuthenticated, loginWithRedirect, logout, user} = useAuth0();
    const {loading, user} = useAuth0();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (<div className="App">
        {/* Don't forget to include the history module */}
        <Router history={history}>
            <header>
                <NavBar/>
            </header>
            <Switch>
                <Route path="/" exact/>
                <PrivateRoute path="/profile" component={Profile}/>
            </Switch>
        </Router>
        <Home user={user}/>
    </div>)

}