import { connect } from 'react-redux';
import MonitorComponent from '../components/monitor-component.jsx';

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

const MonitorContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MonitorComponent);

export default MonitorContainer;
