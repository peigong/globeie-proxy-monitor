export default {
    babelrc: false,
    presets: [
        [ 'es2015', { modules: false } ],
        'es2015-rollup',
        'react'
    ],
    resolveModuleSource: function(source, filename){
        if(source.lastIndexOf('.css') > -1){
            source += '.js';
        }
        return source;
    },
    exclude: 'node_modules/**'
};
