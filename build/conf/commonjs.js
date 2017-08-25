
export default {
    include: 'node_modules/**',
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
