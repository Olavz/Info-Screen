(function(window) {

    var binding =  {
        start : startFunction,
        stop : stopFunction
    }

    var currentTimeout;
    var vb_roller = new Array();
    vb_roller[0] = '<img src="modules/imageslider/images/1.jpg">';
    vb_roller[1] = '<img src="modules/imageslider/images/2.jpg">';
    vb_roller[2] = '<img src="modules/imageslider/images/3.jpg">';
    vb_roller[3] = '<img src="modules/imageslider/images/4.jpg">';

    function rollVbRoller(i){
        $("#vb_rollerA").fadeOut(300,function(){
            $("#vb_rollerA").html(vb_roller[i++]);
            $("#vb_rollerA").fadeIn(300);
        });

        currentTimeout = setTimeout(function(){
            rollVbRoller(i%4);
        }, 2000);

    }

    function startFunction() {
        rollVbRoller(0);
        SCREEN.updateDuration(2*2); /* Update duration to 2 seconds times number of images */
    }

    function stopFunction() {
        clearTimeout(currentTimeout);
    }

    SCREEN.addListner(binding, "imageslider");

})(window);