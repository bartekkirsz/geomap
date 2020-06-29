import { SET_SOURCE_TYPE_FILTER,  SET_POWER, SET_PRICE_FILTER} from "../action_types";

const initialState = {
    source_type: '',
    power: '',
    price: ''
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_SOURCE_TYPE_FILTER: {
            return {
                ...state,
                source_type: action.payload
            };
        }
        case SET_POWER: {
            return {
                ...state,
                power: action.payload
            };
        }
        case SET_PRICE_FILTER: {
            return {
                ...state,
                price: action.payload
            };
        }
        default: {
            return state;
        }
    }
};