import React, { PropTypes, Component } from 'react';

import { attMonitor } from './component.m.css';
console.log(attMonitor);

export default class Monitor extends Component {
    componentWillMount(){
        let { device, onWillMount } = this.props;
        onWillMount(device);
    }
    render(){
        let { name, number, date, time } = this.props;
        return (
            <div className={ attMonitor }>{ name } => { number } => { date } => { time }</div>
        );
    }
}

Monitor.propTypes = {
};
