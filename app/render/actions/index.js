import app from 'ampersand-app';
app.services = require('remote').require('/Users/cdieringer/node/lavabot/app/main/services/index.js');
import { _ } from 'lodash';

/*
 * action types
 */
export const REQUEST_AUTH_BOTS = 'REQUEST_AUTH_BOTS';
export function requestAuthBots() {
    return { type: REQUEST_AUTH_BOTS };
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
    return { type: REQUEST_BOTS };
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
export function requestCmd(cmd) {
    return { type: REQUEST_CMD, cmd, date: Date.now() };
};

export const REQUEST_STATE = 'REQUEST_STATE';
export function requestState(bot) {
    return { type: REQUEST_STATE, bot, date: Date.now() };
};


export const RECEIVE_CMD = 'RECEIVE_CMD';
export function receiveCmd(err, rslt) {
    return { type: RECEIVE_CMD, err, rslt };
};

export const RECEIVE_STATE = 'RECEIVE_STATE';
export function receiveState(err, state, bot) {
    return { type: RECEIVE_STATE, err, state, bot };
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
// AIRPLANE OVERRIDE!
// export function authBots(cb) {
//     return dispatch => {
//         dispatch(receiveAuthBots(null, {
//             accessToken: 'fake-token'
//         }));
//         if (cb) cb();
//     };
// }


export function callCmd(cmd, cb) {
    return dispatch => {
        dispatch(requestCmd(cmd));
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
// AIRPLANE OVERRIDE!
// export function fetchBots() {
//     return dispatch => {
//         dispatch(receiveBots(null, [
//             { attributes: { name: 'test-lavabot' } },
//             { attributes: { name: 'test-magmabot' } }
//         ]));
//     };
// }

export function fetchState(bot) {
    return dispatch => {
        dispatch(requestState(bot));
        setTimeout(() => {
            let state = { DOs: {} };
            app.services.bots.getAttributes({ bot }, (err, rslt) => {
                debugger; // put DO state into bot
                dispatch(receiveState(err, rslt, bot));    
            });
        }, 100);
    };
}
