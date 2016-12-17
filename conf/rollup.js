
import buble from 'rollup-plugin-buble'
import commonjs from 'rollup-plugin-commonjs';
import commonjsConf from './commonjs.js';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';

const config = {
	entry: './src/es6/app.js',
    format: 'iife',
	sourceMap: true,
	plugins: [
		buble(),
		commonjs(commonjsConf),
		replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
		resolve({
			jsnext: true
		})
	]
};

export default config;
