// JavaScript Document
var triesUser = 0;
var triesLimit = 2;
var qStatus = 0;	//question status. 1=correct, 0=incorrect

arrCorrectAns = new Array(nItems);
arrCorrectAns = strCorrectAns.split(",")
userAns = new Array(nItems);
 
//Nothing is done
fdbkNotAttempted  = "<p>You have not made any selections.  Please try again.</p>"
 
function judgeInteraction() {
	if (triesUser < triesLimit ) { 
		var strTemp
		strTemp = ""
		fmDistracter=document.forms[0].fmDistracter
		for (var i=0; i<nItems; i++) {
			if(fmDistracter[i].checked) {
				strTemp = strTemp + "1,";
			} else {
				strTemp = strTemp + "0,";
			}
		}
		userAns = strTemp.split(",")
 
		var unChecked = 0;
		var nCorrect = 0;
		var nIncorrect = 0;
		var nChecksMatched = 0;
		for (i=0; i<nItems; i++) {
			if (userAns[i] == 0) unChecked += 1;
			if (userAns[i] == arrCorrectAns[i]) nCorrect += 1
		}
		if (unChecked == nItems) {
			//No answer selected
			strTemp = fdbkNotAttempted;
		} else {
			triesUser += 1;
			if (nCorrect == nItems) { //correct selection
				for (i=0; i<nItems; i++) {
					if (arrCorrectAns [i]==1) {
						fmDistracter[i].checked = true
					} else {
						fmDistracter[i].checked = false
					}
					fmDistracter[i].disabled = "disabled"
				}		
				//Correct answers
				if (parent.inQuiz) parent.quiz[qID] = 1;	//set question status
				strTemp = lastCFdbk;
				triesUser = triesLimit;
				document.Done.disabled = "disabled"
			} else {
				//second try
				if (triesUser == triesLimit) {
					for (i=0; i<nItems; i++) {
						if (arrCorrectAns [i]==1) {
							fmDistracter[i].checked = true
						}else{
							fmDistracter[i].checked = false
						}
						fmDistracter[i].disabled = "disabled"
					}
					strTemp = lastWFdbk;
					document.Done.disabled = "disabled"
				} else  { //1st try wrong
					if (parent.getPage() == "05050") {
					  //added later for this page only
					  for (i=0; i<nItems; i++) {
						  if (userAns[i] == 1) strTemp = arrFdbk[i];
					  }
					} else {
					  for (i=0; i<nItems; i++) {
						  if (userAns[i] == 1) strTemp = firstWFdbk;
					  }
					}
				}
			}
		}
		showFeedback(strTemp);
 
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
			eval('document.forms[0].row' + (i+1) + '[' + j + '].disabled = "disabled"')
		}
	}		
	eval("document.getElementById('qTable').style.cursor = 'text'");
	
	changeCursor('text');
}
 
function changeCursor(strCursorName) {
	//cursor for radio buttons
	for (i=0; i<nItems; i++) {
		document.forms[0].elements[i].style.cursor = strCursorName;
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