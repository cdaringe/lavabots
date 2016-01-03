/**
 * Store configuration.
 *
 * This configures the Redux store by adding middleware. See Redux's
 * 'Real World' example:
 *
 * @{@link  https://github.com/rackt/redux/blob/master/examples/real-world/store/configureStore.js}
 */
import { applyMiddleware, compose, createStore } from 'redux';
import createLogger from 'redux-logger';
import promiseMiddleware from 'redux-promise';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

const DEFAULT_MIDDLE_WARE = [
    thunkMiddleware,
    promiseMiddleware,
    createLogger()
];

const finalCreateStore = applyMiddleware.apply(
    null,
    DEFAULT_MIDDLE_WARE.concat([])
)(createStore);

export default function configureStore(initialState) {
      const store = finalCreateStore(rootReducer, initialState);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
