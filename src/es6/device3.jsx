import React from 'react';
import { render } from 'react-dom';
import Layout from './layout.jsx';
import Monitor from './monitor.jsx';

const root = document.querySelector('main');
render((
        <Layout>
            <Monitor device="3" />
        </Layout>
), root);

// setTimeout(function(){
//     location.reload(true);
// }, 30 * 60 * 1e3);
