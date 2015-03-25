/**
* @module {focus} 打卡密集处理模块。
*/
define(['request', 
    'app/utils', 
    'app/settings/proxy'], function(request, utils, proxy){

    var minute = 60 * 1e3;

    function FocusMonitor(floor){
        this.floor = floor;
        this.counter = 0;
        this.mark = '';
        this.dateFilter = { include: {}, exclude: {} };
        this.timeFilter = [];
        this.r = new request.Request();
        this.initialise();
    }
    FocusMonitor.prototype = {
        initialise: function(){
            var that = this;
            utils.jsonp(proxy.settings, {}, function(data){
                if(data){
                    if(data.hasOwnProperty('error')){
                        if(data['error']){
                            that.report(data['error']);
                        }else{
                            if(data.hasOwnProperty('date')){
                                var date = data['date'];
                                that.fillDateFilter(date, 'include');
                                that.fillDateFilter(date, 'exclude');
                            }else{
                                that.report('504');
                            }
                            if(data.hasOwnProperty('time')){
                                var time = data['time'];
                                if (time[that.floor]) {
                                    var floor = time[that.floor];
                                    for (var i = 0; i < floor.length; i++) {
                                        that.timeFilter.push(floor[i]);
                                    };
                                }else{
                                    that.report('506');
                                }
                            }else{
                                that.report('505');
                            }
                        }
                    }else{
                        that.report('503');
                    }
                }else{
                    that.report('502');
                }
            }, function(){
                that.report('501');
            });
        },
        fillDateFilter: function(date, flag){
            var that = this;
            if(date.hasOwnProperty(flag)){
                var settings = date[flag];
                if(settings.length){
                    for (var i = 0; i < settings.length; i++) {
                        var time = utils.toDate(settings[i]);
                        that.dateFilter[flag][time] = settings[i];
                    };
                }
            }
        },
        start: function(){
            var that = this;
            var board_date = $.trim($('.date', '#board').html());
            var board_time = $.trim($('.time', '#board').html());
            if(!!board_date && !!board_time){
                var date = new Date(), 
                    time = date.getTime(),
                    day = date.getDay(),
                    mark = utils.toDate([date.getFullYear(), (date.getMonth() + 1), date.getDate()].join('-'));
                    original_date = utils.toDate([board_date, board_time].join(' '));

                if((day > 0) && (day < 6)){//周一至周五，工作日
                    if(!that.dateFilter.exclude.hasOwnProperty(mark)){//不属于排除监测的日期
                        that.check(time, original_date);
                    }
                }else{//周六周日，休息日
                    if(that.dateFilter.include.hasOwnProperty(mark)){//属于监测的日期
                        that.check(time, original_date);
                    }
                }
            }else{
                that.counter++;
                if(that.counter > 60){
                    that.counter = 0;
                    that.report('507');
                }
            }
            setTimeout(function(){
                that.start();
            }, 999);
        },
        check: function(now, original){
            var that = this;
            var settings = that.getSettings(now);
            if(settings){
                var span = Math.abs(now - original);
                if(span > (settings.interval * minute)){
                    var key = [settings.start, settings.end].join('-');
                    if(that.mark !== key){
                        that.mark = key;
                        that.report('508');
                    }
                }
            }
        },
        getSettings: function(now){
            var that = this;
            var settings = null;
            for (var i = 0; i < that.timeFilter.length; i++) {
                var filter = that.timeFilter[i];
                if(filter.start && filter.end && (filter.interval * 1)){
                    var date = new Date();
                    var str_date = [date.getFullYear(), (date.getMonth() + 1), date.getDate()].join('-');
                    var start = utils.toDate([str_date, filter.start].join(' ')),
                        end = utils.toDate([str_date, filter.end].join(' '));
                    if((now > start) && (now < end)){
                        return { start: start, end: end, interval: (filter.interval * 1) };
                    }
                }else{
                    that.report('509');
                }
            };
            return settings;
        },
        report: function(err){
            var that = this;
            var error = { floor: that.floor, err: err };
            that.r.send(proxy.warning, error);
        }
    };

    return {
        create: function(floor){
            return new FocusMonitor(floor);
        }
    };
});