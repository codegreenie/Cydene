/********App Initialization *************/
var myApp = new Framework7({

    material : true,
    //materialRipple : true,
    materialRippleElements : '.ripple',
    modalTitle : 'Cydene Express',
    swipePanel : 'both',
    fastClicks : false
  });

// Export selectors engine
var $$ = Dom7;



// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
/********App Initialization *************/











var getLatLong, deviceCoords;

$$(document).on("deviceready", function(){ //Device plugins starts here
if (cordova.platformId == 'android') {StatusBar.backgroundColorByHexString("#3f51b5");}

	getLatLong = function(){
			
			navigator.geolocation.getCurrentPosition(geoSuccess, geoFailure, {enableHighAccuracy : true, timeout : 10000});
	}
	

	geoSuccess =  function(position){

		var geolatitude = position.coords.latitude;
		var geolongitude = position.coords.longitude;

		deviceCoords = {

			"sweetLatty" : geolatitude,
			"sweetLonggy" : geolongitude
		};
	}



	geoFailure = function(error){

			myApp.modal({

				title : 'Cydene Express',
				text : 'Please turn on your GPS and allow access',
				buttons : [
					{
						text : '<span class=color-orange>Not Now</span>',
						bold : true,
						onClick : function(){
							mainView.router.loadPage('dashboard.html');
						}
					},
					{
						text : '<span class=color-indigo>Try Again</span>',
						bold : true,
						onClick : function(){ getLatLong(); }	
					}
				]

			});
	}




	





	
}); //Device plugins ends here












































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
				if(window.localStorage.getItem("_cydene_user_phone_no") && window.localStorage.getItem("buyerFN") && window.localStorage.getItem("buyerLN") && window.localStorage.getItem("buyerMail")){

						mainView.router.loadPage("dashboard.html");
				}
/*
			else if(window.localStorage.getItem("_cydene_user_phone_no") && window.localStorage.getItem("buyerFN") && window.localStorage.getItem("buyerLN") && window.localStorage.getItem("buyerMail")){

						mainView.router.loadPage("dashboard.html");
				}
*/
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

							if(data === "OTP Created"){

								window.localStorage.setItem("_cydene_user_phone_no", improved_phone);
								window.localStorage.setItem("_cydene_welcome_msg", "Hi, Welcome to Cydene Express. <br> Please enter the OTP sent to your device.");
								mainView.router.loadPage("addotp.html");
							}

							else if(data === "OTP Updated"){

								window.localStorage.setItem("_cydene_user_phone_no", improved_phone);
								window.localStorage.setItem("_cydene_welcome_msg", "Hello, Welcome back to Cydene Express. <br> Please enter the OTP sent to your device.");
								mainView.router.loadPage("addotp.html");
							}

							else{

								myApp.alert("An Error occured. Try again later");
							}
						}
						
						});

			});



});
/**********************Get Started Page *****************/












/**********************Apply OTP existing User Page *****************/

	
	myApp.onPageInit('addotp', function(page){

			$$("#welcome-msg-update").html(window.localStorage.getItem("_cydene_welcome_msg"));



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
						dataType : "json", 
						error : function(xhr, status){
						
							myApp.hidePreloader();
							myApp.alert(xhr.message);

						},
						success : function(data, status, xhr){
							myApp.hidePreloader();
							


							var blowData = data;
							console.log(blowData.this_data_type);

							
							if(blowData.this_data_type == "Buyer"){

							if(blowData.the_buyer_mail != null && blowData.the_buyer_mail != null && blowData.the_buyer_fn != null && blowData.the_buyer_fn != null && blowData.the_buyer_ln != null && blowData.the_buyer_ln != null){
								
								window.localStorage.setItem("buyerFN", blowData.the_buyer_fn);
								window.localStorage.setItem("buyerLN", blowData.the_buyer_ln);
								window.localStorage.setItem("buyerMail", blowData.the_buyer_mail);

								mainView.router.loadPage("dashboard.html");
							}

							else{

								mainView.router.loadPage("signup.html");
							}

							
						}


						else if(blowData.this_data_type == "Seller"){

								if(blowData.the_seller_name != null && blowData.the_seller_name != null && blowData.the_seller_mail != null && blowData.the_seller_mail != null && blowData.the_seller_address != null && blowData.the_seller_address != null){
								
								window.localStorage.setItem("sellerName", blowData.the_seller_name);
								window.localStorage.setItem("sellerMail", blowData.the_seller_mail);
								window.localStorage.setItem("sellerAddress", blowData.the_seller_address);

								mainView.router.loadPage("sellerdashboard.html");
							}
							
							else{

								mainView.router.loadPage("sellersignup.html");
							}
						}


						else if(blowData.this_data_type == "Wrong OTP"){

							myApp.alert("Wrong OTP");

						}

						else{

								mainView.router.loadPage("signup.html");

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
						var xcode = e.detail.data;
						myApp.alert("An error has occured, try again later");

					});
							

				$$('form.ajax-submit').on('form:success', function (e) {
					  var xhr = e.detail.xhr; // actual XHR object
					 
					  var data = e.detail.data; // Ajax response from action file
					  myApp.hidePreloader();
					  
					  if(data == "Registration Successful"){
					  var new_user_first_name = $$("#new_user_first_name").val();
					  var new_user_last_name = $$("#new_user_last_name").val();
					  var new_user_mail = $$("#new_user_mail").val();

					  window.localStorage.setItem("buyerFN", new_user_first_name);
					  window.localStorage.setItem("buyerLN", new_user_last_name);
					  window.localStorage.setItem("buyerMail", new_user_mail);
					  mainView.router.loadPage("setexecpin.html");
					}

					else{

						myApp.alert(data);
					}

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


$$(".go-to-order").click(function(){


		myApp.alert("Yello!");
	});




	var user_fn = window.localStorage.getItem("buyerFN");
	var user_ln = window.localStorage.getItem("buyerLN");
	$$("#profile_display_name").html(user_fn + " " + user_ln);


	for (var i = 1; i <=100; i++) {
		
		$$("#gas-purchase-qty").append("<option value= " + i + ">" + i + "</option>");	
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

		


		$$("#proceed-gas-purchase").on("click", function(){

			var gasSize = $$("#gas-cylinder-size").val();
			var gasQty = $$("#gas-purchase-qty").val();



			var uniqPurchase = {

				"gasSize" : gasSize,
				"gasQty" : gasQty
			}

			window.localStorage.setItem("uniqPurchase", JSON.stringify(uniqPurchase));
			mainView.router.loadPage("sellers.html");
		});



		$$("#schedule-switch").change(function(){		

					if($$(this).prop("checked") == true){
			               
$$("<li id='recurring-date-select'><div class='item-content'><div class='item-media'><i class='icon material-icons color-indigo'>date_range</i></div><div class='item-inner theme-indigo'><div class='item-title label color-indigo'>Recurring Dates.</div><div class='item-input'><input type='text' name='schedule_recurr_date' required id='recurring-date-select-text'></div></div></div></li>").insertAfter($$("#schedule-switch-panel"));
	           
	$$("#recurring-date-select-text").click(function(){

		var qqs = myApp.calendar({

			input : "#recurring-date-select-text",
			yearPicker : false,
			monthPicker : false,
			cssClass : "theme-indigo",
			dateFormat: "Every day - dd, of the month"

		});

	});

	            }


	            else{

	            	$$("#recurring-date-select").remove();
	            }

        	




        
        });


			
});

/**********************Dashboard****************

















/**********************Sellers*****************/
var buyFromThisSeller;
	myApp.onPageInit('sellers', function(page){

	var selectedPurchases = JSON.parse(window.localStorage.getItem("uniqPurchase"));
	var postedCylinderSize = selectedPurchases.gasSize;

	



		$$.get("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/find_sellers.php", {"posted_cylinder_size" : postedCylinderSize}, function(data){

			$$(".populate-all-sellers").removeClass('text-center').html(data);

		}, function(){

				myApp.alert("Error occured, try again later");
		});
						
					

		buyFromThisSeller = function(theSellerID, theCylinderSize){

			$$.getJSON("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/fetch_seller_details.php", {"seller_id" : theSellerID, "cylinder_size" : theCylinderSize}, function(data){

					console.log(data);
					var stringData = JSON.stringify(data);
					window.localStorage.setItem("full_seller_details", stringData);
					mainView.router.loadPage("sellerdetails.html");

				}, function(xhr, data){

						console.log(xhr.response);
						myApp.alert("Error occured, try again later");
				});


			}

		








	});


/**********************Sellers*****************/













/**********************Seller Details*****************/

myApp.onPageInit('sellerdetails', function(page){


	var splitSellerDetails = JSON.parse(window.localStorage.getItem("full_seller_details"));

	var splitBuyDetails = JSON.parse(window.localStorage.getItem("uniqPurchase"));
	
	
		


		$$(".populate-sellers-name").html(splitSellerDetails.seller_details_name);
		$$(".populate-sellers-logo").attr("src", "http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/imgs/" + splitSellerDetails.seller_details_logo);
		$$(".populate-sellers-address").html(splitSellerDetails.seller_details_address);
		$$(".quote-size").html(splitBuyDetails.gasSize + " (<strike>N</strike>" + splitSellerDetails.cylinder_size_price + ")" );
		$$(".quote-qty").html(splitBuyDetails.gasQty);

		var totalPrice = splitSellerDetails.cylinder_size_price * splitBuyDetails.gasQty;

		$$(".quote-total-price").html("<strike>N</strike>" + totalPrice);


		//populate buyers addresses
		$$.get("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/address_fetcher.php", 
			{
				"users_phone" : window.localStorage.getItem("_cydene_user_phone_no")
			}, 

		function(data){

			$$(".populate-addresses").append(data);

		}, 

		function(data){

			myApp.alert("Unable to fetch addresses. Try again later.");

		});





		$$("#payment-btn").html("Pay <strike>N</strike>" + totalPrice).click(function(){

				myApp.showPreloader('Processsing...');
				var paymentMethod = $$("input[name='payment_method']:checked").val();
				
				if(paymentMethod == "COD"){

					$$.post("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/transaction_recorder.php", 

					{

						"tnx_cylinder_size" : splitBuyDetails.gasSize,
						"tnx_quantity" : splitBuyDetails.gasQty,
						"tnx_total_price" : totalPrice,
						"tnx_buyer" : window.localStorage.getItem("_cydene_user_phone_no"),
						"tnx_seller" : splitSellerDetails.seller_details_id,
						"tnx_payment_method" : "COD"
					}, 

					function(data){

						myApp.hidePreloader();

						if(data == "Successful"){
							
							mainView.router.loadPage("ordersuccess.html");

						}

					}, function(){

						myApp.alert("An error has occured");
					});
				}




				else{

					myApp.hidePreloader();
					var pushFields = {
						
						"tnx_cylinder_size" : splitBuyDetails.gasSize,
						"tnx_quantity" : splitBuyDetails.gasQty,
						"tnx_total_price" : totalPrice,
						"tnx_buyer" : window.localStorage.getItem("_cydene_user_phone_no"),
						"tnx_seller" : splitSellerDetails.seller_details_id,
						"tnx_payment_method" : "COD"
					}

					window.localStorage.setItem("tnx_fields", JSON.stringify(pushFields));
					mainView.router.loadPage("pinexec.html");

				}

		});










});

/**********************Sellers Details*****************/










/**********************PIN exec*****************/

myApp.onPageInit('pinexec', function(page){



		var splitTnxFields = JSON.parse(window.localStorage.getItem("tnx_fields"));
		

		$$("#show-amount").html("<strike>N</strike>" + splitTnxFields.tnx_total_price);


		
		$$("#exec-pin").on("keyup", function(){
				
				var pinLength = $$(this).val().length;
				if(pinLength == 4){

					$$("#exec-arrow").css("display", "flex");
				}

			});


		$$("#exec-arrow").click(function(){
			
			myApp.showPreloader('Validating PIN...');
			$$.post("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/validate_exec_pin.php", 
				{
					"exec_pin" : $$("#exec-pin").val(),
					"user_phone" :  window.localStorage.getItem("_cydene_user_phone_no")
				},

			 function(data){
					if(data === "PIN Match"){

					 	
								var splitBuyDetails = JSON.parse(window.localStorage.getItem("uniqPurchase"));
					 			var splitSellerDetails = JSON.parse(window.localStorage.getItem("full_seller_details"));
					 			var tranxFields = window.localStorage.getItem("tnx_fields");
					 			var totalPrice = splitSellerDetails.cylinder_size_price * splitBuyDetails.gasQty;
					 			$$.post("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/transaction_recorder.php", 

							{

								"tnx_cylinder_size" : splitBuyDetails.gasSize,
								"tnx_quantity" : splitBuyDetails.gasQty,
								"tnx_total_price" : totalPrice,
								"tnx_buyer" : window.localStorage.getItem("_cydene_user_phone_no"),
								"tnx_seller" : splitSellerDetails.seller_details_id,
								"tnx_payment_method" : "Wallet"
							}, 

							function(data){
										myApp.hidePreloader();
										if(data == "Successful"){

											myApp.hidePreloader();
								 			mainView.router.loadPage("ordersuccess.html");

									 		}

									 		else{

									 				myApp.hidePreloader();
										 			myApp.alert("Connection Error, Try again.");
									 		}

									 	},

						 	function(){
									
									myApp.alert("An error has occured. Please try again later");
					 		}

							);

						}



					
					else{
						myApp.hidePreloader();
						myApp.alert("Wrong PIN");
					}

			}, function(data){

				myApp.hidePreloader();
			 	myApp.alert(data);

			});// End of validate PIN script


		

		}); // end of onclick event.






});

/**********************PIN exec*****************/

















/*********************MapExp********************/

myApp.onPageInit('mapexp', function(page){

		getLatLong();
		window.setTimeout(function(){pushMap();}, 3000);	
	

	function pushMap(){

	var latitude = deviceCoords.sweetLatty;
	var longitude = deviceCoords.sweetLonggy;

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

    initAutoComplete();

	}

	

	

	function initAutoComplete(){

	var input = document.getElementById('searchTextField');
	var options = {
		  types: ['address'],
		  componentRestrictions: {country: 'ng'},
		};

	autocomplete = new google.maps.places.Autocomplete(input, options);
}


	

	

	$$("#save-address-btn").on("click", function(){

		myApp.showPreloader(' ');

		$$.ajax({
						url : "http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/save_delivery_address.php",
						method : "POST",
						crossDomain : true,
						timeout : 10000,
						data : {

							the_users_phone : window.localStorage.getItem("_cydene_user_phone_no"),
							the_address_name : $$("#the-address-name").val(),
							the_delivery_address : $$(".delivery-address").val()
						},
						dataType : "html", 
						error : function(xhr, status){
						
							myApp.hidePreloader();
							myApp.alert("Network Error, Try again later");

						},
						success : function(data, status, xhr){
							myApp.hidePreloader();
							console.log(data);
							
							if(data == "Save Successful"){

								myApp.hidePreloader();
								mainView.router.loadPage("dashboard.html");
							}
							else{

								myApp.alert("Error saving address, try again later.");

							}
							
						}
						
						});

	});
	



	


});














































    
