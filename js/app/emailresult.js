(function() {
	 
// before answer
var firstRun = 1;

setupEmailPage = function(){
	
	/*
	$('#meaningListEl').insertAfter($('#ConvListEl'));
	$('#ListeningListEl').insertAfter($('#meaningListEl'));				
	screenAdvance = 1;
	$("#allshow").hide();	
	*/
	saveAndSendEmail();
};

updateEmailUI = function(emailIn){
		
	var email2Text = "We have just sent a confirmation email to " + emailLanding + ". Please check it is has been received OK. If you don't see it within 5 minutes then please check your spam folder.<br><br>";
	email2Text = email2Text + "Finally, please add the email team@fluentiq.com to your address book. This will ensure your results get through to you.<br><br>";					 	
	$("#emailGetResult").hide();
	$("#showTerms").hide();
	
	$("#emailAndDetails").hide();
	$("#formInsns").hide();	
	
	$("#allshow").show();
	$("#email-send1").css("visibility","visible");
	$("#email-send2").html(email2Text);
	$("#email-send2").css("visibility","visible");
	$("#email-send3").css("visibility","visible");
		
	return;
};


sendEmailData = function () {
	
	if ($("#emailAndDetails input").eq(0).val() == ""){
				bootbox.alert("Please enter an email address.", function() {
		});
		return false;
	}
	emailLanding = $("#emailAndDetails input").eq(0).val();
	nameLanding = $("#emailAndDetails input").eq(1).val();
	country = $("#emailAndDetails input").eq(2).val();
	nativeLanguage = $("#emailAndDetails input").eq(3).val();		
	reasonEnglish = $("#emailAndDetails input").eq(4).val();	
	
	/*
	
	emailLanding = $("#emailAndDetails input").eq(1).val();		
	testTypeLanding = $("#emailAndDetails select").eq(0).find(":selected").text();	
	overallScoreLanding = $("#emailAndDetails input").eq(2).val();
	speakingScoreLanding = $("#emailAndDetails input").eq(3).val();
	ListeningScoreLanding = $("#emailAndDetails input").eq(4).val();
	*/
	sendEmail();	
	
};


//saveAndSendEmail = function(email){
saveAndSendEmail = function(){
	hasEnteredEmail = 1;			
	//var stringSave = "userid=" + randUserId + "&email=" + emailLanding + "&username=" + nameLanding + "&testtype=" + testTypeLanding + "&scoretotal=" + overallScoreLanding + "&scorelistening=" + ListeningScoreLanding + "&scorespeaking=" + speakingScoreLanding ;
	/*   	
	var stringSave = "userid=" + randUserId + "&email=" + emailLanding + "&username=" + nameLanding + "&country=" + country + "&native=" + nativeLanguage + "&reason=" + reasonEnglish;
	$.post("php/saveemail.php?" + stringSave ,{},function()
	{
		//alert("saved");
	}
	);
	*/
	var stringEmail = "email=" + email;
	$.post("php/mailer/emailSender.php?option=0&" + stringEmail  + "&usertestid=-1",{},function()
	{
		//alert("saved");
	}
	);

	
};



})();