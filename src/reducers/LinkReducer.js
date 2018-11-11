import * as ActionTypes from '../constants/Actions';

const initialState = {
    links: [],
    waiting: true
};

const LinkReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_LINKS_REQUEST:
            return {
                ...state,
                waiting: true
            };
        case ActionTypes.GET_LINKS_SUCCESS:
            return {
                ...state,
                links: action.payload.links,
                waiting: false
            };
        case ActionTypes.GET_LINKS_FAIL:
            return {
                ...state,
                waiting: false
            };
        case ActionTypes.SAVE_LINK:
            return {
                ...state,
                waiting: true
            };
        case ActionTypes.REMOVE_LINK:
            return {
                ...state,
                waiting: true
            };
        default:
            return state;
    }
};

export default LinkReducer;

