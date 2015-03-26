define(['app/utils', 'app/monitor', 'app/counter'], function(utils, Monitor, Counter){
    var timer = null, 
        monitor = focus.create(client.floor),
        counter = Counter.create(client.floor);

    function refresh(data){
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

    function update(){
        counter.increase();
        utils.jsonp(proxy.fetch, { device: client.device }, function(data){
            if(data){
                if(data.hasOwnProperty('error')){
                    if(data['error']){
                        counter.report(data['error']);
                    }else{
                        refresh(data);
                    }
                }else{
                    counter.report('302');
                }
            }else{
                counter.report('301');
            }
            setTimeout(update, 1e3);
        }, function(){
            counter.report('202');
            setTimeout(update, 1e3);
        });
    }

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
        }
    };

    return Att;
});