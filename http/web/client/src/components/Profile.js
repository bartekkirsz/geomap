// src/components/Profile.js

import React, {Fragment} from "react";
import {useAuth0} from "../react-auth0-spa";

const Profile = () => {
    const {loading, user} = useAuth0();

    if (loading || !user) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{float: "left"}}>
            <p id="userName" style={{float: "left", marginTop: '2vh', marginLeft: "3vh"}}>{user.name}</p>
            <img src={user.picture} style={{width: "40px", height: "40px", marginTop: '1vh', marginLeft: "1vh"}} alt="Profile"/>
        </div>

    );
};

export default Profile;