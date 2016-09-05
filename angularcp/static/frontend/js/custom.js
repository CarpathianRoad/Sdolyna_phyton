(function ($) {
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-75426458-1', 'auto');
  ga('send', 'pageview');

	new WOW().init();
	
	$(window).load(function(){
      $("#navigation").sticky({ topSpacing: 0 });
    });

	jQuery(window).load(function() { 
		jQuery("#preloader").delay(100).fadeOut("slow");
		jQuery("#load").delay(100).fadeOut("slow");
	// Trigger maximage
	jQuery('#maximage').maximage();
	});


	//jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {
		$('.navbar-nav li a').bind('click', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 1500, 'easeInOutExpo');
			event.preventDefault();
                        $(".navbar-nav li").removeClass("active");
                        $(this).parent("li").addClass("active");
		});
		$('.page-scroll a').bind('click', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 1500, 'easeInOutExpo');
			event.preventDefault();
		});
	});
	
	//owl carousel
	$('#owl-works').owlCarousel({
            items : 4,
            itemsDesktop : [1199,5],
            itemsDesktopSmall : [980,5],
            itemsTablet: [768,5],
            itemsTabletSmall: [550,2],
            itemsMobile : [480,2],
        });
	
	//nivo lightbox
	$('.owl-carousel .item a').nivoLightbox({
		effect: 'fadeScale',                             // The effect to use when showing the lightbox
		theme: 'default',                           // The lightbox theme to use
		keyboardNav: true,                          // Enable/Disable keyboard navigation (left/right/escape)
		clickOverlayToClose: true,                  // If false clicking the "close" button will be the only way to close the lightbox
		onInit: function(){},                       // Callback when lightbox has loaded
		beforeShowLightbox: function(){},           // Callback before the lightbox is shown
		afterShowLightbox: function(lightbox){},    // Callback after the lightbox is shown
		beforeHideLightbox: function(){},           // Callback before the lightbox is hidden
		afterHideLightbox: function(){},            // Callback after the lightbox is hidden
		onPrev: function(element){},                // Callback when the lightbox gallery goes to previous item
		onNext: function(element){},                // Callback when the lightbox gallery goes to next item
		errorMessage: 'The requested content cannot be loaded. Please try again later.' // Error message when content can't be loaded
	});
	
	
	//parallax
        if ($('.parallax').length)
        {
			$(window).stellar({
				responsive:true,
                scrollProperty: 'scroll',
                parallaxElements: false,
                horizontalScrolling: false,
                horizontalOffset: 0,
                verticalOffset: 0
            });

        }

        $("#show-contact").click(function(){
            $("#contact .heading-contact").toggle("slow");
            $("#contact .form-wrapper").toggle("slow");
        });
        $("#btnContactUs").click(function (){
            $('#mail-form input:not(#button-blue)').css("border","none");
            $('#mail-form textarea').css("border","none");
            $("#btnContactUs").prop('disabled', true);
            $(".validation").html("");
            var validation = true;
            if($("#name").val() === null || $("#name").val() === "" || $("#email").val() === null || $("#email").val() === "" || $("#message").val() === null || $("#message").val() === "") {
                validation = false;
            }
            if(!IsEmail($("#email").val())) {
                validation = false;
            }
            if(validation){
                $("#contact-form").fadeOut("fast", function() {
                    $("#mail-loading").fadeIn("fast");
                });
                var name = replaceChar($("#name").val());
                var comment = replaceChar($("#message").val());
                $.ajax({
                    type: "get",
                    url: "${Constants.URL}sendmail",
                    cache: false,    
                    data:'name='+ name +'&email='+$("#email").val()+'&text='+comment,
                    success: function(response){
                        if(response === "" || response === null){
                            $("#mail-loading").fadeOut("fast", function() {
                                $("#contact-form").fadeIn("fast");
                            });
                            $(".validation").html("При отправке возникла ошибка. Попробуйте снова позже.");
                            $("#btnContactUs").prop('disabled', false);
                        }
                        else {
                            $("#mail-loading").fadeOut("fast", function() {
                                $("#mail-complete").fadeIn("fast");
                                $("#btnContactUs").prop('disabled', false);
                                setTimeout(function() { 
                                $("#mail-complete").fadeOut("slow", function() {
                                    $("#contact-form").fadeIn("slow");
                                    $("#contact").hide();
                                });
                                }, 3000);
                            });
                        }
                    }, 
                    error: function(response){ 
                        $("#mail-loading").fadeOut("fast", function() {
                            $("#contact-form").fadeIn("fast");
                        });
                        $(".validation").html("При отправке возникла ошибка. Попробуйте снова позже.");
                        $("#btnContactUs").prop('disabled', false);
                    }
                });
            }
            else {
                $(".validation").html("Fill all fields correctly, please.");
                $("#btnContactUs").prop('disabled', false);
                $('#contact-form input:text').filter(function(){
                    return $.trim(this.value).length == 0;
                }).css("border","1px solid red");
                $('#contact-form textarea').filter(function(){
                    return $.trim($("#contact-form textarea").val()).length == 0;
                }).css("border","1px solid red");
            }
        });    
function replaceChar(inputString) {
   inputString = inputString.replace('~', '');
   inputString = inputString.replace('#', '');
   inputString = inputString.replace('^', '');
   inputString = inputString.replace('&', '');
   inputString = inputString.replace('*', '');
   inputString = inputString.replace('`', '');
   inputString = inputString.replace('\'', '');
   inputString = inputString.replace('+', '');
   return inputString;
}
function IsEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}
})(jQuery);

eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(f($){$.R.C=f(16){b e=$.1z({},$.R.C.X,16);4(e.F){4(!($.15.1y&&$.15.1x.1A(0,1)<8)){$(\'1B\').1E(\'<18 1D="y" />\');$(\'#y\').9({O:\'1C\',v:0,u:0,m:\'J%\',q:\'J%\',1F:e.W,r:e.11,\'z-P\':1w,Q:\'1j\'})}}1a 7.17(f(){b 14=$(7);b 13=$(\'a.C\',14);13.17(f(){b 3=$(7);4(3.1o(\'a\')){b 6=$(7).1p(\'6:S\');3.9({O:\'1v\',Q:\'1u-1q\'});3.j(\'1l\',\'1n 1h 1t\');3.1f(\'<18 1s="h" />\');b h=$(\'.h\',3);h.9(\'r\',\'0\');3.1r(f(){4(!3.i(\'B\')){h.1c().E({r:e.V},1b)}},f(){4(!h.i(\'G\')){h.1c().E({r:0},1b)}});3.1G(\'1V\',f(){4($(\'6.N\',3).K==0){h.A(\'G\');Y(6,3,f(){h.12(\'G\');H(6,3,h)})}l{H(6,3,h)}1a T})}})});f H(6,3,h){b o=$(\'6.N\',3);4(3.i(\'B\')){4(e.F)$(\'#y\').I(e.n/2);4($(\'.c\',3).K>0){$(\'.c\',3).I(e.n/2)}o.I(e.n/2,f(){6.E({r:1},e.n/2)});3.12(\'B\')}l{4(e.F)$(\'#y\').M(e.n/2);h.9(\'r\',\'0\');6.E({r:0},e.n/2,f(){o.M(e.n/2,f(){1e(6,o,3)})});3.A(\'B\')}}f 1e(6,o,3){4($(\'.c\',3).K>0){b c=$(\'.c:S\',3);4(!c.i(\'10-Z\')){b s=6.m();4(s==0)s=6.j(\'m\');b t=6.q();4(t==0)t=6.j(\'q\');b p=o.m();4(p==0)p=o.j(\'m\');b k=o.q();4(k==0)k=o.j(\'q\');c.9({m:p,r:e.19});4(3.i(\'1g\')){c.9({v:(k-c.L())+\'w\',D:\'g\'})}l 4(3.i(\'1k\')){c.9({x:\'g\',D:\'g\'})}l 4(3.i(\'1m\')){c.9({x:\'g\',u:\'g\'})}l 4(3.i(\'U\')){c.9({v:1H.1I(t/2-k/2)+(k-c.L())+\'w\',u:(s/2-p/2)+\'w\'})}l{c.9({v:(k-c.L())+\'w\',u:\'g\'})}c.A(\'10-Z\')}c.M(e.n/2)}}f Y(6,3,1i){b 1d=1O 1X();$(1d).1P(f(){$(7).A(\'N\');$(7).9({O:\'1K\',Q:\'1j\',\'z-P\':1S});4(1T.1Z.1U(/1W \\d\\.\\d+/)){3.9(\'z-P\',\'J\')}4(3.i(\'1g\')){$(7).9({v:\'g\',D:\'g\'})}l 4(3.i(\'1k\')){$(7).9({x:\'g\',D:\'g\'})}l 4(3.i(\'1m\')){$(7).9({x:\'g\',u:\'g\'})}l 4(3.i(\'U\')){b s=6.m();4(s==0)s=6.j(\'m\');b t=6.q();4(t==0)t=6.j(\'q\');b p=$(7).m();4(p==0)p=$(7).j(\'m\');b k=$(7).q();4(k==0)k=$(7).j(\'q\');$(7).9({v:(t/2-k/2)+\'w\',u:(s/2-p/2)+\'w\'})}l{$(7).9({v:\'g\',u:\'g\'})}$(7).j(\'1l\',\'1n 1h 1M\');3.1f($(7));1i.1N(7)}).j(\'1Q\',3.j(\'1R\'))}};$.R.C.X={n:1J,V:0.8,F:T,W:\'#1Y\',11:0.5,19:0.8}})(1L);',62,124,'|||link|if||img|this||css||var|nivoCaption||settings|function|0px|nivoZoomHover|hasClass|attr|bigImgHeight|else|width|speed|imgLarge|bigImgWidth|height|opacity|imgWidth|imgHeight|left|top|px|bottom|nivoOverlay||addClass|zoomed|nivoZoom|right|animate|overlay|loading|doZoom|fadeOut|100|length|outerHeight|fadeIn|nivoLarge|position|index|display|fn|first|false|center|zoomHoverOpacity|overlayColor|defaults|loadImg|processed|nivo|overlayOpacity|removeClass|nivoZooms|context|browser|options|each|div|captionOpacity|return|300|stop|newImg|showCaption|append|topRight|to|callback|none|bottomRight|title|bottomLeft|Click|is|find|block|hover|class|zoom|inline|relative|90|version|msie|extend|substr|body|fixed|id|prepend|background|bind|Math|ceil|500|absolute|jQuery|close|call|new|load|src|href|99|navigator|match|click|MSIE|Image|333|userAgent'.split('|'),0,{}))