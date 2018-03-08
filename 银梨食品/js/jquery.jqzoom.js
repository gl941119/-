//**************************************************************
// jQZoom allows you to realize a small magnifier window,close
// to the image or images on your web page easily.
//
// jqZoom version 2.1
// Author Doc. Ing. Renzi Marco(www.mind-projects.it)
// First Release on Dec 05 2007
// i'm searching for a job,pick me up!!!
// mail: renzi.mrc@gmail.com
//**************************************************************

(function($){

		$.fn.jqueryzoom = function(options){
		var settings = {
				xzoom: 200,//zoomed width default width
				yzoom: 200,//zoomed div default width
				offset: 10,	//zoomed div default offset
				position: "right",//zoomed div default position,offset position is to the right of the image
				lens:1, //zooming lens over the image,by default is 1;
				preload: 1
			};

			if(options) {
				$.extend(settings, options);
			}

		    var noalt='';
		    $(this).hover(function(){

		    var imageLeft = this.offsetLeft;
		    var imageRight = this.offsetRight;
		    var imageTop =  $(this).get(0).offsetTop;
		    var imageWidth = $(this).children('img').get(0).offsetWidth;
		    var imageHeight = $(this).children('img').get(0).offsetHeight;


            noalt= $(this).children("img").attr("alt");

		    var bigimage = $(this).children("img").attr("src");

            $(this).children("img").attr("alt",'');

		    if($("div.showDiv").get().length == 0){

		    $(this).after("<div class='showDiv'><img class='bigimg' src='"+bigimage+"'/></div>");


		    $(this).append("<div class='shadowPup'>&nbsp;</div>");

		    }


		    if(settings.position == "right"){

            if(imageLeft + imageWidth + settings.offset + settings.xzoom > screen.width){

            leftpos = imageLeft  - settings.offset - settings.xzoom;

            }else{

		    leftpos = imageLeft + imageWidth + settings.offset;
            }
		    }else{
		    leftpos = imageLeft - settings.xzoom - settings.offset;
		    if(leftpos < 0){

            leftpos = imageLeft + imageWidth  + settings.offset;

		    }

		    }

		    $("div.showDiv").css({ top: imageTop,left: leftpos });

		    $("div.showDiv").width(settings.xzoom);

		    $("div.showDiv").height(settings.yzoom);

            $("div.showDiv").show();

            if(!settings.lens){
              $(this).css('cursor','crosshair');
			}




				   $(document.body).mousemove(function(e){



                   mouse = new MouseEvent(e);

                   /*$("div.shadowPup").hide();*/


				    var bigwidth = $(".bigimg").get(0).offsetWidth;

				    var bigheight = $(".bigimg").get(0).offsetHeight;

				    var scaley ='x';

				    var scalex= 'y';


				    if(isNaN(scalex)|isNaN(scaley)){

				    var scalex = (bigwidth/imageWidth);

				    var scaley = (bigheight/imageHeight);




				    $("div.shadowPup").width((settings.xzoom)/scalex);

		    		$("div.shadowPup").height((settings.yzoom)/scaley);

                    if(settings.lens){
                    $("div.shadowPup").css('visibility','visible');
					}

				   }



                    xpos = mouse.x - $("div.shadowPup").width()/2 - imageLeft;

                    ypos = mouse.y - $("div.shadowPup").height()/2 - imageTop ;

                    if(settings.lens){

                    xpos = (mouse.x - $("div.shadowPup").width()/2 < imageLeft ) ? 0 : (mouse.x + $("div.shadowPup").width()/2 > imageWidth + imageLeft ) ?  (imageWidth -$("div.shadowPup").width() -2)  : xpos;

					ypos = (mouse.y - $("div.shadowPup").height()/2 < imageTop ) ? 0 : (mouse.y + $("div.shadowPup").height()/2  > imageHeight + imageTop ) ?  (imageHeight - $("div.shadowPup").height() -2 ) : ypos;

                    }


                    if(settings.lens){

                    $("div.shadowPup").css({ top: ypos,left: xpos });

                    }



					scrolly = ypos;

					$("div.showDiv").get(0).scrollTop = scrolly * scaley;

					scrollx = xpos;

					$("div.showDiv").get(0).scrollLeft = (scrollx) * scalex ;


				    });
		    },function(){

               $(this).children("img").attr("alt",noalt);
		       $(document.body).unbind("mousemove");
		       if(settings.lens){
		       $("div.shadowPup").remove();
		       }
		       $("div.showDiv").remove();

		    });

        count = 0;

		if(settings.preload){

		$('body').append("<div style='display:none;' class='jqPreload"+count+"'>sdsdssdsd</div>");

		$(this).each(function(){

        var imagetopreload= $(this).children("img").attr("data-url");

        var content = jQuery('div.jqPreload'+count+'').html();

        jQuery('div.jqPreload'+count+'').html(content+'<img src=\"'+imagetopreload+'\">');

		});

		}

		}

})(jQuery);

function MouseEvent(e) {
this.x = e.pageX;
this.y = e.pageY;


}


