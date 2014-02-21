(function(window) {


    var binding =  {
        start : startFunction,
        stop : stopFunction
    }

    var myInterval;
    var timeOutCounter = 0;
    var newsEntries = [];
    var entryDurationSec = 6;


    function handleData(data) {
        newsEntries = [];
        $.each( data.responseData.feed.entries, function( key, val ) {
            var newsEntry = {};
            newsEntry.title = val.title;
            newsEntry.contentSnippet = val.contentSnippet;
            newsEntry.publishedDate = val.publishedDate;
            newsEntry.content = val.content;
            newsEntries.push( newsEntry );
        });

        update();
        myInterval = setInterval(function(){update()}, entryDurationSec*1000);
    }

    function update() {
        updateWeb(newsEntries[timeOutCounter]);

        timeOutCounter++;
        if(timeOutCounter >= newsEntries.length) {
            timeOutCounter = 0;
        }
    }

    function getImageSrcFromText(content) {
        var regex = /<img.*?src="(.*?)"/;
        if(regex.exec(content) != null) {
            return regex.exec(content)[1];
        }

        return null;
    }

    function removeHtmlTags(content) {
        return content.replace(/<(?:.|\n)*?>/gm, '');
    }

    function updateWeb(newsEntry) {
        var imgsrc = getImageSrcFromText(newsEntry.content);
        if(imgsrc != null) {
            imgsrc = "<img src='"+imgsrc+"' />";
        } else {
            imgsrc = "";
        }

        $("#newsticker").html("<h1>"+newsEntry.title+"</h1><div class='col-md-6'>"+removeHtmlTags(newsEntry.content)+"</div><div class='col-md-6'>"+imgsrc+"</div>");
    }

    function startFunction() {
        SCREEN.updateDuration((3 * entryDurationSec));
        $.ajax({
            dataType: "json",
            url: "modules/newsticker/proxy.php",
            success: handleData
        });
    }

    function stopFunction() {
        clearInterval(myInterval);
    }

    SCREEN.addListner(binding, "newsticker");
})(window);