fluent.controller('dashboardCtrl', ['$scope', '$http','$location',
function($scope, $http,$location) {
	$scope.plotProgressDashboard = function(){
		// need to wait until loaded or the graph crashes
		$scope.$watch('$viewContentLoaded', function(){
		//if ($scope.testScoresTimePlotStruct[0].data.length > 1) {
		if ($scope.testScoresTimePlotStruct.length > 1) {			
			var ctx3 = document.getElementById("myChartWithDates").getContext("2d");
			myDateLineChart = new Chart(ctx3).Scatter($scope.testScoresTimePlotStruct, {
				bezierCurve : false,
				showTooltips : true,
				scaleShowHorizontalLines : false,
				legend : true,
				scaleShowLabels : true,
				scaleDateFormat : "mmm d",
				scaleType : "date",
				pointDotRadius : 4,
				scaleOverride : true,
				scaleSteps : $scope.highestPlotValue - $scope.lowestPlotValue,
				scaleStepWidth : 1,
				scaleStartValue : $scope.lowestPlotValue,
				scaleLabel : "<%=value%>"
			});
			//myDateLineChart.generateLegend();
		}else{
			if (myDateLineChart) myDateLineChart.destroy();
			$scope.selectStage = 2;
		}	
		}); 		
  	};  	
  	
  	$scope.destroyGraph = function(){
  		if (myDateLineChart) myDateLineChart.destroy();
  	};
  	
	$scope.plotAssessmentDashboard = function(){
		if ($scope.testScoresTimeArray.length > 0) {
			/*
			 * 
			 */
		}else{
			$scope.selectStage = 0;
		}		
	};
	$scope.startTest = function(){
		curstage = stageEnumTest.LANDING_PAGE;
		resetTest();
		$location.path('landingpage');
		//$scope.$apply();		
		
	};
	
	$scope.openReport = function(index){
		userIdReportShow = $scope.testScoresTimeArray[index][4];		
		randTestNum = userIdReportShow;
		curstage = stageEnumTest.SEE_RESULTS_ALL;		
		$location.path('ResultResNew');
	};
	getDashboardResults($scope, $http);

}]);

(function() {

	getDashboardResults = function($scope, $http) {
		$scope.username = username;
		$scope.tabChooseStage = 0;
		$scope.selectStage = 1;
		$scope.$on('$locationChangeStart', routeChange);
		$scope.testScoresTimeArray = [];
		$scope.testScoresTimePlotStruct = [];
		//checkAuth();
		$scope.highestPlotValue = 10;
		$scope.lowestPlotValue = 0;

		//randUserId = '761072099';
		var URL = "php/assess_show_detail.php?userid=" + randUserId + "&state=8&globaltestnum=" + randUserId;
		var req = {
			method : 'POST',
			url : URL
		};
		$http(req).then(function successCallback(response) {
			var temp = response.data.data;
			var dataRet = [{
				label : translationsGlobal.messagedOverallScore,
				strokeColor : '#4FAB67',
				data : []
			}, {
				label : translationsGlobal.messagedSpeaking,
				strokeColor : '#4DAFD9',
				data : []
			}, {
				label : translationsGlobal.messagedListening,
				strokeColor : '#F4C271',
				data : []
			}];
			var dataSimpleArray = [];
			var listening;
			var speaking;
			var overall;
			var lowest = 10;
			var highest = 0;
			if (temp[0][0]=="none"){
				$scope.selectStage = 0;
				return;
			}
			for (var i = 0; i < temp.length; i++) {
				var scoreStruct = {};
				makeScores(parseFloat(temp[i][2]), parseFloat(temp[i][3]), parseFloat(temp[i][0]), parseFloat(temp[i][1]),scoreStruct);
				/*
				listening = Math.round(10 * (parseFloat(temp[i][0]) * 10 / 2) * 0.3 + (parseFloat(temp[i][1]) * (10 / 7)) * 0.7) / 10;
				speaking = Math.round(10 * parseFloat(temp[i][2]) * (10 / 7) * 0.15 + (parseFloat(temp[i][3]) * (10 / 7)) * 0.85) / 10;
				overall = Math.round(10 * (listening + speaking) / 2) / 10 + 2;
				*/
				//overallscore	listeningscore	speakingscore
				
				if (Math.min(scoreStruct.listeningscore, scoreStruct.speakingscore, scoreStruct.overallscore) < lowest) {
					lowest = Math.floor(Math.min(scoreStruct.listeningscore, scoreStruct.speakingscore, scoreStruct.overallscore));
				}
				if (Math.max(scoreStruct.listeningscore, scoreStruct.speakingscore, scoreStruct.overallscore) > highest) {
					highest = Math.floor(Math.max(scoreStruct.listeningscore, scoreStruct.speakingscore, scoreStruct.overallscore));
				}
				dataRet[0].data.push({
					x : new Date(temp[i][4]),
					y : scoreStruct.overallscore
				});
				dataRet[1].data.push({
					x : new Date(temp[i][4]),
					y : scoreStruct.speakingscore
				});
				dataRet[2].data.push({
					x : new Date(temp[i][4]),
					y : scoreStruct.listeningscore
				});
				
				var dateTemp = temp[i][4];
				var a=dateTemp.split(" ");
				var d=a[0].split("-");
				var t=a[1].split(":");
				var date = new Date(d[0],(d[1]-1),d[2],t[0],t[1],t[2]);				
				dateStr = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
				 				
				dataSimpleArray.push([getFormattedDate(dateStr),scoreStruct.overallscore,scoreStruct.speakingscore,scoreStruct.listeningscore,temp[i][5]]);
				//dataSimpleArray.push([dateStr,overall,speaking,listening,temp[i][5]]);
				//dataSimpleArray.push([temp[i][4],overall,speaking,listening]);
			}
			lowest -= 2;
			highest += 2;
			if (lowest < 0)
				lowest = 0;
			if (highest > 10)
				highest = 10;
			/*
			var laterDate = new Date(temp[0][4]);
			laterDate.setDate(laterDate.getDate() + 1);
			//  if we want to add one day etc to test.
			dataRet[0].data.push({
				x : laterDate,
				y : overall + 1
			});
			dataRet[1].data.push({
				x : laterDate,
				y : speaking + 2
			});
			dataRet[2].data.push({
				x : laterDate,
				y : listening + 3
			});
			dateStr = (laterDate.getMonth() + 1) + '/' + laterDate.getDate() + '/' +  laterDate.getFullYear();
			dataSimpleArray.push([getFormattedDate(dateStr),overall+1,speaking+2,listening+3,temp[0][5]]);
			*/
			$scope.testScoresTimeArray = dataSimpleArray;			
			$scope.testScoresTimePlotStruct = dataRet;
			$scope.highestPlotValue = highest;
			$scope.lowestPlotValue = lowest;
			
			userIdReportShow = $scope.testScoresTimeArray[0][4];
			getResults($scope, $http);			
			
		}, function errorCallback(response) {
		});

	};
	getFormattedDate = function(input){
    var pattern=/(.*?)\/(.*?)\/(.*?)$/;
    var result = input.replace(pattern,function(match,p1,p2,p3){
        var months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        return (p2<10?"0"+p2:p2)+" "+months[(p1-1)]+" "+p3;
    });
    	return result;
	};
})();
