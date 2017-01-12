import { connect } from 'react-redux';
import Device3Component from '../components/device3-component.jsx';

const mapStateToProps = (state = {}) => {
    let images = state.images || {};
    return {
        images: Object.assign({}, images)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

const Device3Container = connect(
    mapStateToProps,
    mapDispatchToProps
)(Device3Component);

export default Device3Container;
