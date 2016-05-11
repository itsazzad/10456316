brandedEnum = {
	BRAND_NONE : 1,
	BRAND_CCEL : 2,
	BRAND_UOC : 3,
	BRAND_KOREA : 4
};

stageOldEnum = {
	LANDING_PAGE_OLD_NOEMAIL:99,
	LANDING_PAGE_OLD:100,
	CHECK_SPEAKERS_OLD:101,
	CHECK_MIC_OLD:102,
	READ_ALOUD_OLD:103,
	FREE_SPEECH_OLD:104,		
	MEANING_OLD:105,
	TRANSCRIPTION_OLD:106,
	GET_RESULTS_OLD:107,
	GET_RESULTS_OLD_ASK:108,	
	SEE_RESULTS_OLD:109,	
};

userUIEnum = {
	CREATE_ACCOUNT : 0,
	COMPLETE_PROFILE : 1,	
	LOGIN : 2,
	RESET_PW : 3,
	DASHBOARD_MAIN: 4,
	DASHBOARD_ACCOUNT: 5,
	DASHBOARD_ACCOUNT_DELETE: 6,
	DASHBOARD_PAYMENT_DETAILS: 7
};

stageEnumTest = {
	LANDING_PAGE : 10,
	PLUG_IN_HEADSET	: 11,
	CHECK_SPEAKERS	: 12,
	CHECK_MIC	: 13,
	READ_ALOUD_INSNS : 14,
	READ_ALOUD	: 15,
	FREE_SPEECH_INSNS	: 16,
	FREE_SPEECH	: 17,
	MEANING_INSNS : 18,
	MEANING	: 19,
	TRANSCRIPTION_INSNS : 20,
	TRANSCRIPTION	: 21,
	GET_RESULTS	: 22,	
	SEE_RESULTS	: 23,
	SEE_RESULTS_ALL: 24	
};

	stageNameNextArray = [
	[stageOldEnum.LANDING_PAGE_OLD_NOEMAIL,"stageLandNoEmail",stageOldEnum.CHECK_SPEAKERS_OLD,],
	[stageOldEnum.LANDING_PAGE_OLD,"stageLand",stageOldEnum.CHECK_SPEAKERS_OLD,],
	[stageOldEnum.CHECK_SPEAKERS_OLD,"stageSpeak",stageOldEnum.CHECK_MIC_OLD],
	[stageOldEnum.CHECK_MIC_OLD,"stageMic",stageOldEnum.READ_ALOUD_OLD],
	[stageOldEnum.READ_ALOUD_OLD,"stageSpeech",stageOldEnum.FREE_SPEECH_OLD],
	[stageOldEnum.FREE_SPEECH_OLD,"stageConv",stageOldEnum.MEANING_OLD],
	[stageOldEnum.MEANING_OLD,"stageMeaning",stageOldEnum.TRANSCRIPTION_OLD],
	//[stageOldEnum.TRANSCRIPTION_OLD,"stageListening",stageOldEnum.GET_RESULTS_OLD],
	[stageOldEnum.TRANSCRIPTION_OLD,"stageListening",stageOldEnum.GET_RESULTS_OLD_ASK],
	[stageOldEnum.GET_RESULTS_OLD,"stageGetRes",stageOldEnum.SEE_RESULTS_OLD],
	[stageOldEnum.GET_RESULTS_OLD_ASK,"stageSeeResAskEmail",stageOldEnum.SEE_RESULTS_OLD],		
	[stageOldEnum.SEE_RESULTS_OLD,"stageSeeRes",stageOldEnum.SEE_RESULTS_OLD],
	[stageEnumTest.SEE_RESULTS_ALL,"stageSeeResNew",stageEnumTest.SEE_RESULTS_ALL],
	[stageEnumTest.LANDING_PAGE,"landingpage",stageEnumTest.PLUG_IN_HEADSET],
	[stageEnumTest.PLUG_IN_HEADSET,"pluginheadset",stageEnumTest.CHECK_SPEAKERS],
	[stageEnumTest.CHECK_SPEAKERS,"checkspeakers",stageEnumTest.CHECK_MIC],
	[stageEnumTest.CHECK_MIC,"checkmic",stageEnumTest.READ_ALOUD_INSNS],
	[stageEnumTest.READ_ALOUD_INSNS,"readaloudinsns",stageEnumTest.READ_ALOUD],
	[stageEnumTest.READ_ALOUD,"readaloud",stageEnumTest.FREE_SPEECH_INSNS],
	[stageEnumTest.FREE_SPEECH_INSNS,"freespeehinsns",stageEnumTest.FREE_SPEECH],
	[stageEnumTest.FREE_SPEECH,"freespeech",stageEnumTest.MEANING_INSNS],
	[stageEnumTest.MEANING_INSNS,"meaninginsns",stageEnumTest.MEANING],
	[stageEnumTest.MEANING,"meaning",stageEnumTest.TRANSCRIPTION_INSNS],
	[stageEnumTest.TRANSCRIPTION_INSNS,"transcriptioninsns",stageEnumTest.TRANSCRIPTION],
	[stageEnumTest.TRANSCRIPTION,"transcription",stageEnumTest.GET_RESULTS],
	[stageEnumTest.GET_RESULTS,"getresults",stageEnumTest.SEE_RESULTS],
	[stageEnumTest.SEE_RESULTS,"seeresults",stageEnumTest.SEE_RESULTS],
	[userUIEnum.CREATE_ACCOUNT, "createAccount",userUIEnum.COMPLETE_PROFILE],
	[userUIEnum.COMPLETE_PROFILE, "completeProfile",userUIEnum.DASHBOARD_MAIN],
	[userUIEnum.LOGIN, "login",userUIEnum.DASHBOARD_MAIN],
	[userUIEnum.RESET_PW, "resetPW",userUIEnum.RESET_PW],
	[userUIEnum.DASHBOARD_MAIN, "dashboard",userUIEnum.DASHBOARD_MAIN],
	[userUIEnum.DASHBOARD_ACCOUNT, "profileDetails",userUIEnum.DASHBOARD_ACCOUNT],
	[userUIEnum.DASHBOARD_ACCOUNT_DELETE, "deleteAccount",userUIEnum.DASHBOARD_ACCOUNT_DELETE],
	[userUIEnum.DASHBOARD_PAYMENT_DETAILS, "paymentDetails",userUIEnum.DASHBOARD_PAYMENT_DETAILS]
	];

// store the current stage and next stage so they can easilty be changed.
var isStaging = 0;
var stagingVar = 'staging_4365';
var stageNameNextArray;
var NumMicCheckMS = 5000;
var brandedNum = brandedEnum.BRAND_NONE;
var email = 'testl@b.com';
var userId = 0;
var ispaid = 't'; // !! using paid for all for the moment 
var expirydate = '';
var subscriptionid = ''; 
var username = '';

var myDateLineChart;
var hashedIn; 
var isResetPW = 0;

var players = [];
var testOption = 0;

var curstage = startStage;
var soundPassed = 0;
var playingSoundIDName;
var micIsEnabled = 0;
// if to advance to the next
var screenAdvance = 0;
var isRecording = 0;
var audioContext = null;
var audioRecorder;
var isSoundCheck = 1;

var fileName = "";
var fileNameDictation = "";
var fileNameFS = "";

var _realAudioInput;
var randUserId = Math.floor((Math.random() * 1000000000) + 1);
var randTestNum = Math.floor((Math.random() * 1000000000) + 1);

var newSoundPlayback = 1;


//var numReRecordDictation = 0;
var numReRecordFreeSpeech = 0;
var tickInterValMS = 200;
var tick1SecMs = 1000;
var userIdReportShow = -1;
var userIdReportShowDetailed = -1;
var isMicDisabled = 0;
var hasShownPowerUI = 0;
var currentTimeUpTo = 0;

var totalTestElements = 12;
var numBackPushed = 0;
var pagesNamesOld = ["IntroRes","ResIntroNoEmail", "Start", "MicRes", "SpeechRes", "Conversation", "MeaningRes", "ListeningRes", ,"ResultResAskEmail","Email", "ResultRes"];
//var pagesNames = ["landingpage","pluginheadset","checkspeakers","checkmic","readaloudinsns","readaloud","freespeechinsns","freespeech","meaninginsns","meaning","transcriptioninsns","transcription","getresults"];
var pagesNames = ["landingpage","pluginheadset","checkspeakers","checkmic","readaloudinsns","readaloud","freespeechinsns","freespeech","meaninginsns","meaning","transcriptioninsns","transcription"];
var pagesUI = ["createAccount"];

var isNextEnabled = 1;
// need this to be extra careful that it can't be clicked twice before the UI updates.
var hasEnteredEmail = 0;

var soundMessageCantHear = translationsGlobal.sCModalFirstCheck+"<br>";
soundMessageCantHear = soundMessageCantHear + translationsGlobal.sCModalIfThat+"<br>";
soundMessageCantHear = soundMessageCantHear + translations.sCModalWindows;

var soundMessageCantRecord = translationsGlobal.mCModalFirstCheck+"<br>";
soundMessageCantRecord = soundMessageCantRecord + translationsGlobal.mCModalIfThat+"<br>";
soundMessageCantRecord = soundMessageCantRecord + translationsGlobal.mCModalWindows;
soundMessageCantRecord = soundMessageCantRecord + "<br><br> "+translationsGlobal.mCModalIfContinue;

var BROWSER_SUPPORT = translationsGlobal.messagedBrowserSupport;
var ALERT_BROWSER_NOT = translationsGlobal.messagedBrowserNoSupport;

var ALERT_RECORDING_NOT = translationsGlobal.messagedProblemSoundSetup;
var ALERT_ENABLE_MIC = translationsGlobal.messagedPleaseEnableMic;
var ALERT_CANNOT_REC = translationsGlobal.messagedCantRecordSound;
var ALERT_MIC_DISABLED = translationsGlobal.messagedMicDisabled;
var ALERT_SAY123 = translationsGlobal.messagedClickRecordTest;
var TEXT_NO_SOUND_MIC = translationsGlobal.messagedNoSoundMic;
var TEXT_NOT_GOOD_REC = translationsGlobal.messagedRecordNoisy;
var SOUND_SETUP = translationsGlobal.messagedSetSound;
var OK_TEXT = translationsGlobal.messagedOK;
var RETRY_TEXT = translationsGlobal.messagedRetry;


var BrowserTypeId = 1;
//0 for default, 1 for chrome, 2 for FF.
/* saveUsageData
 *
 *-1 browser not supported
 * 0 start of test
 * 1 browser supported
 * 2 speaker passed
 * 3 mic passed
 * 4 meaning finished
 * 5 listening finished
 * 6 dictation finished
 * 7 free speech finished
 * 8 email given
 * 9 for when results checked.
 *
 */

function routeChange(event, newUrl, oldUrl) {
	if (startStage > 10)
		return;
	newUrl = newUrl.toString();
	n = newUrl.toString().lastIndexOf("/");
	PathTo = newUrl.substring(n + 1);
	n = oldUrl.toString().lastIndexOf("/");
	PathFrom = oldUrl.substring(n + 1);
	if (!($.inArray(PathTo, pagesNames)>0))
		return;
	if ($.inArray(PathTo, pagesNames) < $.inArray(PathFrom, pagesNames)) {
		event.preventDefault();
		// This prevents the navigation from happening
		
		//bootbox.alert(translationsGlobal.messagedNote, function() {
		bootbox.alert(translationsGlobal.messagedNote, function() {
		});
	}
	return;
}

window.onbeforeunload = function() {
	if (startStage > 10)
		return;
	if ((curstage <= stageEnumTest.GET_RESULTS) && (curstage >= stageEnumTest.READ_ALOUD_INSNS))
	//if ((curstage <= stageOldEnum.GET_RESULTS_OLD_ASK) && (curstage >= stageOldEnum.READ_ALOUD_OLD))
			if (hasEnteredEmail == 0)
				return translationsGlobal.messagedYouWill;
};

function browserIsSupported() {
	// Note that 95% of android can use an acceptable version of chrome:
	//Chrome requires 4+.  http://android.stackexchange.com/questions/4447/what-percentage-of-devices-have-each-of-the-android-versions  95.7% of phones can install Chrome!
	var isSafari = 0;
	// check for safari.
	var ua = navigator.userAgent.toLowerCase();
	if (ua.indexOf('safari') != -1) {
		if (ua.indexOf('chrome') > -1) {
			isSafari = 0;
		} else {
			isSafari = 1;
		}
	}
	window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
	if ((window.AudioContext == null) || (isSafari == 1)) {

		bootbox.dialog({
			message : ALERT_BROWSER_NOT,
			title : BROWSER_SUPPORT,
			buttons : {
				main : {
					label : OK_TEXT,
					className : "btn btn-next",
					callback : function() {
					}
				}
			}
		});
		saveUsageData(-1, "browser not supported");
		return 0;
	} else {
		//alert("is there");
	}
	return 1;

}

var elmblink = function(elm, n, interval, start) {
	elm.toggle();
	start++;
	if (start < n * 2) {
		setTimeout(function() {
			elmblink(elm, n, interval, start);
		}, interval);
	}
};

function retryMic() {
	showAllowMicMessageBrowser();
	setupAudioRecord();
}

function showAllowMicMessageBrowser() {
	// show the correct message depending on browser
	if (BrowserTypeId == 1) {
		$("#HowAllowMic").hide();
		$("#HowAllowFF").hide();
		$("#AllowMic").show();
		$("#AllowMicFF").hide();
	} else {
		$("#HowAllowMic").hide();
		$("#HowAllowFF").hide();
		$("#AllowMicFF").show();
		$("#AllowMic").hide();
	}
}

function showMicInsns() {
	if (BrowserTypeId == 1) {
		$("#AllowMic").hide();
		$("#AllowMicFF").hide();
		$("#HowAllowMic").show();
	} else {
		$("#AllowMic").hide();
		$("#AllowMicFF").hide();
		$("#HowAllowFF").show();
	}
}

function hideOverlay() {
	$("#AllowMic").hide();
	$("#AllowMicFF").hide();
	$("#HowAllowMic").hide();
	$("#HowAllowFF").hide();
	$("#overlay").hide();
}

//window.onload = function init() {
	function init($location,$rootScope,$scope) {
	//$.getScript("https://js.braintreegateway.com/v2/braintree.js");
	
	saveUsageData(0, "initial load page");
	androidStandardSave();
	if (startStage == stageOldEnum.LANDING_PAGE_OLD){
		var tempLookup = findIndLookup(stageOldEnum.TRANSCRIPTION_OLD);
		stageNameNextArray[tempLookup][2] = stageOldEnum.GET_RESULTS_OLD;
		//[stageOldEnum.TRANSCRIPTION_OLD,"stageListening",stageOldEnum.GET_RESULTS_OLD],
	}
	
	if (top.location.pathname.search("staging_4365") > 0) {
		isStaging = 1;
	}	
	
	curstage = startStage;
	if (top.location.pathname.search("ccel.html") > 0) {
		brandedNum = brandedEnum.BRAND_CCEL;
		randUserId = '9999' + randUserId.toString().substring(4);
		$("#test_title").text("English Placement Test");
		$("#test_description_ccel").css('display', '');
		$("#test_description").css('display', 'none');
	}
	if (top.location.pathname.search("korea.html") > 0) {
		var pagesNames = ["ResIntroNoEmailK", "StartK", "MicResK", "SpeechRes", "Conversation", "MeaningRes", "ListeningRes", ,"ResultResAskEmail","Email", "ResultRes"];
		brandedNum = brandedEnum.BRAND_KOREA;
		changetextKorea();
	}

	// check for Chrome. Need to do on mobile/vs desktop also.
	var isChromium = window.chrome, vendorName = window.navigator.vendor, isOpera = window.navigator.userAgent.indexOf("OPR") > -1;
	if (isChromium !== null && isChromium !== undefined && vendorName === "Google Inc." && isOpera == false) {
		BrowserTypeId = 1;
	} else {
		if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1)
			BrowserTypeId = 2;
		// firefox
	}

	
	var secondInput;
	var inData = top.location.search.substr(1);
	//userId = delineate(inData);
	theleft = inData.indexOf("=") + 1;
	theright = inData.lastIndexOf("&");
	if (theright < 0)
		theright = inData.length;

	var inputType = inData.substring(0, theleft - 1);
	//inData.substring(0,theleft-1) == option
	// or if it is usertestid
	
	if (inputType == "signupid") {
		var userSignUpID = (inData.substring(theleft, theright));
		randUserId = parseInt(userSignUpID);		
		email = inData.substring(theright+7);
		curstage = userUIEnum.COMPLETE_PROFILE;		
		$location.path('completeProfile');
		return;
	}

	if (inputType == "usertestid") {
		userIdReportShow = (inData.substring(theleft, theright));
		userIdReportShow = parseInt(userIdReportShow);		
		if (userIdReportShow > 0) {
			randTestNum = userIdReportShow;
			curstage = stageEnumTest.SEE_RESULTS_ALL;
			//login($rootScope,$location,$scope,'');
			ispaid = 't';
			//document.getElementById('stageSeeResNew').click();
			$location.path('ResultResNew');
			return;			
			//getResults();
		}
	}

	if (inputType == "loginresetpw") {
		email = (inData.substring(theleft, theright));
		hashedIn = inData.substring(theright+3); //ignore &q= in string
		// go to the complete profile page, but with text changed etc. if choose reset, then send email, hashIn, newPW to checklogin.php with 
		// email hashed instead.
		 isResetPW = 1;
		curstage = userUIEnum.COMPLETE_PROFILE;		
		//document.getElementById('completeProfile').click();
		//$location.path('completeProfile');
		//go to the the resetPW page, and store these.
		loginFromURL($rootScope,$location,$scope,email,hashedIn,'completeProfile');		
		return;
	}
	
	if (inputType == "loginemail") {
		email = (inData.substring(theleft, theright));
		hashedIn = inData.substring(theright+3); //ignore &q= in string
		$rootScope.isLoggedIn = 1;
		$location.path('completeProfile');
		//$scope.$apply();		
		//loginFromURL($rootScope,$location,$scope,emailIn,hashedIn,'completeProfile');
		return;
	}
	
	var curIndLook = findIndLookup(curstage);
	//document.getElementById(stageNameNextArray[curIndLook][1]).click();
	$location.path(stageNameNextArray[curIndLook][1]);
	//$location.path('profileDetails');
	if (curstage > stageEnumTest.CHECK_MIC) {
		isSoundCheck = 0;
		soundPassed = 1;
	}

	if ((curstage == startStage) && (startStage > 10) ) {
		setupAudioRecord();
	}

	$("#mic-success").hide();
	$("#mic-fail").hide();
	$("#cantrecord").hide();

	 
};

logout = function($rootScope){

	$rootScope.isLoggedIn = 0;
	$.post("php/checklogin.php?logout=1" ,{},function(data)
	{
		curstage = userUIEnum.LOGIN;
		document.getElementById("login").click();			
	});		
		
};

goBackFromDelete = function(){
	curstage = userUIEnum.DASHBOARD_ACCOUNT;		
	document.getElementById('profileDetails').click();
};			

function nextButton(button) {
	if (isNextEnabled == 0)
		return;
	//changeStateNextButton(0);
	
	// curstage is the enum value.
	// get the index in the array that corresponds to it
	// get the enum val/name that is the next element - nextNum
	// get the index in array that correstpnods to that
	// get next name from that.
	// set curstage to  nextEnumVal
	 
	var tempLookup = findIndLookup(curstage);	
	var nextNum = stageNameNextArray[tempLookup][2];
	var tempName = findIndLookup(nextNum);	
	var nextStage = stageNameNextArray[tempName][1];
	switch (curstage) {
	case userUIEnum.CREATE_ACCOUNT:		
		document.getElementById(nextStage).click();
		break;
	case userUIEnum.COMPLETE_PROFILE:		
		document.getElementById(nextStage).click();
		break;		
	case userUIEnum.LOGIN:
		document.getElementById(nextStage).click();
		break;
	case userUIEnum.RESET_PW:		
		document.getElementById(nextStage).click();
		break;
	case userUIEnum.DASHBOARD_MAIN:
		document.getElementById(nextStage).click();
		break;		
	case userUIEnum.DASHBOARD_ACCOUNT:
		document.getElementById(nextStage).click();
		break;		
		
	case stageOldEnum.LANDING_PAGE_OLD_NOEMAIL:
	case stageOldEnum.LANDING_PAGE_OLD:
	case stageOldEnum.LANDING_PAGE_OLD:
	case stageEnumTest.LANDING_PAGE:
		// check browser is compatible
		isContinue = browserIsSupported();
		if (isContinue == 1) {
			saveUsageData(nextNum, "browser supported");
			curstage = nextNum;
			//startStage			
			$("#mainfooter").hide();
			$("#mainheader").hide();			
			document.getElementById(nextStage).click();
		}
		break;
	case stageEnumTest.PLUG_IN_HEADSET:
		curstage = nextNum;
		document.getElementById(nextStage).click();
		break;
	case stageOldEnum.CHECK_SPEAKERS_OLD:
	case stageEnumTest.CHECK_SPEAKERS:
		saveUsageData(nextNum, "speaker check passed");
		curstage = nextNum;
		document.getElementById(nextStage).click();
		setupAudioRecord();
		break;
	case stageOldEnum.CHECK_MIC_OLD:
	case stageEnumTest.CHECK_MIC:
		saveUsageData(nextNum, "microphone check passed");
		stopRecording();
		curstage = nextNum;
		screenAdvance = 0;
		isSoundCheck = 0;
		soundPassed = 1;
		document.getElementById(nextStage).click();
		break;
	case stageEnumTest.READ_ALOUD_INSNS:
		curstage = nextNum;
		document.getElementById(nextStage).click();
		break;		
	case stageOldEnum.READ_ALOUD_OLD:
	case stageEnumTest.READ_ALOUD:
		saveReadAloudTestResult(0);
		saveUsageData(nextNum, "readaloud test completed");
		curstage = nextNum;
		document.getElementById(nextStage).click();
		break;		
	case stageEnumTest.FREE_SPEECH_INSNS:
		curstage = nextNum;
		document.getElementById(nextStage).click();
		break;		
	case stageOldEnum.FREE_SPEECH_OLD:
	case stageEnumTest.FREE_SPEECH:
		saveFreeSpeechTestResult(0);
		isTimerActiveFreeSpeech = 0;
		saveUsageData(nextNum, "freespeech test completed");
		curstage = nextNum;
		document.getElementById(nextStage).click();
		break;
		
	case stageEnumTest.MEANING_INSNS:
		curstage = nextNum;	
		document.getElementById(nextStage).click();
		break;		
	case stageOldEnum.MEANING_OLD:
	case stageEnumTest.MEANING:
		$.jPlayer.pause();
		for (var i=0; i<players.length;i++){
			players[i].pause();
		}		 		
		if (screenAdvance == 1) {
			saveMeaningTestResult();
			screenAdvance = 0;
			isTimerActiveMeaning = 0;
			saveUsageData(nextNum, "understanding meaning test completed");
			curstage = nextNum;
			document.getElementById(nextStage).click();
			return;
		}
		updateMeaningUI(0);
		break;		
	case stageEnumTest.TRANSCRIPTION_INSNS:
		curstage = nextNum;	
		document.getElementById(nextStage).click();
		break;				
	case stageOldEnum.TRANSCRIPTION_OLD:
	case stageEnumTest.TRANSCRIPTION:	
		$.jPlayer.pause();
		for (var i=0; i<players.length;i++){
			players[i].pause();
		}		 				
		if (screenAdvance == 1) {
			saveListeningTestResult();
			screenAdvance = 0;
			isTimerActiveListening = 0;
			saveUsageData(nextNum, "dictation test completed");
			resetTimer = true;
			curstage = nextNum;
			document.getElementById(nextStage).click();
			return;
		}
		updateListeningUI();
		break;		
	case stageOldEnum.GET_RESULTS_OLD:
	case stageOldEnum.GET_RESULTS_OLD_ASK:
	case stageEnumTest.GET_RESULTS:
		break;
	case stageOldEnum.SEE_RESULTS_OLD:
	case stageEnumTest.SEE_RESULTS_ALL:
	case stageEnumTest.SEE_RESULTS:
		// results page
		break;

	}
}

// only used in the mic check stage. Don't allow use to stop recording
function changeStateRecordButton(changeTo) {
	if (changeTo == 1) {
		isNextEnabled = 1;
		$("#recordbutton").css('opacity', 1.0);
		$("#recordbutton").css('cursor', 'pointer');
		$('#recordbutton').css('pointer-events', 'auto');
	} else {// disable
		isNextEnabled = 0;
		$("#recordbutton").css('opacity', 0.1);
		$("#recordbutton").css('cursor', 'default');
		$('#recordbutton').css('pointer-events', 'none');
	}
}

function changeStateNextButton(changeTo) {
	// make active
	if (changeTo == 1) {
		isNextEnabled = 1;
		$("#roundbutton").css('opacity', 1.0);
		$("#roundbutton").css('cursor', 'pointer');
		$('#roundbutton').css('pointer-events', 'auto');
		$("#roundbutton").show();
	} else {// disable
		isNextEnabled = 0;
		$("#roundbutton").css('opacity', 0.1);
		$("#roundbutton").css('cursor', 'default');
		$('#roundbutton').css('pointer-events', 'none');
	}
}

function setupAudioRecord() {

	//$("#timertext").css("color","black");
	if (startStage <= stageEnumTest.PLUG_IN_HEADSET){
		showAllowMicMessageBrowser();
		$("#overlay").show();
	}
	$(document).on('click', "#overlay-background", function() {
		elmblink($("#overlay-container"), 2, 80, 0);
	});

	window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
	navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
	window.URL = window.URL || window.webkitURL;
	if (audioContext == null)
		audioContext = new AudioContext;
	logHTML('Audio context set up.');
	logHTML('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
	//} catch (e) {
	//  alert('No web audio support in this browser!');
	//}
	navigator.getUserMedia({
		vide : false,
		audio : true
	}, handlerStartUserMedia, handlerErrorUserMedia);

}

function sendEmail(button) {
	hasEnteredEmail = 1;
	// post to SQL here also.
	updateEmailUI();
	saveAndSendEmail();
	//var textToInput = window.alert(window.emailin.value);
	//var emailText = "Email captured_" + window.emailin.value;
	saveUsageData(8, emailLanding);
}

function soundCheck(button) {
	t = $('#soundFile');
	t[0].play();
	$("#soundFile").on("ended", finishedPlaying);

	$("#roundbutton").show();
	isNextEnabled = 1;
	if (curstage == stageEnumTest.CHECK_SPEAKERS)
		$("#canthear").show();

	//$("#playButton").css('opacity', 0.5);
	$("#playButton").attr("src", "common/images/play_on.png");
}

function finishedPlaying() {
	//$("#playButton").css('opacity', 1.0);
	$("#playButton").attr("src", "common/images/play.png");
}

// function gets called if mic test passes
function passedMic(input) {
	// not interested if already passed mic check
	if (curstage >= stageEnumTest.READ_ALOUD_INSNS)
		return;
	switch(input) {
	case 1:
		isNextEnabled = 1;
		$("#roundbutton").show();
		$("#mic-success").css("visibility", "visible");
		$("#mic-success").show();
		$("#mic-fail").hide();
		$("#cantrecord").hide();
		soundPassed = 1;
		isSoundCheck = 0;
		break;
	case 0:
		$("#mic-fail").text(TEXT_NOT_GOOD_REC);
		$("#mic-fail").css("visibility", "visible");
		$("#mic-fail").show();
		$("#cantrecord").css("visibility", "visible");
		$("#cantrecord").show();
		saveUsageData(-2, "recording too noisy");
		break;
	case -1:
		$("#mic-fail").text(TEXT_NO_SOUND_MIC);
		$("#mic-fail").css("visibility", "visible");
		$("#mic-fail").show();
		$("#cantrecord").css("visibility", "visible");
		$("#cantrecord").show();
		saveUsageData(-3, "no sound, is microphone muted?");
		break;
	}
}

function recordContinue(button) {
	if (soundPassed == 1)
		nextButton();
}

function logHTML(e, data) {
	//log.innerHTML += "\n" + e + " " + (data || '');
	console.log(e + " " + (data || ''));
}

function handlerStartUserMedia(stream) {

	hideOverlay();
	saveUsageData(-20, "microphone has been enabled");
	micIsEnabled = 1;
	console.log('handlerStartUserMedia');
	console.log('sampleRate:' + audioContext.sampleRate);
	// MEDIA STREAM SOURCE -> ZERO GAIN >
	_realAudioInput = audioContext.createMediaStreamSource(stream);
	audioRecorder = new Recorder(_realAudioInput);
	$("#chooseMicAllowText").text(ALERT_SAY123);

}

function handlerErrorUserMedia(e) {
	showMicInsns();
	saveUsageData(-4, "ERROR: microphone userMediaError");
	return;

	logHTML('No live audio input: ' + e);
	bootbox.alert(ALERT_MIC_DISABLED, function() {
	});
	isMicDisabled = 1;
	hideCanRecord();

}

function setupMicUI() {
	$("#roundbutton").hide();
	//return;
	if (isMicDisabled == 1) {
		hideCanRecord();
	}
}

function hideCanRecord() {
	$("#mic-fail").text(ALERT_CANNOT_REC);
	$("#mic-fail").show();
	$("#mic-fail").css("visibility", "visible");
	$("#buttonSrc").hide();
	$("#powerMeter").hide();
	$("#chooseMicAllowText").hide();
}

function toggleRecording(button) {
	if (micIsEnabled == 0) {
		saveUsageData(-6, "UI problem: mic button pushed before enabled");
		bootbox.alert(ALERT_ENABLE_MIC, function() {
		});
		return;
	}
	if (soundPassed == 0) {
		changeStateRecordButton(isRecording);
	}
	logHTML('record pushed');
	if (isRecording == 0) {
		isRecording = 1;
		$("#rerecordText").text("Recording");
		$("#buttonSrc").attr("src", "images/record_on.png");
		if ((curstage == stageOldEnum.CHECK_MIC_OLD) || (curstage == stageEnumTest.CHECK_MIC) ){
			window.setTimeout("TickRec()", NumMicCheckMS);
			$("#startRecordFS").hide();
			$("#recordingFS").removeClass("hide");
			$("#timertext").addClass("active");
			$("#timertext").text("5");
			window.setTimeout("TickCheckMic()", 1000);	
		}

		startRecordingPushed(button);
	} else {
		stopRecording(button);
		if (curstage == stageEnumTest.READ_ALOUD) {
			updateReadAloudUI(0);
		}
		if (curstage == stageEnumTest.FREE_SPEECH) {
			numReRecordFreeSpeech++;
			updateFreeSpeechUI(0);
		}		
		if (soundPassed == 0) 
			showHearSound();

		$("#buttonSrc").attr("src", "images/record.png");
		$("#rerecordText").text("Re-record");
		if (soundPassed == 1) {
			changeStateNextButton(1);
		}
	}

}

function showPowerUI(inValue) {
	hasShownPowerUI = 1;
	inValue = Math.round(inValue);
	if (inValue < 0)
		inValue = 0;
	if (inValue > 9)
		inValue = 9;
	$("#powerMeter").attr("src", "common/images/record" + inValue.toString() + ".png");

}

TickRec = function() {
	if ((isRecording == 1) && ((curstage == stageEnumTest.CHECK_MIC) || (curstage == stageOldEnum.CHECK_MIC_OLD) ) )
		toggleRecording(null);
};

function startRecordingPushed(button) {

	if (!audioRecorder)
		return;

	fileName = encodeURIComponent('audio_' + randTestNum + '__' + new Date().getTime() + '.mp3');
	if (isSoundCheck == 1) {
		fileName = encodeURIComponent('audioSC_' + randTestNum + '__' + new Date().getTime() + '.mp3');
	}
	audioRecorder && audioRecorder.record(isSoundCheck, randTestNum, fileName);
	if (curstage == stageEnumTest.READ_ALOUD) {
		fileName = encodeURIComponent('audio_' + randTestNum + '_1_' + new Date().getTime() + '.mp3');
	}
	if (curstage == stageEnumTest.FREE_SPEECH) {
		fileName = encodeURIComponent('audio_' + randTestNum + '_2_' + new Date().getTime() + '.mp3');
	}
	fileNameDictation = fileName;
	fileNameFS = fileName;

	logHTML('Recording...');

}

function finishTest(button) {

	stopRecording(button);

}

function stopRecording(button) {

	isRecording = 0;
	/*
	if (hasShownPowerUI == 0) {
		bootbox.alert(ALERT_RECORDING_NOT, function() {
		});
		hideCanRecord();
	}
*/
	if (!audioRecorder)
		return;

	audioRecorder && audioRecorder.stop();
	//GUI
	logHTML('Stopped recording.');

}

function checkSpeaker(){
	skinPlayer(1);
	// load in the new file also?
	//startDownload('testdata/testsound.mp3');
	players[0].startDownload('testdata/testsound.mp3');	
}


function enableYesNoSpeakerButtons(){
	$("#yesSpeaker").removeClass("disabled");
	$("#noSpeaker").removeClass("disabled");
	//playBuffer();		
		
}

function enableYesNoHearMicButtons(){
	$("#cantHearMyRecord").removeClass("disabled");
	$("#canHearMyRecord").removeClass("disabled");
		
}


function skinPlayer(isBuffer) {
	
	var htmlPlayers = document.querySelectorAll('.player');
	for (var i = 0; i < htmlPlayers.length; i++) {
		players[i] = null;
		if (isBuffer == 1){	
			players[i] = new AudioPlayerBuffer(htmlPlayers[i]);
		}else{
			players[i] = new AudioPlayer(htmlPlayers[i]);
		}
	}
}

function resetProgressBar() {
	// need to hide and show bar to make it reset to 100% immediately
	$(".progress-bar").hide();
	$(".progress-bar").width("100%");
	$(".progress-bar").show();
}

function playAudio(thisword) {
	//$(thisword).jPlayer("pauseOthers").jPlayer("playHead",currentTimeUpTo).jPlayer("play");
	$(thisword).jPlayer("pauseOthers").jPlayer("play", currentTimeUpTo);
};

function showSoundCantHear() {

	bootbox.dialog({
		message : soundMessageCantHear,
		title : SOUND_SETUP,
		buttons : {
			main : {
				label : OK_TEXT,
				className : "btn btn-next",
				callback : function() {
					
				}
			}
		}
	});
	saveUsageData(-5, "speaker check has failed");
}

function showSoundCantRecord() {

	bootbox.dialog({
		message : soundMessageCantRecord,
		title : SOUND_SETUP,
		buttons : {
			main : {
				label : RETRY_TEXT,
				className : "btn btn-next",
				callback : function() {
					reCheckMic();
				}
			}
		}
	});
	saveUsageData(-5, "microphone check has failed");
}

function reCheckMic(){
	ResetMicTest();
	//changeStateRecordButton(1);
	showRecordSound();
	$("#startRecordFS").show();
	$("#recordingFS").addClass("hide");
	$("#timertext").removeClass("active");
	$("#timertext").text("0:00");						
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

function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}

function getUniqueID(){
	randUserId = Math.floor((Math.random() * 1000000000) + 1);
}
function getUniqueTestNum(){
	randTestNum = Math.floor((Math.random() * 1000000000) + 1);
}

function saveUsageData(state, text) {
	$.post("php/saveusage.php?state=" + state.toString() + "&globaltestid=" + randTestNum.toString() + "&testdata=" + text, {}, function() {
		//mixpanel.track(text);
		//alert("saved");
	});

}

function changetextKorea() {
	soundMessageCantHear = "우선 스피커에 음소거가 설정되어있지 않고 볼륨이 너무 낮지 않은지 확인해 주세요.<br> 그래도 작동하지 않을 경우, 설정 가이드를 확인해 주세요.<br> <a href='http://windows.microsoft.com/en-US/windows/no-sound-help#no-sound' target='_blank'>윈도우 사용자 클릭</a> 혹은 <a href='https://support.apple.com/en-us/HT203186' target='_blank'>맥 사용자 클릭</a>";
	soundMessageCantRecord = "우선 마이크에 음소거가 설정되어있지 않고 볼륨이 너무 낮지 않은지 확인해 주세요.<br> 그래도 작동하지 않거나 설정 방법을 모를 경우, 설정 가이드를 확인해 주세요.<br> <a href='http://www.onlinemictest.com/microphone-settings/windows-7' target='_blank'>윈도우 사용자 클릭</a> 혹은 <a href='http://www.onlinemictest.com/microphone-settings/mac-os-x' target='_blank'>맥 사용자 클릭</a>";
	BROWSER_SUPPORT = "브라우저 지원 여부";
	ALERT_BROWSER_NOT = "죄송하지만 해당 브라우저는 지원되지 않습니다. <br/>윈도우 사용자: 크롬, 파이어폭스, 오페라, 그리고 윈도우10 엣지 브라우저를 지원하나 인터넷 익스플로러는 지원하지 않습니다. <br/>맥 사용자: 크롬을 지원합니다. <br/>모바일 사용자는 안드로이드 전용 크롬 브라우저만 지원됩니다.";
	ALERT_RECORDING_NOT = "사운드 설정에 문제가 있습니다. 녹음이 시작되지 않았습니다.";
	ALERT_ENABLE_MIC = "마이크를 활성화 해주세요- 활성화 하기 전까지 녹음할 수 없습니다.";
	ALERT_CANNOT_REC = "소리를 녹음할 수 없습니다. 활성화 한 후, 창을 닫고 다시 열어주세요.";
	ALERT_MIC_DISABLED = "해당 사이트의 마이크 사용이 해제되어 있습니다. 마이크를 활성화 한 후, 창을 닫고 다시 열어 주세요.";
	ALERT_SAY123 = "녹음 버튼을 누르시고 'testing, one, two, three'라고 말해주세요.";
	TEXT_NO_SOUND_MIC = "죄송합니다, 소리가 감지되지 않았습니다. 마이크가 음소거 되었나요? 확인하시고 다시 녹음 해주세요.";
	TEXT_NOT_GOOD_REC = "죄송합니다, 현재 녹음 환경이 좋지 않습니다, 재시도 혹은 다른 환경에서 녹음 해주세요.";
	SOUND_SETUP = "오디오 세팅";
	OK_TEXT = "확인";
}

function  findIndLookup(curstage){
	var indLook =0;
	for (var i=0;i<stageNameNextArray.length; i++){
		if (stageNameNextArray[i][0] == curstage){
			//indLook = stageNameNextArray[i][2]; 
			indLook = i;
			break;
		}
		
	}
	return indLook;
}

function androidStandardSave(){
	var navU = navigator.userAgent;
	// Android Mobile
	var isAndroidMobile = navU.indexOf('Android') > -1 && navU.indexOf('Mozilla/5.0') > -1 && navU.indexOf('AppleWebKit') > -1;
	// Apple webkit
	var regExAppleWebKit = new RegExp(/AppleWebKit\/([\d.]+)/);
	var resultAppleWebKitRegEx = regExAppleWebKit.exec(navU);
	var appleWebKitVersion = (resultAppleWebKitRegEx === null ? null : parseFloat(regExAppleWebKit.exec(navU)[1]));
	// Chrome
	var regExChrome = new RegExp(/Chrome\/([\d.]+)/);
	var resultChromeRegEx = regExChrome.exec(navU);
	var chromeVersion = (resultChromeRegEx === null ? null : parseFloat(regExChrome.exec(navU)[1]));
	// Native Android Browser
	var isAndroidBrowser = isAndroidMobile && (appleWebKitVersion !== null && appleWebKitVersion < 537) || (chromeVersion !== null && chromeVersion < 37);
	if (isAndroidBrowser){
		saveUsageData(-1, "standard android not supported");	
	}	

}

function closeAlert(){
	$('.alert').hide();
	//$('#alertMessage').text('test');	
};
function showAlertSucceed(message){	
	$('#alertMessageSucceed').text(message);
	$('.alert-success').show();
};

function showAlertFail(message){	
	$('#alertMessageFail').text(message);
	$('.alert-danger').show();
};

function showPaymentResult(isSucceed){
	if (isSucceed==1){
		curstage = userUIEnum.DASHBOARD_ACCOUNT;		
		document.getElementById('profileDetails').click();
		showAlertSucceed(translationsGlobal.messagedCongrat);
		ispaid = 't';
	}else{
		
		curstage = userUIEnum.DASHBOARD_ACCshowAlertFail(translationsGlobal.messagedPWFailed);OUNT;
		document.getElementById('profileDetails').click();
		
	}
};

function makeScores(dictationSpeaking, freeSpeaking, multiUnderstanding, transcriptionUnderstanding,structOut){
	dictationSpeaking *= 10/7;
	freeSpeaking *= 10/7;
	multiUnderstanding *= 10/2;
	transcriptionUnderstanding *= 10/7;
	speakingScore = 0.85 * freeSpeaking + 0.15 * dictationSpeaking;
	understandingScore = 0.3 * multiUnderstanding + 0.7 * transcriptionUnderstanding;
	overallScore = (speakingScore + understandingScore) / 2;
	structOut.overallscore = Math.round(overallScore * 10) / 10;
	structOut.listeningscore = Math.round(understandingScore * 10) / 10;
	structOut.speakingscore = Math.round(speakingScore * 10) / 10;		
};

function resetTest(){
	soundPassed = 0;
	micIsEnabled = 0;
	isSoundCheck = 1;
	isMicDisabled = 0;
	hasShownPowerUI = 0;
	currentTimeUpTo = 0;
	hasEnteredEmail = 0;
	ResetMicTest();
	ResetListeningTest();
	ResetMeaningTest();
	ResetReadaloudTest();
	ResetFreeSpeechTest();	
};

