import { connect } from 'react-redux';
import ads from '../models/ads.js';
import Device3Component from '../components/device3-component.jsx';

const mapStateToProps = (state = {}) => {
    let images = state.images || {};
    return {
        images: Object.assign({}, ads, images)
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
