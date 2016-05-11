var startStage = 1;
var curstage = startStage;

var emailToSendArray;
var timeTakenSoFarArray;
var globalTestNumArray;

var savePHPDataArray;
var mode = 1;
var speakerJust = "";
var testtype = 1;

window.onload = function init() {
	curstage = startStage;
	document.getElementById('stage' + curstage.toString()).click();

};

function setupAdminMain() {

	$("#startDate").datepicker({
		dateFormat : 'mm-dd-yy'
	});
	$("#endDate").datepicker({
		dateFormat : 'mm-dd-yy'
	});
	var scoringMetricNumbers;
	var scoringMetricText;
	
	var phpString;
	if (testtype == 2)
		phpString = "freespeech";
	if (testtype == 1)
		phpString = "dictation";
	$.post("php/getscoringinstructions.php?speechtype=" + phpString, {}, function(data) {
		jd = $.parseJSON(data);
		result = jd.data;
		if (result == "none") {
			window.alert("no files to rate - please go to another section");
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

	$(document).delegate("tr", "click", function(e) {
		showDetails($(this).index());
	});
	return;
}

function showDetails(index) {
	// take the index -1
	if (index <= 0)
		return;
	switch (mode) {
	case 1:
		curtestNum = savePHPDataArray[index-1][2];
		$.post("php/admininfo.php?mode=2&globaltestnum=" + curtestNum.toString(), {}, function(data) {
			jd = $.parseJSON(data);
			result = jd.data;
			if (result == "none") {
				//window.alert("no files to rate - please go to another section");
			} else {
				$("#dictationToDo").text("Dictation done (of 2):     " + result[0][0].toString());
				$("#freeSpeechToDo").text("Free speech done (of 2):     " + result[0][0].toString());
				$("#listeningToDo").text("Listening done (of 1):     " + result[0][0].toString());
			}
		});
		break;
	case 6:
	// want 6,7,10,11 to do the same thing.
	case 7:
	case 10:
	case 11:
		url = "https://app.fluentiq.com/recordings/" + result[index-1][0];
		var au = document.createElement('audio');
		au.controls = true;
		au.src = url;
		while (recordingslistAdmin.childNodes.length > 0) {
			recordingslistAdmin.removeChild(recordingslistAdmin.childNodes[0]);
		}
		recordingslistAdmin.appendChild(au);

		var phpString = "php/admininfo.php?mode=8&testid=" + result[index-1][1];
		$.post(phpString, {}, function(data) {
			jd = $.parseJSON(data);
			resultTemp = jd.data;
			if (resultTemp == "none") {
			} else {
				resultShow = 'Scores for the file:   ';
				for ( i = 0; i < resultTemp.length; i++) {
					resultShow += "  " + resultTemp[i].toString();
					if (i<resultTemp.length-1)
						resultShow += "     ";
				}
				$("#scoresText").html(resultShow);
			}
		});
		if (testtype == 1){
			$("#freeSpeechInsn").text("");
			$("#freeSpeechQuestion").text("");							
			return;
		}
		//select text from freespeech where id = (select testcontentindex from speechscore where id = '1650')
		var phpString = "php/admininfo.php?mode=9&testid=" + result[index-1][1];
		$.post(phpString, {}, function(data) {		
			jd = $.parseJSON(data);
			resultT2 = jd.data;
			if (resultT2 == "none") {
				$("#freeSpeechInsn").text("");
				$("#freeSpeechQuestion").text("");				
			} else {
				$("#freeSpeechInsn").text("The user has been asked to talk for 30-60 seconds about: ");
				$("#freeSpeechQuestion").text(resultT2[0][0]);
			}		
		});
	break;
	default:
	break;
}

}

function clearDetailsToDo() {
	$("#dictationToDo").text("");
	$("#freeSpeechToDo").text("");
	$("#listeningToDo").text("");
}

function fillTable(columnNames) {

	var phpString = "php/admininfo.php?mode=" + mode.toString();
	if (mode == 5) {
		$("#startDate").val();
		$("#endDate").val();
		phpString = phpString + "&startdate=" + $("#startDate").val() + "&enddate=" + $("#endDate").val();
	}
	if ((mode==10) || (mode==11)){ 
		phpString = phpString + "&speaker=" + speakerJust;	
	}
	
	var htmlHead = '<tr><th>';
	var numColumns = columnNames.length;
	for ( i = 0; i < numColumns - 1; i++) {
		htmlHead = htmlHead + columnNames[i];
		htmlHead = htmlHead + "</th><th>";
	}
	htmlHead = htmlHead + columnNames[numColumns - 1] + '</th></tr>';
	var td = $("#toAssessTable>tbody>tr:first");
	td.replaceWith(htmlHead);
	$('#toAssessTable tr').not(':first').remove();

	$.post(phpString, {}, function(data) {
		jd = $.parseJSON(data);
		result = jd.data;
		if (result == "none") {
			//window.alert("no files to rate - please go to another section");
		} else {
			savePHPDataArray = result;
			var html = '';
			for ( i = 0; i < result.length; i++) {
				html = html + '<tr><td>';
				for ( j = 0; j < numColumns - 1; j++) {
					html = html + result[i][j] + '</td><td>';
				}
				html = html + result[i][numColumns - 1] + '</td></tr>';
			}
			$('#toAssessTable tr').first().after(html);

		}
	});

}

function ShowToDo() {
	clearDetailsToDo();
	mode = 1;
	var columnNames = ["Email", "Time taken so far", "testNum"];
	fillTable(columnNames);
	return;

}

function ShowDone() {
	clearDetailsToDo();
	mode = 3;
	var columnNames = ["Email", "TestID", "Time entered", "Time taken"];
	fillTable(columnNames);
	return;
}

//select count(distinct ip), date(datetry) as cnt from usagescore  where datetry between '2015-09-01' and '2016-01-01' and state = 0 group by date(datetry)
function ShowDailyVisits() {
	mode = 4;
	var columnNames = ["Number", "Date"];
	fillTable(columnNames);
	return;
}

function ShowFallOutStage() {
	clearDetailsToDo();
	mode = 5;
	var columnNames = ["Count", "Stage"];
	fillTable(columnNames);
	return;

}

function ShowRecordingScore(type) {
	testtype = type;
	clearDetailsToDo();
	mode = 6;
	if (type == 2)
		mode = 7;
	var columnNames = ["filename", "id", "score"];
	fillTable(columnNames);

	while (recordingslistAdmin.childNodes.length > 0) {
		recordingslistAdmin.removeChild(recordingslistAdmin.childNodes[0]);
	}
/*
	var hf = document.createElement('a');
	curFileName = result[0][0];
	url = "https://app.fluentiq.com/recordings/" + curFileName;
	hf.href = url;
	hf.innerHTML = hf.download;
	var au = document.createElement('audio');
	au.controls = true;
	au.src = url;
	recordingslistAdmin.appendChild(au);
	*/
	return;

}

function ShowJustScore(speaker) {
	clearDetailsToDo();
	mode = 10;
	if (testtype == 2)
		mode = 11;
	var columnNames = ["filename", "id", "score"];
	speakerJust = speaker;
	fillTable(columnNames);

	while (recordingslistAdmin.childNodes.length > 0) {
		recordingslistAdmin.removeChild(recordingslistAdmin.childNodes[0]);
	}
/*
	var hf = document.createElement('a');
	curFileName = result[0][0];
	url = "https://app.fluentiq.com/recordings/" + curFileName;
	hf.href = url;
	hf.innerHTML = hf.download;
	var au = document.createElement('audio');
	au.controls = true;
	au.src = url;
	recordingslistAdmin.appendChild(au);
	*/
	return;

}


showScoringInstructions = function(button) {
	$("#overlay-container").show();
	$("#overlay").show();
};

closeOverlay = function() {
	$("#overlay-container").hide();
	$("#overlay").hide();
	return false;
};

function createArray(length) {
	var arr = new Array(length || 0), i = length;
	if (arguments.length > 1) {
		var args = Array.prototype.slice.call(arguments, 1);
		while (i--)
		arr[length - 1 - i] = createArray.apply(this, args);
	}
	return arr;
}

