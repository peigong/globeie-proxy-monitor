import conf from './conf';
import * as rollup from 'rollup';
import createWatcher from 'rollup-watch';

let options = {
	sourceMap: true,
	entry: conf.build.scripts.src,
    dest: conf.build.scripts.dest
};
options.plugins = conf.getPlugins(process.env.NODE_ENV);

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
            dest: conf.build.scripts.dest
		});
	});
};

export default { watch, build };
