'use strict';
import React from 'react';
import { connect } from 'react-redux';
import * as allActions from '../actions/index.js';
import { _ } from 'lodash';
import DashboardBotsView from './dashboard-bots-view.js';

class DashboardBots extends React.Component {

    handleCmd(opts) {
        const { dispatch } = this.props;
        dispatch(allActions.callCmd({
            cmd: opts.cmd,
            arg: opts.arg
        }));
    }

    componentWillMount() {
        let { bots, dispatch } = this.props;
        // authorize
        if (bots.authorized === undefined) {
            dispatch(allActions.authBots(function() {
                dispatch(allActions.fetchBots());
            }));
        }
    }

    componentWillUnmount() {
        let { dispatch } = this.props;
        dispatch(allActions.clearBots());
    }

    render() {
        return (
            <DashboardBotsView
                handleCmd={this.handleCmd.bind(this)}
                {...this.props.bots}
            />
        );
    }

    shouldComponentUpdate() {
        return true;
    }

};

function select(state) {
    return {
        bots: state.bots
    };
}

export default connect(select)(DashboardBots);
