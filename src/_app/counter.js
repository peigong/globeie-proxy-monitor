/**
* @module {counter} 错误计数器。
*/
define(['app/utils'], function(utils){
    function ErrorCounter(client, proxy, errors){
        this.floor = client.floor;
        this.settings = { proxy: proxy, errors: errors };
        this.total = {};
        this.counter = {};
        this.initialise();
    }
    ErrorCounter.prototype = {
        initialise: function(){
            var errors = this.settings.errors;
            for(var err in errors.errors){
                if(errors.errors.hasOwnProperty(err)){
                    this.total[err] = 0;
                    this.counter[err] = { floor: this.floor, err: err, count: 0 };
                }
            }
        },
        report: function(err){
            this.counter[err].count = this.counter[err].count + 1;
        },
        increase: function(){
            var proxy = this.settings.proxy,
                errors = this.settings.errors;
            for(var err in errors.errors){
                if(errors.errors.hasOwnProperty(err)){
                    this.total[err] = this.total[err] + 1;

                    var toplimit = errors.thresholds['default'].toplimit;
                    if(errors.thresholds.hasOwnProperty(err)){
                        toplimit = errors.thresholds[err].toplimit;
                    }

                    var threshold = errors.thresholds['default'].threshold;
                    if(errors.thresholds.hasOwnProperty(err)){
                        threshold = errors.thresholds[err].threshold;
                    }

                    if(this.total[err] > toplimit){
                        var error = this.counter[err];
                        //监测总数到达限制条件，且到达故障率阀值
                        if(error.count/this.total[err] > threshold){
                            utils.send(proxy.warning, error);
                        }
                        //恢复初始计数
                        this.total[err] = 0;
                        this.counter[err].count = 0;
                    }
                }
            }
        }
    };

    return ErrorCounter;
});