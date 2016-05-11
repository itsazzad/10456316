var fluent = angular.module('fluent', ['ngRoute', 'chart.js']);
var translationsGlobal;
//fluent.value('clientId', 'a12345654321x'); to add values
// configure our routes
fluent.config(function($routeProvider) {

	$routeProvider
	// route for the index page
	.when('/', {
		templateUrl : 'templates/index.html',
		controller : 'mainCtrl',
		security : false
	}).when('/IntroRes', {
		templateUrl : 'templates/ResIntroScore.html',
		controller : 'noneCtrl',
		security : false
	}).when('/ResIntroNoEmail', {
		templateUrl : 'templates/ResIntro.html',
		controller : 'noneCtrl',
		security : true
	}).when('/ResIntroNoEmailK', {
		templateUrl : 'templates/Korea/ResIntroK.html',
		controller : 'noneCtrl',
		security : true
	}).when('/IntroResK', {
		templateUrl : 'templates/Korea/ResIntroScoreK.html',
		controller : 'noneCtrl',
		security : true
	}).when('/Start', {
		templateUrl : 'templates/ResSpeakerCheck.html',
		controller : 'noneCtrl',
		security : true
	}).when('/StartK', {
		templateUrl : 'templates/Korea/ResSpeakerCheckK.html',
		controller : 'noneCtrl',
		security : true
	}).when('/MicRes', {
		templateUrl : 'templates/ResMic.html',
		controller : 'micCtrl',
		security : true
	}).when('/MicResK', {
		templateUrl : 'templates/Korea/ResMicK.html',
		controller : 'micCtrl',
		security : true
	}).when('/MeaningRes', {
		templateUrl : 'templates/ResMeaning.html',
		controller : 'meaningCtrl',
		security : true
	}).when('/ListeningRes', {
		templateUrl : 'templates/ResListening.html',
		controller : 'listeningCtrl',
		security : true
	}).when('/SpeechRes', {
		templateUrl : 'templates/ResSpeech.html',
		controller : 'dictationCtrl',
		security : true
	}).when('/Conversation', {
		templateUrl : 'templates/ResConversation.html',
		controller : 'convCtrl',
		security : true
	}).when('/Email', {
		templateUrl : 'templates/ResEmailResult.html',
		controller : 'emailCtrl',
		security : true
	}).when('/ResultRes', {
		templateUrl : 'templates/ResResult.html',
		controller : 'resCtrl',
		security : true
	}).when('/ResultResNew', {
		templateUrl : 'templates/testui/scoreIntranel.html',
		controller : 'resCtrlNew',
		security : false
	}).when('/ResultResAskEmail', {
		templateUrl : 'templates/ResEmailResultAskDetails.html',
		controller : 'resCtrl',
		security : true
	}).when('/ResultResK', {
		templateUrl : 'templates/ResResultK.html',
		controller : 'resCtrl',
		security : true
	}).when('/IntroResCCEL', {
		templateUrl : 'templates/ResIntroScoreCCEL.html',
		controller : 'noneCtrl',
		security : true
	})

	// new design. - renamed pages
	.when('/landingpage', {
		templateUrl : 'templates/testui/landing.html',
		controller : 'noneCtrl',
		security : false
	}).when('/pluginheadset', {
		templateUrl : 'templates/testui/headset.html',
		controller : 'noneCtrl',
		security : true
	}).when('/checkspeakers', {
		templateUrl : 'templates/testui/check_speaker.html',
		controller : 'checkSpeakCtrl',
		security : true
	}).when('/checkmic', {
		templateUrl : 'templates/testui/check_mic.html',
		controller : 'micCtrl',
		security : true
	}).when('/readaloudinsns', {
		templateUrl : 'templates/testui/readaloudinsns.html',
		controller : 'noneCtrl',
		security : true
	}).when('/readaloud', {
		templateUrl : 'templates/testui/readaloud.html',
		controller : 'dictationCtrl',
		security : true
	}).when('/freespeechinsns', {
		templateUrl : 'templates/testui/freespeechinsns.html',
		controller : 'noneCtrl',
		security : true
	}).when('/freespeech', {
		templateUrl : 'templates/testui/freespeech.html',
		controller : 'convCtrl',
		security : true
	}).when('/meaninginsns', {
		templateUrl : 'templates/testui/meaninginsns.html',
		controller : 'noneCtrl',
		security : true
	}).when('/meaning', {
		templateUrl : 'templates/testui/meaning.html',
		controller : 'meaningCtrl',
		security : true
	}).when('/transcriptioninsns', {
		templateUrl : 'templates/testui/transcriptioninsns.html',
		controller : 'noneCtrl',
		security : true
	}).when('/transcription', {
		templateUrl : 'templates/testui/transcription.html',
		controller : 'listeningCtrl',
		security : true
	}).when('/getresults', {
		templateUrl : 'templates/testui/getresults.html',
		controller : 'resCtrl',
		security : true
	}).when('/seeresults', {
		templateUrl : 'templates/testui/seeresults.html',
		controller : 'resCtrl',
		security : true
	}).when('/createAccount', {
		templateUrl : 'templates/account/create.html',
		controller : 'createAccountCtrl',
		security : false
	}).when('/completeProfile', {
		templateUrl : 'templates/account/completeProfile.html',
		controller : 'completeProfileCtrl',
		security : false
	}).when('/login', {
		templateUrl : 'templates/account/login.html',
		controller : 'loginCtrl',
		security : false
	}).when('/resetPW', {
		templateUrl : 'templates/account/resetPW.html',
		controller : 'resetPWCtrl',
		security : false
	}).when('/dashboard', {
		templateUrl : 'templates/account/dashboard.html',
		controller : 'dashboardCtrl',
		security : true
	}).when('/profileDetails', {
		templateUrl : 'templates/account/profileDetails.html',
		controller : 'profileDetailsCtrl',
		security : true
	}).when('/deleteAccount', {
		templateUrl : 'templates/account/deleteAccount.html',
		controller : 'deleteAccountCtrl',
		security : true
	}).when('/paymentDetails', {
		templateUrl : 'templates/account/paymentDetails.html',
		controller : 'paymentDetailsCtrl',
		security : true
	}).otherwise({
		controller : 'noneCtrl',
		security : false
	});

}).run(function($rootScope, $location) {
	$rootScope.isLoggedIn = 0;
	$rootScope.showExpand = 0;
	$rootScope.isDashboard = 1;
	

	$.post("php/translation.php", {}, function(data) {
		jd = $.parseJSON(data);
		$rootScope.translations = jd.data;
		for (var i=0; i<$rootScope.translations.length;i++){
			eval("$rootScope.translations." + $rootScope.translations[i][0] + "=$rootScope.translations[i][1]");		
		}
		translationsGlobal = $rootScope.translations;
		
	});	
	
	
	$rootScope.logoutAng = function() {
		$rootScope.showExpand = 0;
		$rootScope.isactive = 0;
		$rootScope.isDashboard = 1;
		logout($rootScope);
	};

	$rootScope.gotoProfile = function() {
		$rootScope.showExpand = 0;
		$rootScope.isactive = 0;
		$rootScope.isDashboard = 0;
		$location.path('profileDetails');
	};
	$rootScope.gotoDashboard = function() {
		$rootScope.showExpand = 0;
		$rootScope.isactive = 0;
		$rootScope.isDashboard = 1;
		$location.path('dashboard');
	};
	$rootScope.showMenu = function(showExpandIn) {
		$rootScope.showExpand = showExpandIn;
	};

	$rootScope.$on("$routeChangeStart", function(event, next, current) {
		if ( typeof myDateLineChart !== 'undefined') {
			if (myDateLineChart) {
				myDateLineChart.destroy();
			}
		}
		if ( typeof next != 'undefined') {
			if (((next.security) && ($rootScope.isLoggedIn == 0)) == 1)
				$location.path('/login');
		}
	});

});

// create the controller and inject Angular's $scope
fluent.controller('mainCtrl', function($scope, $rootScope, $location) {
	// create a message to display in our view
	$rootScope.isLoggedIn = 0;

	$scope.$on('$locationChangeStart', routeChange);
	$scope.heading = '';
	$scope.message = '';

	angular.element(document).ready(function() {
		//alert('hello');
		//$rootScope.email = 'fromRS';
		//$location.path('/resetPW');

		init($location, $rootScope, $scope);
	});
});

fluent.controller('noneCtrl', function($scope) {
	$scope.$on('$locationChangeStart', routeChange);
	$("#roundbutton").hide();
	$("#canthear").hide();
});

fluent.controller('checkSpeakCtrl', function($scope) {
	$scope.$on('$locationChangeStart', routeChange);
	checkSpeaker();
});

fluent.controller('meaningCtrl', function($scope) {
	$scope.$on('$locationChangeStart', routeChange);
	getMeaningTests();
});

fluent.controller('dictationCtrl', function($scope) {
	$scope.$on('$locationChangeStart', routeChange);
	getReadAloudTests();
});

fluent.controller('listeningCtrl', function($scope) {
	$scope.$on('$locationChangeStart', routeChange);
	getListeningTests();
});

fluent.controller('convCtrl', function($scope) {
	$scope.$on('$locationChangeStart', routeChange);
	getFreeSpeechTests();
});

fluent.controller('emailCtrl', function($scope) {
	$scope.$on('$locationChangeStart', routeChange);
	setupEmailPage();
});

fluent.controller('micCtrl', function($scope) {
	$scope.$on('$locationChangeStart', routeChange);
	setupMicUI();
});

fluent.controller('resCtrl', function($scope, $location) {
	$scope.$on('$locationChangeStart', routeChange);

	$scope.backToMain = function() {
		$("#mainfooter").show();
		$("#mainheader").show();
		curstage = userUIEnum.DASHBOARD_MAIN;
		$location.path('dashboard');
	};

	setupEmailPage();
});

fluent.controller('resCtrlNew', ['$scope', '$http', '$location', '$rootScope',
function($scope, $http, $location, $rootScope) {
	$scope.showSummaryResults = 1;
	$scope.isPaidReport = (ispaid == 't');
	$scope.showSpeaking = 1;
	$scope.toggleMeaningArray = createArray(5);
	$scope.toggleTranscriptionArray = createArray(5);
	for ( i = 0; i < 5; i++) {
		$scope.toggleMeaningArray[i] = 0;
		$scope.toggleTranscriptionArray[i] = 0;
	}
	$scope.upgradeAccountAng = function() {
		// if they are logged in, send them to profile page, otherwise to fluentiq
		if ($rootScope.isLoggedIn == 1) {
			$location.path('profileDetails');
		} else {
			url = "https://fluentiq.com";
			var win = window.open(url, '_blank');
			win.focus();
		}
	};
	$scope.toggleMeaning = function(index) {
		$scope.toggleMeaningArray[index] = 1 - $scope.toggleMeaningArray[index];
	};
	$scope.toggleTranscription = function(index) {
		$scope.toggleTranscriptionArray[index] = 1 - $scope.toggleTranscriptionArray[index];
	};

	$scope.showDetailReportAng = function() {
		$scope.isPaidReport = (ispaid == 't');
		$scope.showSummaryResults = 0;
		$scope.numLoaded = 0;
		$scope.isLoaded = 0;
		$scope.numToLoad = 12;
		if ($scope.isPaidReport == 1) {
			userIdReportShowDetailed = userIdReportShow;
			//$scope.showSummaryResults = 0;
		} else {
			userIdReportShowDetailed = 886998236;
			//upgradeAccount
		}
		getResultsDetailed($scope, $http);
	};
	$scope.$on('$locationChangeStart', routeChange);
	if ( typeof userIdReportShow == 'undefined')
		userIdReportShow = -1;
	if (userIdReportShow < 0) {
		var inData = top.location.search.substr(1);
		theleft = inData.indexOf("=") + 1;
		theright = inData.lastIndexOf("&");
		if (theright < 0)
			theright = inData.length;
		userIdReportShow = (inData.substring(theleft, theright));
		userIdReportShow = parseInt(userIdReportShow);
		randTestNum = userIdReportShow;
	}
	/*
	 $scope.updateFiles = function () {
	 $scope.comprehensions = [];
	 };
	 */
	getResults($scope, $http);

}]);

fluent.controller('createAccountCtrl', function($scope) {
	$scope.$on('$locationChangeStart', routeChange);
	$scope.accountEmail = '';
	$scope.createAccountDone = 0;
	$scope.createAccountAng = function() {
		createAccount($scope);
	};
});

fluent.controller('completeProfileCtrl', function($scope, $location, $rootScope) {
	$scope.$on('$locationChangeStart', routeChange);
	completeProfilePopulate();
	$scope.isResetPW = 0;
	$scope.completeProfileAng = function() {
		completeProfile($rootScope, $location, $scope);
	};

	if (isResetPW == 1) {
		$scope.isResetPW = 1;
	}
});

fluent.controller('loginCtrl', function($scope, $rootScope, $location) {
	$scope.$on('$locationChangeStart', routeChange);
	$scope.translations = $rootScope.translations; 
	
	$scope.isForgottten = 0;
	$scope.isIncorrect = 0;
	$scope.showIncorrect = 0;

	$scope.emailInput = 'test';

	$scope.showLoginAng = function() {
		$scope.isForgottten = 0;
	};
	$scope.showForgotPWAng = function() {
		$scope.isForgottten = 1;
	};
	$scope.loginAng = function() {
		$scope.showIncorrect = 1;
		$scope.isIncorrect = 0;
		login($rootScope, $location, $scope, 'dashboard');
	};

	$scope.sendForgotPWEmailAng = function() {
		$scope.emailInput = $("#sendForm input").eq(0).val();
		$.post("php/mailer/emailSender.php?option=2&email=" + $scope.emailInput, {}, function(data) {
			$scope.isForgottten = 2;
			$scope.$apply();
		});
	};

	login($rootScope, $location, $scope, 'dashboard');
});

fluent.controller('resetPWCtrl', function($scope) {
	$scope.$on('$locationChangeStart', routeChange);
	//checkAuth();
});

fluent.controller('profileDetailsCtrl', function($scope) {
	$scope.showUpgrade = !(ispaid == 't');
	//$scope.showUpgrade =0;
	$scope.updateProfileAng = function() {
		updateDetailsAccount($scope);
	};

	$scope.changePWAng = function() {
		updatePassword($scope);
	};

	$scope.$on('$locationChangeStart', routeChange);
	//checkAuth();
	populateDetails($scope);
});

fluent.controller('deleteAccountCtrl', function($scope) {
	$scope.hasDeleted = 0;
	$scope.deleteAccountAng = function() {
		deleteAccount($scope);
	};

	$scope.$on('$locationChangeStart', routeChange);
	//checkAuth();
});

fluent.controller('paymentDetailsCtrl', function($scope) {

	$scope.$on('$locationChangeStart', routeChange);
	//checkAuth();
	setupPaymentDetails($scope);
});

fluent.controller('headerCtrl', function($rootScope, $scope, $location) {
});

fluent.directive('audioui', function($sce) {
	return {
		restrict : 'A',
		scope : {
			code : '=',
			displaytitle : '='
		},
		replace : true,
		//template: '<audio ng-src="{{url}}" controls></audio>',
		// working for transcriptions
		template : '<div class="player"><p class="title">{{displaying}}</p><div class="controls"><span class="play control" ng-class="ngplay" title="Play">Play</span><span class="pause control"  ng-class="ngpause" title="Pause">Pause</span></div><div class="progress-player"><progress value="0" max="100">0%</progress><span class="time curTime">0:00</span><span class="time remainTime">loading</span></div><audio ng-src="{{url}}"></audio><div>',

		link : function(scope, element, attrs) {

			var percent = 0, state = 0;
			// 0 = stopped, 1 = playing
			var ready = 0;
			scope.ngpause = "hide";
			scope.ngplay = "";
			var control = element.find('.control'), play = element.find('.play')[0], pause = element.find('.pause')[0], audio = element.find('audio')[0], progress = element.find('progress')[0], curTime = element.find('.curTime')[0], remainTime = element.find('.remainTime')[0];

			finished = function() {
				state = 0;
				progress.value = 0;
				progress.textContent = 0 + '%';
				curTime.textContent = secondsToTimestamp(0);
				scope.ngpause = "hide";
				scope.ngplay = "";
				if ((audio.duration > 10000) || (audio.duration == 0)) {
					remainTime.textContent = secondsToTimestamp(45);
				} else {
					remainTime.textContent = secondsToTimestamp(audio.duration);
				}
				scope.$apply();
				$(document).trigger('audioEnded');
				//onToggleState();
			};

			onToggleState = function() {
				if (!ready) {
					return;
				}
				if (state) {
					pause();
				} else {
					play();
				}
			};

			onTimeUpdate = function() {
				var durationUse = audio.duration;

				if ((audio.duration > 10000) || (audio.duration = 0)) {
					durationUse = 45;
				}
				percent = Math.round(audio.currentTime / durationUse * 100);

				if (percent > 100)
					percent = 100;
				if (percent < 0)
					percent = 0;
				if (isNaN(percent))
					percent = 0;
				progress.value = percent;
				progress.textContent = percent + '%';
				curTime.textContent = secondsToTimestamp(audio.currentTime);
				var remaining = durationUse - audio.currentTime;
				if (remaining < 0)
					remaining = 0;
				if (isNaN(remaining))
					remaining = 0;
				if (remaining > 100000)
					remaining = 45;
				remainTime.textContent = secondsToTimestamp(remaining, 'ceil');
			};

			play = function() {
				audio.play();
				hasPlayedRecording = 1;
				state = 1;
				scope.ngpause = "";
				scope.ngplay = "hide";
				scope.$apply();
				//play.classList.add('hide');
				//pause.classList.remove('hide');

			};
			pause = function() {
				audio.pause();
				state = 0;
				scope.ngpause = "hide";
				scope.ngplay = "";
				scope.$apply();
				//play.classList.remove('hide');
				//pause.classList.add('hide');

			};
			stop = function() {
				pause();
				audio.currentTime = 0;
			};

			var secondsToTimestamp = function(time) {
				var minutes = Math.floor(time / 60);
				var seconds = Math.floor(time % 60);
				var pad = seconds < 10 ? '0' : '';
				return minutes + ':' + pad + seconds;
			};

			var onLoadedmetadata = function() {
				//timeto.innerHTML = secondsToTimestamp(audio[0].duration);
				if ((audio.duration > 10000) || (audio.duration = 0)) {
					remainTime.textContent = secondsToTimestamp(45);
				} else {
					remainTime.textContent = secondsToTimestamp(audio.duration);
				}
				ready = 1;
			};

			audio.addEventListener('loadedmetadata', onLoadedmetadata);

			audio.addEventListener('timeupdate', onTimeUpdate);
			audio.addEventListener('ended', finished);

			for ( i = 0; i < control.length; i++) {
				control[i].addEventListener('click', onToggleState);
			}

			scope.$watch('code', function(newVal, oldVal) {
				if (newVal !== undefined) {
					// !! need to change between testdata and audio.
					scope.url = $sce.trustAsResourceUrl("../" + newVal);
				}
			});
			scope.$watch('displaytitle', function(newVal, oldVal) {
				if (newVal !== undefined) {
					scope.displaying = newVal;
				}
			});

		}
	};
});

