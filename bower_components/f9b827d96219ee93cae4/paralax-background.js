// Paralax Plugin
(function($) {
    $.fn.parallax = function(options) {
        var windowHeight = $(window).height();       
        var settings = $.extend({
            speed        : 0.15,
            topMinus : 500
        }, options);       
        return this.each( function() {      
        var $this = $(this);
        $(document).scroll(function(){
    		var scrollTop = $(window).scrollTop();
        var offset = $this.offset().top;
        var height = $this.outerHeight();
				if (offset + height <= scrollTop || offset >= scrollTop + windowHeight) {
				return;
				}
				var yBgPosition = Math.round((offset - scrollTop) * settings.speed)-settings.topMinus;
    		$this.css('background-position', 'center ' + yBgPosition + 'px');                
        });
        });
    };
}(jQuery));