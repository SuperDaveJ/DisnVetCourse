// JavaScript Document

var triesUser = 0;
var triesLimit = 2;
var fdbkNotAttempted  = "<p>You have not made any selections.  Please try again.</p>"
 

//final incorrect
/*
var strC="";
for (i=0; i<nRows; i++) {
		for (j=0; j<nCols; j++) {
			if (arrCorrectAns[i][j] == 1) {
				strC =  strC +  "<li>"+ arrRowTitle[i+1] + " matches " + arrColTitle[j+1] +". </li>"
			}
		}
}
*/
//********************* NO change is needed below this line. *************************
function judgeInteraction() {
	if (triesUser < triesLimit ) { 
		var strTemp, thisRow;
		for (var i=0; i<nRows; i++) {
			strTemp = ""
			thisRow = eval('document.forms[0].row' + (i+1))
			for (var j=0; j<nCols; j++) {
				if(thisRow[j].checked) {
					strTemp = strTemp + "1,";
				} else {
					strTemp = strTemp + "0,";
				}
			}
			arrUserAns[i] = strTemp.split(",")
		}
		
		var unChecked = 0;
		var nCorrect = 0;
		var nIncorrect = 0;
		for (i=0; i<nRows; i++) {
			for (j=0; j<nCols; j++) {
				if (arrUserAns[i][j] == 0) unChecked += 1;
				if (arrUserAns[i][j] == arrCorrectAns[i][j]) nCorrect += 1
			}
		}
		if (unChecked == nRows*nCols) {
			//No answer selected
			strFeedback = fdbkNotAttempted;
		} else {
			triesUser += 1;
			if (nCorrect == nRows*nCols) {
				//Correct answers
				strFeedback = lastCFdbk;
				didcorrect = true;
				triesUser = triesLimit;
				showCorrect();
			} else {
				//Incorrect
				if (triesUser == triesLimit) {
					//Second incorrect
					strFeedback = lastWFdbk;
					showCorrect();
				} else  { //1st Incorrect
					strFeedback = firstWFdbk;
				}
			}
		}
		showFeedback(strFeedback);
	}
}
 
function showCorrect() {
	for (i=0; i<nRows; i++) {
		for (j=0; j<nCols; j++) {
			if (arrCorrectAns[i][j] == 1) {
				eval('document.forms[0].row' + (i+1) + '[' + j + '].checked = true')
			} else {
				eval('document.forms[0].row' + (i+1) + '[' + j + '].checked = false')
			}
			//eval('document.forms[0].row' + (i+1) + '[' + j + '].disabled = "disabled"')
		}
	}		
	eval("document.getElementById('qTable').style.cursor = 'text'");
	//Enable Next button and lock Done button
	//MM_showHideLayers('Next','','show')
	//document.Done.disabled = "disabled"
	changeCursor('text');
}
 
function changeCursor(strCursorName) {
	//cursor for radio buttons
	for (i=0; i<nRows; i++) {
		for (j=0; j<nCols; j++) {
			document.forms[0].elements[i*nCols+j].style.cursor = strCursorName;
		}
	}
	//cursor for Done button
	if (strCursorName != "pointer")
		document.links[0].style.cursor = "default";	
	else
		document.links[0].style.cursor = strCursorName;
}
 
function showFeedback (fromfdbk) {
	var strTemp = "";	
	if (triesUser == triesLimit) {
		showNextButton();
		document.getElementById("done").style.visibility = "hidden"
	}

	positionTop = (screen.height - 291)/2 - 25;
	positionLeft = (screen.width - 508)/2 - 5;
	newWin = window.open ("","Feedback","toolbar=no,width=508,height=291,menubar=no,resizable=yes,status=no,scrollbars=no,top="+positionTop+",left="+positionLeft+"");
	newWin.focus();
	if (newWin != null)
	{
	if (newWin.opener == null) {newWin.opener = window};
	  strTemp	= strTemp + "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>";
	  strTemp	= strTemp + "<html xmlns='http://www.w3.org/1999/xhtml'><head>";
	  strTemp	= strTemp + "<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />";
	  strTemp	= strTemp + "<title>Knowledge Check Feedback</title>";
	  strTemp	= strTemp + "<link rel='stylesheet' type='text/css' href='../styles/feedback.css' />";
	  strTemp	= strTemp + "</head><body><div id='fdbkTitle'><h1 class='popupH'>Knowledge Check Feedback</h1></div>";
	  strTemp	= strTemp + "<div id='popText'>" + fromfdbk + "</div>";
	  strTemp	= strTemp + "</body></html>";
	
	  newWin.document.write(strTemp);
	  newWin.document.close();
	}
}