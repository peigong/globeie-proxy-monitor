//import simplevars from 'postcss-simple-vars';
// import bem from 'postcss-bem';
// import modules from 'postcss-modules';
import esModules from 'es-css-modules';
// import nested from 'postcss-nested';
// import cssnext from 'postcss-cssnext';
// import cssnano from 'cssnano';

// import { writeFileSync } from 'fs';

export default {
    plugins: [
        // simplevars(),
        esModules({
            jsFiles: [
                'src/es6/monitor/component.jsx'
            ],
            // getJsExports: function(cssFilename, styleExports, styleExportsObject){
            //     console.log(cssFilename);
            //     console.log(styleExports);
            //     console.log(styleExportsObject);
            //     let filename = `${cssFilename}.js`;
            //     filename = filename.replace('/src/es6/', '/.tmp/');
            //     writeFileSync(filename, styleExports);
            //     console.log(filename);
            //     return filename;
            // },
            // generateScopedName: function(className, filename, cssFileContents){
            //     console.log(className);
            //     console.log(filename);
            //     console.log(cssFileContents);
            // },
            // resolveOptions: {
            //     extensions: [ '.css', '.js', '.json', '.jsx' ]
            // }
        }),
        // bem(),
        // nested(),
        // cssnext({ warnForDuplicates: false, }),
        // cssnano(),
    ],
    // extensions: ['.css']
};
