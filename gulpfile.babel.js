import gulp from 'gulp';
import del from 'del';
import mkdirp from 'mkdirp';

import conf from './conf';
import rollup from './conf/rollup.js';

import { create } from 'browser-sync';
const bs = create();

const clean = () => del([ conf.build.dest ]);

function scripts(){
    conf.build.scripts.dirs.forEach(mkdirp.sync);
    return rollup();
}
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

const build = gulp.series(clean, gulp.parallel(html, styles, scripts));
export { build };

const server = gulp.series(build, function(){
    bs.init(conf.browserSync);
    gulp.watch(conf.build.scripts.watch).on('change', gulp.series(scripts, bs.reload));
    gulp.watch(conf.build.html.src).on('change', gulp.series(html, bs.reload));
});
export { server };

export default build;
