const src = './src';
const dest = './dist/monitor'; 
const html = {
    src: `${ src }/html/**.html`,
    dest: dest
};
const styles = {
    src: `${ src }/es6/**/**.css`,
    dest: `${ dest }/css/`
};
const scripts = {
    watch: `${ src }/es6/**/**.jsx`,
    src: `${ src }/es6/device3.jsx`,
    dest: `${ dest }/js/device3.js`
};

export default {
    dest,
    html,
    styles,
    scripts
};
