import conf from './build.js';
import * as rollup from 'rollup';
import createWatcher from 'rollup-watch';
import { getPlugins } from './rollup-plugins.js';

let options = {
	sourceMap: true,
	entry: conf.scripts.src,
    dest: conf.scripts.dest
};
options.plugins = getPlugins(process.env.NODE_ENV);

function watch(callback){
    const watcher = createWatcher(rollup, options);
    if('function' === typeof callback){
        watcher.on('event', callback);
    }
}

function build(){
	return rollup.rollup(options)
	.then(bundle => {
		return bundle.write({
            format: 'iife',
            sourceMap: true,
            dest: conf.scripts.dest
		});
	});
};

export default { watch, build };
