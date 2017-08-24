export default {
    babelrc: false,
    presets: [
        [ 'es2015', { modules: false } ],
        'es2015-rollup',
        'react'
    ],
    exclude: 'node_modules/**'
};
