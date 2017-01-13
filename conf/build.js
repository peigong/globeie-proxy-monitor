const src = './src';
const dest = './dist/monitor'; 
const html = {
    src: `${ src }/html/**.html`,
    dest: dest
};
const styles = {
    src: `${ src }/src/less/**.less`,
    dest: `${ dest }/css/`
};
const scripts = {
    watch: `${ src }/es6/**/**.jsx`,
    src: `${ src }/es6/device3.jsx`,
    dirs: [ `${ dest }/js` ],
    dest: `${ dest }/js/device3.js`
};

export default {
    dest,
    html,
    styles,
    scripts
};
