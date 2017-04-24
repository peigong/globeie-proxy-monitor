import React, { PropTypes, Component } from 'react';
import { AttMonitor } from './component.css';

console.log(AttMonitor);

export default class Monitor extends Component {
    componentWillMount(){
        let { device, onWillMount } = this.props;
        onWillMount(device);
    }
    render(){
        let { name, number, date, time } = this.props;
        return (
            <div>{ name } => { number } => { date } => { time }</div>
        );
    }
}

Monitor.propTypes = {
};
