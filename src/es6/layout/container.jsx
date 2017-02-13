import { connect } from 'react-redux';
import { fetchAds } from '../ads/action.js';
import Component from './component.jsx';

const mapStateToProps = (state = {}) => {
    let images = state.images || {};
    return {
        images: Object.assign({}, images)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onWillMount: device => dispatch(fetchAds())
    };
};

const Container = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component);

export default Container;
