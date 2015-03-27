require(['app/att', 'app/ads',
    'app/settings/ads', 'app/settings/f14/client', 'app/settings/proxy', 'app/settings/errors'],
function(Att, Ads, sAds, client, proxy, errors){
    var att = new Att(client, proxy, errors);
    att.start();
    var ads = new Ads(sAds, client, proxy, errors)
    ads.show();
    setTimeout(function(){
        location.reload(true);
    }, 30 * 60 * 1e3);
});