import gulp from 'gulp';
import del from 'del';
import mkdirp from 'mkdirp';

import conf from './conf';
import rollup from './conf/rollup.js';

import { create } from 'browser-sync';
const bs = create();

const error = console.error.bind( console ); // eslint-disable-line no-console
function stderr(message){
    error(message);
    bs.notify(message);
}

const clean = () => del([ conf.build.dest ]);

function html() {
	return gulp.src(conf.build.html.src)
    .pipe(gulp.dest(conf.build.html.dest))
    .pipe(bs.stream());
}
function styles() {
	return gulp.src(conf.build.styles.src)
	.pipe(gulp.dest(conf.build.styles.dest))
    .pipe(bs.stream());
}

const build = gulp.series(clean, gulp.parallel(html, styles, rollup.build));
export { build };

const server = gulp.series(clean, gulp.parallel(html, styles), function watch(){
    bs.init(conf.browserSync);
    gulp.watch(conf.build.html.src).on('change', html);
    rollup.watch(event => {
        switch (event.code) {
            case 'STARTING':
                stderr('[BS] checking rollup-watch version...');
                break;
            case 'BUILD_START':
                stderr('[BS] bundling...');
                break;
            case 'BUILD_END':
                stderr('[BS] bundled in ' + event.duration + 'ms. Watching for changes...');
                bs.reload(conf.build.scripts.dest);
                break;
            case 'ERROR':
                stderr(`[BS] ${ event.error.message }`);
                break;
            default:
                stderr('[BS] unknown event', event);
        }
    });
});
export { server };

export default build;
