var charToPhon;
var phonCharMatch;
var textNum = 0;
var wordNum = 0;
var wordNumInPhonCount = 0;
var numChosen = 0;
var numChosenWord = 0;

var numPhonsErrorMax = 5;
var phonsChosenArray = createArray(numPhonsErrorMax);
// phonetics of chosen sounds.
var phonsFirstIndexArray = createArray(numPhonsErrorMax);
// index of first time.
var phonsIndexInArray = createArray(numPhonsErrorMax);
// 1 or 0 if is there or not.
var maxInd = 0;
var spanIndex = 0;

var maxWordErrors = 10;
var wordsChosenArray = createArray(maxWordErrors); // name of word in array
var wordsChosenArrayIndex = createArray(maxWordErrors); // index of words in paragarph
var wordsIndexInArray = createArray(maxWordErrors); // has 1 or 0 whether that index in the word errors is taken.

var wordsArray; // words from phon
var letterWordIndex; 


function setupPhonFeedback(showOnly,$scope) {

	$("#readtextphon").text("loading");
	numChosen = 0;
	numChosenWord = 0;
	wordNumInPhonCount = 0;	
	textNum = 0;
	wordNum = 0;
	
	for (var i=0;i<numPhonsErrorMax; i++){
		phonsIndexInArray[i] = 0;
		phonsChosenArray[i] = 0;
		phonsFirstIndexArray[i] = 0;
	}
	for (var i=0;i<maxWordErrors; i++){
		wordsChosenArrayIndex[i] = 0;
		wordsIndexInArray[i] = 0;
		wordsChosenArrayIndex[i] = 0;
	}
	
	phpString = "";
	result1 = "";
	result2 = "";
	result3 = "";
	
	$.post("php/amtfeedback.php?mode=1&sentid=" + contentIndex.toString() + "&globaltestnum=" + userIdReportShow, {}, function(data) {
		jd = $.parseJSON(data);
		result1 = jd.data;
		if (result1 == "none") {
			window.alert("no data");
		} else {
			$.post("php/amtfeedback.php?mode=2&sentid=" + contentIndex.toString() + "&globaltestnum=" + userIdReportShow, {}, function(data) {
				jd = $.parseJSON(data);
				result2 = jd.data;
				if (result2 == "none") {
					window.alert("no data");
				} else {
					$.post("php/amtfeedback.php?mode=3&sentid=" + contentIndex.toString() + "&globaltestnum=" + userIdReportShow, {}, function(data) {
						jd = $.parseJSON(data);
						result3 = jd.data;
						if (result3 == "none") {
							window.alert("no data");
						} else {
							savedata(result1, result2, result3,showOnly,$scope);
						}
					});
				}
			});
		}
	});

	return;
}


function savedata(result1, result2, result3,showOnly,$scope) {

	var t = "";
	var wordfb = "";
	var temp = "";
	charToPhon = createArray(1000);
	phonCharMatch = createArray(1000);

	charToPhon[0] = 0;
	var syllCount = 0;
	var phonTo = 0;
	var syllNumMatchCount = 2;
	for (var i = 0; i < result3.length; i++) {
		temp = result3[i][1];
		//syllCount = 0;
		for (var j = 0; j < temp.length; j++) {
			//charToPhon[phonTo] = j;
			if (temp[j] == ' ') {
				syllCount++;
			} else {
				charToPhon[phonTo] = syllCount;
				phonCharMatch[phonTo] = result2[syllCount][1];
				phonTo++;
			}
		}
		temp = temp.replace(/\s/g, '');
		t += temp;
		wordfb = wordfb + temp;		
		//t += " "; // remove if we want not to have syllable spaces, and put in if we do

		if (syllNumMatchCount + 1 < result1.length) {
			if (result1[syllNumMatchCount][0] == result1[syllNumMatchCount+1][0]) {
				syllNumMatchCount++;
				t += " ";
				wordfb += " ";
				phonTo++;
			}
		}
		syllNumMatchCount++;
		charToPhon[phonTo] = syllCount;
		syllCount++;
		//phonTo++; // remove if we want not to have syllable spaces and put in if we do

	}
	if (showOnly==true){
		phon_fb_ui_angular(t,$scope);
		return;
	}
	
	var lettersStructArray = [];
	var lettersArray = [];
	
	lettersArray = t.split("");
	lettersStructArray = [];
	for (var i = 0; i < lettersArray.length; i++) {
		var letterStruct = {
			letter : lettersArray[i],
			isSelected : 'false'
		};
		lettersStructArray.push(letterStruct);
	}
	$scope.lettersArray = lettersStructArray;
	$scope.$apply();		
	
	// for phoneme feedback
	textNum = 0;
	wordNum = 0;
	if (feedbackstate == 2){
		$("#readtextphon").text(t);
		makeDiv();
		for (spanIndex = 0; spanIndex < textNum; spanIndex++) {
			var idName = "#spk" + spanIndex.toString();
			t1 = $(idName).click(function() {
				getCharPos(this);
			});
			// right click
			
			$(idName).mousedown(function(e) {
    			if (e.which === 3) {
   					getWordPosFromPhon(this);
	    		}
			});	
			$(idName).bind("contextmenu", function(e) {
        		e.preventDefault();
    		});
    							
		}
		
	}else{
	// for word feedback
		$("#readtextphon").text(wordfb);
		makeDivWord();
		for (var i = 0; i < wordNum; i++) {
			var idName = "#spkword" + i.toString();
			t1 = $(idName).click(function() {
			getWordPos();
			});
		}
	}
	return;

};
