define(['app/utils', 'app/counter'], function(utils, Counter){
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