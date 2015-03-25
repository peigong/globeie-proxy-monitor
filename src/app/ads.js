define(['app/utils',
    'app/settings/ads', 'app/settings/client', 'app/settings/proxy',
    'app/counter'
    ], function(utils, ads, client, proxy, Counter){

    var counter = Counter.create(client.floor);

    function showCarousel(images){
        var j, numbers = ['1', '2', '3'];
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

    var isDefault = false;
    function report(err){
        if(!isDefault){
            showCarousel(ads.images);
        }
        isDefault = true;
        counter.report(err);
        setTimeout(show, 1*1e3);
    }

    function show(){
        counter.increase();
        utils.jsonp(proxy.ads, {}, function(data){
            if(data){
                if(data.hasOwnProperty('error')){
                    if(data['error']){
                        report(data['error']);
                    }else{
                        if (data.images.hasOwnProperty('1') && 
                            data.images.hasOwnProperty('2') && 
                            data.images.hasOwnProperty('3')) {
                            isDefault = false;
                            showCarousel(data.images);
                        }else{
                            report('404');
                        }
                    }
                }else{
                    report('403');
                }
            }else{
                report('402');
            }
        },function(){
            report('401');
        });
    }

    return { 
        show: show 
    };
});