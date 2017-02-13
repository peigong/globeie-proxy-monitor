import { connect } from 'react-redux';
import { fetchAtt } from '../att/action.js';
import Component from './component.jsx';

const mapStateToProps = (state) => {
    let { name, number, date, time } = state;
    return { name, number, date, time };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onWillMount: device => dispatch(fetchAtt(device))
    };
};

const Container = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component);

export default Container;
