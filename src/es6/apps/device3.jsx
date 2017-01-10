import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { fetchAds } from '../actions/ads.js';
import ads from '../reducers/ads.js';
import Device3Container from '../containers/device3-container.jsx';

const root = document.querySelector('main');
const store = createStore(
    ads,
    applyMiddleware(
        thunkMiddleware, // 允许我们 dispatch() 函数
        logger // 一个很便捷的 middleware，用来打印 action 日志
    )
);
store.dispatch(fetchAds());

render(
    (
        <Provider store={store}>
            <Device3Container />
        </Provider>
    )
, root);

// class extends React.Component的顺序：
// 
// static静态方法
// constructor
// getChildContext
// componentWillMount
// componentDidMount
// componentWillReceiveProps
// shouldComponentUpdate
// componentWillUpdate
// componentDidUpdate
// componentWillUnmount
// 点击回调或者事件回调 比如 onClickSubmit() 或者 onChangeDescription()
// render函数中的 getter 方法 比如 getSelectReason() 或者 getFooterContent()
// 可选的 render 方法 比如 renderNavigation() 或者 renderProfilePicture()
// render
