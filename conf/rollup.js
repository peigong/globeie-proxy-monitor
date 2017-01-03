import fs from 'fs';
import conf from './build.js';
import { rollup } from 'rollup';
import { getPlugins } from './rollup-plugins.js';

let cache;
let options = {
    cache: cache,
	sourceMap: true,
	entry: conf.scripts.src,
};
options.plugins = getPlugins(process.env.NODE_ENV);

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
