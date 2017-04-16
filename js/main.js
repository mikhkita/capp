$(document).ready(function(){	
    function resize(){
       if( typeof( window.innerWidth ) == 'number' ) {
            myWidth = window.innerWidth;
            myHeight = window.innerHeight;
        } else if( document.documentElement && ( document.documentElement.clientWidth || 
        document.documentElement.clientHeight ) ) {
            myWidth = document.documentElement.clientWidth;
            myHeight = document.documentElement.clientHeight;
        } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
            myWidth = document.body.clientWidth;
            myHeight = document.body.clientHeight;
        }
    }
    $(window).resize(resize);
    resize();

    var globPos = 0;
    $("body").mousemove(function(e){
        globPos = e.pageX;
    });

    custom["bindGirl"] = function(){
        setPos(getPos());

        setTimeout(function(){
            $(".b-white-line").removeClass("transition");
        },500);

        $("body").mousemove(function(e){
            var k = getPos(e);          

            setPos(k);
        });
    }

    function getPos(e){
        var offset = 30, //В процентах
            curPos = (typeof e != "undefined")?e.pageX:globPos,
            offset_pix = myWidth/100*offset;
            percent = (curPos-offset_pix)/(myWidth-offset_pix*2);


            console.log(curPos);
        percent = ( percent < -3 )?-3:percent;
        percent = ( percent > 3 )?3:percent;  

        return percent;
    }

    function setPos(k){
        var width = $(".b-layers").width();

        $(".b-white-line").css({
            "left" : (k*100)+"%"
        });

        $(".b-capp").css({
            "width" : width*k
        });

        $(".b-bracket").css({
            "width" : width - width*k
        });
    }

    $.fn.placeholder = function() {
        if(typeof document.createElement("input").placeholder == 'undefined') {
            $('[placeholder]').focus(function() {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                    input.removeClass('placeholder');
                }
            }).blur(function() {
                var input = $(this);
                if (input.val() == '' || input.val() == input.attr('placeholder')) {
                    input.addClass('placeholder');
                    input.val(input.attr('placeholder'));
                }
            }).blur().parents('form').submit(function() {
                $(this).find('[placeholder]').each(function() {
                    var input = $(this);
                    if (input.val() == input.attr('placeholder')) {
                        input.val('');
                    }
                });
            });
        }
    }
    $.fn.placeholder();
    
	var myPlace = new google.maps.LatLng(56.501057, 85.001960);
        var myOptions = {
            zoom: 17,
            center: new google.maps.LatLng(56.501557, 85.001960),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,
            scrollwheel: false,
            zoomControl: true
        }
        var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions); 

        var marker = new google.maps.Marker({
            position: myPlace,
            icon: {
            url: "images/pin.png", // url
            scaledSize: new google.maps.Size(38, 58), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(19,58) // anchor
            },
            animation: google.maps.Animation.DROP,
            map: map,
            title: "COSMODENT"
        });

        var contentString = '<div class="gmap-bubble-marker-cont"><div class="gmap-bubble-marker"><div class="gmap-close-button icon-close"></div><p class="gmap-cont gmap-cont-1">Авторская клиника эстетической<br>стоматологии и косметологии «COSMODENT»<br><strong>Иркутский тракт, 5<br>+7 (382) 220-23-32</strong></p></div></div>';
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
            if( $(".gmap-bubble-marker").hasClass("gmap-bubble-marker-hide") ){
                $(".gmap-bubble-marker").removeClass("gmap-bubble-marker-hide");
            }else{
                $(".gmap-bubble-marker").addClass("gmap-bubble-marker-hide");
            }
        });

        google.maps.event.addListenerOnce(map, 'idle', function(){
            infowindow.open(map,marker);
        });

        $("body").on("click",".gmap-close-button",function(){
            $(".gmap-bubble-marker").addClass("gmap-bubble-marker-hide");
        });

});