import util from '../util.js';
import { errors, thresholds } from './settings.js';

export default class ErrorCounter {
    constructor(device){
        this.device = device;
        this.total = new Map();
        this.counter = new Map();
        this.initialise();
    }
    initialise(){
        Object.keys(errors).forEach((key) => {
            this.total.set(key, 0);
            // 历史参数floor为楼层，在0.2.0版本修改为设备编号
            this.counter.set(key, { floor: this.device, err: key, count: 0 });
        });
    }
    report(err){
        let total = this.total.get(err) + 1;
        this.total.set(err, total);

        let error = this.counter.get(err);
        error.count ++;

        let { toplimit, threshold } = thresholds['default'];
        if(thresholds.hasOwnProperty(err)){
            toplimit = thresholds[err]['toplimit'];
            threshold = thresholds[err]['threshold'];
        }
        if(total > toplimit){
            let rate = error.count / total;
            //监测总数到达限制条件，且到达故障率阀值
            if(rate > threshold){
                let host = SERVER_HOST;
                // const options = {
                //     method: 'GET',
                //     mode: 'cors'
                // };
                let params = Object.keys(error)
                    .map((key) => `${ key }=${ error[key] }`)
                    .join('&');

                // fetch(`http://${ host }/att/proxy/warning.php?${ params }`, options);
                util.send(`http://${ host }/att/proxy/warning.php?${ params }`);
            }

            // 达到监测总数，没有达到故障阀值，不必上报错误
            //恢复初始计数
            error.count = 0;
            this.total.set(err, 0);
        }
    }
}
