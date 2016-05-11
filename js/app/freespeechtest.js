isTimerActiveFreeSpeech = 1;
(function() {

	var NumFilesListen = 1;
	// total files to listen to
	var curConvNum = 0;
	// before answer
	var firstRun = 1;
	var textdisp = createArray(NumFilesListen);
	var testcontentindex = createArray(NumFilesListen);

	var sliderStartValFreeSpeech = 30*1000;
	// number of seconds allowed
	//if (startStage > 0)
		//sliderStartValFreeSpeech = 1000;
	var timetaken = 0;
	var numCountDownSecsFS = 10; // normally 10
	var CountDownRecordTimer = 30; // normally 30
	var curSliderPosition = sliderStartValFreeSpeech;	
	var CountDownStartTimer = numCountDownSecsFS;
	var isRecording = 0;
	
	ResetFreeSpeechTest = function(){
		isTimerActiveFreeSpeech = 1;
		NumFilesListen = 1;
		curConvNum = 0;
		firstRun = 1;
		timetaken = 0;
		numCountDownSecsFS = 10; // normally 10
		CountDownRecordTimer = 30; // normally 30
		curSliderPosition = sliderStartValFreeSpeech;	
		CountDownStartTimer = numCountDownSecsFS;
		isRecording = 0;	
	};
	
	getFreeSpeechTests = function() {

		if (isStaging==1){
			sliderStartValFreeSpeech = 10*1000;
			numCountDownSecsFS = 3; // normally 10
			CountDownRecordTimer = 10; // normally 30
		}	

		screenAdvance = 0;
		window.setTimeout("TickFreeSpeech()", tickInterValMS);
		$.post("php/getfreespeech.php", {}, function(data) {

			jd = $.parseJSON(data);
			result = jd.filenames;
			if (result == "none") {
				window.alert("no data received!");
			} else {
				for (var i = 0; i < result.length; i++) {
					textdisp[i] = result[0][1];
					testcontentindex[i] = result[0][0];

				}
				updateFreeSpeechUI();
			}
		});

	};

	TickFreeSpeech = function() {
		if (isTimerActiveFreeSpeech == 1) {
			window.setTimeout("TickFreeSpeech()", tickInterValMS);
		} else {
			return;
		}
		curSliderPosition -= tickInterValMS / 1000;
		sliderPosText = (curSliderPosition / sliderStartValFreeSpeech * 100).toString() + "%";
		$(".progress-bar").width(sliderPosText);

		if (curSliderPosition <= 0) {
			isNextEnabled = 1;
			updateFreeSpeechUI(1);
			curSliderPosition = sliderStartValFreeSpeech;
			sliderPosText = (curSliderPosition / sliderStartValFreeSpeech * 100).toString() + "%";
			$(".progress-bar").width(sliderPosText);
			if (playingSoundIDName != null) {
				$("#" + playingSoundIDName).jPlayer("pause");
			}
		}
		timetaken = sliderStartValFreeSpeech - curSliderPosition;
		timetaken = Math.round((timetaken * 1000));

	};

	updateFreeSpeechUI = function(isTimeOut) {

		$("#meaningTick").removeClass("glyphicon glyphicon-ok-sign");
		$("#listeningTick").removeClass("glyphicon glyphicon-ok-sign");
		$('#meaningListEl').insertAfter($('#ConvListEl'));
		$('#ListeningListEl').insertAfter($('#meaningListEl'));

		$("#roundbutton").show();
		if ((firstRun != 1) && (isTimeOut == 1)) {

			// save the result to the database
			//saveFreeSpeechTestResult();

			var numStr = curConvNum + 1 + " of 1";
			$("#textnum").text(numStr);

			if (curConvNum >= NumFilesListen - 1) {
				screenAdvance = 1;
			}
			window.clearTimeout("TickFreeSpeech");
			stopRecording();
			isTimerActiveFreeSpeech = 0;
			nextButton();
			return;

		} else {
			if (firstRun == 1) {
				curSliderPosition = sliderStartValFreeSpeech;
				//$(".progress-bar").width("100%");
				resetProgressBar();
			}
			firstRun = 0;
		}
		$("#testtitle").text(textdisp[0]);
		changeStateNextButton(0);
		$("#rerecordText").text("Record");

	};

	TickCountDownToStartFS = function() {
		CountDownStartTimer--;
		if (CountDownStartTimer > 0) {
			window.setTimeout("TickCountDownToStartFS()", tick1SecMs);
		} else {
			isRecording = 1;
			$("#countdownText").text("Recording! Keep speaking!");
			$("#startRecordFS").hide();
			$("#recordingFS").removeClass("hide");
			$("#recordingTimerText").text("30");
			$("#recordingTimerText").addClass("active");
			window.setTimeout("RecordingCountDownFS()", tick1SecMs);
			toggleRecording();
			return;
		}		
		$("#countdownText").text("Recording begins in " + CountDownStartTimer.toString() + " ...");
	};

	RecordingCountDownFS = function() {
		
		CountDownRecordTimer--;
		$("#recordingTimerText").text(CountDownRecordTimer.toString());
		if (CountDownRecordTimer > 0) {
			window.setTimeout("RecordingCountDownFS()", tick1SecMs);
		} else {
			isRecording = 0;
			$("#countdownText").text("Recording complete!");			
			$("#recordingFS").hide();
			$("#startRecordFS").show();		
			$("#nextFS").removeClass("disabled");			
			$("#recordingTimerText").removeClass("active");	
			toggleRecording();
			isNextEnabled = 1;
			return;
		}								
		
	};

	showButton = function() {

		$("#revealButtonDiv").hide();
		$("#questionText").removeClass("hidden");
		$("#countdownText").text("Recording begins in 10...");
		window.setTimeout("TickCountDownToStartFS()", tick1SecMs);
	};

	saveFreeSpeechTestResult = function() {

		resetTimer = true;
		//var testdata = fileName;
		var testdata = fileNameFS;
		var numassessedspeech1 = 0;
		var testtype = 2;
		var globaltestnum = randTestNum;
		var subtestnumber = curConvNum;
		var testid1 = 0;
		var testid2 = 0;
		var testcontentindexsave = testcontentindex[curConvNum];

		var stringSave = "userid=" + randUserId + "&testdata=" + testdata.toString() + "&testtype=" + testtype + "&numassessedspeech1=0" + "&globaltestnum=" + globaltestnum.toString() + "&subtestnumber=" + subtestnumber;
		stringSave += "&testid1=" + testid1 + "&testid2=" + testid2 + "&testcontentindex=" + testcontentindexsave + "&timetakenms=" + timetaken.toString();

		$.post("php/savescore.php?" + stringSave, {}, function() {
			//alert("saved");
		});
	};

})(); 