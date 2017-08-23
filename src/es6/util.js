function send(uri){
    let img = new Image();
    img.src = uri;
}
export { send };

function fetch(uri){
    let delay = 3e3;
    let key = 'cb_' + Math.random().toString(16).substring(2);
    let sep = (-1 === uri.indexOf('?')) ? '?' : '&';
    return new Promise((resolve, reject) => {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        head.appendChild(script);

        window[key] = function(data){
            head.removeChild(script);
            clearTimeout(script.timer);
            window[key] = null;
            try{
                resolve(data);
            }catch(ex){
                reject(ex);
            }
        };

        script.src = [uri, ['callback', key].join('=')].join(sep);
        script.timer = setTimeout(() => {
            head.removeChild(script);
            window[key] = null;
            reject(new Error('fetch timeout'));
        }, delay);
    });
}
export { fetch };

export default {
    send,
    fetch
};
