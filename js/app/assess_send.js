(function() {
	 	
var useridList = ""; 
var globaltestnumList = "";
var emailList = "";


var selectedIndex = 0;
sendAssessResults = function(){

	//recordingslist.clear();
	//document.getElementById('sentenceselectSend').clear();
	while(document.getElementById('sentenceselectSend').length > 0){
		document.getElementById('sentenceselectSend').remove(0);	
	}
		
	if (assessorname == ""){
		return;
	}

	
	$.post("php/assess_send.php?globaltestnum=0&issend=0", {}, function(data) {
		jd = $.parseJSON(data);
		result = jd.filenames;
		if (result == "none") {
			window.alert("no emails to send - please go to another section");
		} else {					
			useridList = createArray(result.length);			
			globaltestnumList = createArray(result.length);
			emailList = createArray(result.length);
			for (var i = 0; i < result.length; i++) {
				useridList[i] = result[i][0];
				globaltestnumList[i] = result[i][1];
				emailList[i] = result[i][2];
			}

			var sel = document.getElementById('sentenceselectSend');
			for (var i = 0; i < useridList.length; i++) {
				var opt = document.createElement('option');
				opt.innerHTML = useridList[i];
				opt.value = useridList[i];
				if (i == 0)
					opt.selected = "true";
				sel.appendChild(opt);
			}
			numFiles = useridList.length;
			scoresArray = createArray(numFiles);
			for (var i = 0; i < numFiles; i++)
				scoresArray[i] = -1; 

			//changeTestSend();
		}

	});


};


nextFuncSend = function(button) {
	if (scoresArray[selectedIndex] > 0){
		window.alert("Email already sent");
		return;
	}
		
	var curDoc  = document.getElementById("sentenceselectSend");
	curFileName = curDoc.value;
	scoresArray[selectedIndex] = 1;
	$.post("php/assess_send.php?globaltestnum=" +curFileName + "&issend=1" + "&userid=" + useridList[selectedIndex] + "&email=" + emailList[selectedIndex], {}, function(data) {
		
	});
	
	var stringEmail = "email=" + emailList[selectedIndex];
	$.post("php/mailer/emailSender.php?option=0&" + stringEmail  + "&usertestid=" + useridList[selectedIndex],{},function()
	{
		//alert("saved");
	}
	);
	
	//changeTestSend();
	return;
};

changeTestSend = function(){
	
	var hf = document.createElement('a');
	//sentenceselect
	var curDoc  = document.getElementById("sentenceselectSend");
	selectedIndex = curDoc.selectedIndex;
	if (selectedIndex< 0) selectedIndex = 0;
	curFileName = curDoc.value;

	$.post("php/assess_send.php?globaltestnum=" +curFileName + "&issend=0", {}, function(data) {
		jd = $.parseJSON(data);
		result = jd.filenames;
		var multiUnderstanding = parseFloat(result[0][0]);
		var transcriptionUnderstanding = parseFloat(result[1][0]);
		var dictationSpeaking = parseFloat(result[2][0]);
		var freeSpeaking = parseFloat(result[3][0]);
		
		var speakingScore = (freeSpeaking+dictationSpeaking)/2;
		var understandingScore = (multiUnderstanding+transcriptionUnderstanding)/2;
		var overallScore = (speakingScore+understandingScore)/2; 
		
		//<div id="totalScore">8.2</div>			
		$("#totalScore").text(overallScore);
		//understanding score<br>
		//<div id="understandingScore">7.1</div>
		$("#understandingScore").text(understandingScore);			
		//speaking score<br>
		//<div id="speakingScore">7.2</div>
		$("#speakingScore").text(speakingScore);
		//multi choice understanding<br>
		
		$("#multiUnderstanding").text(multiUnderstanding);
		//<div id="multiUnderstanding">6.5</div>
		//transcription accuracy<br>
		//<div id="transcriptionUnderstanding">5.5</div>
		$("#transcriptionUnderstanding").text(transcriptionUnderstanding);
		//dictation speaking<br>
		//<div id="dictationSpeaking">4.3</div>
		$("#dictationSpeaking").text(dictationSpeaking);
		//free speaking<br>
		//<div id="freeSpeaking">3.2</div>
		$("#freeSpeaking").text(freeSpeaking);
		
	});


	var nb  = document.getElementById("nextButton");
	var alreadyScore = scoresArray[selectedIndex];
	if (alreadyScore == -1){
		$('input[name="editList"]').prop('checked', false);												
		nb.textContent = "Send email";						 	
	}else{
		$("[name=editList]").filter("[value='"+alreadyScore+"']").prop("checked",true);
		nb.textContent = "Email already sent";
	}
	// to chcek if already there !!
	//										

};



})();