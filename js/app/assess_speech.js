var testIDScave = 0;
// the testid they did
var feedbackstate = 2; // !! debug
// 0 for overall score + detailed for dictation, 2 for phon fb, 3 for word errors. 10 for free speech fb.
var contentIndex = 0;
function changeState($scope) {
	switch(feedbackstate) {
	case 0:
	
		$("#mainScoreButtons").css('display', '');
		
		// dictation state, show
		$("#sub_submit").show();
		$("#phon_submit").hide();
		$("#word_submit").hide();

		$("#freeSpeechInsn").text("");
		$("#freeSpeechQuestion").text("");
		$('#freeSpeechQuestion').css('display', 'none');
		$('#freeSpeechInsn').css('display', 'none');
		
		$('#phoneticsradio').css('display', '');
		$('#intonationradio').css('display', '');
		$('#pauseradio').css('display', '');		
		$('#vocabradio').css('display', '');
		$('#speedradio').css('display', '');
		
		$('#phonlabel').text("Phonetics:");
		$('#intlabel').text("Intonation:");
		$('#pauselabel').text("Pauses:");
		$("#readtextphon").css('display', 'none');
		$("#freeSpeechQuestion").css('display', '');

		break;
	case 2:
		// hide all the divs
		$("#sub_submit").hide();
		$("#phon_submit").show();
		$("#word_submit").hide();

		$('#phoneticsradio').css('display', 'none');
		$('#intonationradio').css('display', 'none');
		$('#pauseradio').css('display', 'none');
		$('#speedradio').css('display', 'none');
		$('#vocabradio').css('display', 'none');
		$("#readtextphon").css('display', '');
		$("#freeSpeechQuestion").css('display', 'none');
		
		$("#mainScoreButtons").css('display', 'none');
		
		setupPhonFeedback(false,$scope);
		break;
	case 3:
		$("#sub_submit").hide();
		$("#phon_submit").hide();
		$("#word_submit").show();

// should already be shown.		
		$('#phoneticsradio').css('display', 'none');
		$('#intonationradio').css('display', 'none');
		$('#pauseradio').css('display', 'none');
		$('#speedradio').css('display', 'none');
		$('#vocabradio').css('display', 'none');
		$("#readtextphon").css('display', '');
		$("#freeSpeechQuestion").css('display', 'none');
		
		
		setupPhonFeedback(false,$scope);
		break;
	case 10:
		$("#mainScoreButtons").css('display', '');
	
		$("#readtextphon").css('display', 'none');
		$("#freeSpeechQuestion").css('display', '');
		$("#sub_submit").show();
		$("#phon_submit").hide();
		$("#word_submit").hide();

		$('#freeSpeechQuestion').css('display', '');
		$('#freeSpeechInsn').css('display', '');

		$("#freeSpeechInsn").text("The user has been asked to talk for 30-60 seconds about: ");
		$("#freeSpeechQuestion").text(result[0][0]);

		$('#phoneticsradio').css('display', '');
		$('#intonationradio').css('display', '');
		$('#pauseradio').css('display', '');

		$('#vocabradio').css('display', 'none');
		$('#speedradio').css('display', 'none');
		$('#phonlabel').text("depth of vocabulary");
		$('#intlabel').text("grammar mastery");
		$('#pauselabel').text("sentence structure");
		break;
	}
}

(function() {

	var fileNamesList = "";
	var testTypeReturnedList = "";
	var speakerIdList = "";
	var globaltestnumList = "";
	var selectedIndex = 0;
	var scoresArray;
	var numFiles = 0;
	var curFileName = "";

	var testindexList = "";

	var scoringMetricNumbers;
	var scoringMetricText;

	var listNumUpTo = 0;

	var noTimeTimeout = 1000 * 60 * 20;
	// 20 minutes
	var timeoutTimer;

	var paraText = "";
	// the user's paragraph to talk about.
	var mustDoSub = 0;
	getAssessSpeech = function($scope) {

		timeoutTimer = window.setTimeout("logout()", noTimeTimeout);

		$("#nextButton").hide();
		selectedIndex = 0;
		//testtype = 2;
		//recordingslist.clear();

		/*
		 while(document.getElementById('sentenceselect').length > 0){
		 document.getElementById('sentenceselect').remove(0);
		 }
		 */
		while (recordingslist.childNodes.length > 0) {
			recordingslist.removeChild(recordingslist.childNodes[0]);
		}

		switch (testtype) {
		case 1:
			$("h2#title").text('Speech assessment');
			break;
		case 2:
			$("h2#title").text('Free speech');
			break;
		}

		//assessorname = 'john';
		if (assessorname == "") {
			return;
		}

		// reset those with time greater then 2 hours to -1;
		var phpString = "php/assess_save.php?assessorname=blank&useridspeaker=blank&audiofilename=blank&speechscore1=0";
		phpString = phpString + "&testtype=0&speechscoreid=0&testid=0&state=-1";
		$.post(phpString, {}, function() {
			//window.alert("done");
		});

		// assessortype is needed here, if it is 0 then in training mode.
		$.post("php/assess.php?login=" + assessorname.toString() + "&testtype=3&assessortype=" + assessortype.toString(), {}, function(data) {
			jd = $.parseJSON(data);
			result = jd.filenames;
			if (result == "none") {
				//window.alert("no files to rate - please go to another section");
			} else {
				fileNamesList = createArray(result.length);
				speakerIdList = createArray(result.length);
				globaltestnumList = createArray(result.length);
				testindexList = createArray(result.length);
				testUniqueIdList = createArray(result.length);
				testTypeReturnedList = createArray(result.length);
				for (var i = 0; i < result.length; i++) {
					fileNamesList[i] = result[i][0];
					speakerIdList[i] = result[i][1];
					testindexList[i] = result[i][2];
					testUniqueIdList[i] = result[i][3];
					testTypeReturnedList[i] = result[i][4];
					globaltestnumList[i] = result[i][6];
				}
				numFiles = fileNamesList.length;
				scoresArray = createArray(numFiles);
				for (var i = 0; i < numFiles; i++)
					scoresArray[i] = -1;

				var hf = document.createElement('a');
				//sentenceselect
				//curFileName = document.getElementById("sentenceselect").value;
				curFileName = fileNamesList[0];
				url = "https://app.fluentiq.com/recordings/" + curFileName;
				hf.href = url;

				hf.innerHTML = hf.download;
				var au = document.createElement('audio');
				au.controls = true;
				//au.src = url;
				recordingslist.appendChild(au);
				changeTestSpeech(0);
				showTaskTable(listNumUpTo);

				//update isScoring table
				saveInAssessDoingTable();
			}

		});

		
		//select score,description from scoringmetric where testtype = 'dictation' order by score
	};

	logout = function() {
		

	};

	saveInAssessDoingTable = function() {
	if (isStaging == 1)
		return;


		for ( i = 0; i < speakerIdList.length; i++) {
			phpString = "php/assess_save.php?&assessorname=" + assessorname + "&useridspeaker=" + speakerIdList[i] + "&audiofilename=" + fileNamesList[i] + "&speechscore1=";
			phpString = phpString + "-1&testtype=" + testTypeReturnedList[i] + "&speechscoreid=" + testindexList[i] + "&testid=" + testUniqueIdList[i] + "&state=0";
			$.post(phpString, {}, function() {
				//window.alert("done");
			});

		}

	};

	showTaskTable = function(numUpTo) {

		testtype = testTypeReturnedList[selectedIndex];
		$('#taskListTable tr').not(':first').remove();
		var html = '';
		var numFiles = testTypeReturnedList.length;
		var testTypeText;
		for (var i = numUpTo; i < numFiles; i++) {
			testTypeText = "FS";
			if (testTypeReturnedList[i] == 1)
				testTypeText = "DT";
			html += '<tr><td>' + (i + 1).toString() + '</td><td>' + testTypeText + '</td></tr>';
		}
		$('#taskListTable tr').first().after(html);

	};

	undoAssess = function() {
		window.alert("not implemented for now");
		return;

		selectedIndex--;
		if (selectedIndex < 0)
			selectedIndex = 0;
		changeTestSpeech(-1);
		showTaskTable(selectedIndex);
	};

	showScoringInstructions = function(button) {

		var phpString;
		if (testtype == 2)
			phpString = "freespeech";
		if (testtype == 1)
			phpString = "dictation";
		$.post("php/getscoringinstructions.php?speechtype=" + phpString, {}, function(data) {
			jd = $.parseJSON(data);
			result = jd.data;
			if (result == "none") {
				//window.alert("no files to rate - please go to another section");
			} else {
				scoringMetricNumbers = createArray(result.length);
				scoringMetricText = createArray(result.length);
				for (var i = 0; i < result.length; i++) {
					scoringMetricNumbers[i] = result[i][0];
					scoringMetricText[i] = result[i][1];
				}

				$('#thetable tr').not(':first').remove();
				var html = '';
				for (var i = 0; i < scoringMetricNumbers.length; i++)
					html += '<tr><td>' + scoringMetricNumbers[i] + '</td><td>' + scoringMetricText[i] + '</td></tr>';
				$('#thetable tr').first().after(html);

			}

		});

		$("#overlay-container").show();
		$("#overlay").show();
	};

	// submit the sub scores and go forward.
	submitSubScores = function() {
		
			
		clearTimeout(timeoutTimer);
		timeoutTimer = window.setTimeout("logout()", noTimeTimeout);

		//phonradio	intradio	pauseradio	speedradio	vocabradio
		// check all the radio buttons are checked, gather scores then submit into detailedassessment.
		
		var mainradio = document.querySelector('input[name="mainradio"]:checked');
		var phonRadio = document.querySelector('input[name="phonradio"]:checked');
		var intRadio = document.querySelector('input[name="intradio"]:checked');
		var pauseRadio = document.querySelector('input[name="pauseradio"]:checked');
		var speedRadio = document.querySelector('input[name="speedradio"]:checked');
		var vocabRadio = document.querySelector('input[name="vocabradio"]:checked');
		if (testtype == 1) {
			if ( (mainradio == null) || (phonRadio == null) || (intRadio == null) || (pauseRadio == null) || (speedRadio == null) || (vocabRadio == null)) {
				window.alert("Please choose a value for all measures");
				return;
			}
		} else {
			if ( (mainradio == null) || (phonRadio == null) || (intRadio == null) || (pauseRadio == null)) {
				window.alert("Please choose a value for all measures");
				return;
			}
		}
		var mainNum = mainradio.value;
		var phonNum = phonRadio.value;
		var intNum = intRadio.value;
		var pauseNum = pauseRadio.value;
		if (testtype == 1) {
			var speedNum = speedRadio.value;
			var vocabNum = vocabRadio.value;
		}
		//assessorname  speechscoreid detailtype = 1 detailscore1

		var selVal = mainNum;
		scoresArray[selectedIndex] = mainNum;
		contentIndex = testindexList[selectedIndex];
		phpString = "php/assess_save.php?state=1&assessorname=" + assessorname + "&useridspeaker=" + speakerIdList[selectedIndex] + "&audiofilename=" + curFileName + "&speechscore1=";
		phpString = phpString + selVal + "&testtype=" + testtype + "&speechscoreid=" + testindexList[selectedIndex] + "&testid=" + testUniqueIdList[selectedIndex] + "&assessortype=" + assessortype.toString() + "&globaltestnum=" + globaltestnumList[selectedIndex];

		if (isStaging != 1){		
			$.post(phpString, {}, function() {
				//window.alert("done");
			});
		}


		testIDScave = testUniqueIdList[selectedIndex];
		phpString = "php/assess_detailed_save.php?assessorname=" + assessorname + "&speechscoreid=" + testUniqueIdList[selectedIndex] + "&detailtype=" + testtype + "&detailscore1=" + phonNum + "&detailscore2=" + intNum + "&detailscore3=" + pauseNum + "&detailscore4=" + speedNum + "&detailscore5=" + vocabNum;
		if (isStaging != 1){
		$.post(phpString, {}, function() {
			//window.alert("done");
		});
		}
		$('input[name="mainradio"]').prop('checked', false);		
		$('input[name="phonradio"]').prop('checked', false);
		$('input[name="intradio"]').prop('checked', false);
		$('input[name="pauseradio"]').prop('checked', false);
		if (testtype == 1) {
			$('input[name="speedradio"]').prop('checked', false);
			$('input[name="vocabradio"]').prop('checked', false);
		}

		mustDoSub = 0;
		if ((feedbackstate == 3) || (feedbackstate == 10)) {
			feedbackstate = 0;
			changeTestSpeech(1);
		} else {
			feedbackstate = 2;
			userIdReportShow = speakerIdList[selectedIndex];
			changeState();
		}

	};

	nextFuncSpeech = function(valueIn) {

		if (mustDoSub == 1) {
			window.alert("Do the sub scores");
			return;
		}

		if (selectedIndex >= scoresArray.length) {
			return;
		}
		//var sentencesel = document.getElementById("sentenceselect");

		var selVal = valueIn;
		scoresArray[selectedIndex] = selVal;
		//$('#freeSpeechQuestion').css('display', '');
		//$("#freeSpeechQuestion").text(paraText);
		contentIndex = testindexList[selectedIndex];
		phpString = "php/assess_save.php?state=1&assessorname=" + assessorname + "&useridspeaker=" + speakerIdList[selectedIndex] + "&audiofilename=" + curFileName + "&speechscore1=";
		phpString = phpString + selVal + "&testtype=" + testtype + "&speechscoreid=" + testindexList[selectedIndex] + "&testid=" + testUniqueIdList[selectedIndex] + "&assessortype=" + assessortype.toString();


		if (isStaging != 1){
			
			$.post(phpString, {}, function() {
				//window.alert("done");
			});
		}
		mustDoSub = 1;

		// set all the radio buttons to 0 if recording problem.
		if (valueIn == 0) {
			$("[name=phonradio]").filter("[value='1']").prop("checked", true);
			$("[name=intradio]").filter("[value='1']").prop("checked", true);
			$("[name=pauseradio]").filter("[value='1']").prop("checked", true);
			$("[name=speedradio]").filter("[value='1']").prop("checked", true);
			$("[name=vocabradio]").filter("[value='1']").prop("checked", true);

		}

		// will be removed from here now and put in submit sub scores section.
	};

	changeTestSpeech = function(forwardValue) {

		if 	(forwardValue == 1){	
			selectedIndex++;
			showTaskTable(selectedIndex);
			if (selectedIndex >= scoresArray.length) {
				$("#nextButton").show();
				return;
			}			
		}

		$("#readtextphon").css('display', 'none');

		testtype = testTypeReturnedList[selectedIndex];
		var hf = document.createElement('a');
		if (selectedIndex < 0)
			selectedIndex = 0;
		curFileName = fileNamesList[selectedIndex];
		contentIndex = testindexList[selectedIndex];
		$.post("php/getcontentassess.php?contentindex=" + testindexList[selectedIndex] + "&contenttype=" + testtype, {}, function(data) {
			jd = $.parseJSON(data);
			result = jd.filenames;
			paraText = result[0][0];
			if (result == "none") {
				//window.alert("no files to rate");
			} else {
				if (testtype == 2) {
					feedbackstate = 10;
					changeState();
				} else {
					feedbackstate = 0; // !! debug
					changeState();
				}
			}
		});

		url = "https://app.fluentiq.com/recordings/" + curFileName;
		hf.href = url;
		hf.innerHTML = hf.download;
		var au = document.createElement('audio');
		au.controls = true;
		au.src = url;
		if (recordingslist.childNodes.length > 0)
			recordingslist.removeChild(recordingslist.childNodes[0]);
		recordingslist.appendChild(au);

	};

	gotoDetailedDebug = function ($scope){
		feedbackstate = 2;
		userIdReportShow = speakerIdList[selectedIndex];
		changeState($scope);		
	};
	closeOverlay = function() {
		$("#overlay-container").hide();
		$("#overlay").hide();
		return false;
	};

})();
