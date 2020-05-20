// src/App.js

import React from "react";
import Map from "./components/Map";

import {connect} from 'react-redux';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {logged: false};
    }

    render() {
        return (
            <Map/>
        );
    }
}

const mapStateToProps = state => {
    return {
        logged: state
    };
};


export default connect(mapStateToProps, null)(Home);