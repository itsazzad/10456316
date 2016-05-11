// create the module and name it fluent
// also include ngRoute for all our routing needs
var fluent = angular.module('fluent', ['ngRoute']);

// configure our routes
fluent.config(function($routeProvider) {

$routeProvider
        // route for the index page
        .when('/', {
                templateUrl : 'templates/index_assess.html',
                controller  : 'mainCtrl'
        })

        // route for the FAQ page
        .when('/AdminMain', {
        templateUrl : 'templates/admin_main123.html',
        controller  : 'adminMainCtrl'
        })
/*
        // route for the contact page
        .when('/AssessSpeech', {
                templateUrl : 'templates/assess.html',
                controller  : 'assessSpeechCtrl'
        })
        
        // route for the contact page
        .when('/LoginAssess', {
                templateUrl : 'templates/LoginAssess.html',
                controller  : 'noneCtrl'
        })
        
        .when('/SendAssess', {
                templateUrl : 'templates/assess_send.html',
                controller  : 'sendCtrl'
        })
 */       
        
        
});

// create the controller and inject Angular's $scope
fluent.controller('mainCtrl', function($scope) {
        // create a message to display in our view
});

fluent.controller('noneCtrl', function($scope) {
});


fluent.controller('adminMainCtrl', function($scope) {
	setupAdminMain();
});


