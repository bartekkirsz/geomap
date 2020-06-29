// src/App.js

import React from "react";
import Map from "./components/Map";
import Filters from "./components/Filters"

import {connect} from 'react-redux';
import SourceCreate from "./components/SourceCreate";
import Profile from "./components/Profile";
import {Footer} from "./components/Footer";

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {logged: false};
    }

    render() {
        return (
            <div>
                <SourceCreate style={{float: 'left',position: 'relative'}} user={this.props.user}/>
                <div style={{float: 'right', position: 'relative'}}>
                    <Filters/>
                    <Map/>
                </div>
            </div>
        );
    }
}