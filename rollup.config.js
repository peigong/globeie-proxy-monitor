
import buble from 'rollup-plugin-buble'
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

const config = {
	entry: './src/es6/app.js',
	sourceMap: 'inline',
	plugins: [
		resolve({
			jsnext: true
		}),
		commonjs({
			include: [
				'node_modules/react/**',
				'node_modules/react-dom/**'
			]
		}),
		buble()
	]
};

export default config;
