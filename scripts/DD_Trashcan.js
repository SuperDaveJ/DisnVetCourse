// JavaScript Document
// override funcs defined within the Lib
function my_PickFunc()
{
    //if (dd.obj.name == 'drag1') alert('Image1 is selected.');
	//alert("object = " + dd.obj.name + "; below = " + dd.elements.img5.getEltBelow().name);
}

function my_DragFunc()
{
}

function my_DropFunc()
{
	//strTemp = arrCorrect.join();
	//there is one target only
	//alert(dd.obj.getEltBelow().name)
	
	if ( strCorrect.indexOf(dd.obj.name) >= 0 && dd.obj.getEltBelow().name == "target" ) {
		dd.obj.moveTo(dd.elements.target.defx, dd.elements.target.defy);
		dd.obj.hide();
		uCorrect += 1;
		//dd.obj.parent.hide();
	} else {
		dd.obj.moveTo(dd.obj.defx, dd.obj.defy);
	}
	if ( uCorrect == nCorrect ) {
		//Correct
		if (parent.inQuiz) parent.quiz[qID] = 1;	//set question status
		disableDrag();
		showFeedback(fdbkCorrect);
	}
}

function disableDrag() {
	for (var i=0; i<nObj; i++) {
		eval("dd.elements.img"+(i+1)+".setDraggable(false)");
	}
	showNextButton();
}

function showFeedback (fromfdbk) {
	var strTemp = "";	
	/*
	if (triesUser == triesLimit) {
		showNextButton();
		document.getElementById("done").style.visibility = "hidden"
	}
	*/
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