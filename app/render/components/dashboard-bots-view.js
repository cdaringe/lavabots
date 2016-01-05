'use strict';
import React from 'react';
import BotControlPanel from './bot/control-panel.js';
import { _ } from 'lodash';

class DashboardBotsView extends React.Component {
    _renderAuthorizing() {
        return (
            <div className="alert info">
                <p>Attempting to authorize...</p>
            </div>
        );
    }

    _renderBots(opts) {
        let { bots, handleCmd, inFlightDOs, refreshBots } = opts;
        const inFlightDOsByName = _.groupBy(inFlightDOs, 'name');
        return bots.map((bot, ndx) => {
            const inFlightDOs = inFlightDOsByName[bot.attributes.name] ?
                _.pluck(inFlightDOsByName[bot.attributes.name], 'DO') :
                [];
            return (
                <div key={'bot-' + ndx}>
                    <BotControlPanel
                        bot={bot}
                        inFlightDOs={inFlightDOs}
                        handleCmd={opts.handleCmd}
                        refreshBot={opts.refreshBot} />
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
        let { authorized, authorizing, fetching, bots, inFlightDOs, handleCmd, refreshBot } = this.props;
        let content;

        if (!authorized) {
            content = authorizing ? this._renderAuthorizing() : this._renderUnauthorized();
        } else if (fetching) {
            content = this._renderFetchingBots();
        } else if (bots) {
            content = this._renderBots({ bots, inFlightDOs, handleCmd, refreshBot });
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
