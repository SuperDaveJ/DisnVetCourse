// JavaScript Document
/***************************************************** jquery Functions ***************************************************/
$(document).ready( function() {
	if (blnFirstPage) hideBackButton();
	if (interactionPage) hideNextButton();
	if (blnAudio) showAudioButtons();
	if ( parent.isPilot || parent.isPageViewed(parent.getPage()) ) showNextButton();
});

Shadowbox.init({
	overlayOpacity: 0.8,
	modal: true
});

function showNextButton() {
	$("#next").show();
}

function hideNextButton() {
	$("#next").hide();
}

function hideBackButton() {
	$("#back").hide();
}

function showAudioButtons() {
	document.getElementById("audioOn").style.visibility = "visible";
	document.getElementById("btnCC").style.visibility = "visible";
}

function showAudioOn() {
	document.getElementById("audioOn").style.visibility = "visible";
}

function hideAudioOn() {
	document.getElementById("audioOn").style.visibility = "hidden";
}

function showAudioOff() {
	document.getElementById("audioOff").style.visibility = "visible";
}

function hideAudioOff() {
	document.getElementById("audioOff").style.visibility = "hidden";
}

function showCC_Button() {
	document.getElementById("btnCC").style.visibility = "visible";
}

function hideCC_Button() {
	document.getElementById("btnCC").style.visibility = "hidden";
}
