import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './att/reducer.js';
import MonitorContainer from './monitor/container.jsx';

const store = createStore(
    reducers,
    applyMiddleware(
        thunkMiddleware // 允许我们 dispatch() 函数
    )
);

const Monitor = ({ device }) => (
    <Provider store={ store }>
        <MonitorContainer device={ device } />
    </Provider>
);

export default Monitor;
