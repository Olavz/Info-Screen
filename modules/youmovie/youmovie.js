(function(window) {



    var binding =  {
        start : startFunction,
        stop : stopFunction
    }

    function startFunction() {
        var params = { allowScriptAccess: "always" };
        var atts = { id: "myytplayer" };
        swfobject.embedSWF("http://www.youtube.com/v/7CVtTOpgSyY?enablejsapi=1&playerapiid=ytplayer&version=3",
            "ytapiplayer", "100%", "100%", "8", null, null, params, atts);


    }

    function stopFunction() {
    }

    SCREEN.addListner(binding, "youmovie");

})(window);


function onYouTubePlayerReady(playerId) {
    ytplayer = document.getElementById("myytplayer");
    ytplayer.playVideo();
    ytplayer.addEventListener("onStateChange", "onytplayerStateChange");
}

function onytplayerStateChange(newState) {
    ytplayer = document.getElementById("myytplayer");
    SCREEN.updateCubeBounds();
    if(newState == 0) {
        console.log("newState: > GO TO NEXT");
    }
    if(newState == 1) {
        SCREEN.updateDuration((ytplayer.getDuration() - ytplayer.getCurrentTime())+1);
        console.log("Updating duration to: " + (ytplayer.getDuration() - ytplayer.getCurrentTime())+1);
    }
}
