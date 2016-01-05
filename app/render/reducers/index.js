import * as allActions from '../actions/';
const DEFAULT_BOTS = {
    DOs: {}
};

function reduceBotAppState(state = DEFAULT_BOTS, action) {
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
        case allActions.REQUEST_STATE:
            return state; // nop
        case allActions.RECEIVE_STATE:
            const inFlightDOs = (state.inFlightDOs || []).filter(flt => {
               return flt.name !== action.bot.attributes.name; 
            });
            let bots = state.bots || [];
            bots.some(bot => {
                if (bot.attributes.name !== action.bot.attributes.name) { return; }
                bot.DOs = action.DOs;
                return true;
            })
            return Object.assign({}, state, {
                inFlightDOs, bots
            });
        case allActions.REQUEST_BOTS:
            return Object.assign({}, state, { fetching: true });
        case allActions.RECEIVE_BOTS:
            return Object.assign({}, state, {
                fetching: false,
                bots: action.bots
            });
        case allActions.REQUEST_CMD:
            return Object.assign({}, state, {
               inFlightDOs: [{
                   name: action.cmd.bot.attributes.name,
                   DO: action.cmd.DO
               }].concat(state.inFlightDOs ? state.inFlightDOs : [])
            });
        default:
            return state;
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
