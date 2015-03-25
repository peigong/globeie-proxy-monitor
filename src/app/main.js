require(['app/att', 'app/ads'], function(att, ads){
    att.start();
    ads.show();
    setTimeout(function(){
        location.reload(true);
    }, 30 * 60 * 1e3);
});