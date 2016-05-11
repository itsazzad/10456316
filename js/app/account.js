(function() {
	var data = 0;
	var loginTemp = 0;
	login = function($rootScope,$location,$scope,pathToSuccess) {

		var emailIn = $("#loginForm input").eq(0).val();		
		var password = $("#loginForm input").eq(1).val();		 		
		var stringSave = "&email=" + emailIn + "&password=" + password;
		loginSend($rootScope,$location,$scope,stringSave,pathToSuccess);		
		
	};	
	loginFromURL = function($rootScope,$location,$scope,emailIn,password,pathToSuccess){
		var stringSave = "&email=" + emailIn + "&password=" + password + "&fromURL=1";
		var result = loginSend($rootScope,$location,$scope,stringSave,pathToSuccess);		
	};
	
	loginSend = function($rootScope,$location,$scope,string,pathToSuccess){
		$.post("php/checklogin.php?" + string ,{},function(data)
		{
			jd = $.parseJSON(data);
			result = jd.data;
			if (result == "none") {
				console.log('not logged in');
				$location.path('login');
				$scope.isIncorrect = 1;				
			} else {
				$scope.isIncorrect = 0;
				$scope.showIncorrect = 0;
				email = result[0][1];
				userid = result[0][0];				
				//ispaid = result[0][2];
				ispaid = 't' 
				expirydate = result[0][3];
				subscriptionid = result[0][4];	
				randUserId = result[0][5];
				username =  result[0][6];
				 			
				console.log('logged in');
				$rootScope.isLoggedIn = 1;
				if (pathToSuccess.length > 0)	
					$location.path(pathToSuccess);
				
				//$location.path('completeProfile');														
				//$location.path('dashboard');
			}
			$scope.$apply();
		}
		);						
	};
	
	deleteAccountShow = function(){
		curstage = userUIEnum.DASHBOARD_ACCOUNT_DELETE;
		document.getElementById('deleteAccount').click();
	};
	createAccount = function($scope) {
		if ($("#createForm input").eq(0).val() == ""){
					bootbox.alert("Please enter an email address.", function() {
			});
			return false;
		}
		getUniqueID(); 
		var emailIn = $("#createForm input").eq(0).val();		
		var stringSave = "update=0&userid=" + randUserId + "&email=" + emailIn;		 
		$.post("php/saveemail.php?" + stringSave ,{},function()
		{
			//alert("saved");
		}
		);
		stringSave = "usertestid=" + randUserId + "&email=" + emailIn;
		$.post("php/mailer/emailSender.php?option=1&" + stringSave ,{},function(){
			
		});
		$scope.createAccountDone = 1;
		$scope.accountEmail = emailIn; 
	};
	
	completeProfilePopulate = function() {
		$("completeForm").append('<input type="hidden" name="update" value="1">');
		$("completeForm").append('<input type="hidden" name="email" value="test2@b.c">');
		$("completeForm").append('<input type="hidden" name="userid" value="895100771">');
	};
	
	completeProfile = function($rootScope,$location,$scope) {
		
		emailIn = email;				
		var password = $("#completeForm input").eq(0).val();
		var firstName = $("#completeForm input").eq(1).val();
		var familyName = $("#completeForm input").eq(2).val();
		var native = $("#completeForm input").eq(3).val();
		var reason = $("#completeForm input").eq(4).val();
		
		var stringSave = "update=1&userid=" + randUserId + "&email=" + emailIn + "&password=" + password + "&username=" + firstName + "&userfamilyname=" + familyName + "&native=" + native + "&reason=" + reason;
		$.post("php/saveemail.php?" + stringSave ,{},function()
		{
			var stringSave = "&email=" + email + "&password=" + password;
			loginSend($rootScope,$location,$scope,stringSave,'dashboard');
			//!!! make it only if success
			//nextButton();	
		});
		
	};
	resetPW = function() {
		
		var newPW1 = $("#resetPWForm input").eq(0).val();
		var newPW2 = $("#resetPWForm input").eq(1).val();
		if (newPW1 != newPW2){
			//alert("not matching!");
			showAlertFail('Passwords do not match');
			return;
		}
		var stringSave = "resetpw=1&email=" + email + "&hashed=" + hashedIn + "&passwordnew=" + newPW1;
		$.post("php/checklogin.php?" + stringSave ,{},function(data)
		{
			result = $.parseJSON(data);
			nextButton();
			//alert(result);
		});
		
	};

	populateDetails = function($scope){
		// get the details from the database
		var stringSave = "update=3&email=" + email;
		$.post("php/saveemail.php?" + stringSave ,{},function(data){
			jd = $.parseJSON(data);
			$scope.firstNameAng = jd.data[0][0];
			$scope.familyNameAng = jd.data[0][1];
			$scope.nativeAng = jd.data[0][2];
			$scope.emailAng = email;			
			$scope.$apply();
		});
		
	};
	
	updateDetailsAccount  = function($scope){						
		var stringSave = "update=4&email=" + $scope.emailAng + "&username=" + $scope.firstNameAng + "&userfamilyname=" + $scope.familyNameAng + "&native=" + $scope.nativeAng + "&emailOld=" + email;
		$.post("php/saveemail.php?" + stringSave ,{},function(){
			showAlertSucceed('Changes saved');
			email = $scope.emailAng;
		});
	};
		
	updatePassword = function($scope){
		var stringSave = "update=5&email=" + email + "&password=" + $scope.origPWAng + "&passwordnew=" + $scope.newPWAng;		
		$.post("php/saveemail.php?" + stringSave ,{},function(data){
			if (data != "success"){
				//alert('password is incorrect');				
				showAlertFail('Password is incorrect.')
			}else{
				showAlertSucceed('Password changed.');
			}
		});
				
	};
	
	goToPaid = function(){
		// go to braintree
		curstage = userUIEnum.DASHBOARD_PAYMENT_DETAILS;		
		document.getElementById('paymentDetails').click();
	};
	
	setupPaymentDetails = function($scope){
		var clientToken = "notset";
		function getPaymentInfo(){
			$.post("php/test.php",{},function(data)
			{
				clientToken = data;
				braintree.setup(clientToken, "dropin", {
		  			container: "payment-form",		  			
					onPaymentMethodReceived: function (obj) {
			      		submitPHP(obj.nonce);
					}		  			
		  			
				});
				
			});		
		}
		getPaymentInfo();			
	};	
	
	submitPHP = function(nonce){
		var  url =  "php/checkout.php?payment_method_nonce=" + nonce + "&email=" + email;
		$.post(url ,{},function(data)	
		{
			//jd = $.parseJSON(data);
			if (data.indexOf("success") > -1){
				//alert('payment succeeded');
				showPaymentResult(1);
			}else{			
				//alert('payment failed, check payment details');
				showPaymentResult(0);
			}
		});		
	};
	
	
	checkoutPayment = function(){
		$.post("php/checkout.php",{},function(data){
			returned = data;
		});
		
	};
	
	deleteAccount = function($scope){
		var stringSave = "update=6&email=" + email + "&password=" + $scope.passwordDelete;		
		$.post("php/saveemail.php?" + stringSave ,{},function(data){
			if (data != "success"){
				alert('password is incorrect');
			}else{
				$scope.hasDeleted = 1;
				$scope.$apply();
			}
		});		
		
	};
		
	
})();