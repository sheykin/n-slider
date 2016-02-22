var NSlider= function(options){

	var defaultOptions = {
			container: 			'',
			slideWindow: 		'.n-slide-window',
			slideBlock: 		'.n-slide',
			prevS: 				'.n-prev',
			nextS: 				'.n-next',
			clog:				true,
			infinity: 			true,
			slideScrollSpeed: 	300,
			slideWidth: 		0,
			windowWidth: 		0,
			windowHeight: 		0,
			currentPosition: 	0,
			fullWidth: 			0,
			numberOfSlides: 	0
		}

	for(var option in defaultOptions) {
		this[option] = (options && options[option]!==undefined) ? options[option] : defaultOptions[option];
	}

	this.sliderInit(this.container);
};

// Prototypes

NSlider.prototype.sliderInit = function(contBlock) {
	var _ = this;
		_.drawSliderElements(contBlock);

			if (!_.infinity){
				$(_.prevS).css({'opacity':'0','cursor':'default'});
				if (_.currentPosition >= _.numberOfSlides-1) { $(_.nextS).css({'opacity':'0','cursor':'default'}); }
			} 

			if (_.infinity){
					$(_.prevS, contBlock).css({'opacity':'1','cursor':'pointer'});
					$(_.nextS, contBlock).css({'opacity':'1','cursor':'pointer'});
					_.currentPosition++;
					$(_.slideBlock,contBlock).css('margin-left', -_.slideWidth);
			}

		$(contBlock).on('click', 'button', function () {
			if($(this).attr('class') == (_.nextS).substring(1)) { _.nextSlide(contBlock); } 
			if($(this).attr('class') == (_.prevS).substring(1)) { _.prevSlide(contBlock); }
		});
};

NSlider.prototype.numOfSlides = function(contBlock) { //определяем количество слайдов
	var _ = this;
	var slides = $(_.slideBlock, contBlock).children('div');
		_.numberOfSlides = slides.length;
		return _.numberOfSlides;
};
	  
NSlider.prototype.slidesWidth = function(contBlock) { //определяем ширину блока слайдов
	var fullWidth = this.fullWidth;
	var slides = $(this.slideBlock, contBlock).children('div');
		$(slides).each(function(){
			fullWidth+=$(this).outerWidth(true);
		});
		return fullWidth;
};
	  
NSlider.prototype.nextSlide = function(contBlock) { // следующий слайд
	var _ = this;
		if ($(_.slideBlock,contBlock).is(':animated')) { return false; } 
	_.currentPosition++;

		if(_.infinity){
					$(_.nextS, contBlock).css({'opacity':'1','cursor':'pointer'});
					$(_.prevS, contBlock).css({'opacity':'1','cursor':'pointer'});
			if (_.currentPosition == _.numberOfSlides) {
					$(_.slideBlock,contBlock).css('margin-left', -_.slideWidth);
					_.currentPosition = 2;
			}
		}

		if(!_.infinity){
			if (_.currentPosition >= _.numberOfSlides-1) {
					_.currentPosition = _.numberOfSlides-1;
					$(_.nextS, contBlock).css({'opacity':'0','cursor':'default'});
				} else {
					$(_.nextS, contBlock).css({'opacity':'1','cursor':'pointer'});
					$(_.prevS, contBlock).css({'opacity':'1','cursor':'pointer'});
				}
		}

	    $(_.slideBlock, contBlock).animate({marginLeft: -_.currentPosition * _.slideWidth},_.slideScrollSpeed);
    return _.currentPosition;
};

NSlider.prototype.prevSlide = function(contBlock) { // предыдущий слайд
	var _ = this;
		if ($(_.slideBlock,contBlock).is(':animated')) { return false; } 
	_.currentPosition--;

		if(_.infinity){
				$(_.prevS, contBlock).css({'opacity':'1','cursor':'pointer'});
				$(_.nextS, contBlock).css({'opacity':'1','cursor':'pointer'});
			if (_.currentPosition == 0) {
				$(_.slideBlock,contBlock).css('margin-left', -_.slideWidth * (_.numberOfSlides-1));
				_.currentPosition = _.numberOfSlides-2;
			}
		}
		if (!_.infinity){
				if(_.currentPosition <= 0){
				_.currentPosition = 0
				$(_.prevS, contBlock).css({'opacity':'0','cursor':'default'});
			} else {
				$(_.prevS, contBlock).css({'opacity':'1','cursor':'pointer'});
				$(_.nextS, contBlock).css({'opacity':'1','cursor':'pointer'});
			}
		}
   		$(_.slideBlock, contBlock).animate({marginLeft: -_.currentPosition * _.slideWidth},_.slideScrollSpeed);
    return _.currentPosition;
};

	
NSlider.prototype.drawSliderElements = function(contBlock) { // рисуем элементы слайдера
	var _ = this;
	var classSlideWindow = (_.slideWindow).substring(1);
	var classSlideBlock = (_.slideBlock).substring(1);
		$(contBlock).children('div').wrapAll('<div class="'+classSlideBlock+'"></div>'); //создаем блок слайдов содержащий в себе все слайды
			if (_.infinity){
				$(_.slideBlock,contBlock).children('div:last').clone().prependTo($(_.slideBlock,contBlock)); // Копия последнего слайда помещается в начало.
				$(_.slideBlock,contBlock).children('div').eq(1).clone().appendTo($(_.slideBlock,contBlock)); // Копия первого слайда помещается в конец.
			}
			if (_.windowWidth == 0) {_.windowWidth = $(contBlock).width();} // если высота и ширина окна просмотра не заданы, берем ширину контейнера
			if (_.windowHeight == 0) {_.windowHeight = $(contBlock).height();}
		$(contBlock).children('div').wrapAll('<div class="'+classSlideWindow+'" style = "width: '+_.windowWidth+'px; height: '+_.windowHeight+'px;"></div>');	//создаем окно просмотра
		$(contBlock).append('<button class="n-prev"></button>').append('<button class="n-next"></button>'); //создаем элементы управления
			if (_.slideWidth ==0) { _.slideWidth = $(_.slideBlock, contBlock).children('div').width(); } //если ширина слайда не задана вычисляем сами
			_.fullWidth = _.slidesWidth(contBlock); //задаем ширину блока слайдов
			_.numberOfSlides = _.numOfSlides(contBlock); //задаем количество слайдов
		$(_.slideBlock, contBlock).width(_.fullWidth); // устанавливаем ширину блока слайдов

		if (_.clog) {
			console.log('created: '+contBlock+'\nslide block full width: '+_.fullWidth+'\nnumber of slides: '+_.numberOfSlides
						+'\nslide width: '+_.slideWidth+'\nwindow width: '+_.windowWidth+'\ninfinity:'+_.infinity);
		};
};



(function ( $ ) {

  var methods = {

     init : function ( options ) {
 
 		var settings = $.extend({
			container: this,
			}, options );

       return this.each(function(){
        	this.nslider = new NSlider(settings);
       })

     },

     slideCount : function ( options ) {

		var slides = $(this).children('div').children('div').children('div');
			numberOfSlides = slides.length;
			return numberOfSlides;
     },

     currentSlide : function ( options ) {

			return 'not vork in current ver';
     }

  };


  $.fn.nslider = function( method ) {
     if ( methods[method] ) {
		return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
		return methods.init.apply( this, arguments );
    } else {
		$.error( 'Method ' +  method + ' not present in jQuery.nslider' );
    }
  };
  
}( jQuery ));





$(document).ready(function(){


$('.n-container').nslider();
$('.n-container-2').nslider();
$('.n-container-3').nslider();



});