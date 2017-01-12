import { connect } from 'react-redux';
import { fetchAttendance, receiveAttendance } from '../actions/attendance.js';
import MonitorComponent from '../components/monitor-component.jsx';

const mapStateToProps = (state) => {
    let { name, number, date, time } = state;
    return { name, number, date, time };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onWillMount: device => dispatch(fetchAttendance(device))
    };
};

const MonitorContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MonitorComponent);

export default MonitorContainer;
