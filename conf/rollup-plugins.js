import eslint from 'rollup-plugin-eslint';
import buble from 'rollup-plugin-buble'
import commonjs from 'rollup-plugin-commonjs';
import commonjsConf from './commonjs.js';
import globals from 'rollup-plugin-node-globals'
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import resolveConf from './resolve.js';
import uglify from 'rollup-plugin-uglify';

const DEV_SERVER_HOST = 'window.location.host';
const PRO_SERVER_HOST = '\'10.0.3.16\'';

const basePlugins = [
    buble(),
    commonjs(commonjsConf),
    globals()
];
const ENV = {
    'local': {
        prePlugins: [
        ],
        postPlagins: [
            replace({
                'process.env.NODE_ENV': JSON.stringify('development'),
                'SERVER_HOST': DEV_SERVER_HOST
            }),
            resolve(resolveConf)
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
            }),
            resolve(resolveConf)
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
            uglify(),
            resolve(resolveConf)
        ]
    }
};

function getPlugins(key){
    key = key || 'development';
    let env = ENV[key];
    return [].concat(env.prePlugins, basePlugins, env.postPlagins);
}
export { getPlugins };
export default getPlugins;
