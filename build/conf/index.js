import build from './build.js';
import getPlugins from './rollup-plugins.js';
import postcss from './postcss.js';
import browserSync from './browser-sync.js';

export default {
    build: build,
    getPlugins: getPlugins,
    postcss: postcss,
    browserSync: browserSync
}
