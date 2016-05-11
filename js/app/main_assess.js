var assessorname = "";
var normalStartStage = 3;
var startStage = normalStartStage; // 3 normally. Set to 2 for debug assess of speech

var curstage = startStage;
var testtype = 1;
var isStaging = 0;
// 1 is for live, 0 is for training. A trainee will look at speech that has already been done with results sent out. They will have state = -2 when done? 
var assessortype = 1;   

window.onbeforeunload = function() {
	if (startStage == normalStartStage){
		logout();
		//return "You are being logged out";  		
  	}
  	return;
};


window.onload = function init() {
	if (startStage != 3){
		assessorname = 'jack';
	}
	if (top.location.pathname.search("staging_4365") > 0) {
		isStaging = 1;
	}
	
	curstage = startStage;
	document.getElementById('stage'+curstage.toString()).click();	
	
	if (curstage==1)	
		$("#listKeyShort").focus();			
};



function nextButton(button) {
	
	switch (curstage) {
    case 1:
        curstage = 1;
        document.getElementById('stage1').click();
        break;
    case 2:
        curstage = 2;
        document.getElementById('stage2').click();
        break;
    case 3:
		curstage = 3;
		document.getElementById('stage3').click();
        break;
	}	

}




function sendEmail(button) {
	// post to SQL here also.
	//alert("test");
	//saveAndSendEmail(window.emailin.value);

}

function loginAssess(button){

	// post to SQL here also.
	//alert("test");
	//saveAndSendEmail(window.emailin.value);
	//var textToInput = window.alert();
	assessorname = window.emailin.value; 
	//window.location = 'thankyou.html?uniqueid=' + userId + '&email=' + window.emailin.value.toString();
	phpString = "php/loginassess.php?login="+ assessorname;
	
	$.post(phpString, {}, function(data) {
		jd = $.parseJSON(data);
		result = jd.filenames;		
		if (result == "none") {
			window.alert("login failed");
		} else {
			if (result[0][3]==0)
				assessortype = 0; // in training mode.
			if (assessorname == 'thor'){	
				curstage = 1;				
				document.getElementById('stage1').click();
			}else{
				testtype = 1;
				curstage = 2;				
				document.getElementById('stage2').click();				
			}
		}
	});
	
	
}

function listening1Func(button){
	if (assessorname != 'thor') {
		alert("this section is not enabled");
		return;
	}
	testtype = 12;
	curstage = 1;
	document.getElementById('stage1').click();						
}

function speech1Func(button){
	testtype = 1;
	if (curstage==2){
		getAssessSpeech();	
	}else{
		curstage = 2;
		document.getElementById('stage2').click();		
	}					
}

function speech2Func(button){
	testtype = 2;
	if (curstage==2){
		getAssessSpeech();	
	}else{
		curstage = 2;
		document.getElementById('stage2').click();		
	}					
}

function sendEmailPage(button){
	if (assessorname != 'thor') {
		alert("this section is not enabled");
		return;
	}	
	curstage = 4;
	document.getElementById('stage4').click();
}	



function createArray(length) {
	var arr = new Array(length || 0), i = length;
	if (arguments.length > 1) {
		var args = Array.prototype.slice.call(arguments, 1);
		while (i--)
		arr[length - 1 - i] = createArray.apply(this, args);
	}
	return arr;
}

