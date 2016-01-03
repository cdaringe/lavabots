/**
 * Use React Router to implement application routing.
 *
 * @{@link  http://rackt.github.io/react-router/}
 * @{@link  https://github.com/rackt/react-router}
 */
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Dashboard from './components/dashboard';
import DashboardHome from './components/dashboard-home';
import DashboardBots from './components/dashboard-bots';

export default (
    <Route component={App}>
        <Route path="/" component={Dashboard}>
            <IndexRoute component={DashboardHome} />
            <Route path="/bots" component={DashboardBots} />
        </Route>
    </Route>
);

/**
 * for ref only:
<Route path="signup" component={Signup} />
    <Route path="/" component={Dashboard} onEnter={requireAuth}>
        <IndexRoute component={DashboardHome} />
        <Route path="/consortia" component={DashboardConsortia} />
    </Route>
 */
