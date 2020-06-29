import {combineReducers} from "redux";
import filters from "./filters";
import energy_sources from "./energy_sources";

export default combineReducers({ energy_sources, filters });