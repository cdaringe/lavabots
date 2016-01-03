'use strict';
import React from 'react';
import { connect } from 'react-redux';
import * as allActions from '../../actions/index.js';
import { _ } from 'lodash';

class BotControlPanel extends React.Component {

    render() {
        const { bot, handleCmd } = this.props;
        return (
            <div className="dashboard-bots container">
                <h2>{bot.attributes.name}</h2>
                {_.range(5).map((val, ndx) => {
                    return (
                        <p key={'bot_control_panel_' + ndx}>
                        <span>{'DO_' + ndx + ': '}</span>
                        <input type="checkbox" onClick={() => {
                            handleCmd({ cmd: 'toggleBit', arg: ndx.toString() });
                        }} />
                        </p>
                    );
                })}
            </div>
        );
    }
};

export default BotControlPanel;
