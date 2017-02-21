import React from 'react';
import { render } from 'react-dom';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import ads from './ads/reducer.js';
import att from './att/reducer.js';
import FocusMonitor from './att/focus.js';
import createErrorReport from './error/middleware.js';
import Layout from './layout/container.jsx';
import Monitor from './monitor/container.jsx';

const DEVICE = '3';

const reportMiddleware = createErrorReport(DEVICE);
const store = createStore(
    combineReducers({ ads, att }),
    applyMiddleware(
        reportMiddleware,
        thunkMiddleware // 允许我们 dispatch() 函数
    )
);

new FocusMonitor(DEVICE, store);

const root = document.querySelector('main');
render((
        <Provider store={ store }>
            <Layout>
                <Monitor device={ DEVICE } />
            </Layout>
        </Provider>
), root);

setTimeout(function(){
    location.reload(true);
}, 30 * 60 * 1e3);
