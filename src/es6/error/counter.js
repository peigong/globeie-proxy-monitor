import { errors, thresholds } from './settings.js';

export default class ErrorCounter {
    constructor(device){
        this.device = device;
        this.total = new Map();
        this.counter = new Map();
        this.initialise();
    }
    initialise(){
        errors.forEach((val, key, map) => {
            this.total.set(key, 0);
            // 历史参数floor为楼层，在0.2.0版本修改为设备编号
            this.counter.set(key, { floor: this.device, err: err, count: 0 });
        });
    }
    report:(err){
        let { count }, error = this.counter.get(err);
        error.count = count + 1;
    }
    increase(){
        errors.forEach((val, key, map) => {
            let total = this.total.get(key) + 1;
            this.total.set(key, total);
            let { toplimit, threshold } = thresholds.get('default');
            if(thresholds.has(key)){
                toplimit = thresholds.get(key).get('toplimit');
                threshold = thresholds.get(key).get('threshold');
            }
            if(total > toplimit){
                let error = this.counter.get(key);
                let rate = error.count / total;
                //监测总数到达限制条件，且到达故障率阀值
                if(rate > threshold){
                    let host = SERVER_HOST;
                    const options = {
                        method: 'GET',
                        mode: 'cors'
                    };
                    fetch(`http://${ host }/att/proxy/warning.php`, options, error)
                }

                //恢复初始计数
                error.count = 0;
                this.total.set(key, 0);
            }
        });
    }
}
