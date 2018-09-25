//<![CDATA[
//TODO option to ignore length
var t; // Ursprungstweet
var cot = 0; //Anzahl Zeichen im Ursprungstweet
var words = new Array; //Array mit Wörtern/Buchstaben des ursprungstweets
var l = ""; //Zwischenspeicher
var finl = ""; //Schlusstweet
var TWITTER_URL = "https://twitter.com/intent/tweet?hashtags=twäse&text=";
var url = TWITTER_URL; //URL zum sharen
var x = 0; // Erstes Wort = o; kein space
var y = 0; //Error eingeblendet?
var z = 0; //Optionen eingeblendet?
var h = 0; //Löcher anzeigen?
var a = 0; //Letztes Wort ein Loch?
var s = 12; //Zufälligkeit, vom slider
var method = new Array(2); //metode?
var what = new Array(4); // Was einsetzen?
var q = 0;
var fillUp = false;
var wasChecked = false;
var last = "holes";
var TWEET_LENGTH = 280;


function getChar(h) {
    return h instanceof Array ? h[Math.floor(Math.random()*h.length)] : h;
}

function getMaxCharLength(h) {
    return h instanceof Array ? h[0].length : h.length;
}

$(document).ready(function() {
    window.addEventListener("localized", function() {
        $("#tweet").val("");
        $("#ownstring").val("");
        $("#del").button({
                icons: {
                    primary: "ui-icon-trash"
                },text: false
        });
        $("#opttoggle").button({
                icons: {
                    primary: "ui-icon-wrench"
                },text: true
        });
        $("#hilfekn").button({
                icons: {
                    primary: "ui-icon-help"
                },text: false
        });
        $("#options").slideToggle(1);
        $("#buttonsbar").buttonset();
        $("#holes")[0].checked = true;
        $("#nothing")[0].checked = false;
        $("#censor")[0].checked = false;
        $("#own")[0].checked = false;
        $("#radio2")[0].checked = false;
        $("#radio1")[0].checked = true;
        $("#fill")[0].checked = false;
        $("#step2").hide();
        $("#backg").hide();
        $("#container").hide();
        $("#errort").hide();
        $("#help").hide();
        $("#radio").buttonset();
        $("#replacment").buttonset();
        $("#slider").attr("value",s);
        $("#fill").button();
        $("#ownstring").hide();
        $("#back").button({
                icons: {
                    primary: "ui-icon-triangle-1-w"
                },text: true,disabled:false
        });

        $("#tweet").keyup(function () {
            t = $("#tweet").val();
            cot = t.length;
            if(cot<=TWEET_LENGTH) {
                $("#counter").css("color","black");
            }
            else {
                $("#counter").css("color","red");
            }
            $("#counter").text(TWEET_LENGTH - cot);
        });

        $("#censor").change(function () {
            if(!$("#fill")[0].checked) {
                $("#fill")[0].checked = true;
                $("#fill").button("refresh");
                wasChecked = false;
            }
            else {
                wasChecked = true;
            }
            $("#fill").button("disable");
            $("#ownstring").slideUp();
            last = "censor";
        });

        $("#own").change(function() {
            $("#ownstring").slideDown();
            if(!wasChecked&&last=="censor") {
                $("#fill")[0].checked = false;
                $("#fill").button("refresh");
                $("#fill").button("enable");
            }
            $("#fill").button("enable");
            last = "own";
        });

        $("#holes,#nothing").change(function () {
            if(!wasChecked&&last=="censor") {
                $("#fill")[0].checked = false;
                $("#fill").button("refresh");
            }
            $("#fill").button("enable");
            $("#ownstring").slideUp();
            last = "holes";
        });

        $("#opttoggle").click( function() {
            if(z==0) {
                if(last!="censor")
                    $("#fill").button("enable");
                $("#options").slideToggle("slow");
                $("#opttoggle").button( "option", "label", document.webL10n.get("hideoptions"));
                $("#opttoggle").button( "option", "icons", {primary:'ui-icon-triangle-1-n'} );
                z++;
            }
            else {
                $("#options").slideToggle("slow");
                $("#opttoggle").button( "option", "label", document.webL10n.get("options"));
                $("#opttoggle").button( "option", "icons", {primary:'ui-icon-wrench'} );
                z--;
            }
        });

        $("#errort").click(function () {
            hideError();
        });

        $("#del").click( function() {
            $("#tweet").val("");
            cot = 0;
            $("#counter").css("color : black;");
            $("#counter").text(TWEET_LENGTH - cot);
        });

        $("#hilfekn").click( function() {
            showInfo("help");
            $("#container").click( function() {
                hideInfo();
            });
        });

        $("#subm").click( function() {
            if(cot <= TWEET_LENGTH && cot != 0) {
                hideError();
                showInfo("proc");
                if(z==1) {
                    $("#options").slideToggle(1);
                    $("#opttoggle").button("option","label",document.webL10n.get("options"));
                    z--;
                }
                $("#step1").fadeOut();

                what[0] = $("#holes:checked").val();
                what[1] = $("#nothing:checked").val();
                what[2] = $("#censor:checked").val();
                what[3] = $("#own:checked").val();

                if(what[2]=="on") {
                    h = "█";
                    fillUp=true;
                }
                else if(what[1]=="on")
                    h = "";
                else if(what[3]=="on")
                    h=$("#ownstring").val();
                else
                    h = ["O", "o", "0", "°"];

                if($("#fill:checked").val()!==undefined) {
                    fillUp=true;
                }

                var s = parseInt(document.getElementById("slider").value, 10);

                method[0] = $('#radio1:checked').val();
                method[1] = $('#radio2:checked').val();

                if(method[0]=="on")
                    words = t.split(" ");
                else if(method[1]=="on") {
                    words = t.split("");
                }
                GetRandom(0, 100, words.length, function(randoma) {
                    $.each(words, function(i,word) {
                        var isContent = word.match(/[a-zA-Z0-9\-]+/)
                        if(randoma[i] > s && isContent) {
                            if(x==1 && method[0]=="on") {
                                finl+=" "+word;
                            }
                            else if(x == 1) {
                                finl += word;
                            }
                            else {
                                finl=word;
                                x=1;
                            }
                        }
                        else if(isContent) {
                            if(x == 1 && method[0] == "on") {
                                finl+=" "+getChar(h);
                                var hlength = getMaxCharLength(h);
                                if(fillUp&&hlength<word.length) {
                                    for(var asdf = 1; asdf < word.length; asdf += hlength) {
                                        finl+=getChar(h);
                                    }
                                }
                            }
                            else
                                finl+=getChar(h);

                            if(x == 0)
                                x++;
                        }
                        else if(!isContent)
                            finl+=word;
                    });
                    document.getElementById("proctw").value = finl;
                    url += encodeURIComponent(finl);
                    $("#step2").fadeIn();
                    hideInfo();
                });
            }
            else if(cot>140) {
                if(x==0) {
                    $("#error").fadeIn();
                    x++;
                }
                showError(document.webL10n.get("error_long"));
            }
            else if(cot==0) {
                if(x==0) {
                    $("#error").fadeIn();
                    x++;
                }
                showError(document.webL10n.get("error_no_input"));
            }
            else {
                if(x==0) {
                    $("#error").fadeIn();
                    x++;
                }
                showError(document.webL10n.get("error_unknown"));
            }
        });

        $("#tweetit").click( function() {
            location.href = url;
        });
        $("#back").click( function() {
            finl = "";
            url = TWITTER_URL;
            a = 0;
            $("#step2").fadeOut(function() {
                $("#step1").fadeIn();
            });
        });
    }, false);
});

function GetRandom( min, max, no, f ) {
	if(!(no>0))
		no=1;
	$.get("https://humanoids.be/twaese/proxy.php",{"num":no,"min":min,"max":max,"timestamp":Date.now()},function(result) {
		var resultaa = result.split("\n").map(function(a) { return parseInt(a, 10);});
        resultaa.pop();
		f(resultaa);
	});
}

function showError(text) {
	$("#error").text(text);
	$("#errort").fadeIn();
}
function hideError() {
	$("#error").text("");
	$("#errort").fadeOut();
}
function showInfo(what) {
	if(what=="help") {
		$("#proc").hide();
	}
	else if(what=="proc") {
		$("#help").hide();
	}
	$("#backg").fadeIn();
	$("#container").fadeIn();
	$("#"+what).show();
	$("#shadow").css("height",$("#"+what)[0].scrollHeight);
}
function hideInfo() {
	$("#container").fadeOut();
	$("#backg").fadeOut();
}
//]]>
