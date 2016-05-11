var curConvNum = 0;
var STATE_MEANING = 0;
var NumFilesListen = 5;

// total files to listen to, normally 10
if (startStage > 0)
	NumFilesListen = 5;
//var audioFilesArray = createArray(NumFilesListen);
	var isTimerRunningMeaning = 0;
var sliderStartValMeaning = 60;
// number of seconds allowed
if (startStage > 10)
	sliderStartValMeaning = 60;

function CheckTimerRunningMeaning(){
	isTimerActiveMeaning = 1;
	if (isTimerRunningMeaning == 0) {
		isTimerRunningMeaning = 1;
		window.setTimeout("TickMeaning()", tickInterValMS);
		runCircleTimer(sliderStartValMeaning,"nextButton");
	}
	// also make the UI active
	$("#choice1").attr("nothover","false");
	$("#choice2").attr("nothover","false");
	$("#choice3").attr("nothover","false");
	$("#choice4").attr("nothover","false");	
}

//CheckTimerRunningMeaning

var isTimerActiveMeaning = 0;
var delayPlayMS = 500;
// put this delay in MS before playing starts.
var hasPlayedRecording = 0;
(function() {

	var isSkinnedPlayer = false;
	// make sure we don't start two timers!
	var NumMultiChoose = 4;
	// This many choices to choose from.
	var scrambleArray = createArray(NumMultiChoose);
	// scramble appearance order each time.
	var isPlaying = false;
	var NumQuestionsTotal = NumFilesListen;
	// the total number of db entries per file is 2 questions per file * (num of multi choice + question) + 1 for the filename;
	var NumEntriesPerFile = (NumMultiChoose + 1) + 1;
	// before answer
	var filenames;
	// names of the mp3 files to play
	var testcontentindex;
	var testquestions;
	// questions the user sees
	var testchoices;
	// multi choice to match those questions
	var testiscorrect;
	// correct value for each index
	var curMulti = -1;
	// to save answer
	var scoretosave = createArray(NumFilesListen);
	//var chosensavenum = createArray(NumFilesListen);

	var firstRun = 1;
	var curQNum = 0;

	var curSliderPosition = sliderStartValMeaning;
	var timetaken = 0;
	//var replayNumsAllowedMeaning = 3;
	//var replaysLeft = replayNumsAllowedMeaning;

	var stepSize;
	var timerCountKeep = 0;

	filenames = createArray(NumFilesListen);
	testcontentindex = createArray(NumFilesListen);
	testquestions = createArray(NumFilesListen);
	testchoices = createArray(NumFilesListen, NumMultiChoose);
	testiscorrect = createArray(NumFilesListen, NumMultiChoose);

	ResetMeaningTest = function(){
		curConvNum = 0;
		STATE_MEANING = 0;
		isTimerRunningMeaning = 0;
		sliderStartValMeaning = 60;
		isTimerActiveMeaning = 0;
		isSkinnedPlayer = false;
		isPlaying = false;
		curMulti = -1;
		firstRun = 1;
		curQNum = 0;
		curSliderPosition = sliderStartValMeaning;
		timetaken = 0;
		strokedasharray = 31;
		timerCountKeep = 0;
	};
	
	getMeaningTests = function() {

		// now doing it when you click "play"
		//window.setTimeout("TickMeaning()", tickInterValMS);
		$("#roundbutton").show();
		//$(".progress-bar").width("100%");
		//resetProgressBar();
		// if you want to do animate instead:
		//$("#ResMeaningTimerBar").animate({width: "0px"}, sliderStartValMeaning*1000, "linear", function() {

		for ( i = 0; i < NumMultiChoose; i++)
			scrambleArray[i] = i;
		screenAdvance = 0;
		$.post("php/getmeaning.php", {}, function(data) {
			jd = $.parseJSON(data);
			result = jd.filenames;
			if (result == "none") {
				window.alert("no data received!");
			} else {
				for (var i = 0; i < NumFilesListen; i++) {
					filenames[i] = result[i*NumEntriesPerFile][3];
					testcontentindex[i] = result[i*NumEntriesPerFile+1][0];
					/*
					$('<div id="aud_' + i + '" data="' + i + '" class="audwait"></div>').appendTo('#invisibleAudioStoreMeaning').jPlayer({
						ready : function(event) {
							var i = $(this).attr("data");
							$(this).jPlayer("setMedia", {
								mp3 : "testdata/" + filenames[i]//,
								//oga: "testdata/" + filenames[i].substring(0,filenames[i].length-4) + ".ogg"
							});
						},
						swfPath : "js",
						supplied : "mp3", //, oga
						preload : "auto"
					});
					*/
				}
				questionsChooseInds = createArray(NumQuestionsTotal);
				questionsChooseInds[0] = 1;
				for (var i = 1; i < NumFilesListen; i++) {
					questionsChooseInds[i] = questionsChooseInds[i - 1] + 6;
				}
				for (var i = 0; i < NumFilesListen; i++) {
					testquestions[i] = result[questionsChooseInds[i]][3];
					for (var j = 0; j < NumMultiChoose; j++) {
						testchoices[i][j] = result[questionsChooseInds[i]+j+1][3];
						testiscorrect[i][j] = result[questionsChooseInds[i]+j+1][5];
					}

				}
				STATE_MEANING = 1;
				updateMeaningUI(0);
			}
		});

	};

	TickMeaning = function() {
		if (isTimerActiveMeaning == 1) {
			window.setTimeout("TickMeaning()", tickInterValMS);
		} else {
			isTimerRunningMeaning = 0;
			return;
		}
		curSliderPosition -= tickInterValMS / 1000;

		$("#test_timer").text(Math.ceil(curSliderPosition).toString());
		if (curSliderPosition <= 10) {
			$("#circle").css('stroke', "#ff0000");
			$("#circle3").css('border', '2px solid #ff0000');
		}

		//$('.circle_animation').css('stroke-dashoffset', -(timerCountKeep * stepSize));
		//timerCountKeep++;

		if (curSliderPosition <= 0) {
			curMulti = -1;
			isNextEnabled = 1;
			updateMeaningUI(1);
			curSliderPosition = sliderStartValMeaning;
			//sliderPosText = (curSliderPosition*10).toString() + "%";
			//$(".progress-bar").width(sliderPosText);
			$.jPlayer.pause();
		}
		timetaken = sliderStartValMeaning - curSliderPosition;
				
	};


	multiClick = function(curdiv, choice) {
		if (hasPlayedRecording ==0)
			return;
		// caled when a choice is clicked
		clearMultiUI();
		
		$(curdiv).addClass('selected');
		curMulti = choice - 1;
		// make -1
		if (hasPlayedRecording == 1) {
			//changeStateNextButton(1);
			$("#nextMeaning").removeClass("disabled");
		}
	};


	updateMeaningUI = function(isTimeOut) {
		
		if (!isSkinnedPlayer)
			skinPlayer(1);
		isSkinnedPlayer = true;
		resetTimer = true;
		isTimerActiveMeaning = 0;
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
		$("#test_timer").text(sliderStartValMeaning.toString());
		$("#circle").css('stroke', "#41b3d5");
		$("#circle3").css('border', '2px solid #41b3d5');
		$('.circle_animation').css('stroke-dashoffset', 0);

		timerCountKeep = 0;
		hasPlayedRecording = 0;
		$.jPlayer.pause();
		window.clearTimeout("TickMeaning");
		isTimerActiveMeaning = 0;
		isTimerRunningMeaning = 0;
		curSliderPosition = sliderStartValMeaning;

		
		if (firstRun != 1) {
			/*
			if ((curMulti == -1) && (isTimeOut != 1)) {
				if (STATE_MEANING == 0) {
					bootbox.alert("Please choose an option", function() {
					});
					return;
				} else {
					return;
				}
			}*/
			// save the result to the database
			saveMeaningTestResult();			
			resetTimerDisplay(sliderStartValMeaning);
			curMulti = -1;

			curConvNum++;
			// rescramble the array now:
			
			var numStr = curConvNum + 1 + " of " + NumFilesListen.toString();
			$("#textnum").text(numStr);

			if (curConvNum >= NumFilesListen - 1) {
				screenAdvance = 1;
			}
			if (curConvNum >= NumFilesListen) {
				window.clearTimeout("TickMeaning");
				isTimerActiveMeaning = 0;
				nextButton();
				return;
			}

		} else {
			firstRun = 0;
		}
		//$("#fileToPlay").attr("src", "testdata/" + filenames[curConvNum]);	
		//players[0].startDownload('testdata/testsound.mp3');
		players[0].startDownload("testdata/" + filenames[curConvNum]);


		scrambleArray = shuffleArray(scrambleArray);
		
		$("#text1").text(testchoices[curConvNum][scrambleArray[0]]);
		$("#text2").text(testchoices[curConvNum][scrambleArray[1]]);
		$("#text3").text(testchoices[curConvNum][scrambleArray[2]]);
		$("#text4").text(testchoices[curConvNum][scrambleArray[3]]);

		$("#testquestion").text(testquestions[curConvNum]);
		$("#playButton").attr("src", "common/images/play.png");
		$("#replaysLeftText").text("Play");

		var numCircles = curConvNum + 2;
		for ( i = 0; i < numCircles; i++) {
			$(".circleContainer").eq(i).children().first().removeClass('circleInner').removeClass('circleOuter');
			$(".circleContainer").eq(i).children().first().addClass('circleInner');
		}

		clearMultiUI();

	};

	function clearMultiUI() {
		
		$("#choice1").removeClass('selected');
		$("#choice2").removeClass('selected');
		$("#choice3").removeClass('selected');
		$("#choice4").removeClass('selected');
				
		$("#choice1").attr("nothover","true");
		$("#choice2").attr("nothover","true");
		$("#choice3").attr("nothover","true");
		$("#choice4").attr("nothover","true");
		
		$("#nextMeaning").addClass("disabled");
	}

	saveMeaningTestResult = function() {
		$(".not-done:first").removeClass("not-done").addClass("done");
		var testid1;
		// if timeout
		if (curMulti == -1) {
			scoretosave[curConvNum] = 0;
			testid1 = -1;
		} else {
			testid1 = scrambleArray[curMulti];
			scoretosave[curConvNum] = testiscorrect[curConvNum][scrambleArray[curMulti]];
		}
		//chosensavenum[curConvNum] = scrambleArray[curMulti];

		var testdata = scoretosave[curConvNum];
		var numassessedspeech1 = 0;
		var testtype = 10;
		var globaltestnum = randTestNum;
		var subtestnumber = curConvNum;
		var testcontentindexsave = testcontentindex[curConvNum];
		var testid2 = 0;

		timetaken = Math.round((timetaken * 1000));
		var stringSave = "userid=" + randUserId + "&testdata=" + testdata.toString() + "&testtype=10" + "&numassessedspeech1=-1" + "&globaltestnum=" + globaltestnum.toString() + "&subtestnumber=" + subtestnumber;
		stringSave += "&testid1=" + testid1 + "&testid2=" + testid2 + "&testcontentindex=" + testcontentindexsave + "&timetakenms=" + timetaken.toString();

		$.post("php/savescore.php?" + stringSave, {}, function() {
			//alert("saved");
		});
	};

})(); 

/*
 * 
 * 	playMeaningButton = function(button) {
		isTimerActiveMeaning = 1;
		hasPlayedRecording = 1;
		if (curMulti > -1) {
			changeStateNextButton(1);
		}

		if (isTimerRunningMeaning == 0) {
			isTimerRunningMeaning = 1;
			window.setTimeout("TickMeaning()", tickInterValMS);
		}

		//$("#playButton").css('opacity', 0.5);
		$("#playButton").attr("src", "common/images/play_on.png");
		$("#replaysLeftText").text("Pause");

		if (isPlaying == true) {
			setTimeout("playMeaningButtonDelayed()", 1);
		} else {
			setTimeout("playMeaningButtonDelayed()", delayPlayMS);
		}

	};

	playMeaningButtonDelayed = function(button) {

		if ($("#aud_" + curConvNum).data() != null) {
			isPlaying = !($("#aud_" + curConvNum).data().jPlayer.status.paused);
			if (isPlaying == true) {
				$.jPlayer.pause();
				isPlaying = false;
				$("#playButton").attr("src", "common/images/play.png");
				$("#replaysLeftText").text("Play");
				currentTimeUpTo = $("#aud_" + curConvNum).data().jPlayer.status.currentTime;
				return;
			}
		}
		//$("#aud_"+curConvNum).jPlayer("pauseOthers").jPlayer("playHead",0).jPlayer("play");
		isPlaying = true;
		playAudio("#aud_" + curConvNum);
		$("#aud_" + curConvNum).bind($.jPlayer.event.ended, function() {
			//$("#playButton").css('opacity', 1.0);
			$("#playButton").attr("src", "common/images/play.png");
			$("#replaysLeftText").text("Play again");
			currentTimeUpTo = 0;
			isPlaying = false;
			$("#aud_" + curConvNum).unbind($.jPlayer.event.ended);
		});

		//replaysLeft--;
		//replayTextToShow = "Replay " + (replayNumsAllowedMeaning-replaysLeft).toString() + " of " + replayNumsAllowedMeaning.toString();

	};
*/
