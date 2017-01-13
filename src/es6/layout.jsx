import React, { PropTypes, Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './ads/reducer.js';
import LayoutContainer from './layout/container.jsx';

const store = createStore(
    reducers,
    applyMiddleware(
        thunkMiddleware // 允许我们 dispatch() 函数
    )
);

export default class Layout extends Component {
    render() {
        let { children } = this.props;
        return (
            <Provider store={ store }>
                <LayoutContainer>
                { children }
                </LayoutContainer>
            </Provider>
        );
    }
};
