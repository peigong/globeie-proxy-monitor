/**
* @module {app/settings/ads} 广告配置模块。
*/
define([], function(){
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