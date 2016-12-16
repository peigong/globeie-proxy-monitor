
import buble from 'rollup-plugin-buble'
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';

const config = {
	entry: './src/es6/app.js',
	sourceMap: true,
	plugins: [
		buble(),
		commonjs({
			include: [
				'node_modules/react/**',
				'node_modules/react-dom/**'
			]
		}),
		replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
		resolve({
			jsnext: true,
			browser: true,
			main: true
		})
	]
};

export default config;
