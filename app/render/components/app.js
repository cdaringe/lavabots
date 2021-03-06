import config from 'config';
import Notify from './notification'
import React, { Component, PropTypes } from 'react';
import url from 'url';

export default class App extends Component {
    render() {
        return (
            <div className="app">
                <Notify />
                {this.props.children}
            </div>
        );
    }
}

App.displayName = 'App';

App.propTypes = {
    children: PropTypes.node,
};
