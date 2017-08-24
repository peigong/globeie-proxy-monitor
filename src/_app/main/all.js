require(['app/att',
    'app/settings/f13/client', 'app/settings/f14/client', 'app/settings/f15/client',
    'app/settings/proxy', 'app/settings/errors'],
function(Att, f13, f14, f15, proxy, errors){
    var f13Att = new Att(f13, proxy, errors);
    f13Att.start();
    var f14Att = new Att(f14, proxy, errors);
    f14Att.start();
    var f15Att = new Att(f15, proxy, errors);
    f15Att.start();
    setTimeout(function(){
        location.reload(true);
    }, 30 * 60 * 1e3);
});