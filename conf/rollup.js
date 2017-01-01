import fs from 'fs';
import conf from './build.js';
import { rollup } from 'rollup';
import eslint from 'rollup-plugin-eslint';
import buble from 'rollup-plugin-buble'
import commonjs from 'rollup-plugin-commonjs';
import commonjsConf from './commonjs.js';
import globals from 'rollup-plugin-node-globals'
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import resolveConf from './resolve.js';
import uglify from 'rollup-plugin-uglify';

var cache;
const options = {
    cache: cache,
	sourceMap: true,
	entry: conf.scripts.src,
	plugins: [
        eslint(),
		buble(),
		commonjs(commonjsConf),
        globals()
	]
};
if(process.env.NODE_ENV === 'production'){
    options.plugins.push(replace({ 'process.env.NODE_ENV': JSON.stringify('production') }));
    options.plugins.push(uglify());
}else{
    options.plugins.push(replace({ 'process.env.NODE_ENV': JSON.stringify('development') }));
}
options.plugins.push(resolve(resolveConf));

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
            sourceMap: true,
			dest: conf.scripts.dest
		});
	});
};
