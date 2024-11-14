// JavaScript Document
var vpPath = "http://www.c2mm.net/virtualPilot/";	//path to Virtual Pilot site
var blnFirstPage = false;
var blnLastPage = false;
var nextToMenu = false;		//set this to true on last page of each lesson
var interactionPage = false;
var audioOn = true;
var audio2On;
var blnAudio = false;

function getInternetExplorerVersion()
{
  // Returns the version of Internet Explorer or a -1 (indicating the use of another browser).
  var iev = -1; // Return value assumes failure.
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      iev = parseFloat( RegExp.$1 );
  }
  return iev;
}

function exitConfirm(){
	if (confirm("Do you wish to exit the lesson?")==true) parent.exitCourse();
}

function refresh() {
	window.location.reload();
}

function showExpertText() {
	//See 01040.html for example
	if (document.form1.response.value == "" || document.form1.response.value == "Type your answer in this area.") {
		alert("\nYou need to answer the question to continue.");
	} else {
		document.getElementById("expertTxtBox").style.visibility = "visible";
	}
}

/***************************************** Preload images *************************************************/
function MM_preloadImages() {
  var d=document; 
  if(d.images){ 
  	if(!d.MM_p) d.MM_p=new Array();
    var i, j=d.MM_p.length, a=MM_preloadImages.arguments; 
	for(i=0; i<a.length; i++)
    	if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}
  }
}

MM_preloadImages('../sysimages/glossary_0.jpg','../sysimages/glossary_2.jpg','../sysimages/menu_0.jpg','../sysimages/menu_2.jpg','../sysimages/exit_0.jpg','../sysimages/exit_2.jpg','../sysimages/back_0.png','../sysimages/back_2.png','../sysimages/next_0.png','../sysimages/next_2.png','../sysimages/refresh_0.png','../sysimages/refresh_2.png');
/**************************************** End of Preload images *********************************************/

/********************** Audio Conttrol Functions ************************/
function getFlashMovie(movieName) { 

	if (window.document[movieName]) {	//IE
		return window.document[movieName];
	}
	if (navigator.appName.indexOf("Microsoft Internet") == -1) { 	//Not IE
		if (document.embeds && document.embeds[movieName]) {	//Firefox, Opera, etc.
      		return document.embeds[movieName]; 
  		} else {	//
    		return document.getElementById(movieName);
		}
  	}
	
	//var isIE = navigator.appName.indexOf("Microsoft") != -1;   
	//return (isIE) ? window[movieName] : document[movieName];  
}  

function pause() {
	getFlashMovie("FlashID").StopPlay();
}

function play() {
	if (audio2On) {
		getFlashMovie("FlashID2").StopPlay();
		audio2On = false;
	}
	getFlashMovie("FlashID").Play();
}

function play2() {
	getFlashMovie("FlashID").StopPlay();
	getFlashMovie("FlashID2").Play();
	audio2On = true;
}

function replay() {
	getFlashMovie("FlashID").StopPlay();
	getFlashMovie("FlashID").Rewind();
	getFlashMovie("FlashID").Play();
}

function stop() {
	getFlashMovie("FlashID").StopPlay();
	getFlashMovie("FlashID").Rewind();
}

function turnOnAudio() {
	document.getElementById("audioOff").style.visibility = "hidden";
	document.getElementById("audioOn").style.visibility = "visible";
	//document.getElementById("audioReplay").style.visibility = "visible";
	//document.getElementById("cc").style.visibility = "visible";
	play();
	audioOn = true;
}

function turnOffAudio() {
	document.getElementById("audioOn").style.visibility = "hidden";
	document.getElementById("audioOff").style.visibility = "visible";
	//document.getElementById("audioReplay").style.visibility = "hidden";
	//document.getElementById("cc").style.visibility = "hidden";
	stop();
	audioOn = false;
}

function controlAudio( onOrOff ) {
	//controlAudio( "on" ) for Play button, controlAudio( "off" ) for Pause button
	//This will play and pause narration audio whose id is "FlashID".  Animation flash id is "animation".
	audioID = getFlashMovie("FlashID").id;
    if ( audioID == "FlashID" ) {
		if (onOrOff == "on") {
			play();
			turnOnAudio();
		} else {
			pause();
			turnOffAudio();
		}
	}
}

function checkAudio() {
	//This function is called from jqFunctions after page is loaded.
	audioID = getFlashMovie("FlashID").id;
    if ( audioID == "FlashID" ) {
		if ( parent.audioOn == true ) {
			showAudioOn();
			hideAudioOff();
			play();
		} else {
			showAudioOff();
			hideAudioOn();
			stop();
		}
		showCC_Button();
	} else {
		hideAudioOn();
		hideAudioOff();
		hideCC_Button();
	}
}

function toggleAudio() {
	if (audioOn) {
		showAudioOff();
		hideAudioOn();
		pause();
		audioOn = false;
	} else {
		showAudioOn();
		hideAudioOff();
		play();
		audioOn = true;
	}
}
/********************** End of Audio Conttrol Functions ************************/

/*********************** Open Popup Functions **********************************/
function openWinCentered(myUrl, myTitle, myWidth, myHeight, scrollbar, resize ) {
	// open the window
	positionTop = (screen.height - myHeight)/2 - 25;
	positionLeft = (screen.width - myWidth)/2 - 5;
	newWin = window.open (myUrl,myTitle,"toolbar=no,location=no,width="+myWidth+",height="+myHeight+",menubar=no,resizable="+scrollbar+",status=no,scrollbars="+resize+",top="+positionTop+",left="+positionLeft+"");
	if (window.focus) newWin.focus();
}

function openGlossary() {
	openWinCentered("../glossary.html", "Glossary",  631, 398, "yes", "no" );
}

function show_cc() {
	//filename = parent.getPage() + "_cc.html";
	//openWinCentered( filename, "AudioTranscript", 508, 291, "no", "no" );
	document.getElementById("cc_box").style.visibility = "visible";
}

/*********************** End of Open Popup Functions **********************************/

/***************************************************** Query Functions ***************************************************/
function PageQuery(q) {
	if(q.length > 1) this.q = q.substring(1, q.length);
	else this.q = null;
	this.keyValuePairs = new Array();
	if(q) {
		for(var i=0; i < this.q.split("&").length; i++) {
			this.keyValuePairs[i] = this.q.split("&")[i];
		}
	}

	this.getKeyValuePairs = function() { return this.keyValuePairs; }

	this.getValue = function(s) {
		for(var j=0; j < this.keyValuePairs.length; j++) {
			if(this.keyValuePairs[j].split("=")[0] == s)
				return this.keyValuePairs[j].split("=")[1];
		}
		return false;
	}

	this.getParameters = function() {
		var a = new Array(this.getLength());
		for(var j=0; j < this.keyValuePairs.length; j++) {
			a[j] = this.keyValuePairs[j].split("=")[0];
		}
		return a;
	}

	this.getLength = function() { return this.keyValuePairs.length; } 
}

function getQueryValue(key){
	var page = new PageQuery(window.location.search); 
	return unescape(page.getValue(key)); 
}

/*********************** Mouse Over and Out functions *********************************/
var itemsViewed;	//Number of terms.

function checkStatus( iTerm ) {
	//iTerm start from 1
	itemsViewed = itemsViewed.substring(0,iTerm-1) + iTerm + itemsViewed.substring(iTerm);
	if ( itemsViewed.indexOf('0') == -1 ) showNextButton();
}

function jpgOut(iTerm, buttonID) {
	if (itemsViewed.substr(iTerm-1, 1) != "0") {
		document.getElementById(buttonID).src = "images/" + buttonID + "2.jpg";
	} else {
		document.getElementById(buttonID).src = "images/" + buttonID + "0.jpg";
	}
}

function pngOut(iTerm, buttonID) {
	if (itemsViewed.substr(iTerm-1, 1) != "0") {
		document.getElementById(buttonID).src = "images/" + buttonID + "2.png";
	} else {
		document.getElementById(buttonID).src = "images/" + buttonID + "0.png";
	}
}

/***************************************************** Comments Functions ***************************************************/
function addComment() {
	comWin = window.open(vpPath + 'addComment.asp?uID=NA&cID=1834_FAA_APT&mID=APT&lID='+parseInt(parent.lessonID)+'&pID='+parent.getPage(), "Comments", "width=800,height=600,scrollbars=no");
}

function viewComment() {
	viewWin = window.open(vpPath + 'reviewComments.asp?uID=NA&cID=1834_FAA_APT&mID=APT&lID='+parseInt(parent.lessonID)+'&pID='+parent.getPage(), "Comments", "width=800,height=600,scrollbars=yes");
}