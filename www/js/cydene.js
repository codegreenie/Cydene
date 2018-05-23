/********App Initialization *************/
var myApp = new Framework7({

    material : true,
    materialRipple : true,
    materialRippleElements : '.ripple',
    modalTitle : 'Cydene Express',
    fastClicks : false,
    sortable : false
   });

// Export selectors engine
var $$ = Dom7;



// Add main view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
/******** App Initialization *************/

var toast = myApp.toast("...", "", { duration : 3500 });


function showNylon(){

	$$(".nylon").show();

}

function hideNylon(){

	$$(".nylon").hide();

}





var exitMyApp, getImg4rmGallery, loginWithFB, driveCard, fireUpPayments, fireUpPayments2, clearStatusBar;

document.addEventListener("deviceready", deviceIsReady, false);


function deviceIsReady(){


var thispage = mainView.activePage;
var ourPage = thispage.name;



	StatusBar.backgroundColorByHexString("#069");
	




window.plugins.PushbotsPlugin.initialize("5b0526d91db2dc33d672ae6d", {"android":{"sender_id":"118378131628"}});

window.open = cordova.InAppBrowser.open;




var cpage = mainView.activePage;
var cpageName = cpage.name;

	




	

	exitMyApp = function(){

		navigator.app.exitApp();
	}
	

	document.addEventListener("backbutton", trapBackButton, false);


	getImg4rmGallery = function(){

		

			 destinationTyper = Camera.DestinationType.FILE_URI;
    		pictureSource = Camera.PictureSourceType.PHOTOLIBRARY;
			    
			    navigator.camera.getPicture(cameraGood, cameraBad, 
			    {
			        quality : 70, 
			        destinationType : destinationTyper,
			        sourceType : pictureSource
			     });
	}


	function cameraGood(imageURI) {
				
				  console.log(imageURI);
				    var image = document.getElementById('the-seller-logo-space');
				    image.src = imageURI;

				    setTimeout(function(){

				    	showNylon();
				    	uploadImage(imageURI);

				    }, 4000);

		}


	function cameraBad(message) {
	    alert('Failed because: ' + message);
	}




		function uploadImage(theImage){
			var thePhone = window.localStorage.getItem("_cydene_user_phone_no");

			
			    var win = function (r) {

				    console.log("Code = " + r.responseCode);
				    console.log("Response = " + r.response);
				    console.log("Sent = " + r.bytesSent);



				    $$.post("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/finish_seller_logo_upload.php",
						{

							"the_uploaded_image" : r.response,
							"the_seller_phone" : thePhone
						},
						function(data){
							hideNylon();

							if(data == "Successful Upload"){
								
								window.localStorage.setItem("sellerLogo", thePhone + r.response);
								mainView.router.loadPage("sellerdashboard.html");
							}
							else{

								toast.show(data);
							}
						}
						,
						function(){
							toast.show("Unable to connect to Cydene Servers. Try again later");
						});


				}

				var fail = function (error) {

					hideNylon();
				    toast.show("An error has occurred: Code = " + error.code);
				    console.log("upload error source " + error.source);
				    console.log("upload error target " + error.target);
				}

				var options = new FileUploadOptions();
				options.fileKey = "file";
				options.fileName = theImage.substr(theImage.lastIndexOf('/') + 1);
				options.mimeType = "image/jpeg";
				options.chunkedMode = false;

				var params = {};
				params.value1 = "test";
				params.value2 = "param";

				options.params = params;

				var ft = new FileTransfer();
				ft.upload(theImage, encodeURI("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/upload_seller_logo.php"), win, fail, options);


		}



	
	

	fireUpPayments = function(thePaymentUrl, tnxRef){

		var ref = cordova.InAppBrowser.open(thePaymentUrl, '_blank', 'location=yes');
		ref.addEventListener('exit', exitInappBrowser);
	}

	function exitInappBrowser(){
		
   		mainView.router.loadPage("orderhistory.html");
	}




	fireUpPayments2 = function(thePaymentUrl, tnxRef){

		var ref2 = cordova.InAppBrowser.open(thePaymentUrl, '_blank', 'location=yes');
		ref2.addEventListener('exit', exitInappBrowser2);
	}

	function exitInappBrowser2(){
		
   		mainView.router.loadPage("settings.html");
	}

	


		




	
} //Device is ready




	


	function trapBackButton(){
		
		var cpage = mainView.activePage;
		var cpageName = cpage.name;

		//Re-route to Dashboard
		if(cpageName == "mapexp" || cpageName == "settings" || cpageName == "ordersuccess" || cpageName == "orderhistory" || cpageName == "addresseslist" || cpageName == "cardpayment" || cpageName == "sellers"){

				mainView.router.loadPage("dashboard.html");
		}


		//Exit App
		else if(cpageName == "dashboard" || cpageName == "theswipe" || cpageName == "getstarted" ||cpageName == "begin"){

			navigator.app.exitApp();
		}



		//Seller Section

		//Exit App
		else if(cpageName == "payoutsuccess"){

			mainView.router.loadPage("sellerdashboard.html");
		}

		

		//Exit App
		else if(cpageName == "sellerdashboard" || cpageName == "theswipe" || cpageName == "getstarted" ||cpageName == "begin"){

			navigator.app.exitApp();
		}




		//Re-route to Settings
		else if($$('.modal-in').length > 0){

			myApp.closeModal();
			return false;
		}

		else{

			mainView.router.back();
		}

}















myApp.onPageInit('theswipe', function(page){


	$$("#get-started-btn").on("click", function(){

		mainView.router.loadPage("getstarted.html");

	});


});

































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

				showNylon();


						var improved_phone = "+234" + $$("#user_tel").val();

						$$.post("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/verify_user.php",
						{

							users_phone : $$("#user_tel").val()
						},
						function(data){
							hideNylon();

							toast.show(data);

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

								toast.show("An Error occured. Try again later");
							}
						},

						 function(xhr, status){
						
							hideNylon();
							toast.show("Unable to connect to Cydene Ntework");

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

						showNylon();

						

						$$.getJSON("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/verify_otp.php",
						{
							users_phone : window.localStorage.getItem("_cydene_user_phone_no"),
							supplied_otp : $$("#user_otp").val()
						},
						function(data){

							hideNylon();
							console.log(data);
							

							
							var blowData = data;
							console.log(blowData);
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
								window.localStorage.setItem("sellerLogo", blowData.the_seller_logo);

								mainView.router.loadPage("sellerdashboard.html");
							}
							
							else{

								mainView.router.loadPage("sellersignup.html");
							}
						}


						else if(blowData.this_data_type == "Wrong OTP"){

							toast.show("Wrong OTP");

						}

						else{

								mainView.router.loadPage("selectaccount.html");

						}

					

			},

			function(){

					toast.show("Unable to connect to Cydene Servers");

			});



});
			



			$$("#resend_otp").on("click", function(){
				showNylon();

				var theUserPhone = window.localStorage.getItem("_cydene_user_phone_no");
				$$.post("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/resend_otp.php",
						{

							users_phone : theUserPhone
						},
						function(data, status, xhr){
							hideNylon();
						}
						,
						function(){

							toast.show("Unable to connect to Cydene Servers. Try again later");
						});

			});









});
	



/**********************Apply OTP existing User Page *****************/
















/**********************Signup Page *****************/



	myApp.onPageInit('signup', function(page){
	

	function fbLogin() {
    	

		facebookConnectPlugin.login(["public_profile", "email"], function(result){
		//auth success
		console.log(JSON.stringify(result));


		//calling api
		facebookConnectPlugin.api("/me?fields=email,name,picture", ["public_profile","email"], function(userData){

			
				window.localStorage.setItem("facebook_return", JSON.stringify(userData));
				setTimeout(function(){
					registerFBUser();
				}, 3000);

		}, function(error){

			//error callback
			toast.show(JSON.stringify(error));
		});


	},

	function(error){

		toast.show(JSON.stringify(userData));

	});





	}



	function registerFBUser(){

		showNylon();
		var userData = window.localStorage.getItem("facebook_return");
		userData = JSON.parse(userData);

		//success callback
			var stringifyData = JSON.stringify(userData);
			var signupEmail = stringifyData.email;
			var signUpName = stringifyData.name;
			var splitName = signUpName.split(" ");


			signupFirstName = splitName[0];
			signupLastName = splitName[1];




			$$.post("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/buyer_registration.php",{

				new_user_first_name : signupFirstName,
				new_user_last_name : signupLastName,
				new_user_mail : signupEmail,
				new_user_phone : window.localStorage.getItem("_cydene_user_phone_no")
			},
			function(data){

				hideNylon();
				if(data == "Registration Successful"){

					window.localStorage.setItem("buyerFN", signupFirstName);
					window.localStorage.setItem("buyerLN", signupLastName);
					window.localStorage.setItem("buyerMail", signupEmail);
					mainView.router.loadPage("setexecpin.html");
				}
				else{

					toast.show(data);
				}

			},
			function(error){

				toast.show("Unable to connect to Cydene Servers. Try again later.");
			});

	}




	$$("#fb-signup").on("click", function(){

		fbLogin();
	})

			var newUserPhone = window.localStorage.getItem("_cydene_user_phone_no");
			$$("#new_user_phone").val(newUserPhone);
			



			$$("#submit_new_user_reg_button").on('click', function(e){

					$$('form.ajax-submit').trigger('submit');

			});


				$$('form.ajax-submit').on('form:beforesend', function (e) {
					  showNylon();
				});
				

				$$('form.ajax-submit').on('form:error', function (e) {
					  
						hideNylon();
						var xcode = e.detail.data;
						toast.show("An error has occured, try again later");

					});
							

				$$('form.ajax-submit').on('form:success', function (e) {
					  var xhr = e.detail.xhr; // actual XHR object
					 
					  var data = e.detail.data; // Ajax response from action file
					  hideNylon();
					  
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

						toast.show(data);
					}

					});
							

	});
	



/**********************Signup Page*****************/













/**********************Set Exec PIN *****************/

myApp.onPageInit('setexecpin', function(page){

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
					  showNylon();
				});
				

				$$('form#set_pin_form').on('form:error', function (e) {
					  
						hideNylon();
						toast.show("An error has occured, try again later");

					});
							

				$$('form#set_pin_form').on('form:success', function (e) {
					  var xhr = e.detail.xhr; // actual XHR object
					 
					  var data = e.detail.data; // Ajax response from action file
					  	hideNylon();
						mainView.router.loadPage("dashboard.html");
					

					});
							




});

/**********************Set Exec PIN *****************/















/**********************Dashboard*****************/


myApp.onPageInit('dashboard', function(page){



	$$('.hide-me').hide();

var cydeneUsersPhone = window.localStorage.getItem("_cydene_user_phone_no");
$$("#buyers-namesake").text(window.localStorage.getItem("buyerFN"));


$$.post("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/fetch_wallet_balance.php",
	{
		"user_phone_data" : cydeneUsersPhone
	},
	 function(data){

	 	$$(".home-wallet-balance").html("<strike>N</strike>" + data);

	 }, function(){

	 		toast.show("Could not connect to Cydene servers");
	 });





$$.getJSON("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/pull_homepage_order_history.php",
	{
		"the_buyer" : cydeneUsersPhone
	},
	 function(data){

	 	
	 	console.log(data);
	 	the_status = data[0].stack_status;

	 	if(the_status == "record found"){

	 		$$("#no-order-div").hide();

		 	for(p = 1; p < data.length; p++){

		 		var cylinder_size = data[p].cylinder_size;
		 		var cylinder_qty = data[p].cylinder_qty;


		 		$$("#" + data[p].myDiv + "-junior").html("<img src=http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/imgs/cylinder_yellow.png style='max-width: 20px;'><br>" + cylinder_size + "Gas<br><br>Quantity: " + cylinder_qty);
		 		$$("#" + data[p].myDiv).show();

		 	}

		 	$$("#see-all-history").show();

		 		mySwipe = myApp.swiper('.home-history-swiper', {
				slidesPerView : 2.5

			});
	 	}

	
	 }, function(){

	 		toast.show("Could not connect to Cydene servers");
	 });


	

	



				$$.post("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/verify_delivery_address.php",
						 {

							cydene_users_phone : cydeneUsersPhone
						},
						function(data, status, xhr){
							
							if(data === "No delivery address"){

								myApp.modal({
									
									title : "Cydene Express",
									text : "No delivery address found. Would you like to set one now?",
									buttons : [

										{
											text : "<span class='color-orange'>Not Now</span>",
											bold : true,
											onClick : function(){

												exitMyApp();
											}
										},
										{
											text : "<span class='color-indigo'>Let's Go</span>",
											bold : true,
											onClick : function(){
												mainView.router.loadPage("mapexp.html");
											}

										}
									]
								});
							}


						}
						, function(xhr, status){
						
							hideNylon();
							toast.show("Cannot connect to Cydene Servers");

						});

		





		$$("#fivekggas").on("click", function(){

			showNylon();
			loadMyAddresses("5kg");

		});

		$$("#threekggas").on("click", function(){

			showNylon();
			loadMyAddresses("3kg");

		});
		$$("#sixkggas").on("click", function(){

			showNylon();
			loadMyAddresses("6kg");

		});

		$$("#twelvepointfivekggas").on("click", function(){

			showNylon();
			loadMyAddresses("12.5kg");

		});

		$$("#twentyfivekggas").on("click", function(){

			showNylon();
			loadMyAddresses("25kg");

		});

		$$("#fiftykggas").on("click", function(){

			showNylon();
			loadMyAddresses("50kg");

		});





		function loadMyAddresses(cylinderSize){
		
		//populate buyers addresses
		$$.getJSON("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/address_fetcher_2.php", 
			{"users_phone" : window.localStorage.getItem("_cydene_user_phone_no")}, 
		
		function(data){
			hideNylon();
			var django = data;
			var addrPack = "";
			for(b in django){

				addrPack += "<input type='radio' name='address_selected' class='address-pointer' value='" + django[b] + "'> " + django[b] + "<br>";
			}

			hideNylon();
			myApp.modal({
				title : "Pick delivery Address",
				text : addrPack,
				buttons : [
					{ text : "<span class='color-orange'>Cancel</span>", bold : true },
					{ text : "<span class='color-indigo'>Continue</span>", bold : true,
						onClick : function(){
							addressPicker(cylinderSize);
						}
					}]
		});

		}, 

		function(data){

			toast.show("Unable to connect to Cydene Servers. Try again later.");

		});

	}




		function addressPicker(gasCylinderSize){
			showNylon();

		
			var delivery_address = $$(".address-pointer").filter(function(){return $$(this).prop("checked");}).val();
			
					var uniqPurchase = {
						"gasSize" : gasCylinderSize,
						"gasQty" : 5,
						"delivery_address" : delivery_address 
					}
			window.localStorage.setItem("uniqPurchase", JSON.stringify(uniqPurchase));

			if($$("#schedule-switch").prop("checked") == true)
			{

				runScheduledTransaction();
			}
			else{

				hideNylon();
				mainView.router.loadPage("sellers.html");
			}


		}










		if(!window.localStorage.getItem("version_control")){


			window.localStorage.setItem("version_control", "1.0.4");
		}
		

		var mycurrentVersion = window.localStorage.getItem("version_control");

		//code to check for update version of the app
		$$.get("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/version_control.php", function(datax){

				if(datax !== mycurrentVersion){

					myApp.modal({
					title : 'Cydene Express',
					text : 'A new update is available for Cydene Express.<br> v' + datax,
					buttons : [
						{
							text : '<span class=color-orange>Not Now</span>',
							bold : true,
							onClick : function(){
								exitMyApp();
							}
						},
						{
							text : '<span class=color-indigo>Update App</span>',
							bold : true,
							onClick : function(){

								/* OPEN PLAY STORE */
							}	

						}
					]
					
					}); 

				}

		});




});

/**********************Dashboard****************/











/**********************Schedule Bookings****************/
myApp.onPageInit('schedulebooking', function(page){


	$$("#buyers-name").text(window.localStorage.getItem("buyerFN"));
		$$.getJSON("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/address_fetcher_2.php", 
			{"users_phone" : window.localStorage.getItem("_cydene_user_phone_no")}, 
		
		function(data){
			hideNylon();
			var django = data;
			var addrPack = "";
			for(b in django){

				addrPack += "<input type='radio' name='address_selected' class='address-pointer' value='" + django[b] + "'> " + django[b] + "<br>";
			}

			$$("#populate-schedule-address").html(addrPack);
		
		}, 

		function(data){

			toast.show("Unable to connect to Cydene Servers. Try again later.");

		});






		$$("#create-booking").click(function(){

			runScheduledTransaction();
		})






		function runScheduledTransaction(){

			var theRecurrDate = $$("#delivery-date").val();
			var theBuyer = window.localStorage.getItem("_cydene_user_phone_no");
			var scheduleDeliveryAddress = $$(".address-pointer").filter(function(){return $$(this).prop("checked");}).val();
			var theGasSize = $$("#cylinder-size-store").val();
			var theGasQty = $$("#cylinder-quantity").val();

			$$.post("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/schedule_transaction_recorder.php", 
							
					{
						"the_cylinder_size" : theGasSize,
						"the_quantity" : theGasQty,
						"the_recurr_date" : theRecurrDate,
						"the_buyer" : theBuyer,
						"the_delivery_address" : scheduleDeliveryAddress
					},

							function(data){
								hideNylon();
								if(data == "Successful"){
										toast.show("Schedule Booking Created.");
										mainView.router.loadPage("orderhistory.html");
									}
										else{

											toast.show(data);
										}


							}, function(){

								toast.show("Unable to connect to Cydene Servers. Please try later");

							});
			}



			$$("#fivekggas-schedule").click(function(){

				toast.show("5kg selected. Add delivery address, delivery date and quantity");
				$$("#cylinder-size-store").val("5kg");

			})


			$$("#threekggas-schedule").click(function(){

				toast.show("3kg selected. Add delivery address, delivery date and quantity");
				$$("#cylinder-size-store").val("3kg");

			})


			$$("#sixkggas-schedule").click(function(){

				toast.show("6kg selected. Add delivery address, delivery date and quantity");
				$$("#cylinder-size-store").val("6kg");

			})

			$$("#twelvepointfivekggas-schedule").click(function(){

				toast.show("12.5kg selected. Add delivery address, delivery date and quantity");
				$$("#cylinder-size-store").val("12.5kg");

			})

			$$("#twentyfivekggas-schedule").click(function(){

				toast.show("25kg selected. Add delivery address, delivery date and quantity");
				$$("#cylinder-size-store").val("25kg");

			})

			$$("#fiftykggas-schedule").click(function(){

				toast.show("50kg selected. Add delivery address, delivery date and quantity");
				$$("#cylinder-size-store").val("50kg");

			})
					           
					

						myApp.calendar({

							input : "#delivery-date",
							yearPicker : false,
							monthPicker : false,
							cssClass : "theme-indigo",
							dateFormat: "yyyy-mm-dd"

						});





});
/**********************Schedule Bookings****************/









/**********************Sellers*****************/
var buyFromThisSeller, getBuyQty;
	myApp.onPageInit('sellers', function(page){

	var selectedPurchases = JSON.parse(window.localStorage.getItem("uniqPurchase"));
	var postedCylinderSize = selectedPurchases.gasSize;
	var theBuyerDeliveryAddress = selectedPurchases.delivery_address;
	showNylon();


	var arrangeMyLat = [];
						
					function pushMap(){

					hideNylon();
					toast.show("Pick a supplier from the map");
					var locations = JSON.parse(window.localStorage.getItem("returnJson"));

					  var themArray = [];
					  for(var x in locations){
							themArray.push(locations[x]);

					  }

					  console.log(themArray);

					  var infowindow = new google.maps.InfoWindow();

					var mapOptions = {
				        center: new google.maps.LatLng(6.5244, 3.3792),
				        zoom: 10,
				        mapTypeId: google.maps.MapTypeId.ROADMAP
				    	};

				    map = new google.maps.Map(document.getElementById("sellers-map"), mapOptions);



					
				    	
				    var image = {
				    	url : "http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/imgs/cylinder_yellow.png",
				    	scaledSize: new google.maps.Size(15, 50)
				    }


				    var homeImage = {
				    	url : "http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/imgs/home_4.png",
				    	scaledSize: new google.maps.Size(30, 50)
				    }

				    
				   

				   var jason = new google.maps.Marker({
						        position : new google.maps.LatLng(arrangeMyLat[0], arrangeMyLat[1]),
						        map: map,
						        icon : homeImage
						        
					      });

				   jason.addListener('click', function(){

			   			infowindow.setContent("<div class='text-center'>My Delivery Address<br>" + arrangeMyLat[2] + "</div>");
					    infowindow.open(map, jason);

				   })

				   
				     
				     var marker, i;

				    for (i = 0; i < themArray.length; i++) {  

						    marker = new google.maps.Marker({
						        position : new google.maps.LatLng(themArray[i][1], themArray[i][2]),
						        map: map,
						        icon : image
						        
					      });

						   google.maps.event.addListener(marker, 'click', (function(marker, i) {
						        return function() {
						          infowindow.setContent(themArray[i][0]);
						          infowindow.open(map, marker);
						        }
						      })(marker, i));

						}




					}




		$$.getJSON("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/find_sellers.php", {"posted_cylinder_size" : postedCylinderSize}, function(data){

			window.localStorage.setItem("returnJson", JSON.stringify(data));
			//Get address details from addressname
				$$.getJSON("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/get_address_details_from_name.php", 
				{
					"the_address_name" : theBuyerDeliveryAddress,
					"the_buyer" : window.localStorage.getItem("_cydene_user_phone_no")
				},
					function(data){
						
						
						for(vv in data){

							arrangeMyLat.push(data[vv]);
						}
						console.log(arrangeMyLat);
						window.setTimeout(function(){ pushMap(); }, 2000);
						

					}, function(){
						toast.show("Unable to fetch your address geocode");
				});



		}, function(){

				toast.show("Error occured, try again later");
		});
						
					


		getBuyQty = function(SellerID, CylinderSize){


				    myApp.prompt('How many Cylinders?', function (val) {

				    	val = parseInt(val);
				        
				    		if(Number.isInteger(val) == false){

				    			toast.show("Please enter a valid number");
				    		}
				    		else{

				    			var merry = {

				    				"gasSize" : postedCylinderSize,
				    				"gasQty" : val,
				    				"delivery_address" : theBuyerDeliveryAddress
				    			}

				    			storeNewPurchase = JSON.stringify(merry);
				    			window.localStorage.setItem("uniqPurchase", storeNewPurchase);

				    			buyFromThisSeller(SellerID, CylinderSize);
				    			
				    		}
				    });
				
		}





		buyFromThisSeller = function(theSellerID, theCylinderSize){
			showNylon();

			$$.getJSON("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/fetch_seller_details.php", {"seller_id" : theSellerID, "cylinder_size" : theCylinderSize}, function(data){

					console.log(data);
					var stringData = JSON.stringify(data);
					window.localStorage.setItem("full_seller_details", stringData);
					hideNylon();
					mainView.router.loadPage("sellerdetails.html");
					
				}, function(){

						hideNylon();
						toast.show("Error processing trnsaction. Network Error");
				});


			}




window.localStorage.removeItem("discounted_price");
window.localStorage.removeItem("coupon_details");

	});


/**********************Sellers*****************/













/**********************Seller Details*****************/

myApp.onPageInit('sellerdetails', function(page){


var splitSellerDetails = JSON.parse(window.localStorage.getItem("full_seller_details"));
var splitBuyDetails = JSON.parse(window.localStorage.getItem("uniqPurchase"));
var couponDetails = JSON.parse(window.localStorage.getItem("coupon_details"));


		$$(".populate-sellers-name").html(splitSellerDetails.seller_details_name);
		$$(".populate-sellers-logo").attr("src", "http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/imgs/" + splitSellerDetails.seller_details_logo);
		$$(".populate-sellers-address").html(splitSellerDetails.seller_details_address);
		$$(".quote-size").html(splitBuyDetails.gasSize + " (<strike>N</strike>" + splitSellerDetails.cylinder_size_price + ")" );
		$$(".quote-qty").html(splitBuyDetails.gasQty);

		if(couponDetails){

			var couponValue = couponDetails.coupon_value;
			$$("#coupon-highlight").html(couponValue + "% Discount Applied!").show();
		}
		else{

			$$("#coupon-highlight").hide();
		}

		var totalPrice, totalPricePlusCharge;

		if(window.localStorage.getItem("discounted_price")){

			var discountedPrice = window.localStorage.getItem("discounted_price");
			totalPricePlusCharge = parseInt(discountedPrice);
		}
		else{

			totalPrice = splitSellerDetails.cylinder_size_price * splitBuyDetails.gasQty;
			totalPricePlusCharge = totalPrice + 150;
			window.localStorage.setItem("original_total_price", totalPricePlusCharge);

		}
		totalPricePlusCharge = parseInt(totalPricePlusCharge);



		$$(".quote-total-price").html("<strike>N</strike>" + splitSellerDetails.cylinder_size_price * splitBuyDetails.gasQty);
		$$("#payment-btn").html("Pay <strike>N</strike>" + totalPricePlusCharge);




		$$("#apply-coupon").click(function(){
			couponSN = 25;

					myApp.prompt('Enter Coupon Code', 'Cydene Coupons!', function (value) {
       					 
       					 showNylon();
       					 $$.getJSON("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/coupon_code_validator.php",
								 {
								 	coupon_user : window.localStorage.getItem('_cydene_user_phone_no'),
								 	coupon_code : value
								 },
								function(data){

										hideNylon();
										console.log(data);

										if(data.status == "Coupon Code Invalid or Expired" || data.status == "You have made use of this coupon code once"){

											toast.show(data.status);
										}
										else{
											
											if(window.localStorage.getItem("discounted_price")){

														toast.show("Coupon can be applied once.");
												}
												else{

													discountedPrice = totalPricePlusCharge - ((data.coupon_value / 100) * totalPricePlusCharge);
													discountedPrice = parseInt(discountedPrice);
													window.localStorage.setItem("discounted_price", discountedPrice);
														var couponDetails = {

															"coupon_sn" : data.coupon_sn,
															"coupon_value" : data.coupon_value
														}
														window.localStorage.setItem("coupon_details", JSON.stringify(couponDetails));
														mainView.router.reloadPage("sellerdetails.html");
														toast.show("Coupon applied!");
												}

										}

								},
								function(){
										
										hideNylon();
										toast.show("Unable to check coupon code!");
								});
										

    				},

    				function(){
    					
    					toast.show("No Coupon applied.");

    				});
		



		});






			




	
		$$("#payment-btn").click(function(){
		var paymentMethod = $$("input[name='payment_method']:checked").val();
		var dynamicCoupon;
		if(couponDetails){

			dynamicCoupon = couponDetails.coupon_sn;
		}
		else{

			dynamicCoupon = 0;
		}

			
				showNylon();
				
				var deliver2Address =  splitBuyDetails.delivery_address;
			
				if(paymentMethod == "COD"){

					$$.post("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/transaction_recorder.php", 

					{

						"tnx_cylinder_size" : splitBuyDetails.gasSize,
						"tnx_quantity" : splitBuyDetails.gasQty,
						"tnx_total_price" : totalPricePlusCharge,
						"tnx_buyer" : window.localStorage.getItem("_cydene_user_phone_no"),
						"tnx_seller" : splitSellerDetails.seller_details_id,
						"tnx_payment_method" : "COD",
						"tnx_delivery_address" : deliver2Address,
						"tnx_coupon_sn" : dynamicCoupon
					}, 

					function(data){
					if(data == "Successful"){
							
							hideNylon();
							mainView.router.loadPage("orderhistory.html");
							toast.show("Order Created! Delivery on its way!");

						}
						else{

							hideNylon();
							toast.show("Could not place order try again later.");
						}

					}, function(){
						hideNylon();
						toast.show("An error has occured. Network Error");
					});
				}


				else if(paymentMethod == "Wallet"){

						hideNylon();
						mainView.router.loadPage("pinexec.html");
					
				}

				else{
					
					hideNylon();
					window.localStorage.setItem("tnx_delivery_address", deliver2Address);
					mainView.router.loadPage("cardpayment.html");
				}

		});




	//Pull seller ratings
	var ratingData = splitSellerDetails.this_seller_ratings;
	

		 	var theRatingsDesign;
		 	var zeroStar = "<i class='material-icons'>star_border</i> <i class='material-icons'>star_border</i> <i class='material-icons'>star_border</i> <i class='material-icons'>star_border</i> <i class='material-icons'>star_border</i>";
		 	var oneStar = "<i class='material-icons color-amber'>star_border</i> <i class='material-icons'>star_border</i> <i class='material-icons'>star_border</i> <i class='material-icons'>star_border</i> <i class='material-icons'>star_border</i>";
		 	var twoStar = "<i class='material-icons color-amber'>star_border</i> <i class='material-icons color-amber'>star_border</i> <i class='material-icons'>star_border</i> <i class='material-icons'>star_border</i> <i class='material-icons'>star_border</i>";
		 	var threeStar = "<i class='material-icons color-amber'>star_border</i> <i class='material-icons color-amber'>star_border</i> <i class='material-icons color-amber'>star_border</i> <i class='material-icons'>star_border</i> <i class='material-icons'>star_border</i>";
		 	var fourStar = "<i class='material-icons color-amber'>star_border</i> <i class='material-icons color-amber'>star_border</i> <i class='material-icons color-amber'>star_border</i> <i class='material-icons color-amber'>star_border</i> <i class='material-icons'>star_border</i>";
		 	var fiveStar = "<i class='material-icons color-amber'>star_border</i> <i class='material-icons color-amber'>star_border</i> <i class='material-icons color-amber'>star_border</i> <i class='material-icons color-amber'>star_border</i> <i class='material-icons color-amber'>star_border</i>";

		 	switch(parseInt(ratingData)){
		 		case 0 : theRatingsDesign = zeroStar; break;
		 		case 1 : theRatingsDesign = oneStar; break;
		 		case 2 : theRatingsDesign = twoStar; break;
		 		case 3 : theRatingsDesign = threeStar; break;
		 		case 4 : theRatingsDesign = fourStar; break;
		 		default : theRatingsDesign = fiveStar;
		 	}

		 	$$(".ratings-container").html(theRatingsDesign);
		





});

/**********************Sellers Details*****************/










/**********************PIN exec*****************/

myApp.onPageInit('pinexec', function(page){

		var splitSellerDetails = JSON.parse(window.localStorage.getItem("full_seller_details"));
		var splitBuyDetails = JSON.parse(window.localStorage.getItem("uniqPurchase"));
		var parsedCouponDetails = JSON.parse(window.localStorage.getItem("coupon_details"));
		
				
		if(window.localStorage.getItem("discounted_price")){

			totalPrice = window.localStorage.getItem("discounted_price");
			initialPrice = window.localStorage.getItem("original_total_price");
			parsedCouponSN = parsedCouponDetails.coupon_sn;
		}
		else{

			totalPrice = window.localStorage.getItem("original_total_price");
			parsedCouponSN = 0;
	 	}
		

		$$("#show-amount").html("<strike>N</strike>" + totalPrice);


		
		$$("#exec-pin").on("keyup", function(){
				
				var pinLength = $$(this).val().length;
				if(pinLength == 4){

					$$("#exec-arrow").css("display", "flex");
				}

			});


		$$("#exec-arrow").click(function(){
			
			showNylon();
			$$.post("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/validate_exec_pin.php", 
				{
					"exec_pin" : $$("#exec-pin").val(),
					"user_phone" :  window.localStorage.getItem("_cydene_user_phone_no")
				},

			 function(data){
					if(data === "PIN Match"){

					 	
							var splitBuyDetails = JSON.parse(window.localStorage.getItem("uniqPurchase"));
				 			var splitSellerDetails = JSON.parse(window.localStorage.getItem("full_seller_details"));
				 			var tranxFields = window.localStorage.getItem("tnx_fields");
					 		$$.post("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/transaction_recorder.php", 

							{

								"tnx_cylinder_size" : splitBuyDetails.gasSize,
								"tnx_quantity" : splitBuyDetails.gasQty,
								"tnx_total_price" : totalPrice,
								"tnx_buyer" : window.localStorage.getItem("_cydene_user_phone_no"),
								"tnx_seller" : splitSellerDetails.seller_details_id,
								"tnx_payment_method" : "Wallet",
								"tnx_delivery_address" : window.localStorage.getItem("tnx_delivery_address"),
								"tnx_coupon_sn" : parsedCouponSN
								
							}, 

							function(data){
										hideNylon();
										
										if(data == "Successful"){

											hideNylon();
								 			mainView.router.loadPage("orderhistory.html");
								 			toast.show("Order Created! Delivery on its way!");
									 	}

									 		else{

									 				hideNylon();
										 			toast.show(data);
									 		}

									 	},

						 	function(){
									
									toast.show("Network Error. Please try again later");
					 		});

						}



					
					else{
						hideNylon();
						toast.show("Wrong PIN");
					}

			}, function(data){

				hideNylon();
			 	toast.show("Network Error. Please try again later");

			});// End of validate PIN script


		

		}); // end of onclick event.






});

/**********************PIN exec*****************/

















/*********************MapExp********************/

myApp.onPageInit('mapexp', function(page){

	 var mapOptions = {
		        center: new google.maps.LatLng(6.5244, 3.3792),
		        zoom: 15,
		        mapTypeId: google.maps.MapTypeId.ROADMAP
		    };

		    map = new google.maps.Map
		    (document.getElementById("map"), mapOptions);

		    initAutoComplete();

	
	

	

	function initAutoComplete(){

	var input = document.getElementById('searchTextField');
	var options = {
		  types: ['address'],
		  componentRestrictions: {country: 'ng'}
		};

	autocomplete = new google.maps.places.Autocomplete(input, options);
}


	

	

	$$("#save-address-btn").on("click", function(){

		showNylon();

		var theDeliveryAddress =  $$("#searchTextField").val();

		  var geocoder = new google.maps.Geocoder();
		    geocoder.geocode( { 'address': theDeliveryAddress}, function(results, status) {
		      if (status == 'OK') {
		        
		        hideNylon();
		        theAddressLatLng = results[0].geometry.location;
		        

		        var theAddressLat = theAddressLatLng.lat();
		        var theAddressLng = theAddressLatLng.lng();

		       
		       

		$$.post("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/save_delivery_address.php",
						{
							the_users_phone : window.localStorage.getItem("_cydene_user_phone_no"),
							the_address_name : $$("#the-address-name").val(),
							the_delivery_address : theDeliveryAddress,
							the_address_Lat: theAddressLat,
							the_address_Lng: theAddressLng
						},
						function(data){
							hideNylon();
							console.log(data);
							
							if(data == "Save Successful"){
								toast.show(data);
								hideNylon();
								mainView.router.loadPage("addresseslist.html");
							}
							else{
								toast.show(data);
								hideNylon();
					
							}
							
						}, function(){

							 hideNylon();
							toast.show("Unable to connect to Cydene Servers.");

						});

				} else {

						 hideNylon();
				        toast.show('Unable to Geocode your Address. Please try again later');
				  }


		    });

	});
	



	


}); // Map Exp Page









var cancelScheduleOrder, cancelOrder, orderComplete;

myApp.onPageInit('orderhistory', function(page){
    
    

	$$.get("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/pull_order_history.php", 
	{
		"the_buyer" : window.localStorage.getItem("_cydene_user_phone_no")
	},
	 function(data){

	 	$$(".populate-regular-history").html(data);
	},

	function(){

        toast.show(status);

	});




	$$.get("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/pull_scheduled_order_history.php", 
	{
		"the_buyer" : window.localStorage.getItem("_cydene_user_phone_no")
	},
	 function(data){

	 	$$(".populate-scheduled-history").html(data);
	},

	function(){

        toast.show("Unable to connect to Cydene Servers");

	});




	$$.get("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/pull_active_orders.php", 
	{
		"the_buyer" : window.localStorage.getItem("_cydene_user_phone_no")
	},
	 function(data){

	 	$$(".populate-active-orders").html(data);
	},

	function(){

        toast.show("Unable to connect to Cydene Servers");

	});






	orderComplete = function(tranxID, theSellerSN){

	window.localStorage.setItem("seller_2_rate", theSellerSN);
	showNylon();	

	$$.post("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/transaction_complete.php", 
	{
		"tranx_id" : tranxID
	},
	 function(data){

	 	hideNylon();
	 	if(data == "update success"){

	 		mainView.router.loadPage("rateorder.html");
	 	}
	 	else{

	 		toast.show("Error completing order, try later");
	 	}
	 	
	},

	function(){

		hideNylon();
        toast.show("Cannot reach Cydene Express servers, try again later");

	});

}






	cancelScheduleOrder = function(tranxSN){

	showNylon();	
	$$.post("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/cancel_scheduled_order.php", 
	{
		"order_sn" : tranxSN
	},
	 function(data){

	 	hideNylon();
	 	if(data == "delete success"){

	 		mainView.router.reloadPage("orderhistory.html");
	 	}
	 	else{

	 		toast.show("Error cancelling order, try later");
	 	}
	},

	function(xhr, status, error){

		hideNylon();
        toast.show("Cannot reach Cydene Express servers, try again later");

	});

}







cancelOrder = function(tranxSN, tranxPaymentType){

if(tranxPaymentType == "Wallet")
{
	myApp.modal({

				title : 'Cydene Express',
				text : 'A cancellation fee of NGN250 will take effect?',
				buttons : [
					{
						text : '<span class=color-orange>No</span>',
						bold : true,
						
					},
					{
						text : '<span class=color-indigo>Continue</span>',
						bold : true,
						onClick : function(){ 
							
							cancelMyOrder(tranxSN, "Wallet");
						}	
					}
				]

			});
}


else if(tranxPaymentType == "Card")
{
	myApp.modal({

				title : 'Cydene Express',
				text : 'A cancellation fee of NGN250 will take effect?',
				buttons : [
					{
						text : '<span class=color-orange>No</span>',
						bold : true,
						
					},
					{
						text : '<span class=color-indigo>Continue</span>',
						bold : true,
						onClick : function(){ 
							
							cancelMyOrder(tranxSN, "Card");
						}	
					}
				]

			});
}


else{

	cancelMyOrder(tranxSN, "COD");
}

	function cancelMyOrder(tranxSN, paymentMethod){



			showNylon();
			$$.post("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/cancel_order.php", 
			{
				"order_sn" : tranxSN,
				"tnx_owner" : window.localStorage.getItem("_cydene_user_phone_no"),
				"tnx_payment_method" : paymentMethod
			},
			 function(data){

			 	hideNylon();
			 	if(data == "cancel success"){

			 		mainView.router.reloadPage("orderhistory.html");
			 	}
			 	else{

			 		toast.show("Error cancelling order, try later");
			 	}
			},

			function(xhr, status, error){

				hideNylon();
		        toast.show("Cannot reach Cydene Express servers, try again later");

			});




}
}





}); //orderhistory page














myApp.onPageInit('settings', function(page){


	var nomenclature = window.localStorage.getItem("buyerFN") + " " + window.localStorage.getItem("buyerLN");
	var mailclature = window.localStorage.getItem("buyerMail");
	$$("#namespace").html(nomenclature);
	$$("#mailspace").html(mailclature);

	var user_phone_data = window.localStorage.getItem("_cydene_user_phone_no");
	$$("#phonespace").html(user_phone_data);

	$$.post("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/fetch_wallet_balance.php",
	{
		"user_phone_data" : user_phone_data
	},
	 function(data){

	 	$$(".wallet-balance").html("<strike>N</strike>" + data);

	 }, function(){

	 		toast.show("Could not connect to Cydene servers");
	 });
	

	$$("#start-emergency-call").on("click", function(){

		document.location.href = "tel:+2349081115555";

	});


	$$("#logout-app").on("click", function(){

		showNylon();

		function pushLogout(){

				window.localStorage.removeItem("_cydene_user_phone_no");
				window.localStorage.removeItem("_cydene_welcome_msg");
				window.localStorage.removeItem("buyerFN");
				window.localStorage.removeItem("buyerLN");
				window.localStorage.removeItem("buyerMail");
				window.localStorage.removeItem("uniqPurchase");
				window.localStorage.removeItem("full_seller_details");
				window.localStorage.removeItem("tnx_delivery_address");
				window.localStorage.removeItem("original_total_price");
				window.localStorage.removeItem("discounted_price");

				hideNylon();
				toast.show("Logged Out!");
				mainView.router.loadPage("theswipe.html");
		}

		window.setTimeout(function(){pushLogout()}, 3000);


	});

});

//Settings Page











myApp.onPageInit('addoldpin', function(page){ // Add old PIN Page

	$$("#user_pin_phone").val(window.localStorage.getItem("_cydene_user_phone_no"));


$$("#current_user_pin").on("keyup", function(){
		
		var currentUserPin = $$(this).val();
		

		if(currentUserPin.length === 4){

				$$("#set_current_pin_arrow").show().css("display", "flex");
		}

		else{

			$$("#set_current_pin_arrow").hide();		
		}


	});






	$$('#set_current_pin_arrow').on('click', function(e){

					$$('form.set_current_pin').trigger('submit');

			});


				$$('form.set_current_pin').on('form:beforesend', function (e) {
					  showNylon();
					  
				});
				

				$$('form.set_current_pin').on('form:error', function (e) {
					  
						hideNylon();
						toast.show("An error has occured, try again later");

					});
							

				$$('form.set_current_pin').on('form:success', function (e) {
					  var xhr = e.detail.xhr; // actual XHR object
					 
					  var data = e.detail.data; // Ajax response from action file
					  if(data == "PIN Match"){
					  		hideNylon();
					  		mainView.router.loadPage("setnewpin.html");
					  }
					  else{

					  		hideNylon();
					  		toast.show(data);
					  }
					
					
					

					});






}); // Add old PIN Page











myApp.onPageInit('setnewpin', function(page){ // Set New PIN Page



	$$("#user_new_pin_phone").val(window.localStorage.getItem("_cydene_user_phone_no"));



	$$("#user_new_pin_confirm").on("keyup", function(){
		
		var userNewPin = $$("#user_new_pin").val();
		var userNewPinConfirm = $$(this).val();

		if(userNewPin === userNewPinConfirm && userNewPin.length === 4 && userNewPinConfirm.length === 4){

				$$("#set_new_pin_arrow").show().css("display", "flex");
		}

		else{

			$$("#set_new_pin_arrow").hide();		
		}


	});






	$$('#set_new_pin_arrow').on('click', function(e){

					$$('form#set_new_pin').trigger('submit');


			});


				$$('form#set_new_pin').on('form:beforesend', function (e) {
					  showNylon();
					  
				});
				

				$$('form#set_new_pin').on('form:error', function (e) {
					  
						hideNylon();
						toast.show("An error has occured, try again later");

					});
							

				$$('form#set_new_pin').on('form:success', function (e) {
						  
						  var xhr = e.detail.xhr; // actual XHR object
						  var data = e.detail.data; // Ajax response from action file
						  if(data == "PIN Saved"){

						  		hideNylon();
						  		toast.show("Pin Changed.");
						  		mainView.router.loadPage("settings.html");
						  }
						  else{

								hideNylon();
						  		toast.show(data);
						  }
					
				});




});






var deleteAddr, editAddr;
myApp.onPageInit('addresseslist', function(page){ // Address List

	var users_phone = window.localStorage.getItem("_cydene_user_phone_no");
	

		$$.get("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/list_addresses.php", 
		{

			"users_phone" : users_phone

		},
		function(data){

			$$(".address-list").html(data);
		},

		function(){

				toast.show("could not get data from Cydene servers")
		});






	deleteAddr = function(addrSN){

	showNylon();	
	$$.post("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/delete_address.php", 
	{
		"address_sn" : addrSN
	},
	 function(data){

	 	hideNylon();
	 	
	 	if(data == "delete success"){

	 		toast.show(data);
	 		mainView.router.reloadPage("addresseslist.html");
	 	}
	 	else{

	 		toast.show(data);
	 	}
	},

	function(xhr, status, error){

		hideNylon();
        toast.show("Cannot reach Cydene Express servers, try again later");

	});

}





	editAddr = function(addrSN, addrName, addrFull){


		var patchAddr = {

			"addrSN" : addrSN,
			"addrName" : addrName,
			"addrFull" : addrFull
		}
		
		window.localStorage.setItem("current_address_edit", JSON.stringify(patchAddr));
		mainView.router.loadPage("editaddress.html");
	}



}); //Address List

















myApp.onPageInit('editaddress', function(page){ // edit address page

	
		 var mapOptions = {
        center: new google.maps.LatLng(6.5244, 3.3792),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map
    (document.getElementById("map"), mapOptions);
 

    initAutoComplete();







	function initAutoComplete(){

	var input = document.getElementById('searchTextFieldEdit');
	var options = {
		  types: ['address'],
		  componentRestrictions: {country: 'ng'}
		};

	autocomplete = new google.maps.places.Autocomplete(input, options);
}




	
var thePatchAddr = JSON.parse(window.localStorage.getItem("current_address_edit"));
var patchAddrName = thePatchAddr.addrName;
var patchAddrFull = thePatchAddr.addrFull;
var patchAddrSN = thePatchAddr.addrSN;


$$("#the-address-name-edit").val(patchAddrName);
$$("#searchTextFieldEdit").val(patchAddrFull);
$$("#edit-address-id").val(patchAddrSN);







	$$("#save-edit-address-btn").on("click", function(){
		showNylon();


		var geocoder = new google.maps.Geocoder();
		    geocoder.geocode( { 'address': $$("#searchTextFieldEdit").val()}, function(results, status) {
		      if (status == 'OK') {
		        
		       theAddressLatLng = results[0].geometry.location;
		        var theAddressLat = theAddressLatLng.lat();
		        var theAddressLng = theAddressLatLng.lng();
		      

				 $$.post("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/update_delivery_address.php",
				{
							the_address_sn : $$("#edit-address-id").val(),
							the_address_name : $$("#the-address-name-edit").val(),
							the_delivery_address : $$("#searchTextFieldEdit").val(),
							the_address_latitude : theAddressLat,
							the_address_longitude : theAddressLng
				},
		 function(data){
			hideNylon();
			
			
			if(data == "Update Successful"){
				
				hideNylon();
				toast.show(data);
				mainView.router.loadPage("addresseslist.html");

			}
			else{

				toast.show(data)

			}
			
		});

		}

		else{

			hideNylon();
			toast.show("Google could not geocode address. Select an address from dropdown");
		}




	}); //End of geocoder function if okay

	}); //End of on click function






}); // Edit address page












myApp.onPageInit('wallet', function(page){ // Wallet page


	var user_phone_data = window.localStorage.getItem("_cydene_user_phone_no");

	$$.post("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/fetch_wallet_balance.php",
	{
		"user_phone_data" : user_phone_data
	},
	 function(data){

	 	$$(".wallet-balance").html("<strike>N</strike>" + data);

	 }, function(){

	 		toast.show("Could not connect to Cydene servers");
	 });


	$$("#add-money-2-wallet").on("click", function(){

		showNylon();
		var amount2Add = $$("#the-amount-2-add").val();

		$$.post("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/add_money_2_wallet_transaction.php",
		{
			"amount_2_add" : amount2Add,
			"user_phone_data" : user_phone_data
		},
		 function(data){

		 	console.log(data);

		var splitData = data.split(' ');
		var returnedTnx = splitData[0];

			if(splitData[1] == "Successful"){

				$$.post("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/paystack_init.php",
					{
						"buyer_email" : window.localStorage.getItem("buyerMail"),
						"amount_2_pay" : amount2Add * 100,
						"tnx_reference" : returnedTnx
					},
					 function(data){

					 	hideNylon();
					 	
					 	var parsedData = JSON.parse(data);
					 	var authUrl = parsedData.data.authorization_url;
					 	fireUpPayments2(authUrl, returnedTnx);
					 	console.log(data);	 	

					 }, function(){

					 		toast.show("Unable to connect to Cydene servers");
					 });

				
			}
			else{

				hideNylon();
				toast.show(data);
			}
	},

	 function(){
	 	hideNylon();
		console.log("Unable to connect to Cydene servers");
	});


	});


}); // Wallet page







myApp.onPageInit('sellerwallet', function(page){ // Wallet page


	var user_phone_data = window.localStorage.getItem("_cydene_user_phone_no");

	$$.post("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/fetch_seller_wallet_balance.php",
	{
		"user_phone_data" : user_phone_data
	},
	 function(data){

	 	$$(".wallet-balance").html("<strike>N</strike>" + data);

	 }, function(){

	 		toast.show("Could not connect to Cydene servers");
	 });






	$$("#request-payout-btn").on("click", function(){
		var thePayoutAmount = $$("#payout-amount").val();

			showNylon();

			$$.post("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/request_seller_payout.php",
					{
						"user_phone_data" : user_phone_data,
						"payout_amount" : thePayoutAmount
					},
					 function(data){
					 	if(data == "Payout Updated"){
					 		
					 		hideNylon();
					 		mainView.router.loadPage("payoutsuccess.html");

					 	}

					 	else{

					 			hideNylon();
					 			toast.show(data);
					 	}
					 	


					 }, function(){
					 		hideNylon();
					 		toast.show("Could not connect to Cydene servers");
					 });
							


	});


	


}); // Wallet page









myApp.onPageInit('editprofile', function(page){ // Edit Profile page


	var users_phone = window.localStorage.getItem("_cydene_user_phone_no");
	var users_fn = window.localStorage.getItem("buyerFN");
	var users_ln = window.localStorage.getItem("buyerLN");
	var users_mail = window.localStorage.getItem("buyerMail");


	$$("#edit-user-first-name").val(users_fn);
	$$("#edit-user-last-name").val(users_ln);
	$$("#edit-user-mail").val(users_mail);
	$$("#edit-user-phone").val(users_phone);

	
	$$("#profile-edit-btn").on("click", function(x){

			x.preventDefault();
			showNylon();
			$$.post("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/user_profile_update.php", 
			{

				"user_phone_number" : users_phone,
				"user_edit_first_name" : $$("#edit-user-first-name").val(),
				"user_edit_last_name" : $$("#edit-user-last-name").val()
			},
			function(data){

				if(data == "Save Successful"){

					window.localStorage.setItem("buyerFN", $$("#edit-user-first-name").val());
					window.localStorage.setItem("buyerLN", $$("#edit-user-last-name").val());
					hideNylon();
					toast.show("Profile Updated");
					mainView.router.loadPage("settings.html");
				}
				else{

					toast.show(data);
				}
			},
			function(){

				toast.show("Error Saving Data");

			});

	});


});








myApp.onPageInit('about', function(page){ //About page


	console.log("About page is here.");

	$$("#open-cydene-website").on("click", function(){

		window.open("http://cydene.com");
	});
	

		$$("#open-cydene-facebook").on("click", function(){

			window.open("http://facebook.com/cydene");
	});
	

}); //About Page






myApp.onPageInit('offers', function(page){ //Offers page


	$$.post("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/fetch_offers.php",
	 function(data){

	 	$$(".populate-offers").html(data).removeClass('text-center');

	 }, function(){

	 		toast.show("No coupon available yet");

	 	});

}); //Offers Page











myApp.onPageInit('walletstatement', function(page){ //Offers page

	var users_phone = window.localStorage.getItem("_cydene_user_phone_no");

	$$.post("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/fetch_wallet_statement.php",
	{
		"the_buyer" : users_phone
	}
	,
	 function(data){

	 	$$(".populate-wallet-statement").html(data);

	 }, function(){

	 		toast.show("Could not connect to Cydene servers. Try again later");
	 });







}); //Offers Page






















myApp.onPageInit('sellerdashboard', function(page){ //Offers page

	$$("#seller-name-space").html(window.localStorage.getItem("sellerName"));
	var sellerLogo = window.localStorage.getItem("sellerLogo");
	$$("#seller-logo-space").attr("src", "http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/imgs/" + sellerLogo);

	if(!window.localStorage.getItem("version_control")){


			window.localStorage.setItem("version_control", "1.0.4");
		}


	var mycurrentVersion = window.localStorage.getItem("version_control");

		//code to check for update version of the app
		$$.get("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/version_control.php", function(datax){

				if(datax !== mycurrentVersion){

					myApp.modal({
					title : 'Cydene Express',
					text : 'A new update is available for Cydene Express.<br> v' + datax,
					buttons : [
						{
							text : '<span class=color-orange>Not Now</span>',
							bold : true,
							onClick : function(){
								exitMyApp();
							}
						},
						{
							text : '<span class=color-indigo>Update App</span>',
							bold : true,
							onClick : function(){

								/* OPEN PLAY STORE */
							}	

						}
					]
					
					}); 

				}

		});




		$$.post("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/seller_get_verification_status.php", 
		{
			"the_seller" : window.localStorage.getItem("_cydene_user_phone_no")
		},
		 function(data){

		 	if(data == "Account is Pending"){

		 		$$("#account-status-block").show();

		 	}
		 	else{

		 		$$("#account-status-block").hide();
		 	}
		},

		function(xhr, status, error){

	        toast.show(status);

		});



		$$("#account-status-block").on("click", function(){

		 			mainView.router.loadPage("explainverification.html");
		 });




		//Pull seller ratings
		$$.get("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/pull_seller_ratings.php", 
		{
			"user_phone_data" : window.localStorage.getItem("_cydene_user_phone_no")
		},
		 function(data){

		 	var theRatingsDesign;
		 	var zeroStar = "<i class='material-icons'>star_border</i> <i class='material-icons'>star_border</i> <i class='material-icons'>star_border</i> <i class='material-icons'>star_border</i> <i class='material-icons'>star_border</i>";
		 	var oneStar = "<i class='material-icons color-amber'>star_border</i> <i class='material-icons'>star_border</i> <i class='material-icons'>star_border</i> <i class='material-icons'>star_border</i> <i class='material-icons'>star_border</i>";
		 	var twoStar = "<i class='material-icons color-amber'>star_border</i> <i class='material-icons color-amber'>star_border</i> <i class='material-icons'>star_border</i> <i class='material-icons'>star_border</i> <i class='material-icons'>star_border</i>";
		 	var threeStar = "<i class='material-icons color-amber'>star_border</i> <i class='material-icons color-amber'>star_border</i> <i class='material-icons color-amber'>star_border</i> <i class='material-icons'>star_border</i> <i class='material-icons'>star_border</i>";
		 	var fourStar = "<i class='material-icons color-amber'>star_border</i> <i class='material-icons color-amber'>star_border</i> <i class='material-icons color-amber'>star_border</i> <i class='material-icons color-amber'>star_border</i> <i class='material-icons'>star_border</i>";
		 	var fiveStar = "<i class='material-icons color-amber'>star_border</i> <i class='material-icons color-amber'>star_border</i> <i class='material-icons color-amber'>star_border</i> <i class='material-icons color-amber'>star_border</i> <i class='material-icons color-amber'>star_border</i>";

		 	switch(parseInt(data)){
		 		case 0 : theRatingsDesign = zeroStar; break;
		 		case 1 : theRatingsDesign = oneStar; break;
		 		case 2 : theRatingsDesign = twoStar; break;
		 		case 3 : theRatingsDesign = threeStar; break;
		 		case 4 : theRatingsDesign = fourStar; break;
		 		default : theRatingsDesign = fiveStar;
		 	}

		 	$$(".ratings-container").html(theRatingsDesign);
		},

		function(xhr, status, error){

	        console.log("Error fetching seller ratings");

		});





	
}); //Sellers Dashboard





var acceptOrder, declineOrder, acceptSchOrder, declineSchOrder, orderComplete, schOrderComplete, pushSaleDetails, pushScheduleSaleDetails;
myApp.onPageInit('sellerbookings', function(page){ //Offers page

	


	$$.get("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/seller_pull_pending_orders.php", 
	{
		"the_seller" : window.localStorage.getItem("_cydene_user_phone_no")
	},
	 function(data){

	 	$$(".populate-regular-orders").html(data);
	},

	function(xhr, status, error){

        toast.show(status);

	});




	$$.get("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/seller_pull_active_orders.php", 
	{
		"the_seller" : window.localStorage.getItem("_cydene_user_phone_no")
	},
	 function(data){

	 	$$(".populate-active-orders").html(data);
	},

	function(xhr, status, error){

        toast.show(status);

	});



	acceptOrder = function(tranxSN){

	showNylon();	
	$$.post("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/seller_accept_order.php", 
	{
		"order_sn" : tranxSN
	},
	 function(data){

	 	hideNylon();
	 	if(data == "Accept success"){

	 		hideNylon();
	 		mainView.router.reloadPage("sellerbookings.html");
	 	}
	 	else{

	 		hideNylon();
	 		toast.show("Error accepting order, try later");
	 	}

	 	
	 	
	},

	function(xhr, status, error){

		hideNylon();
        toast.show("Unable to reach Cydene Express servers, try again later");

	});

}



	declineOrder = function(tranxSN){

	var declineSheet = [
			{text : "<h4 class='color-indigo'>Reason to Decline Order:</h4>", label : true, disabled : true},
			{
				text : "Out of Gas Supply",
				bold : true,
				onClick : function(){
					var declineReason = "Out of Gas Supply";
					letsDeclinOrder(tranxSN, declineReason);
				}
			},
			{
				text : "We do not deliver to your address",
				bold : true,
				onClick : function(){
					var declineReason = "We do not deliver to your address";
					letsDeclinOrder(tranxSN, declineReason);
				}
			},
			{
				text : "We are closed for the day",
				bold : true,
				onClick : function(){
					var declineReason = "We are closed for the day";
					letsDeclinOrder(tranxSN, declineReason);
				}
			}

		];
		myApp.actions(declineSheet);


			function letsDeclinOrder(theTranxSN, theDeclineReason){

				showNylon();	
				$$.post("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/seller_decline_order.php", 
				{
					"order_sn" : tranxSN,
					"decline_reason" : theDeclineReason
				},
				 function(data){

				 	hideNylon();
				 	if(data == "Decline success"){

				 		hideNylon();
				 		mainView.router.reloadPage("sellerbookings.html");
				 	}
				 	else{

				 		hideNylon();
				 		toast.show("Error declining order, try later");
				 	}
					
					
				 	
				},

				function(xhr, status, error){

					hideNylon();
			        toast.show("Unable to reach Cydene Express servers, try again later");

				});
			}


	}





	declineSchOrder = function(tranxSN){

	var declineSheet = [
			{text : "<h4 class='color-indigo'>Reason to Decline Schedule Booking:</h4>", label : true, disabled : true},
			{
				text : "Out of Gas Supply",
				bold : true,
				onClick : function(){
					var declineReason = "Out of Gas Supply";
					letsDeclinSchOrder(tranxSN, declineReason);
				}
			},
			{
				text : "We do not deliver to your address",
				bold : true,
				onClick : function(){
					var declineReason = "We do not deliver to your address";
					letsDeclinSchOrder(tranxSN, declineReason);
				}
			},
			{
				text : "We are closed for the day",
				bold : true,
				onClick : function(){
					var declineReason = "We are closed for the day";
					letsDeclinSchOrder(tranxSN, declineReason);
				}
			}

		];
		myApp.actions(declineSheet);


			function letsDeclinSchOrder(theTranxSN, theDeclineReason){

				showNylon();	
				$$.post("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/seller_decline_schedule_order.php", 
				{
					"order_sn" : tranxSN,
					"decline_reason" : theDeclineReason
				},
				 function(data){

				 	hideNylon();
				 	/*if(data == "Decline success"){

				 		hideNylon();
				 		mainView.router.reloadPage("sellerbookings.html");
				 	}
				 	else{

				 		hideNylon();
				 		toast.show("Error declining order, try later");
				 	}*/

				 	toast.show(data);
					
					
				 	
				},

				function(xhr, status, error){

					hideNylon();
			        toast.show("Unable to reach Cydene Express servers, try again later");

				});
			}


	}







	pushSaleDetails = function(theBuyer, tranxID, tranxSN){
		showNylon();

		$$.getJSON("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/pull_sale_details.php", 
		{
			"the_buyer" :  theBuyer,
			"tranx_ID" :  tranxID,
			"tranx_SN" : tranxSN

		},
			 function(data){

			 	hideNylon();
			 	if(data.pack_status == "correct"){

			 		window.localStorage.setItem("theSaleDetails", JSON.stringify(data));
			 		mainView.router.loadPage('customerdeliveryroute.html');

			 	}
			 	else{

			 		toast.show("Error accepting order, try later");
			 	}

			 	console.log(data);

	
			},

			function(xhr, status, error){

				hideNylon();
		        toast.show("Unable to reach Cydene Servers, Try again later");

			});
	

		
	}
	







	pushScheduleSaleDetails = function(theBuyer, tranxSN){
		showNylon();

		$$.getJSON("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/pull_schedule_sale_details.php", 
		{
			"the_buyer" :  theBuyer,
			"tranx_SN" : tranxSN

		},
			 function(data){

			 	hideNylon();
			 	if(data.pack_status == "correct"){

			 		window.localStorage.setItem("theScheduleSaleDetails", JSON.stringify(data));
			 		mainView.router.loadPage('customerdeliveryrouteschedule.html');

			 	}
			 	else{

			 		toast.show("Error processing delivery route");
			 	}

			 	console.log(data);

	
			},

			function(xhr, status, error){

				hideNylon();
		        toast.show("Unable to reach Cydene Servers, Try again later");

			});
	

		
	}
	





	acceptSchOrder = function(tranxSN){

	showNylon();	
	$$.post("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/seller_accept_schedule_order.php", 
	{
		"order_sn" : tranxSN
	},
	 function(data){

	 	hideNylon();
	 	
	 	if(data == "Accept success"){

	 		hideNylon();
	 		mainView.router.reloadPage("sellerbookings.html");
	 	}
	 	else{

	 		hideNylon();
	 		toast.show("Error accepting order, try later");
	 	}

	 	
	},

	function(xhr, status, error){

		hideNylon();
        toast.show("Cannot reach Cydene Express servers, try again later");

	});

}





orderComplete = function(tranxID){

	showNylon();	

	$$.post("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/transaction_complete.php", 
	{
		"tranx_id" : tranxID
	},
	 function(data){

	 	hideNylon();
	 	if(data == "update success"){

	 		mainView.router.reloadPage("sellerbookings.html");
	 	}
	 	else{

	 		toast.show("Error completing order, try later");
	 	}
	 	
	},

	function(){

		hideNylon();
        toast.show("Cannot reach Cydene Express servers, try again later");

	});

}



schOrderComplete = (tranxID) => {

	showNylon();	

	$$.post("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/sellers_schedule_transaction_complete.php", 
	{
		"tranx_id" : tranxID
	},
	 (data) => {

	 	hideNylon();
	 	if(data == "update success"){

	 		mainView.router.reloadPage("sellerbookings.html");
	 	}
	 	else{

	 		toast.show("Error completing order, try later");
	 	}
	 	

	 	
	},

	() => {

		hideNylon();
        toast.show("Cannot reach Cydene Express servers, try again later");

	});

}




}); //Sellers Bookings











//Customer Route Page
myApp.onPageInit('customerdeliveryroute', function(page){ //Offers page

	var splitSaleDetails = window.localStorage.getItem("theSaleDetails");
	splitSaleDetails = JSON.parse(splitSaleDetails);


	$$("#buyer-name-space").html(splitSaleDetails.the_buyer_fn + " " + splitSaleDetails.the_buyer_ln);
	$$("#cylinder-size-name-space").html(splitSaleDetails.the_cylinder_size);
	$$("#cylinder-qty-name-space").html(splitSaleDetails.the_cylinder_qty);
	$$("#total-price-name-space").html("<b><strike>N</strike>" + (splitSaleDetails.total_price - 150) + "</b>");
	$$("#sale-payment-method").html(splitSaleDetails.the_payment_method);
	$$("#tnx-date").html(splitSaleDetails.the_tnx_date);
	$$("#the-buyer-address").html("<b>" + splitSaleDetails.address_string + "</b>");
	$$("#tnx-id").html("<b>" + splitSaleDetails.the_tnx_ID + "</b>");

	console.log("customer delivery route.");

	function calcRoute() {
	  var directionsService = new google.maps.DirectionsService();
	  var directionsDisplay = new google.maps.DirectionsRenderer();
	  var sellerOrigin = new google.maps.LatLng(splitSaleDetails.sellers_lat_lng.sellers_lat, splitSaleDetails.sellers_lat_lng.sellers_lng);
	  var buyerDestination = new google.maps.LatLng(splitSaleDetails.the_buyer_addr.lat, splitSaleDetails.the_buyer_addr.lng);
	  var mapOptions = {
	   	center: sellerOrigin,
	    zoom: 204
	  }
	  var map = new google.maps.Map(document.getElementById('route-map'), mapOptions);
	  
	
	  var request = {
	      origin: sellerOrigin,
	      destination: buyerDestination,
	      unitSystem: google.maps.UnitSystem.IMPERIAL,
	      travelMode: 'DRIVING'
	  };
	  
	  directionsService.route(request, function(response, status) {

	    if (status == 'OK') {
	      
	      directionsDisplay.setDirections(response);
	      directionsDisplay.setMap(map);

	    }
	    else{
	    	toast.show("Error getting directions from Google, Try again later.");
	    }
	  });

	}

	window.setTimeout(function() {calcRoute()}, 2500);



	$$("#click-2-call-customer").on("click", function(){

		window.document.location.href = "tel: " + splitSaleDetails.the_buyer_phone;

	});

}); //Customer Route Page









//Customer Route Page
myApp.onPageInit('customerdeliveryrouteschedule', function(page){ //Offers page

	var splitSaleDetails = window.localStorage.getItem("theScheduleSaleDetails");
	splitSaleDetails = JSON.parse(splitSaleDetails);


	$$("#buyer-name-space").html(splitSaleDetails.the_buyer_fn + " " + splitSaleDetails.the_buyer_ln);
	$$("#cylinder-size-name-space").html(splitSaleDetails.the_cylinder_size);
	$$("#cylinder-qty-name-space").html(splitSaleDetails.the_cylinder_qty);
	$$("#sale-payment-method").html("<b>COD</b>");
	$$("#tnx-date").html(splitSaleDetails.the_tnx_date);
	$$("#the-buyer-address").html("<b>" + splitSaleDetails.address_string + "</b>");
	

	console.log("customer delivery route schedule order.");

	function calcRoute() {
	  var directionsService = new google.maps.DirectionsService();
	  var directionsDisplay = new google.maps.DirectionsRenderer();
	  var sellerOrigin = new google.maps.LatLng(splitSaleDetails.sellers_lat_lng.sellers_lat, splitSaleDetails.sellers_lat_lng.sellers_lng);
	  var buyerDestination = new google.maps.LatLng(splitSaleDetails.the_buyer_addr.lat, splitSaleDetails.the_buyer_addr.lng);
	  var mapOptions = {
	   	center: sellerOrigin,
	    zoom: 204
	  }
	  var map = new google.maps.Map(document.getElementById('route-map'), mapOptions);
	  
	
	  var request = {
	      origin: sellerOrigin,
	      destination: buyerDestination,
	      unitSystem: google.maps.UnitSystem.IMPERIAL,
	      travelMode: 'DRIVING'
	  };
	  
	  directionsService.route(request, function(response, status) {

	    if (status == 'OK') {
	      
	      directionsDisplay.setDirections(response);
	      directionsDisplay.setMap(map);

	    }
	    else{
	    	toast.show("Error getting directions from Google, Try again later.");
	    }
	  });

	}

	window.setTimeout(function() {calcRoute()}, 2500);



	$$("#click-2-call-customer").on("click", function(){

		window.document.location.href = "tel: " + splitSaleDetails.the_buyer_phone;

	});

}); //Customer Route Page






myApp.onPageInit('sellerorderhistory', function(page){ //Sellers Order History


	$$.get("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/pull_sellers_order_history.php", 
	{
		"the_seller" : window.localStorage.getItem("_cydene_user_phone_no")
	},
	 function(data){

	 	$$(".populate-regular-history").html(data);
	},

	function(xhr, status, error){

        console.log("Unable to connect to Cydene Servers");

	});




	$$.get("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/pull_sellers_scheduled_order_history.php", 
	{
		"the_seller" : window.localStorage.getItem("_cydene_user_phone_no")
	},
	 function(data){

	 	$$(".populate-scheduled-history").html(data);
	},

	function(xhr, status, error){

       console.log(status);

	});






}); //Sellers Order History







myApp.onPageInit('sellersettings', function(page){ //Sellers Settings



	$$("#the-seller-name-space").html(window.localStorage.getItem("sellerName"));
	var theSellerLogo = window.localStorage.getItem("sellerLogo");
	$$("#the-seller-logo-space").attr("src", "http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/imgs/" + theSellerLogo);




	var users_phone_data = window.localStorage.getItem("_cydene_user_phone_no");
	$$.post("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/fetch_sellers_wallet_balance.php",
	{
		"user_phone_data" : users_phone_data
	},
	 function(data){

	 	$$(".sellers-wallet-balance").html("<strike>N</strike>" + data);

	 }, function(){

	 		toast.show("Could not connect to Cydene servers");
	 });




	$$.post("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/fetch_sellers_availability.php",
	{
		"user_phone_data" : users_phone_data
	},
	 function(data){

	 	$$(".sellers-availability-check").html(data);

	 }, function(){

	 		toast.show("Unable to connect to Cydene servers");
	 });





	$$("#sellers-set-availability").on("click", () => {

		var sheet = [
			{

				text : "Set Availability",
				label : true,
				disabled : true
			},


			{
				text : "Online",
				bold : true,
				color : "indigo",
				onClick : function(){
					$$(".sellers-availability-check").html("<span class='preloader preloader-indigo'></span>");
					$$.post("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/sellers_set_availability.php",
						{
							"user_phone_data" : users_phone_data,
							"availability" : "available"
						},
						 function(data){

						 		$$(".sellers-availability-check").html(data);
						 	
						 }, function(){

						 		toast.show("Unable to connect to Cydene servers");
						 });
				}
			},

			{
				text : "Offline",
				bold : true,
				color : "orange",
				onClick : function(){

					$$(".sellers-availability-check").html("<span class='preloader preloader-indigo'></span>");
					$$.post("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/sellers_set_availability.php",
						{
							"user_phone_data" : users_phone_data,
							"availability" : "not-available"
						},
						 function(data){

						 		$$(".sellers-availability-check").html(data);
						 	
						 }, function(){

						 		toast.show("Unable to connect to Cydene servers");
						 });
				}
			}
		];


		myApp.actions(sheet);
	});

	



	function pushLogoutSeller(){

				window.localStorage.removeItem("_cydene_user_phone_no");
				window.localStorage.removeItem("_cydene_welcome_msg");
				window.localStorage.removeItem("sellerAddress");
				window.localStorage.removeItem("sellerLogo");
				window.localStorage.removeItem("sellerMail");
				window.localStorage.removeItem("sellerName");
				

				hideNylon();
				mainView.router.loadPage("theswipe.html");
		}

		



		$$("#logout-app-seller").click(() => {

			showNylon();
			window.setTimeout(function(){pushLogoutSeller()}, 5000);

		});




		$$("#seller-change-logo").on("click", function(){

			getImg4rmGallery();

		});



		//Pull seller ratings
		$$.get("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/pull_seller_ratings.php", 
		{
			"user_phone_data" : window.localStorage.getItem("_cydene_user_phone_no")
		},
		 function(data){

		 	var theRatingsDesign;
		 	var zeroStar = "<i class='material-icons'>star_border</i> <i class='material-icons'>star_border</i> <i class='material-icons'>star_border</i> <i class='material-icons'>star_border</i> <i class='material-icons'>star_border</i>";
		 	var oneStar = "<i class='material-icons color-amber'>star_border</i> <i class='material-icons'>star_border</i> <i class='material-icons'>star_border</i> <i class='material-icons'>star_border</i> <i class='material-icons'>star_border</i>";
		 	var twoStar = "<i class='material-icons color-amber'>star_border</i> <i class='material-icons color-amber'>star_border</i> <i class='material-icons'>star_border</i> <i class='material-icons'>star_border</i> <i class='material-icons'>star_border</i>";
		 	var threeStar = "<i class='material-icons color-amber'>star_border</i> <i class='material-icons color-amber'>star_border</i> <i class='material-icons color-amber'>star_border</i> <i class='material-icons'>star_border</i> <i class='material-icons'>star_border</i>";
		 	var fourStar = "<i class='material-icons color-amber'>star_border</i> <i class='material-icons color-amber'>star_border</i> <i class='material-icons color-amber'>star_border</i> <i class='material-icons color-amber'>star_border</i> <i class='material-icons'>star_border</i>";
		 	var fiveStar = "<i class='material-icons color-amber'>star_border</i> <i class='material-icons color-amber'>star_border</i> <i class='material-icons color-amber'>star_border</i> <i class='material-icons color-amber'>star_border</i> <i class='material-icons color-amber'>star_border</i>";

		 	switch(parseInt(data)){
		 		case 0 : theRatingsDesign = zeroStar; break;
		 		case 1 : theRatingsDesign = oneStar; break;
		 		case 2 : theRatingsDesign = twoStar; break;
		 		case 3 : theRatingsDesign = threeStar; break;
		 		case 4 : theRatingsDesign = fourStar; break;
		 		default : theRatingsDesign = fiveStar;
		 	}

		 	$$(".ratings-container").html(theRatingsDesign);
		},

		function(xhr, status, error){

	        console.log("Error fetching seller ratings");

		});

}); //Sellers Settings




myApp.onPageInit('sellersignup', function(page){ //Sellers Signup

	var theUser = window.localStorage.getItem("_cydene_user_phone_no");
	$$("#new_company_phone").val(theUser);

	function initAutoCompleteAddr(){
	var input = document.getElementById('searchTextFieldAddr');
	var options = {
		  types: ['address'],
		  componentRestrictions: {country: 'ng'}
		};

	autocomplete = new google.maps.places.Autocomplete(input, options);
}

	
	setTimeout(() => { initAutoCompleteAddr(); }, 1000);



	$$("#submit_new_company_reg_button").click(() => {

		showNylon();
		var theDeliveryAddress = $$("#searchTextFieldAddr").val();


		var geocoder = new google.maps.Geocoder();
		    geocoder.geocode({ 'address': theDeliveryAddress}, function(results, status) {
		      if (status == 'OK') {
		        
		        theAddressLatLng = results[0].geometry.location;
		        var theAddressLat = theAddressLatLng.lat();
		        var theAddressLng = theAddressLatLng.lng();

		        
		        $$("#new_company_lat").val(theAddressLat);
		        $$("#new_company_lng").val(theAddressLng);

		        
		       $$.post("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/seller_registration.php",
				{
					"new_company_name" : $$("#new_company_name").val(),
					"new_company_address" : $$("#searchTextFieldAddr").val(),
					"new_company_mail" : $$("#new_company_mail").val(),
					"new_company_phone" : theUser,
					"new_company_lat" : theAddressLat,
					"new_company_lng" : theAddressLng

				},
				 (data) => {

				 		hideNylon();
				 		  
						  if(data == "Registration Successful"){
							  var theSellerAddress = $$("#searchTextFieldAddr").val();
							  var theSellerName = $$("#new_company_name").val();
							  var theSellerMail = $$("#new_company_mail").val();
							  var theSellerLogo = "cylinder.png";

							  window.localStorage.setItem("sellerName", theSellerName);
							  window.localStorage.setItem("sellerAddress", theSellerAddress);
							  window.localStorage.setItem("sellerMail", theSellerMail);
							  window.localStorage.setItem("sellerLogo", theSellerLogo);
							  mainView.router.loadPage("sellersignuppricelist.html");
						}

						else{

							toast.show(data);
						}

				 }, () => {

				 		hideNylon();
				 		toast.show("Unable to connect to Cydene servers");
				 });


			}

			else{

				hideNylon();
				toast.show("Unable to connect to Google. Try again later.");
			}

		});


	});




	
		

		
					


});//Sellers Signup



myApp.onPageInit('sellersignuppricelist', function(page){ //Sellers Set price list

	console.log("seller set price list...");

	var userPhone = window.localStorage.getItem("_cydene_user_phone_no");
	$$("#seller-phone").val(userPhone);

	$$("#submit-price-list").on('click', function(e){

					$$('#price-list').trigger('submit');

			});


				$$('#price-list').on('form:beforesend', function (e) {
					  showNylon();
				});
				

				$$('#price-list').on('form:error', function (e) {
					  
						hideNylon();
						var xcode = e.detail.data;
						toast.show("Unable to connect to Cydene Servers. Try again later");

					});
							

				$$('#price-list').on('form:success', function (e) {
					  var xhr = e.detail.xhr; // actual XHR object
					 
					  var data = e.detail.data; // Ajax response from action file
					  hideNylon();
					  
					  if(data == "Update Successful"){
					  
					  	mainView.router.loadPage("selleraddbankaccount.html");
					
					  }

					  else{

					  	toast.show("An error occured. Please try again later.");
					  }
					});
	

});//Sellers Set price list






myApp.onPageInit("updatepricelist", function(page){

	showNylon();

	var userPhone = window.localStorage.getItem("_cydene_user_phone_no");
	$$("#seller-phone").val(userPhone);


	//First Fetch pricelist
	$$.getJSON("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/fetch_sellers_current_pricelist.php",
		{
			"user_phone_data" : userPhone
		},
		 function(data){
		 		console.log(data);
		 		hideNylon();
		 		if(data == "No Pricelist found!"){
		 			toast.show(data);
		 		}
		 		else{
		 			
		 			var sizesArray = [];
		 			for(hq in data){
		 				
		 				sizesArray.push(data[hq]);
					}
		 			
		 			 $$('#threekg-price').val(sizesArray[0]);
		 			  $$('#fivekg-price').val(sizesArray[1]);
		 			   $$('#sixkg-price').val(sizesArray[2]);
		 			    $$('#twelvepointfivekg-price').val(sizesArray[3]);
		 			     $$('#twentyfivekg-price').val(sizesArray[4]);
		 			     $$('#fiftykg-price').val(sizesArray[5]);
		 			
		 		}
		 	
		 }, function(){

		 		hideNylon();
		 		toast.show("Unable to connect to Cydene servers");
		 });




	$$("#submit-price-list-update").on('click', function(e){

					$$('#price-list-update').trigger('submit');

	});


				$$('#price-list-update').on('form:beforesend', function (e) {
					  showNylon();
				});
				

				$$('#price-list-update').on('form:error', function (e) {
					  
						hideNylon();
						var xcode = e.detail.data;
						toast.show("Unable to connect to Cydene Servers. Try again later");

					});
							

				$$('#price-list-update').on('form:success', function (e) {
					  var xhr = e.detail.xhr; // actual XHR object
					 
					  var data = e.detail.data; // Ajax response from action file
					  hideNylon();
					  
					  if(data == "Update Successful"){
					  
					  	mainView.router.loadPage("sellerdashboard.html");
					
					  }

					  else{

					  	toast.show(data);
					  }
					});
	

});









myApp.onPageInit("selleraddbankaccount", function(page){

	console.warn("We are at seller add bank account");

	var userPhone = window.localStorage.getItem("_cydene_user_phone_no");
	

   var bankRoad = ['Citi Bank','Diamond Bank', 'Zenith Bank', 'United Bank Of Afica', 'Guarantee Trust Bank', 'Access Bank Plc', 'First Bank Nigeria', 'Ecobank', 'Fidelity Bank', 'First City Monument Bank', 'Heritage Bank', 'ASO Savings and Loans', 'Coronation Merchant Bank', 'FBN Mortgages Limited', 'Fortis Microfinance Bank', 'FSDH Merchant Bank', 'Imperial Homes Mortgage Bank', 'Jaiz Bank', 'Jubilee Life Mortgage Bank', 'Keystone Bank', 'New Prudential Bank', 'Nigeria International Bank(CITIGROUP)', 'NPF Microfinance Bank', 'Omoluabi Savings and Loans Plc', 'Page MFBank', 'Parallex MFB', 'Safetrust Mortgage Bank', 'Skye Bank Plc', 'Stanbic IBTC Bank', 'Standard Chattered Bank', 'SunTrust Bank', 'Trustbond Mortgage Bank', 'Union Bank of Nigeria', 'Unity Bank Plc', 'VFD Microfinance Bank Plc', 'Wema Bank Plc', 'Sterling Bank'];
            
        bankRoad.sort();
        
        for(qlx = 0; qlx < bankRoad.length; qlx++){
          
          $$("#seller-add-bank-name-container").append('<option value=\'' + bankRoad[qlx] + '\'>' + bankRoad[qlx] + '</option>');
        }
        


        $$("#submit-add-bank-account").on("click", function(){

        	showNylon();

        	$$.post("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/seller_add_bank_account.php",
				{
					"seller_phone" : userPhone,
					"seller_bank_name" : $$("#seller-add-bank-name-container").val(),
					"seller_account_name" : $$("#seller-add-acc-name").val(),
					"seller_account_number" : $$("#seller-add-acc-no").val(),
					"seller_bvn_number" : $$("#seller-add-bvn").val()

				},
				 function(data){

				 	if(data == "Successful"){

				 		hideNylon();
				 		mainView.router.loadPage("sellerdashboard.html");
				 	}
				 	else{

				 		hideNylon();
				 		toast.show("An error occured, try again later.");
				 	}

				 }, function(){

				 		toast.show("Unable to connect to Cydene servers");
				 });
        });
  



}); //Seller add bank account page.




var deleteCardForever;
myApp.onPageInit('paymentmethods', function(page){ //Payment Methods Page

	var users_phone_data = window.localStorage.getItem("_cydene_user_phone_no");

	$$.get("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/fetch_buyer_cards.php",
	{
		"user_phone_data" : users_phone_data
	},
	 function(data){

	 	$$("#load-my-cards").removeClass('text-center').html(data);
	 	

	 }, function(){

	 		toast.show("Unable to connect to Cydene servers");
	 });


	deleteCardForever = function(cardSN){
		showNylon();
		$$.post("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/delete_card.php",
			{
				"user_phone_data" : users_phone_data,
				"card_serial" : cardSN
			},
			 function(data){

			 	if(data == "delete success"){

			 		hideNylon();
			 		mainView.router.reloadPage("paymentmethods.html");

			 	}
			 	else{

			 		hideNylon();
			 		toast.show(data);
			 	}
			 	

			 }, function(){
			 	
			 		hideNylon();
			 		toast.show("Unable to connect to Cydene servers");
			 });

	}
	

}); //Payment Methods Page








myApp.onPageInit('cardpayment', function(page){ //Card Payment Page




	var users_phone_data = window.localStorage.getItem("_cydene_user_phone_no");
	var splitSellerDetails = JSON.parse(window.localStorage.getItem("full_seller_details"));
	var splitBuyDetails = JSON.parse(window.localStorage.getItem("uniqPurchase"));
	var parsedCouponDetails = JSON.parse(window.localStorage.getItem("coupon_details"));
	
	var totalPrice, initialPrice, parsedCouponSN, cashback;
	if(window.localStorage.getItem("discounted_price")){

			totalPrice = window.localStorage.getItem("discounted_price");
			initialPrice = window.localStorage.getItem("original_total_price");

			var discountValue = parsedCouponDetails.coupon_value;
			parsedCouponSN = parsedCouponDetails.coupon_sn;

			$$("#discount-highlighter").html("<b><i>" + discountValue + "% Discount Applied!</i></b>").show();
			cashback = initialPrice - totalPrice;
		}
		else{

			totalPrice = window.localStorage.getItem("original_total_price");
			parsedCouponSN = 0;
			cashback = 0;
		}
		

		//$$("#show-card-amount").html("<strike>N</strike>" + totalPrice);
		$$("#amount-to-pay-display").html("<strike>N</strike>" + totalPrice);
		

		$$("#continue-2-paystack-btn").on("click", function(){

			showNylon();

					 		$$.post("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/card_transaction_recorder.php", 

							{

								"tnx_cylinder_size" : splitBuyDetails.gasSize,
								"tnx_quantity" : splitBuyDetails.gasQty,
								"tnx_total_price" : totalPrice,
								"tnx_buyer" : window.localStorage.getItem("_cydene_user_phone_no"),
								"tnx_seller" : splitSellerDetails.seller_details_id,
								"tnx_payment_method" : "Card",
								"tnx_delivery_address" : splitBuyDetails.delivery_address,
								"tnx_coupon_sn" : parsedCouponSN
							
							},

							function(data){

								console.log(data);

								var splitData = data.split(' ');
								var returnedTnx = splitData[0];
								

								if(splitData[1] == "Successful"){

									$$.post("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/paystack_init.php",
										{
											"buyer_email" : window.localStorage.getItem("buyerMail"),
											"amount_2_pay" : totalPrice * 100,
											"tnx_reference" : returnedTnx
										},
										 function(data){

										 	hideNylon();
										 	console.log(data);
										 	var parsedData = JSON.parse(data);
										 	var authUrl = parsedData.data.authorization_url;
										 	fireUpPayments(authUrl, returnedTnx);
										 	
										 	
										 	console.log(data); 	

										 }, function(){

										 		toast.show("Unable to connect to Cydene servers");
										 });

								}
								else{

									hideNylon();
									toast.show("Error creating a transaction. Try again later.");

								}

							},
							function(){

								hideNylon();
								toast.show("Unable to connect to Cydene Servers. Try again later");
							});


		});

	


}); //Card Payment Page










myApp.onPageInit('rateorder', function(page){ //Rate order

$$("#the-rate").val("1");

	$$("#one-star").click(() => {

		$$("#one-star").addClass("color-amber");
		$$("#two-star").removeClass("color-amber");
		$$("#three-star").removeClass("color-amber");
		$$("#four-star").removeClass("color-amber");
		$$("#five-star").removeClass("color-amber");

		$$("#the-rate").val("1");

	});



	$$("#two-star").click(() => {

		$$("#two-star").addClass("color-amber");
		$$("#one-star").addClass("color-amber");
		$$("#three-star").removeClass("color-amber");
		$$("#four-star").removeClass("color-amber");
		$$("#five-star").removeClass("color-amber");

		$$("#the-rate").val("2");

	});



	$$("#three-star").click(() => {

		$$("#three-star").addClass("color-amber");
		$$("#two-star").addClass("color-amber");
		$$("#one-star").addClass("color-amber");
		$$("#four-star").removeClass("color-amber");
		$$("#five-star").removeClass("color-amber");

		$$("#the-rate").val("3");
	});


	$$("#four-star").click(() => {

		$$("#four-star").addClass("color-amber");
		$$("#one-star").addClass("color-amber");
		$$("#two-star").addClass("color-amber");
		$$("#three-star").addClass("color-amber");
		$$("#five-star").removeClass("color-amber");

		$$("#the-rate").val("4");

	});


	$$("#five-star").click(() => {

		$$("#five-star").addClass("color-amber");
		$$("#one-star").addClass("color-amber");
		$$("#two-star").addClass("color-amber");
		$$("#three-star").addClass("color-amber");
		$$("#four-star").addClass("color-amber");


		$$("#the-rate").val("5");

	});


	$$("#send-rating").click(() => {

		showNylon();
		
		$$.post("http://express.cydene.com/Mobile_app_repo/php_hub/_Cydene/rate_seller.php",
				{
					"the_seller" : window.localStorage.getItem("seller_2_rate"),
					"the_rate" : $$("#the-rate").val()

				},
				 function(data){

				 	hideNylon();
				 	mainView.router.loadPage("dashboard.html");

				 }, function(){

				 		console.log("Unable to connect to Cydene servers");
				 });


	});
}); //Rate order






myApp.onPageInit('explainverification', function(page){ //Verifications Page


	
	$$("#seller-upload-document").click(() => {

		getSellerDocument();

	});






});//Verifications Page





















    
