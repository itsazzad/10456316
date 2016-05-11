(function() {

	var isRecordProblem = 0;
	var isTestFail = 0;

	// need to use the new code, to load the data, call and tempCircles()
	var wordsArray;

	var wordStructArray = [];
	var subScoresStruct = [];
	var descriptionsStruct = [];
	var lettersStructArray = [];
	var lettersArray = [];
	var transStructs = [];

	var isSkinnedPlayer = false;

	phon_fb_ui_angular = function(t, $scope) {
		// !! replace with making up the html as it is faster
		var htmlDisplay = "";
		lettersArray = t.split("");
		lettersStructArray = [];
		for (var i = 0; i < lettersArray.length; i++) {
			var letterStruct = {
				letter : lettersArray[i],
				isSelected : 'false'
			};
			lettersStructArray.push(letterStruct);
			htmlDisplay += lettersArray[i];
		}
		$scope.lettersArray = lettersStructArray;
		//$scope.$apply();		
		$("#dictationTextResult").html(htmlDisplay);

	};

	getResults = function($scope, $http) {

		$scope.headingNames = ['1. Pronunciation', '2. Intonation', '3. Pauses', '4. Speed', '5. Vocabulary Mastery', '6. Range of Vocabulary', '7. Grammar Mastery', '8. Sentence Structure', '9. Listening Comprehension', '10. Listening Accuracy'];
		$scope.overallscore = 0.0;
		$scope.speakingscore = 0.0;
		$scope.listeningscore = 0.0;
		$scope.phonemeFeedbackActive = {
			item : -1
		};

		$scope.overallDetail = [];
		$scope.speakingDetail = [];
		$scope.listeningDetail = [];
		$scope.descriptions = [];
		$scope.phonFeedback = [];

		$scope.dictationTextPhoneticsDB = "";
		$scope.dictationTextWordErrorsDB = "";
		$scope.wordsArray = [];
		$scope.lettersArray = [];
		$scope.SubScores = [];
		$scope.subScoresLevel = ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'];
		$scope.subScoresDisplayProgressFile = ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'];
		$scope.dictationFile = {
			url : ''
		};
		$scope.freeSpeechFile = {
			url : ''
		};
		$scope.dictationExampleFile = {
			url : ''
		};
		$scope.freeSpeechExampleFile = {
			url : ''
		};
		$scope.freeSpeechQuestion = [];

		$scope.readAloudTitle = {
			title : 'My read aloud recording'
		};
		$scope.sampleReadAloudTitle = {
			title : 'Sample recording'
		};
		$scope.freeSpeechTitle = {
			title : 'My free speech recording'
		};
		$scope.sampleFreeSpeechTitle = {
			title : 'Example answer'
		};

		$scope.transcriptions = [];
		//$scope.comprehensions = [];
		$scope.comprehensions = [];
		for (i=0;i<5; i++){
			var answers = [];
			for (j=0;j<4;j++){
				var answer = {text : 'a1',isCorr : '0',	chosen : '0' };
				answers.push(answer);
			}
			var question = {
			questionText : '',
			questionNumber : (i+1).toString(),
			score : '0'
			//soundFile : 'test.mp3'
			};
			question.answers = answers;
			$scope.comprehensions.push(question);			
		}
		$scope.comprehensionDescription = [];

		//var soundMatch = ['-11','-27','-7','3','5'];
		$scope.changeSoundResultsShow = function(index) {
			$scope.phonemeFeedbackActive.item = index;
			for (var i = 0; i < phonCharMatch.length; i++) {
				if (phonCharMatch[i] == null)
					continue;
				$scope.lettersArray[i].isSelected = 'false';
				if (phonCharMatch[i] == $scope.phonFeedback[index][0]) {
					$scope.lettersArray[i].isSelected = 'true';
				}
			}
			
			var htmlDisplay = "";

			lettersStructArray = $scope.lettersArray;
			for (var i = 0; i < lettersStructArray.length; i++) {
				if (lettersStructArray[i].isSelected == 'true'){
					htmlDisplay = htmlDisplay  + "<span class='active'>"  + lettersStructArray[i].letter + "</span>";
				}else{
					htmlDisplay += lettersStructArray[i].letter;	
				}
			}
			//$scope.lettersArray = lettersStructArray;
			//$scope.$apply();		
			$("#dictationTextResult").html(htmlDisplay);
			
			
		};

		$.post("php/assess_send.php?globaltestnum=" + userIdReportShow + "&issend=0&state=0", {}, function(data) {
			jd = $.parseJSON(data);
			result = jd.filenames;
			var multiUnderstanding = parseFloat(result[0][0]);// * (10 / 2);
			var transcriptionUnderstanding = parseFloat(result[1][0]);// * (10 / 7);
			var dictationSpeaking = parseFloat(result[2][0]);// * (10 / 7);
			var freeSpeaking = parseFloat(result[3][0]);// * (10 / 7);
			// 0 is the code for no sound, give error message in this case.
			if ((isNaN(freeSpeaking)) || (isNaN(dictationSpeaking)) || (isNaN(transcriptionUnderstanding)) || (isNaN(multiUnderstanding))) {
				isTestFail = 1;
				bootbox.alert("Sorry but there are no test results at this page. Please contact support if you feel something has gone wrong.", function() {
				});
				freeSpeaking = 0;
				dictationSpeaking = 0;
				transcriptionUnderstanding = 0;
				multiUnderstanding = 0;
			}

			if ((freeSpeaking <= 0) || (dictationSpeaking <= 0))
				isRecordProblem = 1;
			console.log("fs__" + freeSpeaking);
			console.log("dictation__" + dictationSpeaking);
			console.log("multiC__" + multiUnderstanding);
			console.log("transcr__" + transcriptionUnderstanding);
			makeScores(dictationSpeaking, freeSpeaking, multiUnderstanding, transcriptionUnderstanding,$scope);

			//speakingScore = 8;understandingScore = 8;overallScore = 8;
			tempCircles($scope.overallscore, $scope.listeningscore, $scope.speakingscore);
			//updateResultsUI(speakingScore,understandingScore,overallScore);

			console.log("speaking__" + speakingScore);
			console.log("understanding__" + understandingScore);

			$.post("php/assess_show_detail.php?globaltestnum=" + userIdReportShow + "&state=0", {}, function(data) {
				jd = $.parseJSON(data);
				result = jd.dataarray;
				if (result.length < 8) {
					$('#detailedNew').hide();
					return;
				}
				var scoreVec = createArray(10);
				for ( i = 0; i < 5; i++) {
					if (i == 3) {
						console.log("result3__" + result[i][0]);
						var diffSpeed = Math.abs(4 - result[i][0]) * 10 / 3;
						scoreVec[3] = 10 - diffSpeed;
					} else {
						scoreVec[i] = result[i][0] * (10 / 7);
					}
					console.log(i.toString() + "__score__" + scoreVec[i]);
				}

				scoreVec[5] = result[5][0] * (10 / 7);
				scoreVec[6] = result[6][0] * (10 / 7);
				scoreVec[7] = result[7][0] * (10 / 7);
				scoreVec[8] = multiUnderstanding * (10/2);
				scoreVec[9] = transcriptionUnderstanding * (10 / 7);

				//select type,lowval,highval,content from descriptions where type < 12 order by type,highval
				var URL = "php/get_descriptions.php";
				var req = {
					method : 'POST',
					url : URL
				};
				$http(req).then(function successCallback(response) {
					//$scope.allDescriptions = response.data.data;
					var descr = response.data.data;
					//$scope.overallDetail = [];	$scope.speakingDetail = [];	$scope.listeningDetail = [];
					for (var i = 0; i < descr.length; i++) {
						if (descr[i][0] != 1)
							continue;
						if ($scope.overallscore <= descr[i][2]) {
							$scope.overallDetail = descr[i][3];
							break;
						}
					}
					for (var i = 0; i < descr.length; i++) {
						if (descr[i][0] != 3)
							continue;
						if ($scope.listeningscore <= descr[i][2]) {
							$scope.listeningDetail = descr[i][3];
							break;
						}
					}
					for (var i = 0; i < descr.length; i++) {
						if (descr[i][0] != 2)
							continue;
						if ($scope.speakingscore <= descr[i][2]) {
							$scope.speakingDetail = descr[i][3];
							break;
						}
					}
					subScoresStruct = [];
					descriptionsStruct = [];
					var indCh;
					for (var i = 0; i < scoreVec.length; i++) {
						var lineStruct = [];
						var descriptionString;
						descriptionString = getDescrString(descr, [i + 4, 1]);
						$scope.subScoresLevel[i] = "beginner";
						if (scoreVec[i] > 2) {
							$scope.subScoresLevel[i] = "elementary";
							descriptionString = getDescrString(descr, [i + 4, 2]);
						}
						if (scoreVec[i] > 5) {
							$scope.subScoresLevel[i] = "intermediate";
							descriptionString = getDescrString(descr, [i + 4, 3]);
						}
						if (scoreVec[i] > 8) {
							$scope.subScoresLevel[i] = "advanced";
							descriptionString = getDescrString(descr, [i + 4, 4]);
						}
						if (i < 8)
							descriptionsStruct.push(descriptionString);
						for (var j = 0; j < 10; j++) {
							var activeTemp = {
								active : 0
							};

							if (scoreVec[i] > j) {
								activeTemp.active = 1;
							} else {
								activeTemp.active = 0;
							}
							lineStruct.push(activeTemp);
						}
						lineStruct[0].scoreProgressFile = "bar" + Math.round(scoreVec[i]).toString() + "@2x.png";
						subScoresStruct.push(lineStruct);
					}
					$scope.descriptions = descriptionsStruct;
					$scope.SubScores = subScoresStruct;

				}, function errorCallback(response) {
				});
			});
		});
	};
	
	getResultsDetailed = function($scope, $http){
		var URL = "php/assess_show_detail.php?globaltestnum=" + userIdReportShowDetailed + "&state=1";
		var req = {
			method : 'POST',
			url : URL
		};
		$http(req).then(function successCallback(response) {
			updateLoaded($scope);
			//tempButton();
			wordStructArray = [];
			var htmlWordArrayDisplay = [];
			//if (!isSkinnedPlayer)
			//skinPlayer(0);
			//isSkinnedPlayer = true;
			response.data[0] = response.data[0].replace(/\s\s+/g, ' ');
			wordsArray = response.data[0].split(" ");

			for (var i = 0; i < wordsArray.length; i++) {
				var wordStruct = {
					word : wordsArray[i],
					isSelected : 'false'
				};
				wordStructArray.push(wordStruct);
			}
			var URL = "php/assess_show_detail.php?globaltestnum=" + userIdReportShowDetailed + "&state=5";
			var req = {
				method : 'POST',
				url : URL
			};
			$http(req).then(function successCallback(response) {
				updateLoaded($scope);
				var temp = response.data;
				if (temp.data[0][0]!='none')
				{				
					for (var i = 0; i < temp.data.length; i++) {
						if (temp.data[i][1]>wordStructArray.length-1)
							temp.data[i][1]= wordStructArray.length-1;
							//continue;
						if (temp.data[i][1]<0)
							continue;							
						wordStructArray[temp.data[i][1]].isSelected = 'true';
					}
				}
				for (var i = 0; i < wordStructArray.length; i++) {
					if (wordStructArray[i].isSelected == 'true'){
						htmlWordArrayDisplay = htmlWordArrayDisplay + " " + "<span class='active'>"  + wordStructArray[i].word + "</span>";						
					}else{
						htmlWordArrayDisplay = htmlWordArrayDisplay + " " + wordStructArray[i].word;
					}
				}		
				$("#dictationWordShowResult").html(htmlWordArrayDisplay);
				$scope.wordsArray = wordStructArray;
				
			}, function errorCallback(response) {
			});

			// get the phoneme errors
			var URL = "php/assess_show_detail.php?globaltestnum=" + userIdReportShowDetailed + "&state=6";
			var req = {
				method : 'POST',
				url : URL
			};
			$http(req).then(function successCallback(response) {
				updateLoaded($scope);
				var temp = response.data.data;
				if (temp[0].length < 2) {
					//temp[0] = ["0", "none", "0"];
					temp = '';
				}
				$scope.phonFeedback = temp;

			}, function errorCallback(response) {
			});

			// get free speech question
			var URL = "php/assess_show_detail.php?globaltestnum=" + userIdReportShowDetailed + "&state=7";
			var req = {
				method : 'POST',
				url : URL
			};
			$http(req).then(function successCallback(response) {
				updateLoaded($scope);
				$scope.freeSpeechQuestion = response.data[0];
			}, function errorCallback(response) {
			});

		}, function errorCallback(response) {
		});

		contentIndex = -1;
		setupPhonFeedback(true, $scope);
		// transcribe with scores
		var URL = "php/assess_show_detail.php?globaltestnum=" + userIdReportShowDetailed + "&state=2";
		var req = {
			method : 'POST',
			url : URL
		};
		$http(req).then(function successCallback(response) {
			updateLoaded($scope);
			transStructs = [];
			for (var i = 0; i < response.data.data.length; i++) {
				var transStruct = {
					textCorrect : response.data.data[i][2],
					textTyped : response.data.data[i][4],
					questionNumber : (i + 1).toString(),
					score : response.data.data[i][0],
					soundFile : "../testdata/" + response.data.data[i][3]
				};
				transStructs.push(transStruct);
			}
			$scope.transcriptions = transStructs;
		});

		var URL = "php/assess_show_detail.php?globaltestnum=" + userIdReportShowDetailed + "&state=3";
		var req = {
			method : 'POST',
			url : URL
		};
		$http(req).then(function successCallback(response) {
			updateLoaded($scope);
			var allData = createArray(response.data.data.length);
			var allDataParts = createArray(response.data.data.length);
			for (var i = 0; i < response.data.data.length; i++) {
				allData[i] = response.data.data[i];
			}
			//allData[0][3] = 1;allData[1][3] = 2;allData[2][3] = 3;allData[3][3] = 4;allData[4][3] = 4; // !! remove
			var totalCorrect = 0;
			for (var i = 0; i < response.data.data.length; i++) {
				$scope.comprehensions[i].score = allData[i][2];
				totalCorrect += parseInt(allData[i][2]);
				if (allData[i][1] > 0)
					$scope.comprehensions[i].answers[allData[i][1]].chosen = 1;
				$scope.comprehensions[i].answers[0].isCorr = 1;

				var URLInner = "php/assess_show_detail.php?question_type=" + allData[i][3] + "&conv_num=" + allData[i][0] + "&state=4&globaltestnum=0&ind_in=" + i.toString();
				var reqInner = {
					method : 'POST',
					url : URLInner
				};
				$http(reqInner).then(function successCallback(responseInner) {
					updateLoaded($scope);
					var index = responseInner.data.data[0][7];
					$scope.comprehensions[index].questionText = responseInner.data.data[0][5];
					$scope.comprehensions[index].soundFile = "testdata/" + responseInner.data.data[0][6];
					$scope.comprehensions[index].answers[0].text = responseInner.data.data[0][1];
					$scope.comprehensions[index].answers[1].text = responseInner.data.data[0][2];
					$scope.comprehensions[index].answers[2].text = responseInner.data.data[0][3];
					$scope.comprehensions[index].answers[3].text = responseInner.data.data[0][4];
				});
				if (i == response.data.data.length - 1) {
					//It seems that you understood (the main ideas, the explicit detail, the implicit information, and the speakers’ purpose) well, but in the future you should pay more attention to (the main ideas, the explicit detail, the implicit information, and the speakers’ purpose).
					var types = ["the main ideas", "the explicit detail", "the implicit information", "the speakers' purpose"];
					var isCorr = createArray(types.length);
					for (var j = 0; j < types.length; j++) {
						isCorr[j] = 1;
					}
					for (var j = 0; j < allData.length; j++) {
						if (parseInt(allData[j][2]) == 0)
							isCorr[allData[j][3] - 1] = 0;
					}
					var fbTemp1 = "It seems that you understood ";
					for (var j = 0; j < types.length; j++) {
						if (isCorr[j] == 1) {
							if ((j == isCorr.lastIndexOf(1)) && (j != isCorr.indexOf(1))) {
								fbTemp1 += " and ";
							} else {
								if (j != isCorr.indexOf(1))
									fbTemp1 += ", ";
							}
							fbTemp1 += types[j];
						}
					}
					fbTemp1 += " well, but in the future you should pay more attention to ";
					for (var j = 0; j < types.length; j++) {
						if (isCorr[j] == 0) {
							if ((j == isCorr.lastIndexOf(0)) && (j != isCorr.indexOf(0))) {
								fbTemp1 += " and ";
							} else {
								if (j != isCorr.indexOf(0))
									fbTemp1 += ", ";
							}
							fbTemp1 += types[j];
						}
					}
					fbTemp1 += ".";
					$scope.comprehensionDescription = fbTemp1;
					if (totalCorrect == 0) {
						$scope.comprehensionDescription = "You should pay more attention to the main ideas, the explicit detail, the implicit information, and the speakers' purpose.";
						continue;
					}
					if (totalCorrect == response.data.data.length) {
						$scope.comprehensionDescription = "Well done! You got all the answers correct.";
						continue;
					}
				}
			}
		});

		$.post("php/assess_send.php?globaltestnum=" + userIdReportShowDetailed + "&issend=0&state=1", {}, function(data) {
			updateLoaded($scope);
			jd = $.parseJSON(data);
			result = jd.filenames;

			$scope.dictationFile.url = "recordings/" + result[0][0];
			$scope.dictationExampleFile.url = "testdata/" + result[2][0];
			$scope.freeSpeechFile.url = "recordings/" + result[1][0];
			$scope.freeSpeechExampleFile.url = "recordings/" + result[1][0];
		});
		
	};
	function updateLoaded($scope){
		$scope.numLoaded++;
		//console.log($scope.numLoaded);
		if ($scope.numLoaded >= $scope.numToLoad){
			$scope.isLoaded = 1;
			//skinPlayer();	
		}		
	}

	function getDescrString(array, values) {
		for (var i = 0; i < array.length; i++) {
			// This if statement depends on the format of your array
			if (array[i][0] == values[0] && array[i][1] == values[1]) {
				//return i;   // Found it
				return array[i][3];
			}
		}
		return "";
		// Not found
	};

})();
