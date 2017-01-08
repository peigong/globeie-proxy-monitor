
export default {
    include: [
        'node_modules/fbjs/**',
        'node_modules/hoist-non-react-statics/**',
        'node_modules/invariant/**',
        'node_modules/object-assign/**',
        'node_modules/react/**',
        'node_modules/react-dom/**',
        'node_modules/react-redux/**'
    ],
    namedExports: {
        'node_modules/react/react.js': [
            'createElement',
            'Component',
            'Children',
            'PropTypes'
        ],
        'node_modules/react-dom/index.js': [ 'render' ]
    }
};
