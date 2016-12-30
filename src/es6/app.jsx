import React from 'react';
import { render } from 'react-dom';
import MonitorComponent from './components/monitor-component.jsx';

const root = document.querySelector('main');

render(<MonitorComponent />, root);

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
// 
// 作者：张轩
// 链接：https://zhuanlan.zhihu.com/p/20616464
//     来源：知乎
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
