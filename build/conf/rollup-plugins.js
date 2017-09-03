import eslint from 'rollup-plugin-eslint';
import babel from 'rollup-plugin-babel'
import babelConf from './babel.js';
import commonjs from 'rollup-plugin-commonjs';
import commonjsConf from './commonjs.js';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import resolveConf from './resolve.js';
import uglify from 'rollup-plugin-uglify';

// const DEV_SERVER_HOST = 'window.location.host';
const DEV_SERVER_HOST = '\'10.86.40.71:3000\'';
const PRO_SERVER_HOST = '\'10.0.3.16\'';

const basePlugins = [
    babel(babelConf),
    resolve(resolveConf),
    commonjs(commonjsConf)
];
const ENV = {
    'local': {
        prePlugins: [
        ],
        postPlagins: [
            replace({
                'process.env.NODE_ENV': JSON.stringify('development'),
                'SERVER_HOST': DEV_SERVER_HOST
            })
        ]
    },
    'development': {
        prePlugins: [
            eslint()
        ],
        postPlagins: [
            replace({
                'process.env.NODE_ENV': JSON.stringify('development'),
                'SERVER_HOST': DEV_SERVER_HOST
            })
        ]
    },
    'production': {
        prePlugins: [
            eslint()
        ],
        postPlagins: [
            replace({
                'process.env.NODE_ENV': JSON.stringify('production'),
                'SERVER_HOST': PRO_SERVER_HOST
            }),
            uglify()
        ]
    }
};

function getPlugins(key){
    key = key || 'development';
    let env = ENV[key];
    return [].concat(env.prePlugins, basePlugins, env.postPlagins);
}
export default getPlugins;
