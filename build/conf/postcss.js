import esModules from 'es-css-modules';

export default {
    plugins: [
        esModules({
            jsFiles: [
                'src/es6/monitor/component.jsx'
            ]
        })
    ]
};
