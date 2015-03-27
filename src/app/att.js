define(['app/utils', 'app/monitor', 'app/counter'], function(utils, Monitor, Counter){
    function Att(client, proxy, errors){
        this.settings = {
            client: client,
            proxy: proxy
        };
        this.monitor = new Monitor(client, proxy);
        this.counter = new Counter(client, proxy, errors);
    }
    Att.prototype = {
        start: function(){
            this.update();
            this.monitor.start();
        },
        update: function(){
            var that = this,
                client = that.settings.client,
                proxy = that.settings.proxy;
            that.counter.increase();
            utils.jsonp(proxy.fetch, { device: client.device }, function(data){
                if(data){
                    if(data.hasOwnProperty('error')){
                        if(data['error']){
                            that.counter.report(data['error']);
                        }else{
                            that.refresh(data);
                        }
                    }else{
                        that.counter.report('302');
                    }
                }else{
                    that.counter.report('301');
                }
                setTimeout(function(){
                    thia.update();
                }, 1e3);
            }, function(){
                that.counter.report('202');
                setTimeout(function(){
                    thia.update();
                }, 1e3);
            });
        },
        refresh: function(data){
            if(data.hasOwnProperty('number') &&
                data.hasOwnProperty('name') &&
                data.hasOwnProperty('time')){

                var date = data.time.split(' ');
                var old_time = $.trim($('.time', '#board').html());
                if(old_time != date[1]){
                    $('.number', '#warp').html(data.number);
                    $('.name', '#warp').html(data.name);
                    $('.date', '#warp').html(date[0]);
                    $('.time', '#warp').html(date[1]);
                }
            }
        }
    };

    return Att;
});