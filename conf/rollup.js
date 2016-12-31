import fs from 'fs';
import conf from './build.js';
import { rollup } from 'rollup';
import resolve from 'rollup-plugin-node-resolve';
import resolveConf from './resolve.js';
import commonjs from 'rollup-plugin-commonjs';
import commonjsConf from './commonjs.js';
import globals from 'rollup-plugin-node-globals'
import eslint from 'rollup-plugin-eslint';
import buble from 'rollup-plugin-buble'
import ascii from 'rollup-plugin-ascii'
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import filesize from 'rollup-plugin-filesize';

var cache;
const options = {
    cache: cache,
	sourceMap: true,
	entry: conf.scripts.src,
	plugins: [
		resolve(resolveConf),
		commonjs(commonjsConf),
        globals(),
        eslint(),
		buble(),
		ascii(),
		replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
        (process.env.NODE_ENV === 'production' && uglify()),
        filesize()
	]
};

export default function build(){
	return rollup(options)
	.then(bundle => {
        var result = bundle.generate({
            // output format - 'amd', 'cjs', 'es', 'iife', 'umd'
            format: 'iife'
        });
        cache = bundle;
        fs.writeFileSync(conf.scripts.dest, result.code);
		return bundle.write({
            format: 'iife',
			dest: conf.scripts.dest
		});
	});
};
