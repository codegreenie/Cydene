// your code

/********App Initialization *************/
var myApp = new Framework7({

    material : true,
    materialRipple : true,
    materialRippleElements : '.ripple',
    modalTitle : 'Cydene Express',
    swipePanel : 'left'
  });

// Export selectors engine
var $$ = Dom7;



// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
/********App Initialization *************/






/******** Start Page *************/

myApp.onPageInit('begin', function(page){

	test4connection();

}).trigger();


function test4connection(){

	$$.ajax({
		url : "http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/conn_file.php",
		method : "GET",
		crossDomain : true,
		timeout : 5000,
		error : function(xhr, status){
			myApp.modal({
				title : 'Cydene Express',
				text : 'Please check Internet connection.',
				buttons : [
					{
						text : '<span class=color-green>Exit</span>'
					},
					{
						text : 'Try Again',
						onClick : function(){test4connection()}	

					}
				]
			}); 

		},
		success : function(){

			//check for reg or login status via window localStorage
				if(window.localStorage.getItem("_cydene_user_phone_no") && window.localStorage.getItem("_cydene_user_first_name") && window.localStorage.getItem("_cydene_user_last_name") && window.localStorage.getItem("_cydene_user_mail")){

						mainView.router.loadPage("dashboard.html");
				}

				else{

					mainView.router.loadPage("theswipe.html");
				}
			
		}
	});
}
/******** Start Page *************/
	





/**********************Get Started Page *****************/

myApp.onPageInit('getStarted', function(page){


			$$('#user_tel').on('keyup', function(e){

				var phoneLength = $$(this).val().length;
				if(phoneLength >= 10){

					$$("#verify_reg_arrow").show().css('display', 'flex');
				}
				else{

					$$("#verify_reg_arrow").hide();	
				}
			});



			$$("#verify_reg_arrow").on('click', function(e){

						myApp.showPreloader(' ');

						var improved_phone = "+234" + $$("#user_tel").val();

						$$.ajax({
						url : "http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/verify_user.php",
						method : "POST",
						crossDomain : true,
						timeout : 5000,
						data : {

							users_phone : $$("#user_tel").val()
						},
						dataType : "text", 
						error : function(xhr, status){
						
							myApp.hidePreloader();
							myApp.alert(status);

						},
						success : function(data, status, xhr){
							myApp.hidePreloader();

							if(data === "OTP for new user created"){

								window.localStorage.setItem("_cydene_user_phone_no", improved_phone);
								mainView.router.loadPage("addotpnewuser.html");
							}
							else{
								window.localStorage.setItem("_cydene_user_phone_no", improved_phone);
								mainView.router.loadPage("addotp.html");
							}
						}
						
						});

			});



});
/**********************Get Started Page *****************/














/**********************Apply OTP New User Page *****************/

	
	myApp.onPageInit('addotpnewuser', function(page){


			$$('#new_user_otp').on('keyup', function(e){

				var otpLength = $$(this).val().length;
				if(otpLength >= 6){

					$$("#verify_new_user_otp_arrow").show().css('display', 'flex');
				}
				else{

					$$("#verify_new_user_otp_arrow").hide();	
				}
			});







			$$("#verify_new_user_otp_arrow").on('click', function(e){

						myApp.showPreloader(' ');

						

						$$.ajax({
						url : "http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/verify_otp.php",
						method : "POST",
						crossDomain : true,
						timeout : 5000,
						data : {

							users_phone : window.localStorage.getItem("_cydene_user_phone_no"),
							supplied_otp : $$("#new_user_otp").val()
						},
						dataType : "text", 
						error : function(xhr, status){
						
							myApp.hidePreloader();
							myApp.alert(xhr.message);

						},
						success : function(data, status, xhr){
							myApp.hidePreloader();
							if(data === "OTP Right"){

								mainView.router.loadPage("signup.html");
							}
							else{
								
									myApp.alert(data);	
							}
						}
						
						});

			});

});
	



/**********************Apply OTP New User Page *****************/







/**********************Apply OTP existing User Page *****************/

	
	myApp.onPageInit('addotp', function(page){


			$$('#user_otp').on('keyup', function(e){
				
				var otpLengthz = $$(this).val().length;
				if(otpLengthz >= 6){

					$$("#verify_existing_reg_arrow").show().css('display', 'flex');
				}
				else{

					$$("#verify_existing_reg_arrow").hide();	
				}
			});







			$$("#verify_existing_reg_arrow").on('click', function(e){

						myApp.showPreloader(' ');

						

						$$.ajax({
						url : "http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/verify_otp.php",
						method : "POST",
						crossDomain : true,
						timeout : 5000,
						data : {

							users_phone : window.localStorage.getItem("_cydene_user_phone_no"),
							supplied_otp : $$("#user_otp").val()
						},
						dataType : "text", 
						error : function(xhr, status){
						
							myApp.hidePreloader();
							myApp.alert(xhr.message);

						},
						success : function(data, status, xhr){
							myApp.hidePreloader();
							if(data === "OTP Right"){

								mainView.router.loadPage("dashboard.html");
							}
							else{
								
									myApp.alert(data);	
							}
						}
						
						});

			});

});
	



/**********************Apply OTP existing User Page *****************/
















/**********************Signup Page *****************/

	
	myApp.onPageInit('signup', function(page){

			var newUserPhone = window.localStorage.getItem("_cydene_user_phone_no");
			$$("#new_user_phone").val(newUserPhone);
			



			$$("#submit_new_user_reg_button").on('click', function(e){

					$$('form.ajax-submit').trigger('submit');

			});


				$$('form.ajax-submit').on('form:beforesend', function (e) {
					  myApp.showPreloader(' ');
				});
				

				$$('form.ajax-submit').on('form:error', function (e) {
					  
						myApp.hidePreloader();
						myApp.alert("An error has occured, try again later");

					});
							

				$$('form.ajax-submit').on('form:success', function (e) {
					  var xhr = e.detail.xhr; // actual XHR object
					 
					  var data = e.detail.data; // Ajax response from action file
					  myApp.hidePreloader();
					  var new_user_first_name = $$("#new_user_first_name").val();
					  var new_user_last_name = $$("#new_user_last_name").val();
					  var new_user_mail = $$("#new_user_mail").val();

					  window.localStorage.setItem("_cydene_user_first_name", new_user_first_name);
					  window.localStorage.setItem("_cydene_user_last_name", new_user_last_name);
					  window.localStorage.setItem("_cydene_user_mail", new_user_mail);
					  mainView.router.loadPage("dashboard.html");
					});
							

	});
	



/**********************Signup Page*****************/









/**********************Dashboard*****************/
myApp.onPageInit('dashboard', function(page){

	var user_fn = window.localStorage.getItem("_cydene_user_first_name");
	var user_ln = window.localStorage.getItem("_cydene_user_last_name");
	$$("#profile_display_name").html(user_fn + " " + user_ln);


	for (var i = 1; i <=100; i++) {
		
		$$("#gas_purchase_qty").append("<option value= " + i + ">" + i + "</option>");	
	}

		$$("#sos_btn").on("click", function(){
		myApp.confirm("Start Emergency Call?", function(){ myApp.alert("Iniitialiting Emergency Call...") });
	});



});

/**********************Dashboard*****************/


