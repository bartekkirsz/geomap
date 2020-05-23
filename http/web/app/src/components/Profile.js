// src/components/Profile.js

import React, {Fragment} from "react";
import {useAuth0} from "../react-auth0-spa";

const Profile = () => {
    const {loading, user} = useAuth0();

    if (loading || !user) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{position: "absolute"}}>
            <img src={user.picture} style={{width: "75px", height: "75px"}} alt="Profile"/>

            <h2>{user.name}</h2>
            <p>{user.email}</p>

        </div>

    );
};

export default Profile;