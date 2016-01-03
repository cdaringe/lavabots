'use strict';
import React from 'react';
import BotControlPanel from './bot/control-panel.js';

class DashboardBotsView extends React.Component {
    _renderAuthorizing() {
        return (
            <div className="alert info">
                <p>Attempting to authorize...</p>
            </div>
        );
    }

    _renderBots(opts) {
        let { bots, handleCmd } = opts;
        return bots.map((bot, ndx) => {
            return (
                <div key={'bot-' + ndx}>
                    <BotControlPanel bot={bot} {...opts} />
                </div>
            );
        });
    }

    _renderFetchingBots() {
        return (
            <div className="alert info">
                <p>Sniffing for your web-bots...</p>
            </div>
        );
    }

    _renderUnauthorized() {
        return (
            <div className="alert danger">
                <p>Unauthorized</p>
            </div>
        );
    }

    render() {
        let { authorized, authorizing, fetching, available, handleCmd } = this.props;
        let content;

        if (!authorized) {
            content = authorizing ? this._renderAuthorizing() : this._renderUnauthorized();
        } else if (fetching) {
            content = this._renderFetchingBots();
        } else if (available) {
            content = this._renderBots({ bots: available, handleCmd });
        } else {
            content = (
                <p>An error has occured.  We were unable to authorize and
                    fetch your bots</p>
            );
        }

        return (
            <div className="dashboard-bots container">
                <h1>Bot Matrix</h1>
                {content}
            </div>
        );
    }
};

export default DashboardBotsView;
