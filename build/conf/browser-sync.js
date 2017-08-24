import { parse } from 'url';
import { readFile } from 'fs';
import { join } from 'path';
import logger from 'connect-logger';

const dist = 'dist/monitor';
const server = 'dist/server';

export default {
	server: {
		baseDir: [ dist, server ],
        index: 'index.html'
	},
	middleware: [
        logger(),
        function(req, res, next){
            let url = req.url;
            let reg = /php/;
            if(reg.test(url)){
                let arr = url.split('php');
                let filename = join(__dirname, '..', 'stub', arr[0]) + 'json';
                let query = parse(url, true).query || {};
                let callback = query.callback || '';
                readFile(filename, { encoding: 'utf-8' }, function(err, data){
                    data = data || '';
                    data = data.replace(/^\s+|\s+$/, '');
                    if(err){
                        data = err.message;
                    }
                    if(callback){
                        data = [ 'window.', callback, ' && window.', callback, '(', data, ');' ].join('');
                    }
                    res.end(data);
                });
            }else{
                next();
            }
        }
	]
};
