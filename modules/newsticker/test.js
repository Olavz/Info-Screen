(function(window) {

    var binding =  {
        start : startFunction,
        stop : stopFunction
    }

    var currentTimeout;
    var vb_roller = new Array();
    vb_roller[0] = '<span class="title">Kom i gang med Android-utvikling</span><p class="art">Å komme i gang med Androidutvikling er faktisk veldig lett! Selv om man ikke har altfor mye erfaring med programmering er det overkommelig, og man lærer utrolig mye veldig fort! Hvis du ikke vet hva du skal lage som din første app, hvorfor ikke ta en titt på apputfordringen som var i september? Lag en app som presenterer deg selv! &quot;)<br />Det eneste du trenger for å utvikle apps til Android er et Java DK (http&quot;//www.oracle.com/technetwork/java/javase/downloads/index.html), og Android Developer Tools Bundle, som lastes ned herfra (http&quot;//developer.android.com/sdk/index.html).<br />Når JDK er installert, og ADT Bundle er lastet ned og pakket ut, starter  du Android Studio. Du vil da få opp en veiviser som guider deg igjennom  det å lage ditt aller første Androidprosjekt&quot; Hello World! Når  veiviseren er fullført og Android Studio starter &quot;på ordentlig&quot; har du  nettopp laget din første Android-app. Gratulerer!<br />...<br/><span class="link">Se mer på enigma.hiof.no</span></p>';
    vb_roller[1] = '<span class="title">Nytt år betyr nytt styre - still til valg i Enigma!</span><p class="art">Generalforsamling i Enigma holdes i februar, og der skal det blant annet velges et nytt styre. Enigma trenger akkurat deg!<br />Å stille til valg er veldig enkelt! Du må sende en epost til enigma@hiof.no der du presenterer deg selv, styreposten du ønsker, og skriver hvorfor du vil stille til valg. I januar sender vi ut en invitasjon til generalforsamling der vi presenterer kandidatene, og medlemmer som møter på generalforsamlingen stemmer på kandidaten de ønsker.<br />...<br/><span class="link">Se mer på enigma.hiof.no</span></p>';
    vb_roller[2] = '<span class="title">Sikre ditt digitale liv. Bruk kryptering!</span><p class="art">Lær hvordan du sikrer deg mot datatyveri ved å kryptere datamaskiner og telefoner<br />...<br/><span class="link">Se mer på enigma.hiof.no</span></p>';

    function rollVbRoller(i){
        $("#vb_roller").fadeOut(300,function(){
            $("#vb_roller").html(vb_roller[i++]);
            $("#vb_roller").fadeIn(300);
        });

        currentTimeout = setTimeout(function(){
            rollVbRoller(i%3);
        }, 2000);

    }

    function startFunction() {
        rollVbRoller(0);
    }

    function stopFunction() {
        clearTimeout(currentTimeout);
    }

    SCREEN.addListner(binding, "newsticker");

})(window);