import * as allActions from '../actions/';

function reduceBotAppState(state = {}, action) {
    switch (action.type) {
        case allActions.CLEAR_BOTS:
            return Object.assign({});
        case allActions.REQUEST_AUTH_BOTS:
            return Object.assign({}, state, { authorizing: true });
        case allActions.RECEIVE_AUTH_BOTS:
            return Object.assign({}, state, {
                authorizing: false,
                authorized: !!action.authorized,
                unauthorized: !action.authorized,
            });
        case allActions.REQUEST_BOTS:
            return Object.assign({}, state, { fetching: true });
        case allActions.RECEIVE_BOTS:
            return Object.assign({}, state, {
                fetching: false,
                available: action.bots
            });
        default:
            return {};
    }
};

export default function(state = {}, action) {
    return {
        bots: reduceBotAppState(state.bots, action)
    }
};

/*
import { SET_SIGNUP_USER } from '../actions/';

const initialState = {
    user: {}
};

export default function reduce(state = initialState, action) {
    switch (action.type) {

        case SET_SIGNUP_USER:
            return Object.assign({}, state, {
                user: action.user || {}
            });

        default:
            return state;
    }
    return state;
};
 */
