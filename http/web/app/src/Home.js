// src/App.js

import React from "react";
import Map from "./components/Map";
import {Filters} from "./components/Filters"

import {connect} from 'react-redux';
import {SourceCreate} from "./components/SourceCreate";
import Profile from "./components/Profile";
import {Footer} from "./components/Footer";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {logged: false};
    }

    render() {
        return (
            <div>
                <Profile/>
                <Filters/>
                <SourceCreate/>
                <Map/>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        logged: state
    };
};


export default connect(mapStateToProps, null)(Home);