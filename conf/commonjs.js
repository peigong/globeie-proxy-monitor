
export default {
    include: [
        'node_modules/react/**',
        'node_modules/react-dom/**'
    ],
    namedExports: {
        'node_modules/react-dom/index.js': [ 'render' ]
    }
}
