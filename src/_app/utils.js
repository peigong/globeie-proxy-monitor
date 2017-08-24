define([], function(){
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