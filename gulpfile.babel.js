import gulp from 'gulp';
import del from 'del';

import { rollup } from 'rollup';
import conf from './conf';

const clean = () => del([ 'dist/monitor' ]);
export { clean };

export function styles() {
	return gulp.src('./src/less/**.less')
	.pipe(gulp.dest('./dist/monitor/css/'));
}

export function scripts() {
	return rollup(conf.rollup)
	.then(bundle => {
		return bundle.write({
			format: 'cjs',
			dest: './dist/monitor/js/app.js'
		});
	});
}

const build = gulp.series(clean, gulp.parallel(styles, scripts));
export { build };

export default build;
