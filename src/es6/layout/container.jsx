import { connect } from 'react-redux';
import { fetchAds } from '../ads/action.js';
import Component from './component.jsx';

const mapStateToProps = (state = {}) => {
    let ads = Object.assign({}, state.ads);
    return { ads };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onWillMount: () => dispatch(fetchAds())
    };
};

const Container = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component);

export default Container;
