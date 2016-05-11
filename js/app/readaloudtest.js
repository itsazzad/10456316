(function() {

	var NumFilesListen = 1;
	// total files to listen to
	var curConvNum = 0;
	// before answer
	var firstRun = 1;
	var textdisp = createArray(NumFilesListen);
	var testcontentindex = createArray(NumFilesListen);

	var sliderStartValReadAloud = 90;
	if (startStage > 10) sliderStartValReadAloud = 90;
	var timetaken = 0;
	var curSliderPosition = sliderStartValReadAloud;
	var numCountDownSecs = 5;
	// 5 normally
	var CountDownStartTimer = numCountDownSecs;
	var isRecording = 0;
	
	ResetReadaloudTest = function(){
		curConvNum = 0;
		firstRun = 1;
		timetaken = 0;
		curSliderPosition = sliderStartValReadAloud;
		numCountDownSecs = 5;
		CountDownStartTimer = numCountDownSecs;
		isRecording = 0;		
	};
	
	recordClickedReadAloud = function() {
		if (isRecording == 1) {
			toggleRecording();
			resetTimer = true;
			$("#nextReadAloud").removeClass("disabled");
			
			$("#recordImageSpan").addClass("icon-microphone");
			$("#recordImageSpan").removeClass("icon-record-microphone");
			//$("#recordImageSpan").removeClass("icon-record-stop");
						
			$("#countdownText").text("Well done. Click 'Next' to continue");			
			isRecording = 0;		
		}
	};

	getReadAloudTests = function() {
		screenAdvance = 0;
		$.post("php/getreadaloud.php", {}, function(data) {

			jd = $.parseJSON(data);
			result = jd.filenames;
			if (result == "none") {
				window.alert("no data received!");
			} else {
				for (var i = 0; i < result.length; i++) {
					textdisp[i] = result[0][1];
					testcontentindex[i] = result[0][0];

				}
				setupReadAloudUI();
			}
		});

	};

	TickCountDownToStart = function() {

		if (CountDownStartTimer > 0) {
			window.setTimeout("TickCountDownToStart()", tick1SecMs);
		} else {
			$("#countdownText").text("When you've finished reading, stop the recording.");
			$("#recordImageSpan").removeClass("icon-microphone");
			$("#recordImageSpan").removeClass("record");
			$("#recordImageSpan").addClass("stop");
			$("#recordImageSpan").addClass("icon-record-stop");			
			
			isRecording = 1;
			toggleRecording();
			return;
		}
		$("#countdownText").text("Recording begins in " + CountDownStartTimer.toString() + " ...");
		CountDownStartTimer--;

	};
	updateReadAloudUI = function(isTimeOut) {
			$("#recordImageSpan").addClass("icon-microphone");
			$("#recordImageSpan").addClass("record");
			$("#recordImageSpan").removeClass("stop");
			$("#recordImageSpan").removeClass("icon-record-stop");			

	};
	setupReadAloudUI = function() {

		$("#roundbutton").show();
		curSliderPosition = sliderStartValReadAloud;
		$("#rerecordText").text("Record");
		resetProgressBar();
		CountDownStartTimer = numCountDownSecs;

		runCircleTimer(sliderStartValReadAloud,"recordClickedReadAloud");
		window.setTimeout("TickCountDownToStart()", tick1SecMs);
		$("#dictationtext").html(textdisp[0]);
		changeStateNextButton(0);

	};

	saveReadAloudTestResult = function() {

		resetTimer = true;
		//var testdata = fileName;
		var testdata = fileNameDictation;
		var numassessedspeech1 = 0;
		var testtype = 1;
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