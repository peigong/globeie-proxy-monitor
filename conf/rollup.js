import resolve from 'rollup-plugin-node-resolve';
import resolveConf from './resolve.js';
import commonjs from 'rollup-plugin-commonjs';
import commonjsConf from './commonjs.js';
import globals from 'rollup-plugin-node-globals'
import jsx from 'rollup-plugin-jsx'
import eslint from 'rollup-plugin-eslint';
import buble from 'rollup-plugin-buble'
import ascii from 'rollup-plugin-ascii'
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import filesize from 'rollup-plugin-filesize';

const config = {
	entry: './src/es6/app.jsx',
	sourceMap: true,
	plugins: [
		resolve(resolveConf),
		commonjs(commonjsConf),
        globals(),
        //jsx({factory: 'React.createElement'}),
        eslint(),
		buble(),
		ascii(),
		replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
        (process.env.NODE_ENV === 'production' && uglify()),
        filesize()
	]
};

export default config;
