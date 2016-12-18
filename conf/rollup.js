
import resolve from 'rollup-plugin-node-resolve';
import resolveConf from './resolve.js';
import commonjs from 'rollup-plugin-commonjs';
import commonjsConf from './commonjs.js';
import globals from 'rollup-plugin-node-globals'
import replace from 'rollup-plugin-replace';
import eslint from 'rollup-plugin-eslint';
import buble from 'rollup-plugin-buble'
import uglify from 'rollup-plugin-uglify';

const config = {
	entry: './src/es6/app.js',
    dest: './dist/monitor/js/app.js',
    format: 'iife',
	sourceMap: true,
	plugins: [
		resolve(resolveConf),
		commonjs(commonjsConf),
        globals(),
        eslint(),
		buble(),
		replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
        (process.env.NODE_ENV === 'production' && uglify())
	]
};

export default config;
