function runApp(){
// your code

/********App Initialization *************/
var myApp = new Framework7({

    material : true,
    materialRipple : true,
    materialRippleElements : '.ripple',
    modalTitle : 'Cydene Express',
    swipePanel : 'both'
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
		timeout : 10000,
		error : function(xhr, status){
			myApp.modal({
				title : 'Cydene Express',
				text : 'Please check Internet connection.',
				buttons : [
					{
						text : '<span class=color-orange>Exit</span>',
						bold : true
					},
					{
						text : '<span class=color-indigo>Try Again</span>',
						bold : true,
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
						timeout : 10000,
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
						url : "http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/verify_otp_new_user.php",
						method : "POST",
						crossDomain : true,
						timeout : 10000,
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




			$$("#resend_otp_new_user").on("click", function(){
				myApp.showPreloader(' ');

				var theUserPhone = window.localStorage.getItem("_cydene_user_phone_no");
				$$.ajax({
						url : "http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/resend_otp.php",
						method : "POST",
						crossDomain : true,
						timeout : 10000,
						data : {

							users_phone : theUserPhone
						},
						dataType : "text", 
						error : function(xhr, status){
						
							myApp.hidePreloader();
							myApp.alert(status);

						},
						success : function(data, status, xhr){
							myApp.hidePreloader();
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
						timeout : 10000,
						data : {

							users_phone : window.localStorage.getItem("_cydene_user_phone_no"),
							supplied_otp : $$("#user_otp").val()
						},
						dataType : "JSON", 
						error : function(xhr, status){
						
							myApp.hidePreloader();
							myApp.alert(xhr.message);

						},
						success : function(data, status, xhr){
							myApp.hidePreloader();
							if(data === "OTP Wrong"){

								myApp.alert(data);
								
							}
							else{
									var myData = JSON.parse(data);
									window.localStorage.setItem("_cydene_user_first_name", myData.the_user_fn);
									window.localStorage.setItem("_cydene_user_last_name", myData.the_user_ln);
									window.localStorage.setItem("_cydene_user_mail", myData.the_user_mail);
									

									mainView.router.loadPage("dashboard.html");
							}
						}
						
						});

			});




			$$("#resend_otp").on("click", function(){
				myApp.showPreloader(' ');

				var theUserPhone = window.localStorage.getItem("_cydene_user_phone_no");
				$$.ajax({
						url : "http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/resend_otp.php",
						method : "POST",
						crossDomain : true,
						timeout : 10000,
						data : {

							users_phone : theUserPhone
						},
						dataType : "text", 
						error : function(xhr, status){
						
							myApp.hidePreloader();
							myApp.alert(status);

						},
						success : function(data, status, xhr){
							myApp.hidePreloader();
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
					  mainView.router.loadPage("setexecpin.html");
					});
							

	});
	



/**********************Signup Page*****************/











/**********************Set Exec PIN *****************/

myApp.onPageInit('setexecpin', function(page){

	$$(".num_2_password").on("focus", function(){

		$$(this).prop("type", "password");
	});

	$$("#user_pin_confirm").on("keyup", function(){
		
		var userPin = $$("#user_pin").val();
		var userPinConfirm = $$(this).val();

		if(userPin === userPinConfirm && userPin.length === 4 && userPinConfirm.length === 4){

				$$("#set_pin_arrow").show().css("display", "flex");
		}

		else{

			$$("#set_pin_arrow").hide();		
		}


	});







	var grabUserPhone = window.localStorage.getItem("_cydene_user_phone_no");
			$$('#user_pin_phone').val(grabUserPhone);
			

			$$('#set_pin_arrow').on('click', function(e){

					$$('form#set_pin_form').trigger('submit');

			});


				$$('form#set_pin_form').on('form:beforesend', function (e) {
					  myApp.showPreloader(' ');
				});
				

				$$('form#set_pin_form').on('form:error', function (e) {
					  
						myApp.hidePreloader();
						myApp.alert("An error has occured, try again later");

					});
							

				$$('form#set_pin_form').on('form:success', function (e) {
					  var xhr = e.detail.xhr; // actual XHR object
					 
					  var data = e.detail.data; // Ajax response from action file
					  	myApp.hidePreloader();
						mainView.router.loadPage("dashboard.html");
					

					});
							




});

/**********************Set Exec PIN *****************/















/**********************Dashboard*****************/


myApp.onPageInit('dashboard', function(page){

	var user_fn = window.localStorage.getItem("_cydene_user_first_name");
	var user_ln = window.localStorage.getItem("_cydene_user_last_name");
	$$("#profile_display_name").html(user_fn + " " + user_ln);


	for (var i = 1; i <=100; i++) {
		
		$$("#gas_purchase_qty").append("<option value= " + i + ">" + i + "</option>");	
	}

		$$("#sos_btn").on("click", function(){
		myApp.modal({
			title : "Cydene Express",
			text : "Start Emergency Call?", 
			buttons : [
				{
				text : "<a href='#' class='color-orange'>Not Now</a>",
				bold : true
			},

			{
				text : "<a href='#' class='color-indigo'>Yes Please!</a>",
				bold : true
			},


			]
		})
	});


	var cydeneUsersPhone = window.localStorage.getItem("_cydene_user_phone_no");
				$$.ajax({
						url : "http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/verify_delivery_address.php",
						method : "POST",
						crossDomain : true,
						timeout : 10000,
						data : {

							cydene_users_phone : cydeneUsersPhone
						},
						dataType : "text", 
						error : function(xhr, status){
						
							/*myApp.hidePreloader();
							myApp.alert(status);*/

						},
						success : function(data, status, xhr){
							
							if(data === "No delivery address"){

								myApp.modal({
									
									title : "Cydene Express",
									text : "No delivery address found. Would you like to set one now?",
									buttons : [

										{
											text : "<span class='color-orange'>Not Now</span>",
											bold : true
										},
										{
											text : "<span class='color-indigo'>Let's Go</span>",
											bold : true,
											onClick : function(){

												mainView.router.loadPage("mapexp.html");
											}

										},
									]



								});
							}
						}
						
						});

		



	

});

/**********************Dashboard*****************/






myApp.onPageInit('mapexp', function(page){


	var latitude, longitude;


	function getLatLong(){

		navigator.geolocation.getCurrentPosition(geoSuccess, geoFailure, {enableHighAccuracy : true});
	}


	function geoSuccess(position){

		latitude = position.coords.latitude;
		longitude = position.coords.longitude;

		pushMap();

	}



	function geoFailure(error){

			myApp.modal({

				title : 'Cydene Express',
				text : 'Please turn on your GPS and allow access',
				buttons : [
					{
						text : '<span class=color-orange>Not Now</span>',
						bold : true,
						onClick : mainView.router.loadPage('dashboard.html')
					},
					{
						text : '<span class=color-indigo>Try Again</span>',
						bold : true,
						onClick : function(){ getLatLong(); }	
					}
				]

			});
	}


	function pushMap(){

		 var mapOptions = {
        center: new google.maps.LatLng(latitude, longitude),
        zoom: 1,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map
    (document.getElementById("map"), mapOptions);


    var latLong = new google.maps.LatLng(latitude, longitude);

    var marker = new google.maps.Marker({
        position: latLong
    });

    marker.setMap(map);
    map.setZoom(15);
    map.setCenter(marker.getPosition());

	}

	getLatLong();

});






















} // RunApp function ends here










//RunApp();




document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {

	
    
    if (cordova.platformId == 'android') {

    	StatusBar.backgroundColorByHexString("#3f51b5");
	}


	runApp();
    
}



    
