var startStage = 1;
var curstage = startStage;

var mode = 1;

var charToPhon;
var phonCharMatch;
/*
window.onload = function init() {
	curstage = startStage;
	document.getElementById('stage' + curstage.toString()).click();

};
*/
var textNum = 0;
function makeDiv(){
	$('.phon-click').html(function(_, html) {
		var ret = $([]);
		$.each(html.split(''), function(_, letter) {
			colorLetter = 'black';
			var span = $('<span />', {
				text : letter,
				css : {
					color : colorLetter,
					font: 1
				}
			});
			span[0].id= "spk" + textNum.toString();
			/*
			if (letter == " "){
				span.css("fontSize","20px");
			}*/
			textNum++; 
			ret = ret.add(span);

		});
		return ret;
	});		
}
function getCharPos() {
	
	var activeColor = "red";
	var chosenColor = "orange";
	var deactiveColor = "black";
	var selection = window.getSelection();
	
	idNum = selection.baseNode.parentNode.id;
	var phonChosen = phonCharMatch[idNum.substr(3)];
	//console.log(phonChosen);
	var t1 = "#" + idNum;
	color = $(t1).css("color");
	var clickText = $(t1).text(); 
	
	
	if (color[4]=="0"){
		$(t1).css("color",activeColor);	
	}else{
		$(t1).css("color",deactiveColor);
	}
	
	
	for (var i=0;i<textNum;i++){
		var idName = "#spk" + i.toString();	
		curText = $(idName).text();
		if (phonChosen==phonCharMatch[i])
		//if (clickText == curText)
		{
			if (color[4]=="0"){
				$(idName).css("color",activeColor);	
			}else{
				$(idName).css("color",deactiveColor);
			}			
		}
		
	}
	
	//$("#spk38").css("color","red");
	
	//var chosenText = selection.baseNode;
	//var colorLetter; 		
	//console.log(selection.focusNode.data[selection.focusOffset]);
	//console.log(selection.focusOffset);
}




function setupAMTMain() {

	phpString = "";
	result1 = "";
	result2 = "";
	result3 = "";
	$.post("php/amtfeedback.php?mode=1", {}, function(data) {
		jd = $.parseJSON(data);
		result1 = jd.data;
		if (result1 == "none") {
			window.alert("no data");
		} else {
			$.post("php/amtfeedback.php?mode=2", {}, function(data) {
				jd = $.parseJSON(data);
				result2 = jd.data;
				if (result2 == "none") {
					window.alert("no data");
				} else {
					$.post("php/amtfeedback.php?mode=3", {}, function(data) {
						jd = $.parseJSON(data);
						result3 = jd.data;
						if (result3 == "none") {
							window.alert("no data");
						} else {
							savedata(result1, result2, result3);
						}
					});
				}
			});
		}
	});

	return;
}

function savedata(result1, result2, result3) {

	var t = "";
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
		for (var j=0;j<temp.length;j++){
			//charToPhon[phonTo] = j;
			if (temp[j] == ' ')	{
				syllCount++; 
			}else{
				charToPhon[phonTo] = syllCount;
				phonCharMatch[phonTo] = result2[syllCount][1];
				phonTo++;
			}
		}		
		temp = temp.replace(/\s/g, '');
		t += temp;
		t += " ";
		
		if (syllNumMatchCount +1 < result1.length){
			if (result1[syllNumMatchCount][0] == result1[syllNumMatchCount+1][0]){
				syllNumMatchCount++;
				//t += String.fromCharCode(160);
				t += " ";
				phonTo++;				
			}
		}
		syllNumMatchCount++;
		charToPhon[phonTo] = syllCount;
		syllCount++;
		phonTo++;
		
	}
	$("#readtextphon").text(t);
	makeDiv();
	for (var i=0;i<textNum;i++){
		var idName = "#spk" + i.toString();	
		t1 = $(idName).click(function() {
			getCharPos();
		});
	}
		
	return;
	scoringMetricNumbers = createArray(result1.length);
	scoringMetricText = createArray(result1.length);
	for (var i = 0; i < result1.length; i++) {
		scoringMetricNumbers[i] = result[i][0];
		scoringMetricText[i] = result[i][1];
	}

}

function createArray(length) {
	var arr = new Array(length || 0), i = length;
	if (arguments.length > 1) {
		var args = Array.prototype.slice.call(arguments, 1);
		while (i--)
		arr[length - 1 - i] = createArray.apply(this, args);
	}
	return arr;
}

