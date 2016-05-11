var isTimerActiveListening = 0;
var isTimerRunningListening = 0;
var sliderStartValListeningArray = [120, 150, 150, 150, 180, 240];
if (startStage > 10)
	sliderStartValListeningArray = [120, 150, 150, 150, 180, 240];

function CheckTimerRunningListening(){
	isTimerActiveListening = 1;
	if (isTimerRunningListening == 0) {
		isTimerRunningListening = 1;
		window.setTimeout("TickListening()", tickInterValMS);
		runCircleTimer(sliderStartValListeningArray[curConvNum],"nextButton");
		$("#listText").focus();
	}
}

(function() {
	var isSkinnedPlayer = false;
	//var hasPlayedListening = 0;
	var NumFilesListen = 5;
	// total files to listen to
	if (startStage > 0)
		NumFilesListen = 5;
	var curConvNum = 0;
	var isPlaying = false;
	// before answer
	var firstRun = 1;
	var filenames = createArray(NumFilesListen);
	var testcontentindex = createArray(NumFilesListen);
	
	//var sliderStartValListening = 150; // number of seconds allowed
	var delayPlayMS = 500;
	// put this delay in MS before playing starts.
	var curSliderPosition = sliderStartValListeningArray[0];
	var timetaken = 0;
	
	ResetListeningTest = function(){
		isTimerActiveListening = 0;
		isTimerRunningListening = 0;
		isSkinnedPlayer = false;
		curConvNum = 0;
		isPlaying = false;
		firstRun = 1;
		curSliderPosition = sliderStartValListeningArray[0];		
	};
	getListeningTests = function() {

		//window.setTimeout("TickListening()", tickInterValMS);
		screenAdvance = 0;
		audioFilesArray = createArray(NumFilesListen);
		$.post("php/getlistening.php", {}, function(data) {
			jd = $.parseJSON(data);
			result = jd.filenames;
			if (result == "none") {
				window.alert("no data received!");
			} else {
				for (var i = 0; i < result.length; i++) {
					filenames[i] = result[i][2];
					testcontentindex[i] = result[i][0];
					/*
					$('<div id="audL_' + i + '" data="' + i + '" class="audwait"></div>').appendTo('#invisibleAudioStoreListening').jPlayer({
						ready : function(event) {
							var i = $(this).attr("data");
							$(this).jPlayer("setMedia", {
								mp3 : "testdata/" + filenames[i],
								//oga: fallbackDir.replace('words_dat/','words_dat/ogg/')+dataList[i]['audiofile'+fallbackGen].replace('mp3','ogg') // other gender
							});
						},
						swfPath : "js",
						supplied : "mp3", //, oga",
						preload : "auto"
					});
					*/
				}
				updateListeningUI();
			}
		});

	};


	updateListeningUI = function() {
		
		if (!isSkinnedPlayer)
			skinPlayer(1);
		isSkinnedPlayer = true;
		resetTimer = true;

		//$("#fileToPlay").attr("src", "testdata/" + filenames[curConvNum]);
		//$("#fileToPlay").attr("src", "testdata/testsound.mp3");
		resetTimerDisplay(sliderStartValListeningArray[curConvNum]);
		
		currentTimeUpTo = 0;		
		var numStages = $(".circleContainer").length;
		/*
		if (numStages != totalTestElements) {
			// make sure the correct number are there. // !! put at beginning later.
			for ( i = 0; i < numStages - 1; i++)
				$(".circleContainer").first().next().remove();
			for ( i = 0; i < totalTestElements - 1; i++)
				$(".circleContainer").first().clone().insertAfter("#firstCircle");
		}
		*/
		currentTimeUpTo = 0;		
		$.jPlayer.pause();
		hasPlayedRecording = 0;
		$("#nextTranscription").addClass("disabled");
		
		window.clearTimeout("TickListening");
		isTimerRunningListening = 0;
		isTimerActiveListening = 0;
		$("#roundbutton").show();

		//$("#playButton").css('opacity', 1.0);
		$("#playButton").attr("src", "common/images/play.png");
		$("#replaysLeftText").text("Play");
		//$(".progress-bar").width("100%");
		resetProgressBar();
		$("#replaysLeftText").text("Play");
		$('#listText').css('overflow', 'hidden');

		//changeStateNextButton(0);
		$("#listText").on('change keyup paste', function() {
			if (hasPlayedRecording == 1) {
				$("#nextTranscription").removeClass("disabled");
				//changeStateNextButton(1);
			}
		});

		$("#stop_div").text('Play');
		$("#buttonSrc").attr("src", "images/play.png");

		if (firstRun != 1) {

			// save the result to the database
			saveListeningTestResult();
			
			$('#listText').val('');
			curConvNum++;

			var numStr = curConvNum + 1 + " of 5";
			$("#textnum1").text(numStr);

			if (curConvNum >= NumFilesListen - 1) {
				screenAdvance = 1;
			}

			if (curConvNum >= NumFilesListen) {
				window.clearTimeout("TickListening");
				isTimerActiveListening = 0;
				nextButton();
				return;
			}

		} else {
			firstRun = 0;
		}
		
		//$("#fileToPlay").attr("src", "testdata/" + filenames[curConvNum]);
		//$("#fileToPlay").attr("src", "testdata/testsound.mp3");
		
		//players[0].startDownload('testdata/testsound.mp3');
		var downloadfile = "../testdata/" + filenames[curConvNum];
		/*				
		if (isStaging == 1){
			downloadfile = "../testdata/" + filenames[curConvNum];
		}*/
		players[0].startDownload(downloadfile);
		
		resetTimerDisplay(sliderStartValListeningArray[curConvNum]);
		
		//changeStateNextButton(0);
		curSliderPosition = sliderStartValListeningArray[curConvNum];

		var numCircles = curConvNum + 7;
		for ( i = 0; i < numCircles; i++) {
			$(".circleContainer").eq(i).children().first().removeClass('circleInner').removeClass('circleOuter');
			$(".circleContainer").eq(i).children().first().addClass('circleInner');
		}

	};



	TickListening = function() {

		if (isTimerActiveListening == 1) {
			window.setTimeout("TickListening()", tickInterValMS);
		} else {
			isTimerRunningListening = 0;
			return;
		}
		curSliderPosition -= tickInterValMS / 1000;
		/*		
		//sliderPosText = (curSliderPosition/sliderStartValListeningArray[curConvNum]*100).toString() + "%";
		//$(".progress-bar").width(sliderPosText);
		$("#test_timer").text(Math.ceil(curSliderPosition).toString());
		if (curSliderPosition <= 10) {
			$("#circle").css('stroke', "#ff0000");
			$("#circle3").css('border', '2px solid #ff0000');
		}
		//$('.circle_animation').css('stroke-dashoffset', -(timerCountKeep * stepSize));
		//timerCountKeep++;
		*/
		if (curSliderPosition <= 0) {
			isNextEnabled = 1;
			updateListeningUI();
			curSliderPosition = sliderStartValListeningArray[curConvNum];
			//sliderPosText = (curSliderPosition/sliderStartValListeningArray[curConvNum]*100).toString() + "%";
			//$(".progress-bar").width(sliderPosText);
			$.jPlayer.pause();

		}
		//timetaken = sliderStartValListeningArray[curConvNum] - curSliderPosition;
		//timetaken = Math.round((timetaken * 1000));

	};

	saveListeningTestResult = function() {		
		$(".not-done:first").removeClass("not-done").addClass("done");
		var testdata = $('#listText').val();
		var numassessedspeech1 = 0;
		var testtype = 11;
		var globaltestnum = randTestNum;
		var subtestnumber = curConvNum;
		var testid1 = 0;
		var testid2 = 0;
		var testcontentindexsave = testcontentindex[curConvNum];

		var stringSave = "userid=" + randUserId + "&testdata=" + testdata.toString() + "&testtype=12" + "&numassessedspeech1=0" + "&globaltestnum=" + globaltestnum.toString() + "&subtestnumber=" + subtestnumber;
		stringSave += "&testid1=" + testid1 + "&testid2=" + testid2 + "&testcontentindex=" + testcontentindexsave + "&timetakenms=" + timetaken.toString();

		$.post("php/savescore.php?" + stringSave, {}, function() {
			//alert("saved");
		});
	};

})(); 

/*
	playListeningButton = function(button) {
		hasPlayedRecording = 1;

		if (isTimerRunningListening == 0) {
			isTimerRunningListening = 1;
			window.setTimeout("TickListening()", tickInterValMS);
		}
		isTimerActiveListening = 1;
		//$("#playButton").css('opacity', 0.5);
		$("#playButton").attr("src", "common/images/play_on.png");
		$("#replaysLeftText").text("Pause");
		$("#listText").focus();

		if (isPlaying == true) {
			setTimeout("playListeningButtonDelayed()", 1);
		} else {
			setTimeout("playListeningButtonDelayed()", delayPlayMS);
		}

	};

	playListeningButtonDelayed = function(button) {

		if ($("#audL_" + curConvNum).data() != null) {
			isPlaying = !$("#audL_" + curConvNum).data().jPlayer.status.paused;
			if (isPlaying == true) {
				$.jPlayer.pause();
				isPlaying = false;
				$("#playButton").attr("src", "common/images/play.png");
				$("#replaysLeftText").text("Play");
				currentTimeUpTo = $("#audL_" + curConvNum).data().jPlayer.status.currentTime;
				return;
			}
		}
		//$("#aud_"+curConvNum).jPlayer("pauseOthers").jPlayer("playHead",0).jPlayer("play");
		isPlaying = true;
		playAudio("#audL_" + curConvNum);
		$("#audL_" + curConvNum).bind($.jPlayer.event.ended, function() {
			//$("#playButton").css('opacity', 1.0);
			$("#playButton").attr("src", "common/images/play.png");
			$("#replaysLeftText").text("Play again");
			currentTimeUpTo = 0;
			isPlaying = false;
			$("#audL_" + curConvNum).unbind($.jPlayer.event.ended);
		});

	};

 * 
 */