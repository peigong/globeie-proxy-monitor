import gulp from 'gulp';
import del from 'del';

import { rollup } from 'rollup';
import { create } from 'browser-sync';
import conf from './conf';

const bs = create();

const clean = () => del([ conf.build.dest ]);

export function html() {
	return gulp.src(conf.build.html.src)
    .pipe(gulp.dest(conf.build.html.dest))
    .pipe(bs.stream());
}

export function styles() {
	return gulp.src(conf.build.styles.src)
	.pipe(gulp.dest(conf.build.styles.dest))
    .pipe(bs.stream());
}

export function scripts() {
	return rollup(conf.rollup)
	.then(bundle => {
		return bundle.write({
            format: 'iife',
			dest: conf.build.scripts.dest
		});
	});
}

const build = gulp.series(clean, gulp.parallel(html, styles, scripts));
export { build };

const server = gulp.series(build, function(){
    bs.init(conf.browserSync);
    gulp.watch(conf.build.html.src).on('change', gulp.series(html, bs.reload));
});
export { server };

export default build;
