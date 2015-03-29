/**
 * @license almond 0.3.1 Copyright (c) 2011-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*jslint sloppy: true */
/*global setTimeout: false */

var requirejs, require, define;
(function (undef) {
    var main, req, makeMap, handlers,
        defined = {},
        waiting = {},
        config = {},
        defining = {},
        hasOwn = Object.prototype.hasOwnProperty,
        aps = [].slice,
        jsSuffixRegExp = /\.js$/;

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param {String} name the relative name
     * @param {String} baseName a real name that the name arg is relative
     * to.
     * @returns {String} normalized name
     */
    function normalize(name, baseName) {
        var nameParts, nameSegment, mapValue, foundMap, lastIndex,
            foundI, foundStarMap, starI, i, j, part,
            baseParts = baseName && baseName.split("/"),
            map = config.map,
            starMap = (map && map['*']) || {};

        //Adjust any relative paths.
        if (name && name.charAt(0) === ".") {
            //If have a base name, try to normalize against it,
            //otherwise, assume it is a top-level require that will
            //be relative to baseUrl in the end.
            if (baseName) {
                name = name.split('/');
                lastIndex = name.length - 1;

                // Node .js allowance:
                if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                    name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
                }

                //Lop off the last part of baseParts, so that . matches the
                //"directory" and not name of the baseName's module. For instance,
                //baseName of "one/two/three", maps to "one/two/three.js", but we
                //want the directory, "one/two" for this normalization.
                name = baseParts.slice(0, baseParts.length - 1).concat(name);

                //start trimDots
                for (i = 0; i < name.length; i += 1) {
                    part = name[i];
                    if (part === ".") {
                        name.splice(i, 1);
                        i -= 1;
                    } else if (part === "..") {
                        if (i === 1 && (name[2] === '..' || name[0] === '..')) {
                            //End of the line. Keep at least one non-dot
                            //path segment at the front so it can be mapped
                            //correctly to disk. Otherwise, there is likely
                            //no path mapping for a path starting with '..'.
                            //This can still fail, but catches the most reasonable
                            //uses of ..
                            break;
                        } else if (i > 0) {
                            name.splice(i - 1, 2);
                            i -= 2;
                        }
                    }
                }
                //end trimDots

                name = name.join("/");
            } else if (name.indexOf('./') === 0) {
                // No baseName, so this is ID is resolved relative
                // to baseUrl, pull off the leading dot.
                name = name.substring(2);
            }
        }

        //Apply map config if available.
        if ((baseParts || starMap) && map) {
            nameParts = name.split('/');

            for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) {
                    //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (j = baseParts.length; j > 0; j -= 1) {
                        mapValue = map[baseParts.slice(0, j).join('/')];

                        //baseName segment has  config, find if it has one for
                        //this name.
                        if (mapValue) {
                            mapValue = mapValue[nameSegment];
                            if (mapValue) {
                                //Match, update name to the new value.
                                foundMap = mapValue;
                                foundI = i;
                                break;
                            }
                        }
                    }
                }

                if (foundMap) {
                    break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                    foundStarMap = starMap[nameSegment];
                    starI = i;
                }
            }

            if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
            }

            if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
            }
        }

        return name;
    }

    function makeRequire(relName, forceSync) {
        return function () {
            //A version of a require function that passes a moduleName
            //value for items that may need to
            //look up paths relative to the moduleName
            var args = aps.call(arguments, 0);

            //If first arg is not require('string'), and there is only
            //one arg, it is the array form without a callback. Insert
            //a null so that the following concat is correct.
            if (typeof args[0] !== 'string' && args.length === 1) {
                args.push(null);
            }
            return req.apply(undef, args.concat([relName, forceSync]));
        };
    }

    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(depName) {
        return function (value) {
            defined[depName] = value;
        };
    }

    function callDep(name) {
        if (hasProp(waiting, name)) {
            var args = waiting[name];
            delete waiting[name];
            defining[name] = true;
            main.apply(undef, args);
        }

        if (!hasProp(defined, name) && !hasProp(defining, name)) {
            throw new Error('No ' + name);
        }
        return defined[name];
    }

    //Turns a plugin!resource to [plugin, resource]
    //with the plugin being undefined if the name
    //did not have a plugin prefix.
    function splitPrefix(name) {
        var prefix,
            index = name ? name.indexOf('!') : -1;
        if (index > -1) {
            prefix = name.substring(0, index);
            name = name.substring(index + 1, name.length);
        }
        return [prefix, name];
    }

    /**
     * Makes a name map, normalizing the name, and using a plugin
     * for normalization if necessary. Grabs a ref to plugin
     * too, as an optimization.
     */
    makeMap = function (name, relName) {
        var plugin,
            parts = splitPrefix(name),
            prefix = parts[0];

        name = parts[1];

        if (prefix) {
            prefix = normalize(prefix, relName);
            plugin = callDep(prefix);
        }

        //Normalize according
        if (prefix) {
            if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relName));
            } else {
                name = normalize(name, relName);
            }
        } else {
            name = normalize(name, relName);
            parts = splitPrefix(name);
            prefix = parts[0];
            name = parts[1];
            if (prefix) {
                plugin = callDep(prefix);
            }
        }

        //Using ridiculous property names for space reasons
        return {
            f: prefix ? prefix + '!' + name : name, //fullName
            n: name,
            pr: prefix,
            p: plugin
        };
    };

    function makeConfig(name) {
        return function () {
            return (config && config.config && config.config[name]) || {};
        };
    }

    handlers = {
        require: function (name) {
            return makeRequire(name);
        },
        exports: function (name) {
            var e = defined[name];
            if (typeof e !== 'undefined') {
                return e;
            } else {
                return (defined[name] = {});
            }
        },
        module: function (name) {
            return {
                id: name,
                uri: '',
                exports: defined[name],
                config: makeConfig(name)
            };
        }
    };

    main = function (name, deps, callback, relName) {
        var cjsModule, depName, ret, map, i,
            args = [],
            callbackType = typeof callback,
            usingExports;

        //Use name if no relName
        relName = relName || name;

        //Call the callback to define the module, if necessary.
        if (callbackType === 'undefined' || callbackType === 'function') {
            //Pull out the defined dependencies and pass the ordered
            //values to the callback.
            //Default to [require, exports, module] if no deps
            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
            for (i = 0; i < deps.length; i += 1) {
                map = makeMap(deps[i], relName);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                    args[i] = handlers.require(name);
                } else if (depName === "exports") {
                    //CommonJS module spec 1.1
                    args[i] = handlers.exports(name);
                    usingExports = true;
                } else if (depName === "module") {
                    //CommonJS module spec 1.1
                    cjsModule = args[i] = handlers.module(name);
                } else if (hasProp(defined, depName) ||
                           hasProp(waiting, depName) ||
                           hasProp(defining, depName)) {
                    args[i] = callDep(depName);
                } else if (map.p) {
                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                    args[i] = defined[depName];
                } else {
                    throw new Error(name + ' missing ' + depName);
                }
            }

            ret = callback ? callback.apply(defined[name], args) : undefined;

            if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef &&
                        cjsModule.exports !== defined[name]) {
                    defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                    //Use the return value from the function.
                    defined[name] = ret;
                }
            }
        } else if (name) {
            //May just be an object definition for the module. Only
            //worry about defining if have a module name.
            defined[name] = callback;
        }
    };

    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
        if (typeof deps === "string") {
            if (handlers[deps]) {
                //callback in this case is really relName
                return handlers[deps](callback);
            }
            //Just return the module wanted. In this scenario, the
            //deps arg is the module name, and second arg (if passed)
            //is just the relName.
            //Normalize module name, if it contains . or ..
            return callDep(makeMap(deps, callback).f);
        } else if (!deps.splice) {
            //deps is a config object, not an array.
            config = deps;
            if (config.deps) {
                req(config.deps, config.callback);
            }
            if (!callback) {
                return;
            }

            if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
            } else {
                deps = undef;
            }
        }

        //Support require(['a'])
        callback = callback || function () {};

        //If relName is a function, it is an errback handler,
        //so remove it.
        if (typeof relName === 'function') {
            relName = forceSync;
            forceSync = alt;
        }

        //Simulate async callback;
        if (forceSync) {
            main(undef, deps, callback, relName);
        } else {
            //Using a non-zero value because of concern for what old browsers
            //do, and latest browsers "upgrade" to 4 if lower value is used:
            //http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
            //If want a value immediately, use require('id') instead -- something
            //that works in almond on the global level, but not guaranteed and
            //unlikely to work in other AMD implementations.
            setTimeout(function () {
                main(undef, deps, callback, relName);
            }, 4);
        }

        return req;
    };

    /**
     * Just drops the config on the floor, but returns req in case
     * the config return value is used.
     */
    req.config = function (cfg) {
        return req(cfg);
    };

    /**
     * Expose module registry for debugging and tooling
     */
    requirejs._defined = defined;

    define = function (name, deps, callback) {
        if (typeof name !== 'string') {
            throw new Error('See almond README: incorrect module build, no module name');
        }

        //This module may not have dependencies
        if (!deps.splice) {
            //deps is not an array, so probably means
            //an object literal or factory function for
            //the value. Adjust args.
            callback = deps;
            deps = [];
        }

        if (!hasProp(defined, name) && !hasProp(waiting, name)) {
            waiting[name] = [name, deps, callback];
        }
    };

    define.amd = {
        jQuery: true
    };
}());
define('app/utils',[], function(){
    var exports = {};

    function send(uri, data){
        $.get(uri, data);
    }
    exports.send = send;
    
    function jsonp(uri, data, success, error){
        $.ajax({ 
            type: "get",
            dataType: "jsonp",
            url: uri,
            data: data,
            async: false,
            error: error,
            success: success
        });
    }
    exports.jsonp = jsonp;

    function toDate(str){
        var arr = str.split(' '),
            date = [0, 0, 0],
            time = [0, 0, 0];

        if(arr.length > 0){
            date = arr[0].split('-'); 
        }
        if(arr.length > 1){
            time = arr[1].split(':');
        }

        var year = date[0] ? (date[0] * 1) : 0, 
            month =  date[1] ? (date[1] * 1 - 1) : 0, 
            day = date[2] ? (date[2] * 1) : 1, 
            hour = time[0] ? (time[0] * 1) : 0, 
            minute = time[1] ? (time[1] * 1) : 0, 
            second = time[2] ? (time[2] * 1) : 0;
            
        var result = new Date(year, month, day, hour, minute, second);
        return result.getTime();
    }
    exports.toDate = toDate;

    return exports;
});
/**
* @module {focus} 打卡密集处理模块。
*/
define('app/monitor',['app/utils'], function(utils){
    var minute = 60 * 1e3;

    function FocusMonitor(client, proxy){
        this.settings = {
            client: client,
            proxy: proxy
        };
        this.floor = client.floor;
        this.counter = 0;
        this.mark = '';
        this.dateFilter = { include: {}, exclude: {} };
        this.timeFilter = [];
        this.initialise();
    }
    FocusMonitor.prototype = {
        initialise: function(){
            var that = this,
                proxy = that.settings.proxy;
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
            var that = this,
                client = that.settings.client,
                container = '#board_' + client.floor;
            var board_date = $.trim($('.date', container).html());
            var board_time = $.trim($('.time', container).html());
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
            var that = this,
                proxy = that.settings.proxy;
            var error = { floor: that.floor, err: err };
            utils.send(proxy.warning, error);
        }
    };

    return FocusMonitor;
});
/**
* @module {counter} 错误计数器。
*/
define('app/counter',['app/utils'], function(utils){
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
define('app/att',['app/utils', 'app/monitor', 'app/counter'], function(utils, Monitor, Counter){
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
                    that.update();
                }, 1e3);
            }, function(){
                that.counter.report('202');
                setTimeout(function(){
                    that.update();
                }, 1e3);
            });
        },
        refresh: function(data){
            var that = this,
                client = that.settings.client,
                container = '#board_' + client.floor;
            if(data.hasOwnProperty('number') &&
                data.hasOwnProperty('name') &&
                data.hasOwnProperty('time')){

                var date = data.time.split(' ');
                var old_time = $.trim($('.time', container).html());
                if(old_time != date[1]){
                    $('.number', container).html(data.number);
                    $('.name', container).html(data.name);
                    $('.date', container).html(date[0]);
                    $('.time', container).html(date[1]);
                }
            }
        }
    };

    return Att;
});
define('app/ads',['app/utils', 'app/counter'], function(utils, Counter){
    function Ads(ads, client, proxy, errors){
        this.settings = {
            ads: ads,
            proxy: proxy
        };
        this.isDefault = false;
        this.counter = new Counter(client, proxy, errors);
    }
    Ads.prototype = { 
        show: function(){
            var that = this,
                proxy = that.settings.proxy;
            that.counter.increase();
            utils.jsonp(proxy.ads, {}, function(data){
                if(data){
                    if(data.hasOwnProperty('error')){
                        if(data['error']){
                            that.report(data['error']);
                        }else{
                            if (data.images.hasOwnProperty('1') && 
                                data.images.hasOwnProperty('2') && 
                                data.images.hasOwnProperty('3')) {
                                that.isDefault = false;
                                that.showCarousel(data.images);
                            }else{
                                that.report('404');
                            }
                        }
                    }else{
                        that.report('403');
                    }
                }else{
                    that.report('402');
                }
            },function(){
                that.report('401');
            });
        },
        report: function(err){
            var that = this;
            if(!that.isDefault){
                that.showCarousel(ads.images);
            }
            that.isDefault = true;
            counter.report(err);
            setTimeout(function(){
                that.show();
            }, 1*1e3);
        },
        showCarousel: function(images){
            var j, numbers = ['1', '2', '3'],
                proxy = this.settings.proxy;
            for (j = 0; j < numbers.length; j++) {
                var number = numbers[j],
                    id = '#carousel-haixuan-' + number;
                if(images.hasOwnProperty(number)){
                    var inner = $('div.carousel-inner', id),
                        indicators = $('ol.carousel-indicators', id);

                    inner.empty();
                    indicators.empty();

                    for(var i = 0; i < images[number].length; i++){
                        var indicator = $('<li data-target="#carousel-haixuan-1" data-slide-to="' + i + ' "></li>');
                        var item = $('<div class="item"><img src="' + [proxy.base, images[number][i]].join('/') + '" /></div>');
                        if(0 === i){
                            indicator.addClass('active');
                            item.addClass('active');
                        }
                        indicators.append(indicator);
                        inner.append(item);
                    }
                }
            }
            $('.carousel').carousel();
        }
    };

    return Ads;
});
/**
* @module {app/settings/ads} 广告配置模块。
*/
define('app/settings/ads',[], function(){
    var exports = {};

    var numbers = ['1', '2', '3'], 
        images = {};
        
    for (var i = 0; i < numbers.length; i++) {
        var arr = [], number = numbers[i];
        for (var j = 0; j < 3; j++) {
            arr.push('haixuan/default/' + number + '/1.jpg');
        };
        images[number] = arr;
        
    }
    exports.images = images;

    return exports;
});
/**
* @module {app/settings/client} 客户端配置模块。
*/
define('app/settings/f13/client',[], function(){
    var exports = {};

    exports.device = '1';

    exports.floor = '13';

    return exports;
});
/**
* @module {app/settings/proxy} 代理系统配置模块。
*/
define('app/settings/proxy',[], function(){
    var exports = {};

    exports.fetch = 'http://10.0.3.16/att/proxy/fetch.php';
    exports.settings = 'http://10.0.3.16/att/proxy/settings.php';
    exports.warning = 'http://10.0.3.16/att/proxy/warning.php';
    exports.ads = 'http://10.0.3.16/att/ads/fetch.php';
    exports.base = 'http://10.0.3.16/att';

    return exports;
});
/**
* @module {app/settings/errors} 错误配置模块。
*/
define('app/settings/errors',[], function(){
    var exports = {};

    /**
    * 系统支持的错误字典表。
    */
    exports.errors = {
        '101': '考勤服务器上没有返回任何内容',
        '102': '考勤服务器上返回的内容不包含员工考勤信息',

        '201': '不明确的服务器异常',
        '202': '考勤代理服务器连接异常',

        '301': '考勤代理服务器没有返回数据',
        '302': '考勤代理服务器返回的数据不包含异常编码',

        '401': '轮播广告不明确的服务器异常',
        '402': '轮播广告服务器端数据为空',
        '403': '轮播广告服务器端数据不包含错误编码字段',
        '404': '轮播广告服务器端没有检索到图片文件',

        '501': '获取打卡集中时间处理逻辑的配置时不明确的服务器异常',
        '502': '获取打卡集中时间处理逻辑的配置时数据为空',
        '503': '获取打卡集中时间处理逻辑的配置时不包含异常编码',
        '504': '获取打卡集中时间处理逻辑的配置时没有日期的配置',
        '505': '获取打卡集中时间处理逻辑的配置时没有时间的配置',
        '506': '获取打卡集中时间处理逻辑的配置时没有楼层的时间配置',
        '507': '考勤显示器有1分钟以上无任何考勤信息',
        '508': '该打卡的时候，没人打卡',
        '509': '打卡集中时间处理逻辑的时间配置格式不正确'
    };

    /**
    * 报警的频次及阈值。
    */
    exports.thresholds = {
        '101': {
            'toplimit': 300,
            'threshold': 0.5
        },
        '102': {
            'toplimit': 300,
            'threshold': 0.05
        },
        'default': {
            'toplimit': 100,
            'threshold': 0.1
        }
    };

    return exports;
});
require(['app/att', 'app/ads',
    'app/settings/ads', 'app/settings/f13/client', 'app/settings/proxy', 'app/settings/errors'],
function(Att, Ads, sAds, client, proxy, errors){
    var att = new Att(client, proxy, errors);
    att.start();
    var ads = new Ads(sAds, client, proxy, errors)
    ads.show();
    setTimeout(function(){
        location.reload(true);
    }, 30 * 60 * 1e3);
});
define("app/main/f13", function(){});

