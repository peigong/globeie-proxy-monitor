import gulp from 'gulp';
import del from 'del';
import mkdirp from 'mkdirp';
import loadPlugins from 'gulp-load-plugins';
import { create } from 'browser-sync';
import esModules from 'es-css-modules';

import conf from './build/conf';
import rollup from './build/rollup.js';

const $ = loadPlugins();
const bs = create();

const error = console.error.bind( console ); // eslint-disable-line no-console
function stderr(message){
    error(message);
    bs.notify(message);
}

const clean = () => del([ conf.build.dest ]);

function att() {
    gulp.src('vendor/**')
    .pipe(gulp.dest('dist/server/att/proxy/vendor'));

    gulp.src('res/**')
    .pipe(gulp.dest('dist/server/att/haixuan'))
    .pipe(gulp.dest('dist/server/att/haixuan/default'));

    return gulp.src('src/att/**')
    .pipe($.replace('@@SERVICE', 'http://10.0.7.5/shishi_all.asp'))
    .pipe(gulp.dest('dist/server/att'));
}
function html() {
	return gulp.src(conf.build.html.src)
    .pipe(gulp.dest(conf.build.html.dest))
    .pipe(bs.stream());
}
function styles() {
	return gulp.src(conf.build.styles.src)
    .pipe($.postcss(conf.postcss.plugins))
	.pipe(gulp.dest(conf.build.styles.dest))
    .pipe(bs.stream());
}

const build = gulp.series(clean, gulp.parallel(att, html, styles, rollup.build));
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
