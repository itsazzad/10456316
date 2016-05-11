function makeDiv() {
	$('.phon-click').html(function(_, html) {
		var ret = $([]);
		var prevBlank = 0;
		var wordUpTo = 0;
		letterWordIndex = html.split('');
		$.each(html.split(''), function(_, letter) {
			colorLetter = 'black';
			var span = $('<span />', {
				text : letter,
				css : {
					color : colorLetter,
					font : 1
				}
			});
			span[0].id = "spk" + textNum.toString();
			letterWordIndex[textNum] = wordUpTo;
			if (letter == " "){
				wordUpTo++;
				/* removed because no syllable gaps
				if (prevBlank == 1){
					prevBlank = 0;
					wordUpTo++;
				}else{
					prevBlank = 1;
				}*/
			}else{
				prevBlank = 0;
			}
			textNum++;
			ret = ret.add(span);
		});
		
		wordsArray = html.split(' ');
		return ret;
	});
}

function makeDivWord() {
	$('.phon-click').html(function(_, html) {
		var ret = $([]);
		$.each(html.split(' '), function(_, word) {
			var wordAdd = word + " ";
			colorLetter = 'black';
			var span = $('<span />', {
				text : wordAdd,
				css : {
					color : colorLetter,
					font : 1
				}
			});
			span[0].id = "spkword" + wordNum.toString();
			wordNum++;
			ret = ret.add(span);
		});
		return ret;
	});
}


// used when we combine both screens
function getWordPosFromPhon(element) 
{
		
	var activeColor = "#ccc";
	var deactiveColor = "#fff";	
	var isIncrement = 0;
		 
	idNum = element.id;
	idIndexNum = idNum.substring(3);	
	
	wordIndexChoose = letterWordIndex[idNum.substr(3)];
	//console.log(wordsArray[letterWordIndex[idNum.substr(3)]]);
	var currentWord = wordsArray[wordIndexChoose];
	
	var t1 = "#" + idNum;
	color = $(t1).css("background-color");
	var clickText = $(t1).text();
	if (clickText == " ")
		return;
	if ( ($(t1).css("background-color") == "rgb(255, 255, 255)") || ( $(t1).css("background-color") == "rgba(0, 0, 0, 0)" ) )
	 {
		if (numChosenWord >= maxWordErrors){
			window.alert("10 words");
			return;			
		}
		$(t1).css("background-color", activeColor);
		for (var j=0;j<letterWordIndex.length;j++){
			if (letterWordIndex[j] == wordIndexChoose){
				if ($("#spk"+j).text() != " ")
					$("#spk"+j).css("background-color", activeColor);
			}			
		}
		numChosenWord++;
		for (var j = 0; j < maxWordErrors; j++) {
			if (wordsChosenArrayIndex[j] == 0) {
				wordsChosenArray[j] = currentWord;
				wordsIndexInArray[j] = wordIndexChoose;
				wordsChosenArrayIndex[j] = 1;
				break;
			}
		}				
	}else{
		$(t1).css("background-color", deactiveColor);
		for (var j=0;j<letterWordIndex.length;j++){
			if (letterWordIndex[j] == wordIndexChoose){
				if ($("#spk"+j).text() != " ")
					$("#spk"+j).css("background-color", deactiveColor);
			}			
		}		
		numChosenWord--;
		for (var j = 0; j < maxWordErrors; j++) {
			if (wordsIndexInArray[j] == idIndexNum) {
				wordsChosenArray[j] = "";
				wordsIndexInArray[j] = 0;
				wordsChosenArrayIndex[j] = 0;
				break;
			}
		}						
	}
}

function getCharPos(element) {
	var activeColor = "red";
	var chosenColor = "orange";
	var deactiveColor = "black";
	//var selection = window.getSelection();
	var isIncrement = 0;

	idNum = element.id;
	//idNum = selection.baseNode.parentNode.id;
	var phonChosen = phonCharMatch[idNum.substr(3)];
	// return if a space is chosen
	if (phonChosen == null)
		return;
	var t1 = "#" + idNum;
	color = $(t1).css("color");
	var clickText = $(t1).text();

	//console.log(wordsArray[letterWordIndex[idNum.substr(3)]]);
	
	for (var i = 0; i < textNum; i++) {
		var idName = "#spk" + i.toString();
		curText = $(idName).text();

		if ($(idName).css("color") == "rgb(255, 0, 0)") {
			$(idName).css("color", chosenColor);
		}

		if (phonChosen == phonCharMatch[i]) {
			if (color == "rgb(0, 0, 0)") {

				if (isIncrement == 0) {
					if (numChosen >= numPhonsErrorMax) {
						window.alert("5 sounds already chosen");
						return;
					}
					// find the first zero one
					for (var j = 0; j < numPhonsErrorMax; j++) {
						if (phonsIndexInArray[j] == 0) {
							phonsChosenArray[j] = phonChosen;
							phonsFirstIndexArray[j] = i;
							phonsIndexInArray[j] = 1;
							break;
						}
					}

					phonsFirstIndexArray[numChosen] = i;
					numChosen++;
					isIncrement = 1;
				}
				if (numChosen <= numPhonsErrorMax)
					$(idName).css("color", activeColor);
			} else {
				$(idName).css("color", deactiveColor);
				if (isIncrement == 0) {
					// find the index to remove.
					for (var j = 0; j < numPhonsErrorMax; j++) {
						if (phonsFirstIndexArray[j] == i) {
							phonsFirstIndexArray[j] = 0;
							phonsChosenArray[j] = 0;
							phonsIndexInArray[j] = 0;
							break;
						}
					}
					numChosen--;
					isIncrement = 1;
				}
			}
		}
	}

}



submitPhonProblems = function() {
	//assessorname  speechscoreid detailtype = 1 detailscore1
	phpString = "php/assess_detailed_save.php?assessorname=" + assessorname + "&speechscoreid=" + testIDScave + "&detailtype=10&detailscore1=" + phonsChosenArray[0] + "&detailscore2=" + phonsChosenArray[1] + "&detailscore3=" + phonsChosenArray[2] + "&detailscore4=" + phonsChosenArray[3] + "&detailscore5=" + phonsChosenArray[4];
	$.post(phpString, {}, function() {
		//window.alert("done");
	});
	//feedbackstate = 3;
	//changeState();

	for (var i=0;i<maxWordErrors; i++){	
		if (wordsChosenArrayIndex[i]== 0)
			continue;

		phpString = "php/assess_detailed_save.php?assessorname=" + assessorname + "&speechscoreid=" + testIDScave + "&detailtype=11&detailscore1=" + wordsChosenArray[i].split(' ').join('') + "&detailscore2=" + wordsIndexInArray[i] + "&detailscore3=0&detailscore4=0&detailscore5=0";
		$.post(phpString, {}, function() {
		});
	}


	changeTestSpeech(1);
};

submitWordErrors = function() {

	for (var i=0;i<maxWordErrors; i++){	
		if (wordsChosenArrayIndex[i]== 0)
			continue;

		phpString = "php/assess_detailed_save.php?assessorname=" + assessorname + "&speechscoreid=" + testIDScave + "&detailtype=11&detailscore1=" + wordsChosenArray[i] + "&detailscore2=" + wordsIndexInArray[i] + "&detailscore3=0&detailscore4=0&detailscore5=0";
		$.post(phpString, {}, function() {
		});
	}
	
	
};
