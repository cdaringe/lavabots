require('babel/polyfill');
require('../common/utils/promise-uncaught-polyfill.js')({ root: window });
import path from 'path';
import app from 'ampersand-app';
import createHistory from 'history/lib/createHashHistory';
import { Provider } from 'react-redux';
import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';

import configureStore from './store/configureStore';
import routes from './routes';

app.isDev = window.NODE_ENV === 'development';

const store = configureStore();
const history = createHistory();

// Load application stylesheets
require('./styles/app.scss');

render(
    <Provider store={store}>
        <Router history={history} routes={routes} />
    </Provider>,
    document.getElementById('app')
);

window.app = app;

window.onerror = function(err) {
    console.error('unhandled error');
    if (err && err.message) {
        console.error(err.message);
    }
    console.dir(err);
}
console.info('>> renderer process up');
