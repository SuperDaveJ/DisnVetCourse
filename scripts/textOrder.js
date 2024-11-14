var triesLimit = 2;
var triesUser = 0;

function showCorrect() {
	var form = document.form1;
	for (i = 0; i < form.Quiz.length; i++) {
		form.elements[i].value = correctAnswer.charAt(i);
	}
}

function judgeInteraction() {	
	var form = document.form1
	var userAnswer = ""
	
	//checks to see if the question has been attempted or not
	for (var i=0; i < form.Quiz.length; i++)  {
		userAnswer = userAnswer + form.Quiz[i].value;
	}		
	if (userAnswer.length != correctAnswer.length) strFB = "You need to answer the question to continue.";
	else {
		triesUser = triesUser + 1;
		if (userAnswer == correctAnswer) { 
			//Correct
			triesUser = triesLimit;
			strFB = lastCFdbk;
			readyForNext();
		} else {
			if (triesUser == triesLimit) {
				//Last Incorrect
				showCorrect();
				strFB = lastWFdbk;
				readyForNext();
			} else {
				//First incorrect
				for (i = 0; i < form.Quiz.length; i++) {
					if (userAnswer.charAt(i) != correctAnswer.charAt(i)) {	
						//uncheck the incorrect ones
						form.Quiz[i].value = ''
					}
				}
				strFB = firstWFdbk;
			}
		}
	}
	showFeedback(strFB);	
}

function readyForNext() {
	for (var i=0; i < document.form1.Quiz.length; i++) {					
		 document.form1.Quiz[i].disabled = "disabled";
	}
	document.getElementById("done").style.visibility = "hidden";
	showNextButton();
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