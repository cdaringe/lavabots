'use strict';
import React from 'react';
import { connect } from 'react-redux';
import * as allActions from '../../actions/index.js';
import { _ } from 'lodash';

class BotControlPanel extends React.Component {

    render() {
        const { bot, handleCmd, refreshBot, inFlightDOs } = this.props;
        let header, body;
        if (bot.connected) {
            header = ( <h2>{bot.attributes.name}</h2> );
            body = (
                <div>
                <button type="button" onClick={() => refreshBot(bot)}>Refresh</button>
                    {_.range(8).map((val, ndx) => {
                        return (
                            <p key={'bot_control_panel_' + ndx}>
                                <span>{'DO_' + ndx + ': '}</span>
                                <input
                                    type="checkbox"
                                    checked={bot.DOs && bot.DOs[ndx]}
                                    disabled={_.contains(inFlightDOs, ndx)}
                                    onClick={(evt) => {
                                        handleCmd({ cmd: 'togglebit', bot, arg: ndx });
                                    }} />
                            </p>
                        );
                    })}
                </div>
            );
        } else {
            header =  ( <h4>{bot.attributes.name}</h4> );
            body = 'Disconnected.  Please power on and connect the bot';
        }
        return (
            <div className="dashboard-bots container">
                { header }
                { body }
            </div>
        );
    }
};

export default BotControlPanel;
