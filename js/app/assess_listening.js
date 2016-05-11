(function() {
	 
var selectedIndex = 0;
var dataList = "";
var speakerIdList = "";
var testindexList = "";
var testUniqueIdList = "";
var scoresArray;
var numFiles = 0;
var curFileName = "";

getAssessListening = function(){
	if (assessorname == ""){
		return;
	}
	
	testtype = 12;	
	$.post("php/assess.php?state=1&login=" + assessorname.toString() + "&testtype=" + testtype, {}, function(data) {
		jd = $.parseJSON(data);
		result = jd.filenames;
		if (result == "none") {
			window.alert("no files to rate - please go onto the speech sections");
			return;
		} else {					
			dataList = createArray(result.length);
			speakerIdList = createArray(result.length);
			testindexList = createArray(result.length);
			testUniqueIdList = createArray(result.length);			
			for (var i = 0; i < result.length; i++) {
				dataList[i] = result[i][0];
				speakerIdList[i] = result[i][1];
				testindexList[i] = result[i][2];
				testUniqueIdList[i] = result[i][3];
			}

			var sel = document.getElementById('sentenceselect');
			for (var i = 0; i < dataList.length; i++) {
				var opt = document.createElement('option');
				opt.innerHTML = "Listening  " + (i+1) ;
				//opt.value = dataList[i];
				opt.value = i.toString();
				if (i == 0)
					opt.selected = "true";
				sel.appendChild(opt);
			}
			numFiles = dataList.length;
			scoresArray = createArray(numFiles);
			for (var i = 0; i < numFiles; i++)
				scoresArray[i] = -1; 

			var hf = document.createElement('a');
			//sentenceselect
			curFileName = document.getElementById("sentenceselect").value;
			saveInAssessDoingTableList();
		}

		changeTest(0);
	});

	$("#listKeyShort").focus();
	$("#listKeyShort").on('change keyup paste', function(event) {
		if (	curstage != 1) {
			$("#listKeyShort").focus();
			return;
		}
		var c = String.fromCharCode(event.which);		
		$("#listKeyShort").val("");
		//selVal = isRadio.value;										
		selVal = parseInt(c);
		if (!(isFinite(selVal))) return;
		if ( (selVal<0) | (selVal>7)) return;
		scoresArray[selectedIndex] = selVal;
		$("[name=editList]").filter("[value='"+selVal+"']").prop("checked",true);		
		nextFunc();
		$("#listKeyShort").focus();
	});

};

saveInAssessDoingTableList = function(){

	for (i=0;i<speakerIdList.length;i++){
		phpString = "php/assess_save.php?assessorname=" + assessorname +  "&useridspeaker=" + speakerIdList[i] + "&audiofilename=" + dataList[i] + "&speechscore1=";
		phpString =  phpString + "-1&testtype=" + testtype + "&speechscoreid=" + testindexList[i] + "&testid="  + testUniqueIdList[i] + "&state=0&assessortype=1";
		$.post(phpString, {}, function() {
			//window.alert("done");
		});
	
	}
		
};



nextFunc = function(button) {
	
	var sentencesel = document.getElementById("sentenceselect");

	var isRadio = document.querySelector('input[name="editList"]:checked');
	if (isRadio == null) {
		window.alert("Please choose a value");
		return;
	}
	var selVal = isRadio.value;										
	scoresArray[selectedIndex] = selVal;

	phpString = "php/assess_save.php?state=1&assessorname=" + assessorname +  "&useridspeaker=" + speakerIdList[selectedIndex] + "&audiofilename=" + curFileName + "&speechscore1=";
	phpString =  phpString + selVal + "&testtype=" + testtype + "&speechscoreid=" + testindexList[selectedIndex] + "&testid="  + testUniqueIdList[selectedIndex] + "&assessortype=1"; 

	$.post(phpString, {}, function() {
		//window.alert("done");
	});

	selectedIndex++;
	if (selectedIndex >= dataList.length)
		selectedIndex = 0;
	//sentencesel.value = dataList[selectedIndex];					
	sentencesel.value = selectedIndex.toString();
	$('input[name="editList"]').prop('checked', false);

	changeTest(1);
};

changeTest = function(isAuto) {

	var hf = document.createElement('a');
	//sentenceselect
	var curDoc  = document.getElementById("sentenceselect");
	if (isAuto == 0){
		selectedIndex = curDoc.selectedIndex;
		curFileName = curDoc.value;
	}else{	
		curFileName = dataList[selectedIndex];
	}
	
	var textassess = dataList[selectedIndex];
	listText.textContent = textassess;

	$.post("php/getcontentassess.php?contentindex=" + testindexList[selectedIndex] + "&contenttype=12", {}, function(data) {
		jd = $.parseJSON(data);
		result = jd.filenames;
		if (result == "none") {
			//window.alert("no files to rate");
		} else {
			testcorrect.textContent = result[0][0];								
		}
	});

	var nb  = document.getElementById("nextButton");
	var alreadyScore = scoresArray[selectedIndex];
	if (alreadyScore == -1){
		$('input[name="editList"]').prop('checked', false);												
		nb.textContent = "Next";						 	
	}else{
		$("[name=editList]").filter("[value='"+alreadyScore+"']").prop("checked",true);
		nb.textContent = "Change score";
	}
	// to check if already there !!
	//										

	$("#listKeyShort").focus();
};


})();