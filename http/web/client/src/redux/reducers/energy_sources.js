import {ADD_ENERGY_SOURCE, LOAD_ENERGY_SOURCES, SHOW_ENERGY_SOURCES} from '../action_types';
const initialState = {
    energy_sources: []
};

export default function (state = initialState, action) {
    switch(action.type) {
        case ADD_ENERGY_SOURCE: {
            return {
                energy_sources: [...state.energy_sources, action.payload]
            };
        }

        case LOAD_ENERGY_SOURCES: {
            return {
                energy_sources: [...action.payload]
            }
        }
        // case SHOW_ENERGY_SOURCES: {
        //     return {
        //         ...state,
        //     }
        // }
        default:
            return state;
    }
};