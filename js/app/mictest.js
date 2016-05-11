var isTimerActiveMicTest = 1;
(function() {
var tickInterValMSMic = 1000;	 
var totalSecs = 5000;
var timeLeft = totalSecs;
var isSkinnedPlayback = false;

ResetMicTest = function(){
	isTimerActiveMicTest = 1;
	timeLeft = totalSecs;
	isSkinnedPlayback = false;
};

TickCheckMic = function() {

	$("#timertext").addClass("active");
	if (isTimerActiveMicTest == 1){
		window.setTimeout("TickCheckMic()", tickInterValMSMic);
	}else{
		return;
	}
	timeLeft -= tickInterValMSMic;
	$("#timertext").text((timeLeft/1000).toString());
	if (timeLeft <= 0) {
		isTimerActiveMicTest = 0;
	}
	
};	

showHearSound = function(){
	$("#miccheckrecord").addClass("hide");
	$("#miccheckyesno").removeClass("hide");
	$("#miccheckplay").removeClass("hide");
	skinPlayer(1);
	$("#insnListenRecordMic").removeClass("hide");
	$("#insnStartRecordMic").addClass("hide");
};

showRecordSound = function(){
	$("#miccheckrecord").removeClass("hide");
	$("#miccheckyesno").addClass("hide");
	$("#miccheckplay").addClass("hide");

	$("#insnListenRecordMic").addClass("hide");
	$("#insnStartRecordMic").removeClass("hide");
};


setPlayBackFile = function(fileName){
	if (isSkinnedPlayback == false){
		skinPlayer(1);
		isSkinnedPlayback = true;
	}
	$("#playbackrecord").attr("src", "recordings/" + fileName);
};



})();