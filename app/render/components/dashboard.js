'use strict';

import DashboardNav from './dashboard-nav.js';

import React, { Component, PropTypes } from 'react';
class Dashboard extends Component {
    render() {
        const { children, history: { pushState} } = this.props;

        return (
            <div className="dashboard container-fluid">
                <div className="row">
                    <div className="col-xs-12 col-sm-4">
                        <nav className="navigation" role="navigation">
                            <h1 className="logo text-center">
                                <abbr title="lavabot">lavabot</abbr>
                            </h1>
                            <DashboardNav />
                        </nav>
                    </div>
                    <div className="col-xs-12 col-sm-8">
                        {children}
                    </div>
                </div>
            </div>
        );
    }
};

Dashboard.displayName = 'Dashboard';

Dashboard.propTypes = {
    children: PropTypes.node.isRequired,
    history: PropTypes.object.isRequired,
};

export default Dashboard;
