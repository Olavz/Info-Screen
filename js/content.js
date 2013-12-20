var currentModule = 0;
var tickerSeconds = 0;
var loadNextModule = false;
var modifiedDuration = -1;
var entries = new Array();
var loadedScripts = new Array();

$(document).ready(function() {

    $.getJSON( "datafeeds/getModules.php", function( data ) {
        $.each( data, function( key, entry ) {
            entries.push(entry);
        });
        entries.sort(compareEntries);

        buildMenuEntries();
        updateActiveMenuTab();
        updateContentBlock(entries[0]);
        updateDisplayInfo(entries[currentModule]);
        loadScripts();
        updateLoop(); // Start update loop

    });

    $(".cube").css({
        "-webkit-transform": "translateZ(-"+(window.innerWidth-10)/2+"px)"
    })
    updateCubeBounds();
});

/* Comparable for sorting entries after priority order */
function compareEntries(a, b) {
    if (a.order > b.order)
        return -1;
    if (a.order < b.order)
        return 1;

    // a must be equal to b
    return 0;
}

function updateLoop() {

    var tickerMaxCount = (modifiedDuration > 0 ? modifiedDuration : entries[currentModule].airTime);

    if((tickerSeconds >= tickerMaxCount || loadNextModule == true) && entries.length > 1) {
        currentModule += 1;         // GoTo next module
        if(currentModule >= entries.length) {
            currentModule = 0;
        }

        updateContentBlock(entries[currentModule]);  // Load module, entry
        updateDisplayInfo(entries[currentModule]);
        updateActiveMenuTab();

        cubeRotateTo(currentModule % 4);

        tickerSeconds = 0;          // Reset ticker
        modifiedDuration = -1;
        loadNextModule = false;
    }

    tickerSeconds+=1;
    // Infinite loop
    setTimeout('updateLoop()', 1000);
}


function updateContentBlock(entry) {
    var pluginUrl = "modules/"+entry.folder;
    var currentBox;
    var currentSlide;
    switch (currentModule % 4) {
        case 0:
            currentBox = '.contentBox';
            currentSlide = '.front-pane';
            break;
        case 1:
            currentBox = '.contentBoxTwo';
            currentSlide = '.right-pane';
            break;
        case 2:
            currentBox = '.contentBoxThree';
            currentSlide = '.back-pane';
            break;
        case 3:
            currentBox = '.contentBoxFour';
            currentSlide = '.left-pane';
            break;
    }

    fadeAll();
    $(currentBox).fadeOut(300, function() {
        $(currentSlide).fadeIn();
        $(currentBox).load(pluginUrl, function() {
            $(currentBox).fadeIn();
            if(entry.scripts != null) {
                manageScripts(entry);
            }
        });
    });
}

function fadeAll() {
    var panes = ['.front-pane', '.right-pane', '.back-pane', '.right-pane'];
    $.each(panes, function(key, value) {
       $(value).fadeOut(1000);
    });
}

function loadScripts() {
    $.each(entries, function(key, entry) {
        var pluginUrl = "modules/"+entry.folder;
        if(entry.scripts != null) {
            $.each(entry.scripts, function(k, script) {
                $.getScript(pluginUrl+ "/" + script);
            });
        }
    });
}

function updateActiveMenuTab() {
    $(".navigation li").each(function(index) {
        $( this ).removeClass("selected");
        if(currentModule == index) {
            $( this ).addClass("selected");
        }
    });
}

function buildMenuEntries() {
    $.each(entries, function(key, entry) {
        $("ul.navigation").append("<li>" + entry.name +"</li>");
    });
}

function updateDisplayInfo(entry) {
    /*
    * Requires default options.
    **/

    if(entry.screenSettings.showHeader) {
        $(".heading").slideDown();
    }

    if(!entry.screenSettings.showHeader) {
        $(".heading").slideUp();
    }
}

function manageScripts(entry) {
    $.each(loadedScripts, function(key, value) {
        if(value.folder != entry.folder) {
            value.obj.stop();
            console.log("Stopping: " + value.folder);
        }
    });

    $.each(loadedScripts, function(key, value) {
        if(value.folder == entry.folder) {
            value.obj.start();
            console.log("Starting: " + value.folder);
        }
    });
}

function gotoNextModule() {
    loadNextModule = true;
}

function updateDuration(duration) {
    modifiedDuration = duration;
}

window.addListner = function(ref, folder) {
    loadedScripts.push({"obj": ref, "folder":folder});
}

$( window ).resize(function() {
    updateCubeBounds();
});


var halfWidth = 0;
function cubeRotateTo(side) {
    var cubeRotY = 0;
    if(side == 0) {
        cubeRotY = 0;
    } else if(side == 1) {
        cubeRotY = -90;
    } else if(side == 2) {
        cubeRotY = -180;
    } else if(side == 3) {
        cubeRotY = -270;
    }
    $(".cube").css({
        "-webkit-transform": "translateZ(-"+halfWidth+"px) rotateY("+cubeRotY+"deg)"
    });
}

function updateCubeBounds() {
    var headerHight = 150;
    var footerHight = 0;

    var width = window.innerWidth - 10;
    halfWidth = width / 2;
    var height = window.innerHeight;

    $(".cube").css({
        "width": width
    });
    $(".cube div").css({
        "width": width,
        "height": (height - headerHight - footerHight)
    });
    $(".depth div.back-pane").css({
        "-webkit-transform": "translateZ(-"+halfWidth+"px) rotateY(180deg)",
        "-moz-transform" : "translateZ(-"+halfWidth+"px) rotateY(180deg)",
        "-ms-transform" : "translateZ(-"+halfWidth+"px) rotateY(180deg)",
        "transform" : "translateZ(-"+halfWidth+"px) rotateY(180deg)"
    });

    $(".depth div.front-pane").css({
        "-webkit-transform": "translateZ("+halfWidth+"px) rotateY(0deg)",
        "-moz-transform" : "translateZ("+halfWidth+"px) rotateY(0deg)",
        "-ms-transform" : "translateZ("+halfWidth+"px) rotateY(0deg)",
        "transform" : "translateZ("+halfWidth+"px) rotateY(0deg)"
    });

    $(".depth div.right-pane").css({
        "-webkit-transform": "rotateY(-270deg) translateX("+halfWidth+"px)",
        "-webkit-transform-origin" : "top right",

        "-moz-transform" : "rotateY(-270deg) translateX("+halfWidth+"px)",
        "-moz-transform-origin" : "top right",

        "-ms-transform" : "rotateY(-270deg) translateX("+halfWidth+"px)",
        "-ms-transform-origin" : "top right",

        "transform" : "rotateY(-270deg) translateX("+halfWidth+"px)",
        "transform-origin" : "top right"
    });

    $(".depth div.left-pane").css({
        "-webkit-transform": "rotateY(270deg) translateX(-"+halfWidth+"px)",
        "-webkit-transform-origin" : " center left",

        "-moz-transform" : "rotateY(270deg) translateX(-"+halfWidth+"px)",
        "-moz-transform-origin" : "center left",

        "-ms-transform" : "rotateY(270deg) translateX(-"+halfWidth+"px)",
        "-ms-transform-origin" : "center left",

        "transform" : "rotateY(270deg) translateX(-"+halfWidth+"px)",
        "transform-origin" : "center left"
    });

}