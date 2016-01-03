import app from 'ampersand-app';
app.services = require('remote').require('/Users/cdieringer/node/lavabot/app/main/services/index.js');

/*
 * action types
 */
export const REQUEST_AUTH_BOTS = 'REQUEST_AUTH_BOTS';
export function requestAuthBots() {
    return {type: REQUEST_AUTH_BOTS};
};

export const RECEIVE_AUTH_BOTS = 'RECEIVE_AUTH_BOTS';
export function receiveAuthBots(err, auth) {
    return {
        type: RECEIVE_AUTH_BOTS,
        authorized: auth && auth.accessToken,
        err,
    };
};

export const REQUEST_BOTS = 'REQUEST_BOTS';
export function requestBots() {
    return {type: REQUEST_BOTS};
};

export const RECEIVE_BOTS = 'RECEIVE_BOTS';
export function receiveBots(err, bots) {
    var cycle = require('cycle');
    return {
        type: RECEIVE_BOTS,
        date: Date.now(),
        err,
        bots: JSON.parse(JSON.stringify(cycle.retrocycle(bots)))
    };
};

export const CLEAR_BOTS = 'CLEAR_BOTS';
export function clearBots() {
    return { type: CLEAR_BOTS };
};

export const REQUEST_CMD = 'REQUEST_CMD';
export function requestCmd() {
    return {
        type: REQUEST_CMD,
        date: Date.now(),
    };
};

export const RECEIVE_CMD = 'RECEIVE_CMD';
export function receiveCmd(err, rslt) {
    return {
        type: RECEIVE_CMD,
        err,
        rslt
    };
};

export function authBots(cb) {
    return dispatch => {
        dispatch(requestAuthBots());
        return app.services.bots.auth((err, rslt) => {
            dispatch(receiveAuthBots(err, rslt));
            if (cb) { cb(); }
        });
    }
}

export function callCmd(cmd, cb) {
    return dispatch => {
        dispatch(requestCmd());
        return app.services.bots.callCmd(cmd, (err, rslt) => {
            dispatch(receiveCmd(err, rslt));
            if (cb) { cb(); }
        });
    }
}

export function fetchBots() {
    // Thunk middleware knows how to handle functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.
    return dispatch => {
        dispatch(requestBots());
        return app.services.bots.list((err, rslt) => {
            dispatch(receiveBots(err, rslt));
        });
    };
}
