var testTypeLanding;
var overallScoreLanding;
var speakingScoreLanding;
var ListeningScoreLanding;
var nameLanding;
var emailLanding;
var country;
var nativeLanguage;
var reasonEnglish;

function inputFocusLanding(i){
    if(i.value==i.defaultValue){
    	i.value="";
      	i.style.color="#000"; 
    }
}
function inputBlurLanding(i){
    if(i.value==""){ 
    	i.value=i.defaultValue; 
    	i.style.color="#888";
     }
}	


function continueForm() {
	
	if ($("#detailsOnLanding input").eq(0).val() == "name"){
		alert('Please complete the form.');
		return false;
	}
	nameLanding = $("#detailsOnLanding input").eq(0).val();
	emailLanding = $("#detailsOnLanding input").eq(1).val();
	
	
	testTypeLanding = $("#detailsOnLanding select").eq(0).find(":selected").text();	
	overallScoreLanding = $("#detailsOnLanding input").eq(2).val();
	speakingScoreLanding = $("#detailsOnLanding input").eq(3).val();
	ListeningScoreLanding = $("#detailsOnLanding input").eq(4).val();
	
	nextButton();	
	
}

function continueFormNew() {
	
	/*
	nameLanding = $("#detailsOnLanding input").eq(0).val();
	emailLanding = $("#detailsOnLanding input").eq(1).val();
		
	testTypeLanding = $("#detailsOnLanding select").eq(0).find(":selected").text();	
	overallScoreLanding = $("#detailsOnLanding input").eq(2).val();
	speakingScoreLanding = $("#detailsOnLanding input").eq(3).val();
	ListeningScoreLanding = $("#detailsOnLanding input").eq(4).val();
	*/
	nextButton();	
	
}
