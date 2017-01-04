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
            let reg = /php$/;
            if(reg.test(url)){
                let filename = join(__dirname, '..', 'stub', url.replace(reg, 'json'));
                readFile(filename, function(err, data){
                    if(err){
                        data = err.message;
                    }
                    res.end(data);
                });
            }else{
                next();
            }
        }
	]
}
