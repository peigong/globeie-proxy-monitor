import util from '../util.js';

const minute = 60 * 1e3;

function createDate(year, month, date, hours, minutes, seconds){
    month = !!month ? month : 1;
    month = month * 1 - 1;
    date = !!date ? date : 1;
    hours = !!hours ? hours : 0;
    minutes = !!minutes ? minutes : 0;
    seconds = !!seconds ? seconds : 0;
    return (new Date(year, month, date, hours, minutes, seconds)).getTime();
}
function toDate(datetime){
    datetime = datetime || '';
    datetime = datetime.replace(/-/g, ' ');
    datetime = datetime.replace(/:/g, ' ');
    return createDate.apply(null, datetime.split(' '));
}

function device2floor(device){
    let dict = { 13: 1, 14: 2, 15: 3 };
    let floor = dict[device] || 0;
    return floor;
}

export default class FocusMonitor {
    constructor(device, store){
        this.device = device;
        this.store = store;
        this.counter = 0;
        this.mark = '';
        this.dateFilter = { include: {}, exclude: {} };
        this.timeFilter = [];
        this.initialise();
        this.start();
    }
    initialise(){
        let host = SERVER_HOST;
        // const options = {
        //     method: 'GET',
        //     mode: 'cors'
        // };
        // return fetch(`http://${ host }/att/proxy/settings.php`, options)
        return util.fetch(`http://${ host }/att/proxy/settings.php`)
        // .then(response => response.json())
        .then(json => {
            if(json.hasOwnProperty('error')){
                if(json['error']){
                    this.report(json['error']);
                }else{
                    if(json.hasOwnProperty('date')){
                        let date = json['date'];
                        this.fillDateFilter(date, 'include');
                        this.fillDateFilter(date, 'exclude');
                    }else{
                        // 获取打卡集中时间处理逻辑的配置时没有日期的配置
                        this.report('504');
                    }
                    if(json.hasOwnProperty('time')){
                        let time = json['time'];
                        let floor = device2floor(this.device);
                        if (time[floor]) {
                            let times = time[floor];
                            times.forEach((val) => {
                                this.timeFilter.push(val);
                            });
                        }else{
                            // 获取打卡集中时间处理逻辑的配置时没有楼层的时间配置
                            this.report('506');
                        }
                    }else{
                        // 获取打卡集中时间处理逻辑的配置时没有时间的配置
                        this.report('505');
                    }
                }
            }else{
                // 获取打卡集中时间处理逻辑的配置时不包含异常编码
                this.report('503');
            }
        })
        .catch(err => {
            // 
            // 获取打卡集中时间处理逻辑的配置时不明确的服务器异常
            this.report('501');
            // 获取打卡集中时间处理逻辑的配置时数据为空
            // this.report('502');
        });
    }
    start(){
        let { date, time } = this.store.getState().att;
        if(date && time){
            let now = new Date(), 
                nowTime = now.getTime(),
                nowDay = now.getDay(),
                mark = toDate([now.getFullYear(), (now.getMonth() + 1), now.getDate()].join('-'));
                originalDate = toDate([date, time].join(' '));

            if((nowDay > 0) && (nowDay < 6)){//周一至周五，工作日
                if(!this.dateFilter.exclude.hasOwnProperty(mark)){//不属于排除监测的日期
                    this.check(nowTime, originalDate);
                }
            }else{//周六周日，休息日
                if(this.dateFilter.include.hasOwnProperty(mark)){//属于监测的日期
                    this.check(nowTime, originalDate);
                }
            }
        }else{
            this.counter ++;
            if(this.counter > 60){
                this.counter = 0;
                // 考勤显示器有1分钟以上无任何考勤信息
                this.report('507');
            }
        }
        setTimeout(this.start.bind(this), 999); // 999是错开其他地方每秒的节奏
    }
    check(now, original){
        let settings = this.getSettings(now);
        if(settings){
            let span = Math.abs(now - original);
            if(span > (settings.interval * minute)){
                let key = [settings.start, settings.end].join('-');
                if(this.mark !== key){
                    this.mark = key;
                    // 该打卡的时候，没人打卡
                    this.report('508');
                }
            }
        }
    }
    getSettings(now){
        let settings = null;
        for (let i = 0; i < this.timeFilter.length; i++) {
            let filter = this.timeFilter[i];
            if(filter.start && filter.end && (filter.interval * 1)){
                let date = new Date();
                let day = [date.getFullYear(), (date.getMonth() + 1), date.getDate()].join('-');
                let start = toDate([day, filter.start].join(' ')),
                    end = toDate([day, filter.end].join(' '));
                if((now > start) && (now < end)){
                    return { start: start, end: end, interval: (filter.interval * 1) };
                }
            }else{
                // 打卡集中时间处理逻辑的时间配置格式不正确
                this.report('509');
            }
        }
        return settings;
    }
    fillDateFilter(date, flag){
        if(date.hasOwnProperty(flag)){
            let settings = date[flag] || [];
            settings.forEach((val) => {
                let time = toDate(val);
                this.dateFilter[flag][time] = val;
            });
        }
    }
    report(err){
        let host = SERVER_HOST;
        // const options = {
        //     method: 'GET',
        //     mode: 'cors'
        // };
        // fetch(`http://${ host }/att/proxy/warning.php?floor=${ this.device }&err=${ err }`, options);
        util.send(`http://${ host }/att/proxy/warning.php?floor=${ this.device }&err=${ err }`);
    }
}
