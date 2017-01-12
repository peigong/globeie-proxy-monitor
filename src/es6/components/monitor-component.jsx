import React, { PropTypes, Component } from 'react';

export class MonitorComponent extends Component {
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

MonitorComponent.propTypes = {
};

export default MonitorComponent;
