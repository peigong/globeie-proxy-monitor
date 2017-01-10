
export default {
    include: [
        'node_modules/fbjs/**',
        'node_modules/hoist-non-react-statics/**',
        'node_modules/invariant/**',
        'node_modules/object-assign/**',
        'node_modules/deep-diff/**',
        'node_modules/react/**',
        'node_modules/react-dom/**',
        'node_modules/react-redux/**',
        'node_modules/redux-logger/**'
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
