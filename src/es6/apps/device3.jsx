import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import defaultAds from '../models/ads.js';
import { fetchAds, receiveAds } from '../actions/ads.js';
import reducers from '../reducers/ads.js';
import Device3Container from '../containers/device3-container.jsx';

const root = document.querySelector('main');
const store = createStore(
    reducers,
    applyMiddleware(
        thunkMiddleware // 允许我们 dispatch() 函数
    )
);
store.dispatch(receiveAds(defaultAds));
store.dispatch(fetchAds());

render(
    (
        <Provider store={store}>
            <Device3Container />
        </Provider>
    )
, root);
