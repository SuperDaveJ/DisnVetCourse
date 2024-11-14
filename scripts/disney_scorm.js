//This is a Module SCO for OPM/Disney - VCC course
var isPilot = true;
var inLMS = false;
var nLessons = 8;
var bookmark = "";
var strPagesViewed = "";
var lessonStatus = "00000000";
var moduleStatus = "";

function gotoPage(pgURL) {
	if ( isPageViewed(getPage()) == false ) {
		strPagesViewed = strPagesViewed + "," + getPage();
	}
	if (contentFrame.blnLastPage) {
		updateLessonStatus('2');
		if (contentFrame.nextToMenu) toMenu();
		else contentFrame.location.href = pgURL;
	} else {
		if ((contentFrame.blnFirstPage) && (getLessonStatus(getLesson()) < 1) ) updateLessonStatus('1');
		contentFrame.location.href = pgURL;
	}
}

function getPage() {
	//return current page file name in lower case without file extension.
	arrTemp = new Array();
	arrTemp2 = new Array();
	arrTemp = contentFrame.location.href.split("/");
	arrTemp2 = arrTemp[arrTemp.length-1].split("?");
	var strTemp = arrTemp2[0];
	var intTemp = strTemp.indexOf(".htm");
	strTemp = strTemp.substring(0,intTemp);
	return strTemp.toLowerCase();
}

function isPageViewed(pageFile) {
	pageFile = pageFile.toLowerCase();
	var iLes = getLesson();
	if ( checkModuleStatus() ) return true;
	if ( getLessonStatus(iLes) == 2 ) return true;
	if ( (strPagesViewed == "undefined") || (typeof(strPagesViewed) == "undefined") ) return false;
	if (strPagesViewed.indexOf(pageFile) >= 0) return true; 
	else return false;
}

function startCourse() {
  if (inLMS == true) {
	loadPage();	
	var entryStatus = doLMSGetValue( "cmi.core.entry" );
	if (entryStatus == "ab-initio") {
		//first time in the course
		strTemp = lessonStatus + "~"; 	//lesson status~pages viewed
		doLMSSetValue( "cmi.suspend_data", strTemp );
		doLMSSetValue("cmi.core.lesson_location", "");
		doLMSSetValue( "cmi.core.lesson_status", "incomplete" ); 
		doLMSCommit();
	} else {
		//reentry
		moduleStatus = doLMSGetValue( "cmi.core.lesson_status" );
		bookmark = doLMSGetValue("cmi.core.lesson_location");
		if (moduleStatus == "passed") {
			lessonStatus = "22222222";
			strPagesViewed = "";
		} else {
			getSuspendData();
		}
		if ( (bookmark == "301") || (bookmark == "undefined") || (typeof(bookmark) == "undefined") ) bookmark = "";
	}
  }
  startPage = "splash.html";
  
  if ( bookmark != "" ) {
	  if (confirm("Do you wish to resume where you left?")==true) contentFrame.location.href = bookmark;
	  else contentFrame.location.href = startPage;
  } else {
	  //load main menu
	  contentFrame.location.href = startPage;
  }
}

function exitCourse() {
	if ( inLMS == true ) {
		if ( checkModuleStatus() ) {
			doLMSSetValue( "cmi.core.lesson_status", "passed" );	//"completed" won't work for Plateau
		} else {
			doLMSSetValue( "cmi.core.lesson_status", "incomplete" );	//incomplete
		}
		saveBookmark();
		updateSuspendData();
		//unloadPage() function is in SCOFunctions.js file.
		unloadPage();
	}
	exitPageStatus = true;
	window.close();
}

function unloadCourse() {
	if (exitPageStatus != true) {
		exitCourse();
	}
}

function saveBookmark() {
  if ( inLMS == true ) {
	var strBookmark;

	if ( getPage().indexOf("menu") >= 0 ) {
		strBookmark = "";
	} else {
		if ( (contentFrame.$("#next").css("visibility") != "visible") && (contentFrame.backPg != "") ) {
			//current page is not completed, bookmark previous page
			strBookmark =  "lesson"+ getLesson() + "/" + contentFrame.backPg;
		} else {
			//bookmark current page
			strBookmark = "lesson"+ getLesson() + "/" + getPage() + ".html";
		}
	}
	doLMSSetValue( "cmi.core.lesson_location", strBookmark);
	doLMSCommit();
  }
}

function toMenu() {
	if (contentFrame.blnLastPage) 
		updateLessonStatus('2');
	if ( checkModuleStatus() )
		doLMSSetValue( "cmi.core.lesson_status", "passed" );
	updateSuspendData();
	contentFrame.location.href = "../menu.html";
}

function getLesson() {
	//Returns an integer as lesson ID
	if ( getPage().indexOf("menu") > 0 ) {
		return 0;
	} else {
		arrTemp = new Array();
		arrTemp = contentFrame.location.href.split("/");
		var strTemp = arrTemp[arrTemp.length-2];
		return parseInt(strTemp.substring(6) );
	}
}

function updateLessonStatus(cStatus) {
	var iLes = getLesson();
	if (iLes > 0)
		lessonStatus = lessonStatus.substr(0,iLes-1) + cStatus + lessonStatus.substr(iLes);
	if (cStatus == "2") cleanSuspendData();
	else updateSuspendData();
}

function getLessonStatus(iLes) {	//returns an integer 0, 1, or 2.
	var intTemp;
	intTemp = parseInt(lessonStatus.substr(iLes-1,1));
	if ( (intTemp < 0) || (intTemp > 2) ) return 0;
	else return intTemp;
}

function checkModuleStatus() {
	if ( (moduleStatus == "completed") || (moduleStatus == "passed") ) return true;
	for (var i=1; i<=nLessons; i++) {
		if (getLessonStatus(i) != 2) {
			return false;
			break;
		}
	}
	moduleStatus = "passed";
	return true;
}

function getSuspendData() {
	if (inLMS == true) {
		strTemp = doLMSGetValue("cmi.suspend_data");
		if ( (strTemp == "") || (strTemp == 301) || (strTemp == "undefined") || (typeof(strTemp) == "undefined") ) {
			lessonStatus = "00000000";
			strPagesViewed = "";
		} else {
			arrTemp = new Array();
			arrTemp = strTemp.split("~");
			lessonStatus = arrTemp[0];		// a stream of 0, 1, and 2
			strPagesViewed = arrTemp[1];
		}
	}
}

function updateSuspendData() {
	if ((strPagesViewed == "undefined") || (typeof(strPagesViewed) == "undefined")) {
		strPagesViewed = ""
	}
	var iLes = getLesson();
	if ( (iLes > 0) && (!contentFrame.blnLastPage) ) { //NOT on the menu or last page
		if ( (strPagesViewed.indexOf(getPage()) == -1) && (contentFrame.$('#next').css("visibility")=="visible") ) {
			strPagesViewed = strPagesViewed + "," + getPage();
		}
	}
	strTemp = lessonStatus + "~" + strPagesViewed;
	if ( inLMS == true ) {
		doLMSSetValue("cmi.suspend_data", strTemp);
		doLMSCommit();
	}
}

function cleanSuspendData() {
	var strTemp = strPagesViewed.toLowerCase();
	arrTemp = strTemp.split(",");
	for (var i=1; i<=nLessons; i++) {
		if (getLessonStatus(i) == 2) {
			for (var k=0; k<arrTemp.length; k++) {
				if ( parseInt(arrTemp[k].substr(1,1))==i ) arrTemp[k] = ""
			}
		}
	}
	strTemp = arrTemp.join();
	var re = /,{2,}/g;	//2 or more commas
	strTemp = strTemp.replace(re, ",");
	if (strTemp.substr(0,1) == ",") strTemp = strTemp.substr(1);
	//after cleaned
	strPagesViewed = strTemp;
	updateSuspendData();
}