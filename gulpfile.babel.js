import gulp from 'gulp';
import del from 'del';

import { rollup } from 'rollup';
import { create } from 'browser-sync';
import conf from './conf';

const bs = create();

const clean = () => del([ 'dist/monitor' ]);
export { clean };

export function html() {
	return gulp.src('./src/html/**.html')
    .pipe(gulp.dest('./dist/monitor/'))
    .pipe(bs.stream());
}

export function styles() {
	return gulp.src('./src/less/**.less')
	.pipe(gulp.dest('./dist/monitor/css/'))
    .pipe(bs.stream());
}

export function scripts() {
	return rollup(conf.rollup)
	.then(bundle => {
		return bundle.write({
            format: 'iife',
			dest: './dist/monitor/js/app.js'
		});
	});
}

export function server(){
    bs.init(conf.browserSync);
    gulp.watch('./src/html/**.html').on('change', bs.reload);
}
const build = gulp.series(clean, gulp.parallel(html, styles, scripts));
export { build };

export default build;
