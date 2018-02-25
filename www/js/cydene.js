/********App Initialization *************/
var myApp = new Framework7({

    material : true,
    materialRipple : true,
    materialRippleElements : '.ripple',
    modalTitle : 'Cydene Express',
    fastClicks : false,
    sortable : false,
    swipeout : false
   });

// Export selectors engine
var $$ = Dom7;



// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
/********App Initialization *************/








var getLatLong, deviceCoords, exitMyApp, getImg4rmGallery;

document.addEventListener("deviceready", deviceIsReady, false);


function deviceIsReady(){

if (cordova.platformId == 'android') {
	StatusBar.backgroundColorByHexString("#3f51b5");
}

	/*window.plugins.PushbotsPlugin.initialize("5a6153c6a5d1030b9c4e444c", {"android":{"sender_id":"106429099464"}});*/

	navigator.splashscreen.hide();
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


	exitMyApp = function(){

		navigator.app.exitApp();
	}
	

	document.addEventListener("backbutton", trapBackButton, false);


	getImg4rmGallery = function(){

		

			 destinationTyper = Camera.DestinationType.FILE_URI;
    		pictureSource = Camera.PictureSourceType.CAMERA;
			    
			    navigator.camera.getPicture(cameraGood, cameraBad, 
			    {
			        quality : 70, 
			        destinationType : destinationTyper,
			        sourceType : pictureSource
			     });
	}


	function cameraGood(imageURI) {
				  console.log(imageURI);
				    
				    var image = document.getElementById('myImage');
				    image.src = "data:image/jpeg;base64," + imageURI;
				}

	function cameraBad(message) {
	    alert('Failed because: ' + message);
	}




	/*getImg4rmGallery = function(selection) {

    var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
    var options = setOptions(srcType);
    var func = createNewFileEntry;

    navigator.camera.getPicture(function cameraSuccess(imageUri) {

        // Do something

    }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");

    }, options);
}*/

} //Device is ready




	


	function trapBackButton(){
		
		var cpage = mainView.activePage;
		var cpageName = cpage.name;

		//Re-route to Dashboard
		if(cpageName == "mapexp" || cpageName == "settings" || cpageName == "helpsection" || cpageName == "orderhistory" || cpageName == "offers" || cpageName == "sellers"){

				mainView.router.loadPage("dashboard.html");
		}

		//Re-route to Settings
		else if(cpageName == "wallet" || cpageName == "editprofile" || cpageName == "setnewpin" || cpageName == "addresseslist" ||  cpageName == "about" || cpageName == "setnewpin"){

			mainView.router.loadPage("settings.html");
		}

		//Re-route to Sellers Page
		else if(cpageName == "sellerdetails"){

			mainView.router.loadPage("sellers.html");
		}

		//Re-route to Seller Details Page
		else if(cpageName == "pinexec"){

			mainView.router.loadPage("sellersdetails.html");
		}

		//Re-route to Addresses list Page
		else if(cpageName == "editaddress"){

			mainView.router.loadPage("addresseslist.html");
		}

		//Re-route to dashboard
		else if(cpageName == "dashboard"){

			navigator.app.exitApp();
		}

		else{

			mainView.router.back();
		}

}







































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
						bold : true,
						onClick : function(){
							exitMyApp();
						}
					},
					{
						text : '<span class=color-indigo>Try Again</span>',
						bold : true,
						onClick : function(){test4connection();}	

					}
				]
				
			}); 

		},
		success : function(){

			//check for reg or login status via window localStorage
				if(window.localStorage.getItem("_cydene_user_phone_no") && window.localStorage.getItem("buyerFN") && window.localStorage.getItem("buyerLN") && window.localStorage.getItem("buyerMail")){

						mainView.router.loadPage("dashboard.html");
				}

			else if(window.localStorage.getItem("_cydene_user_phone_no") && window.localStorage.getItem("sellerName") && window.localStorage.getItem("sellerMail") && window.localStorage.getItem("sellerAddress")){

						mainView.router.loadPage("sellerdashboard.html");
						console.log("Sellers Dashboard");
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

						myApp.showPreloader('Verifying OTP...');

						

						$$.getJSON("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/verify_otp.php",
						{
							users_phone : window.localStorage.getItem("_cydene_user_phone_no"),
							supplied_otp : $$("#user_otp").val()
						},
						function(data){

							myApp.hidePreloader();
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

							myApp.alert("Wrong OTP");

						}

						else{

								mainView.router.loadPage("signup.html");

						}

					

			},

			function(){

					myApp.alert("Unable to connect to Cydene Servers");

			});



});
			



			$$("#resend_otp").on("click", function(){
				myApp.showPreloader('Resending OTP...');

				var theUserPhone = window.localStorage.getItem("_cydene_user_phone_no");
				$$.post("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/resend_otp.php",
						{

							users_phone : theUserPhone
						},
						function(data, status, xhr){
							myApp.hidePreloader();
						}
						,
						function(){

							myApp.alert("Unable to connect to Cydene Servers. Try again later");
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


	for (var i = 1; i <=100; i++) {
		
		$$("#gas-purchase-qty").append("<option value= " + i + ">" + i + "</option>");	
	}

		
	var cydeneUsersPhone = window.localStorage.getItem("_cydene_user_phone_no");
				$$.post("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/verify_delivery_address.php",
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

										},
									]
								});
							}
						}
						, function(xhr, status){
						
							myApp.hidePreloader();
							myApp.alert("Cannot connect to Cydene Servers");

						});

		





		$$("#proceed-gas-purchase").on("click", function(){

			myApp.showPreloader('Listing Addresses...');
		
		//populate buyers addresses
		$$.getJSON("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/address_fetcher_2.php", 
			{"users_phone" : window.localStorage.getItem("_cydene_user_phone_no")}, 
		
		function(data){
			myApp.hidePreloader();
			var django = data;
			var addrPack = "";
			for(b in django){

				addrPack += "<input type='radio' name='address_selected' class='address-pointer' value='" + django[b] + "'> " + django[b] + "<br>";
			}

			myApp.hidePreloader();
			myApp.modal({
				title : "Pick delivery Address",
				text : addrPack,
				buttons : [
					{ text : "<span class='color-orange'>Cancel</span>", bold : true },
					{ text : "<span class='color-indigo'>Continue</span>", bold : true,
						onClick : function(){
							addressPicker();
						}
					}]
		});

		}, 

		function(data){

			myApp.alert("Unable to connect to Cydene Servers. Try again later.");

		});

	}); // End of proceed gas purchase button function.




		function addressPicker(){
			myApp.showPreloader('Processsing...');

			var gasSize = $$("#gas-cylinder-size").val();
			var gasQty = $$("#gas-purchase-qty").val();
			var delivery_address = $$(".address-pointer").filter(function(){return $$(this).prop("checked");}).val();
			
					var uniqPurchase = {
						"gasSize" : gasSize,
						"gasQty" : gasQty,
						"delivery_address" : delivery_address 
					}
			window.localStorage.setItem("uniqPurchase", JSON.stringify(uniqPurchase));

			if($$("#schedule-switch").prop("checked") == true)
			{

				runScheduledTransaction();
			}
			else{

				myApp.hidePreloader();
				mainView.router.loadPage("sellers.html");
			}


		}








		function runScheduledTransaction(){

			var theRecurrDate = $$("#recurring-date-select-text").val();
			var splitDay = theRecurrDate.substring(6,8);
			var theBuyer = window.localStorage.getItem("_cydene_user_phone_no");
			var scheduleDeliveryAddress = $$(".address-pointer").filter(function(){return $$(this).prop("checked");}).val();
			var theUniqPurchase = JSON.parse(window.localStorage.getItem("uniqPurchase"));
				var theGasSize = theUniqPurchase.gasSize;
				var theGasQty = theUniqPurchase.gasQty;

			$$.post("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/schedule_transaction_recorder.php", 
							
					{
						"the_cylinder_size" : theGasSize,
						"the_quantity" : theGasQty,
						"the_recurr_date" : splitDay,
						"the_buyer" : theBuyer,
						"the_delivery_address" : scheduleDeliveryAddress
					},

							function(data){
								myApp.hidePreloader();
								if(data == "Successful"){
										mainView.router.loadPage("orderhistory.html");
									}
										else{

											myApp.alert(data);
										}

							}, function(){

								myApp.alert("Unable to connect to Cydene Servers. Please try later");

							});
			}





		$$("#schedule-switch").change(function(){		

					if($$(this).prop("checked") == true){
			               
				$$("<li id='recurring-date-select'><div class='item-content'><div class='item-media'><i class='icon material-icons color-indigo'>date_range</i></div><div class='item-inner theme-indigo'><div class='item-title label color-indigo'>Recurring Dates.</div><div class='item-input'><input type='text' required id='recurring-date-select-text'></div></div></div></li>").insertAfter($$("#schedule-switch-panel"));
					           
					$$("#recurring-date-select-text").click(function(){

						var qqs = myApp.calendar({

							input : "#recurring-date-select-text",
							yearPicker : false,
							monthPicker : false,
							cssClass : "theme-indigo",
							dateFormat: "Day - dd, of every month"

						});

					});
				}
				    else{

				    	$$("#recurring-date-select").remove();
					  }
			});



		if(!window.localStorage.getItem("version_control")){


			window.localStorage.setItem("version_control", "1.0.4");
		}
		

		var mycurrentVersion = window.localStorage.getItem("version_control");

		//code to check for update version of the app
		$$.get("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/version_control.php", function(datax){

				if(datax !== mycurrentVersion){

					myApp.modal({
					title : 'Cydene Express',
					text : 'A new update is available for Cydene Express.<br> v' + datax,
					buttons : [
						{
							text : '<span class=color-orange>Not Now</span>',
							bold : true
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

/**********************Dashboard****************

















/**********************Sellers*****************/
var buyFromThisSeller, theAddresses, theAddressDetails, talkTogGoogle, distanceLists = [];
	myApp.onPageInit('sellers', function(page){

	var selectedPurchases = JSON.parse(window.localStorage.getItem("uniqPurchase"));
	var postedCylinderSize = selectedPurchases.gasSize;
	var theBuyerDeliveryAddress = selectedPurchases.delivery_address;

	



		$$.get("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/find_sellers.php", {"posted_cylinder_size" : postedCylinderSize}, function(data){

			$$(".populate-all-sellers").removeClass('text-center').html(data);

		}, function(){

				myApp.alert("Error occured, try again later");
		});
						
					

		buyFromThisSeller = function(theSellerID, theCylinderSize){
			myApp.showPreloader("Processsing...");

			$$.getJSON("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/fetch_seller_details.php", {"seller_id" : theSellerID, "cylinder_size" : theCylinderSize}, function(data){

					console.log(data);
					var stringData = JSON.stringify(data);
					window.localStorage.setItem("full_seller_details", stringData);
					myApp.hidePreloader();
					mainView.router.loadPage("sellerdetails.html");

				}, function(){

						myApp.hidePreloader();
						myApp.alert("Error occured, try again later");
				});


			}

		


			
			$$(".nearby-sellers").on("click", function(){
				myApp.showPreloader("Loading Nearby Sellers...");

				//Grab a list of all sellers
				$$.getJSON("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/list_all_sellers.php", function(data){
						

						theAddresses = data;
					
					}, function(){
					myApp.hidePreloader();
					myApp.alert("error in getting addresses");
				});



				//Get address details from addressname
				$$.getJSON("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/get_address_details_from_name.php", 
				{
					"the_address_name" : theBuyerDeliveryAddress,
					"the_buyer" : window.localStorage.getItem("_cydene_user_phone_no")
				},
					function(data){
						
						var arrangeMyLat = [];
						
						for(vv in data){

							arrangeMyLat.push(data[vv]);
						}
						theAddressDetails = arrangeMyLat;
						

					}, function(){
					myApp.hidePreloader();
					myApp.alert("Could not connect to Cydene Servers. Try later");
				});






				//Giant For
				talkTogGoogle = function(){
					distanceLists = [];
					var service = new google.maps.DistanceMatrixService();

					for(h in theAddresses){

					var sellersAddress = new google.maps.LatLng(theAddresses[h][0], theAddresses[h][1]);
					var myPlace = new google.maps.LatLng(theAddressDetails[0], theAddressDetails[1]);

					
					service.getDistanceMatrix(
					  {
					    origins: [sellersAddress],
					    destinations: [myPlace],
					    travelMode: 'DRIVING',
					    avoidHighways: false,
					    avoidTolls: false,
					  }, callback);

					}



				function callback(response, status) {
					if (status == 'OK') {
				    var origins = response.originAddresses;
				    var destinations = response.destinationAddresses;

				    for (var i = 0; i < origins.length; i++) {

				      var results = response.rows[i].elements;
				      for (var j = 0; j < results.length; j++) {
				        var element = results[j];
				        var distance = element.distance.text;

				        var splitDistance = distance.split(" ");
				        var clearDistance = splitDistance[0];
				        
				        /*var duration = element.duration.text;*/
				        var from = origins[i];
				        var to = destinations[j];
							distanceLists.push(clearDistance);
				    	}
				    }


				  }
				  else{
				  		myApp.hidePreloader();
				  		myApp.alert("Sorry, i'm having issues talking to Google Maps. Network Error");
				  }
				}
			
				console.log(distanceLists);
				window.setTimeout(function(){listNearbyAddresses()}, 5000);
		}


			window.setTimeout(function(){talkTogGoogle()}, 5000);


			function listNearbyAddresses(){

					$$.post("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/list_nearby_sellers.php",
					 {
					 	"nearby_list" : distanceLists,
					 	"posted_cylinder_size" : postedCylinderSize

					 },
					function(data){
							myApp.hidePreloader();
							$$(".populate-nearby-sellers").removeClass('text-center').html(data);
														
					},
					function(){
							myApp.hidePreloader();
							myApp.alert("Unable to connect to Cydene Servers");
					});
			}

	}); // End of Click Function




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




		$$("#payment-btn").html("Pay <strike>N</strike>" + totalPrice).click(function(){

				myApp.showPreloader('Processsing...');
				var paymentMethod = $$("input[name='payment_method']:checked").val();
				var deliver2Address =  splitBuyDetails.delivery_address;
				
			

				
				if(paymentMethod == "COD"){

					$$.post("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/transaction_recorder.php", 

					{

						"tnx_cylinder_size" : splitBuyDetails.gasSize,
						"tnx_quantity" : splitBuyDetails.gasQty,
						"tnx_total_price" : totalPrice,
						"tnx_buyer" : window.localStorage.getItem("_cydene_user_phone_no"),
						"tnx_seller" : splitSellerDetails.seller_details_id,
						"tnx_payment_method" : "COD",
						"tnx_delivery_address" : deliver2Address,
						"tnx_coupon_sn" : 0,
						"tnx_cashback" : 0
					}, 

					function(data){
					if(data == "Successful"){
							
							myApp.hidePreloader();
							mainView.router.loadPage("ordersuccess.html");

						}
						else{

							myApp.hidePreloader();
							myApp.alert("Could not place order try again later.");
						}

					}, function(){

						myApp.alert("An error has occured. Network Error");
					});
				}




				else{
					window.localStorage.setItem("tnx_delivery_address", deliver2Address);

					myApp.hidePreloader();
					myApp.prompt('Have a coupon code? Apply it now for discounts!!!', 'Coupons!!!', function (value) {
       					 
       					 myApp.showPreloader('Checking coupon code...');
       					 $$.getJSON("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/coupon_code_validator.php",
								 {
								 	coupon_user : window.localStorage.getItem('_cydene_user_phone_no'),
								 	coupon_code : value
								 },
								function(data){
										myApp.hidePreloader();


										if(data.status == "Coupon Code Invalid or Expired" || data.status == "You have made use of this coupon code once"){

											myApp.alert(data.status);
										}
										else{
											window.localStorage.setItem("original_total_price", totalPrice);
											var originalPrice = window.localStorage.getItem("original_total_price");

											discountedPrice = originalPrice - ((data.coupon_value / 100) * originalPrice);
											window.localStorage.setItem("discounted_price", discountedPrice);

											//Setup coupon details
											var couponDetails = {

												"coupon_sn" : data.coupon_sn,
												"coupon_value" : data.coupon_value
											}

											window.localStorage.setItem("coupon_details", JSON.stringify(couponDetails));

											setTimeout(() => {
											mainView.router.loadPage("pinexec.html");
											}, 1500);
											
										}

								},
								function(){
										
										myApp.hidePreloader();
										myApp.alert("Unable to check coupon code!");
								});
										

    				},

    				function(){
    					
    					myApp.hidePreloader();
    					window.localStorage.removeItem("discounted_price");
    					window.localStorage.setItem("original_total_price", totalPrice);

    					setTimeout(() => {
    					mainView.router.loadPage("pinexec.html");
    					}, 1500);

    				});
					
						

				}

		});










});

/**********************Sellers Details*****************/










/**********************PIN exec*****************/

myApp.onPageInit('pinexec', function(page){

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
		

		$$("#show-amount").html("<strike>N</strike>" + totalPrice);


		
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
					 		$$.post("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/transaction_recorder.php", 

							{

								"tnx_cylinder_size" : splitBuyDetails.gasSize,
								"tnx_quantity" : splitBuyDetails.gasQty,
								"tnx_total_price" : totalPrice,
								"tnx_buyer" : window.localStorage.getItem("_cydene_user_phone_no"),
								"tnx_seller" : splitSellerDetails.seller_details_id,
								"tnx_payment_method" : "Wallet",
								"tnx_delivery_address" : window.localStorage.getItem("tnx_delivery_address"),
								"tnx_coupon_sn" : parsedCouponSN,
								"tnx_cashback" : cashback
							}, 

							function(data){
										myApp.hidePreloader();
										
										if(data == "Successful"){

											myApp.hidePreloader();
								 			mainView.router.loadPage("ordersuccess.html");

									 		}

									 		else{

									 				myApp.hidePreloader();
										 			myApp.alert(data);
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
		  componentRestrictions: {country: 'ng'}
		};

	autocomplete = new google.maps.places.Autocomplete(input, options);
}


	

	

	$$("#save-address-btn").on("click", function(){

		myApp.showPreloader('Saving Address...');

		var theDeliveryAddress =  $$(".delivery-address").val();

		  var geocoder = new google.maps.Geocoder();
		    geocoder.geocode( { 'address': theDeliveryAddress}, function(results, status) {
		      if (status == 'OK') {
		        
		        myApp.hidePreloader();
		        theAddressLatLng = results[0].geometry.location;
		        

		        var theAddressLat = theAddressLatLng.lat();
		        var theAddressLng = theAddressLatLng.lng();

		       
		       

		$$.post("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/save_delivery_address.php",
						{
							the_users_phone : window.localStorage.getItem("_cydene_user_phone_no"),
							the_address_name : $$("#the-address-name").val(),
							the_delivery_address : theDeliveryAddress,
							the_address_Lat: theAddressLat,
							the_address_Lng: theAddressLng
						},
						function(data){
							myApp.hidePreloader();
							console.log(data);
							
							if(data == "Save Successful"){

								myApp.hidePreloader();
								mainView.router.loadPage("dashboard.html");
							}
							else{

								myApp.hidePreloader();
								myApp.alert("Error saving address, try again later.");

							}
							
						}, function(){

							 myApp.hidePreloader();
							myApp.alert("Unable to connect to Cydene Servers. Try again later");

						});

				} else {

						 myApp.hidePreloader();
				        myApp.alert('Unable to Geocode your Address. Please try again later');
				  }


		    });

	});
	



	


}); // Map Exp Page









var cancelScheduleOrder, cancelOrder, orderComplete;

myApp.onPageInit('orderhistory', function(page){
    
    

	$$.get("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/pull_order_history.php", 
	{
		"the_buyer" : window.localStorage.getItem("_cydene_user_phone_no")
	},
	 function(data){

	 	$$(".populate-regular-history").html(data);
	},

	function(){

        myApp.alert(status);

	});




	$$.get("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/pull_scheduled_order_history.php", 
	{
		"the_buyer" : window.localStorage.getItem("_cydene_user_phone_no")
	},
	 function(data){

	 	$$(".populate-scheduled-history").html(data);
	},

	function(){

        myApp.alert("Unable to connect to Cydene Servers");

	});




	$$.get("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/pull_active_orders.php", 
	{
		"the_buyer" : window.localStorage.getItem("_cydene_user_phone_no")
	},
	 function(data){

	 	$$(".populate-active-orders").html(data);
	},

	function(){

        myApp.alert("Unable to connect to Cydene Servers");

	});






	orderComplete = (tranxID) => {

	myApp.showPreloader('Completing Order...');	

	$$.post("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/transaction_complete.php", 
	{
		"tranx_id" : tranxID
	},
	 (data) => {

	 	myApp.hidePreloader();
	 	if(data == "update success"){

	 		mainView.router.reloadPage("orderhistory.html");
	 	}
	 	else{

	 		myApp.alert("Error completing order, try later");
	 	}
	 	
	},

	() => {

		myApp.hidePreloader();
        myApp.alert("Cannot reach Cydene Express servers, try again later");

	});

}






	cancelScheduleOrder = function(tranxSN){

	myApp.showPreloader('Canceling Order...');	
	$$.post("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/cancel_scheduled_order.php", 
	{
		"order_sn" : tranxSN
	},
	 function(data){

	 	myApp.hidePreloader();
	 	if(data == "delete success"){

	 		mainView.router.reloadPage("orderhistory.html");
	 	}
	 	else{

	 		myApp.alert("Error cancelling order, try later");
	 	}
	},

	function(xhr, status, error){

		myApp.hidePreloader();
        myApp.alert("Cannot reach Cydene Express servers, try again later");

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

else{

	cancelMyOrder(tranxSN, "COD");
}

	function cancelMyOrder(tranxSN, paymentMethod){



			myApp.showPreloader('Canceling...');
			$$.post("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/cancel_order.php", 
			{
				"order_sn" : tranxSN,
				"tnx_owner" : window.localStorage.getItem("_cydene_user_phone_no"),
				"tnx_payment_method" : paymentMethod
			},
			 function(data){

			 	myApp.hidePreloader();
			 	if(data == "cancel success"){

			 		mainView.router.reloadPage("orderhistory.html");
			 	}
			 	else{

			 		myApp.alert("Error cancelling order, try later");
			 	}
			},

			function(xhr, status, error){

				myApp.hidePreloader();
		        myApp.alert("Cannot reach Cydene Express servers, try again later");

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

	$$.post("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/fetch_wallet_balance.php",
	{
		"user_phone_data" : user_phone_data
	},
	 function(data){

	 	$$(".wallet-balance").html("<strike>N</strike>" + data);

	 }, function(){

	 		myApp.alert("Could not connect to Cydene servers");
	 });
	

	$$("#logout-app").on("click", function(){

		myApp.showPreloader("Please Wait...");

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

				myApp.hidePreloader();
				mainView.router.loadPage("theswipe.html");
		}

		window.setTimeout(() => {pushLogout()}, 5000);


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
					  myApp.showPreloader(' ');
					  
				});
				

				$$('form.set_current_pin').on('form:error', function (e) {
					  
						myApp.hidePreloader();
						myApp.alert("An error has occured, try again later");

					});
							

				$$('form.set_current_pin').on('form:success', function (e) {
					  var xhr = e.detail.xhr; // actual XHR object
					 
					  var data = e.detail.data; // Ajax response from action file
					  if(data == "PIN Match"){
					  		myApp.hidePreloader();
					  		mainView.router.loadPage("setnewpin.html");
					  }
					  else{

					  		myApp.hidePreloader();
					  		myApp.alert(data);
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
					  myApp.showPreloader(' ');
					  
				});
				

				$$('form#set_new_pin').on('form:error', function (e) {
					  
						myApp.hidePreloader();
						myApp.alert("An error has occured, try again later");

					});
							

				$$('form#set_new_pin').on('form:success', function (e) {
						  
						  var xhr = e.detail.xhr; // actual XHR object
						  var data = e.detail.data; // Ajax response from action file
						  if(data == "PIN Saved"){

						  		myApp.hidePreloader();
						  		mainView.router.loadPage("settings.html");
						  }
						  else{

								myApp.hidePreloader();
						  		myApp.alert(data);
						  }
					
				});




});






var deleteAddr, editAddr;
myApp.onPageInit('addresseslist', function(page){ // Address List

	var users_phone = window.localStorage.getItem("_cydene_user_phone_no");
	

		$$.get("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/list_addresses.php", 
		{

			"users_phone" : users_phone

		},
		function(data){

			$$(".address-list").html(data);
		},

		function(){

				myApp.alert("could not get data from Cydene servers")
		});






	deleteAddr = function(addrSN){

	myApp.showPreloader(' ');	
	$$.post("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/delete_address.php", 
	{
		"address_sn" : addrSN
	},
	 function(data){

	 	myApp.hidePreloader();
	 	
	 	if(data == "delete success"){

	 		mainView.router.reloadPage("addresseslist.html");
	 	}
	 	else{

	 		myApp.alert(data);
	 	}
	},

	function(xhr, status, error){

		myApp.hidePreloader();
        myApp.alert("Cannot reach Cydene Express servers, try again later");

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

		myApp.showPreloader(' ');

		$$.post("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/update_delivery_address.php",
		{
					the_address_sn : $$("#edit-address-id").val(),
					the_address_name : $$("#the-address-name-edit").val(),
					the_delivery_address : $$("#searchTextFieldEdit").val()
		},
		 function(data){
			myApp.hidePreloader();
			
			
			if(data == "Update Successful"){
				
				myApp.hidePreloader();
				mainView.router.loadPage("addresseslist.html");

			}
			else{

				myApp.alert("Error saving address, try again later.");

			}
			
		});

	});






}); // Edit address page












myApp.onPageInit('wallet', function(page){ // Wallet page


	var user_phone_data = window.localStorage.getItem("_cydene_user_phone_no");

	$$.post("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/fetch_wallet_balance.php",
	{
		"user_phone_data" : user_phone_data
	},
	 function(data){

	 	$$(".wallet-balance").html("<strike>N</strike>" + data);

	 }, function(){

	 		myApp.alert("Could not connect to Cydene servers");
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
			myApp.showPreloader(' ');
			$$.post("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/user_profile_update.php", 
			{

				"user_phone_number" : users_phone,
				"user_edit_first_name" : $$("#edit-user-first-name").val(),
				"user_edit_last_name" : $$("#edit-user-last-name").val()
			},
			function(data){

				if(data == "Save Successful"){

					window.localStorage.setItem("buyerFN", $$("#edit-user-first-name").val());
					window.localStorage.setItem("buyerLN", $$("#edit-user-last-name").val());
					myApp.hidePreloader();
					mainView.router.loadPage("settings.html");
				}
				else{

					myApp.alert(data);
				}
			},
			function(){

				myApp.alert("Cannot connect to Cydene servers. Try again later");

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


	$$.post("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/fetch_offers.php",
	 function(data){

	 	$$(".populate-offers").html(data);

	 }, function(){

	 		myApp.alert("Could not connect to Cydene servers. Try again later");
	 });



}); //Offers Page











myApp.onPageInit('walletstatement', function(page){ //Offers page

	var users_phone = window.localStorage.getItem("_cydene_user_phone_no");

	$$.post("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/fetch_wallet_statement.php",
	{
		"the_buyer" : users_phone
	}
	,
	 function(data){

	 	$$(".populate-wallet-statement").html(data);

	 }, function(){

	 		myApp.alert("Could not connect to Cydene servers. Try again later");
	 });




}); //Offers Page






















myApp.onPageInit('sellerdashboard', function(page){ //Offers page

	$$("#seller-name-space").html(window.localStorage.getItem("sellerName"));
	var sellerLogo = window.localStorage.getItem("sellerLogo");
	$$("#seller-logo-space").attr("src", "http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/imgs/" + sellerLogo);

	
}); //Sellers Dashboard





var acceptOrder, pushSaleDetails;
myApp.onPageInit('sellerbookings', function(page){ //Offers page

	
	$$.get("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/seller_pull_pending_orders.php", 
	{
		"the_seller" : window.localStorage.getItem("_cydene_user_phone_no")
	},
	 function(data){

	 	$$(".populate-regular-orders").html(data);
	},

	function(xhr, status, error){

        myApp.alert(status);

	});




	$$.get("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/seller_pull_active_orders.php", 
	{
		"the_seller" : window.localStorage.getItem("_cydene_user_phone_no")
	},
	 function(data){

	 	$$(".populate-active-orders").html(data);
	},

	function(xhr, status, error){

        myApp.alert(status);

	});



	acceptOrder = function(tranxSN){

	myApp.showPreloader('Accepting Order...');	
	$$.post("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/seller_accept_order.php", 
	{
		"order_sn" : tranxSN
	},
	 function(data){

	 	myApp.hidePreloader();
	 	if(data == "Accept success"){

	 		myApp.hidePreloader();
	 		mainView.router.reloadPage("sellerbookings.html");
	 	}
	 	else{

	 		myApp.hidePreloader();
	 		myApp.alert("Error accepting order, try later");
	 	}

	 	
	},

	function(xhr, status, error){

		myApp.hidePreloader();
        myApp.alert("Unable to reach Cydene Express servers, try again later");

	});

}


	/*pushSaleDetails = function(theBuyer, tranxID, tranxSN){
		myApp.showPreloader('Processing...');

		$$.get("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/pull_sale_details.php", 
		{
			"the_buyer" :  theBuyer,
			"tranx_ID" :  tranxID,
			"tranx_SN" : tranxSN

		},
			 function(data){

			 	myApp.hidePreloader();
			 	if(data == "Accept success"){

			 		mainView.router.loadPage('customerdeliveryroute.html');
			 	}
			 	else{

			 		myApp.alert("Error accepting order, try later");
			 	}

			 	console.log(data);

	
			},

			function(xhr, status, error){

				myApp.hidePreloader();
		        myApp.alert("Unable to reach Cydene Servers, Try again later");

			});
	

		
	}*/
	




	acceptSchOrder = function(tranxSN){

	myApp.showPreloader('Accepting Order...');	
	$$.post("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/seller_accept_schedule_order.php", 
	{
		"order_sn" : tranxSN
	},
	 function(data){

	 	myApp.hidePreloader();
	 	
	 	if(data == "Accept success"){

	 		myApp.hidePreloader();
	 		mainView.router.reloadPage("sellerbookings.html");
	 	}
	 	else{

	 		myApp.hidePreloader();
	 		myApp.alert("Error accepting order, try later");
	 	}

	 	
	},

	function(xhr, status, error){

		myApp.hidePreloader();
        myApp.alert("Cannot reach Cydene Express servers, try again later");

	});

}





orderComplete = (tranxID) => {

	myApp.showPreloader('Completing Order...');	

	$$.post("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/transaction_complete.php", 
	{
		"tranx_id" : tranxID
	},
	 (data) => {

	 	myApp.hidePreloader();
	 	if(data == "update success"){

	 		mainView.router.reloadPage("sellerbookings.html");
	 	}
	 	else{

	 		myApp.alert("Error completing order, try later");
	 	}
	 	
	},

	() => {

		myApp.hidePreloader();
        myApp.alert("Cannot reach Cydene Express servers, try again later");

	});

}



schOrderComplete = (tranxID) => {

	myApp.showPreloader('Completing Order...');	

	$$.post("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/sellers_schedule_transaction_complete.php", 
	{
		"tranx_id" : tranxID
	},
	 (data) => {

	 	myApp.hidePreloader();
	 	if(data == "update success"){

	 		mainView.router.reloadPage("sellerbookings.html");
	 	}
	 	else{

	 		myApp.alert("Error completing order, try later");
	 	}
	 	

	 	
	},

	() => {

		myApp.hidePreloader();
        myApp.alert("Cannot reach Cydene Express servers, try again later");

	});

}




}); //Sellers Bookings











//Customer Route Page
myApp.onPageInit('customerdeliveryroute', function(page){ //Offers page


	

}); //Customer Route Page







//Customer Route Page
myApp.onPageInit('sellerorderhistory', function(page){ //Sellers Order History


	$$.get("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/pull_sellers_order_history.php", 
	{
		"the_seller" : window.localStorage.getItem("_cydene_user_phone_no")
	},
	 function(data){

	 	$$(".populate-regular-history").html(data);
	},

	function(xhr, status, error){

        myApp.alert(status);

	});




	$$.get("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/pull_sellers_scheduled_order_history.php", 
	{
		"the_seller" : window.localStorage.getItem("_cydene_user_phone_no")
	},
	 function(data){

	 	$$(".populate-scheduled-history").html(data);
	},

	function(xhr, status, error){

        myApp.alert(status);

	});






}); //Sellers Order History







myApp.onPageInit('sellersettings', function(page){ //Sellers Settings



	$$("#the-seller-name-space").html(window.localStorage.getItem("sellerName"));
	var theSellerLogo = window.localStorage.getItem("sellerLogo");
	$$("#the-seller-logo-space").attr("src", "http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/imgs/" + theSellerLogo);




	var users_phone_data = window.localStorage.getItem("_cydene_user_phone_no");
	$$.post("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/fetch_sellers_wallet_balance.php",
	{
		"user_phone_data" : users_phone_data
	},
	 function(data){

	 	$$(".sellers-wallet-balance").html("<strike>N</strike>" + data);

	 }, function(){

	 		myApp.alert("Could not connect to Cydene servers");
	 });




	$$.post("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/fetch_sellers_availability.php",
	{
		"user_phone_data" : users_phone_data
	},
	 (data) => {

	 	$$(".sellers-availability-check").html(data);

	 }, () => {

	 		myApp.alert("Unable to connect to Cydene servers");
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
				onClick : () => {
					$$(".sellers-availability-check").html("<span class='preloader preloader-indigo'></span>");
					$$.post("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/sellers_set_availability.php",
						{
							"user_phone_data" : users_phone_data,
							"availability" : "available"
						},
						 (data) => {

						 		$$(".sellers-availability-check").html(data);
						 	
						 }, () => {

						 		myApp.alert("Unable to connect to Cydene servers");
						 });
				}
			},

			{
				text : "Offline",
				bold : true,
				color : "orange",
				onClick : () => {

					$$(".sellers-availability-check").html("<span class='preloader preloader-indigo'></span>");
					$$.post("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/sellers_set_availability.php",
						{
							"user_phone_data" : users_phone_data,
							"availability" : "not-available"
						},
						 (data) => {

						 		$$(".sellers-availability-check").html(data);
						 	
						 }, () => {

						 		myApp.alert("Unable to connect to Cydene servers");
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
				

				myApp.hidePreloader();
				mainView.router.loadPage("theswipe.html");
		}

		



		$$("#logout-app-seller").click(() => {

			myApp.showPreloader('Please wait...');
			window.setTimeout(() => {pushLogoutSeller()}, 5000);

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

	
	setTimeout(() => { initAutoCompleteAddr(); }, 2000);



	$$("#submit_new_company_reg_button").click(() => {

		myApp.showPreloader('Processing...');
		var theDeliveryAddress = $$("#searchTextFieldAddr").val();


		var geocoder = new google.maps.Geocoder();
		    geocoder.geocode({ 'address': theDeliveryAddress}, function(results, status) {
		      if (status == 'OK') {
		        
		        theAddressLatLng = results[0].geometry.location;
		        var theAddressLat = theAddressLatLng.lat();
		        var theAddressLng = theAddressLatLng.lng();

		        
		        $$("#new_company_lat").val(theAddressLat);
		        $$("#new_company_lng").val(theAddressLng);

		        
		       $$.post("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/seller_registration.php",
				{
					"new_company_name" : $$("#new_company_name").val(),
					"new_company_address" : $$("#searchTextFieldAddr").val(),
					"new_company_mail" : $$("#new_company_mail").val(),
					"new_company_phone" : theUser,
					"new_company_lat" : theAddressLat,
					"new_company_lng" : theAddressLng

				},
				 (data) => {

				 		myApp.hidePreloader();
				 		  
						  if(data == "Registration Successful"){
						  /*var new_user_first_name = $$("#new_user_first_name").val();
						  var new_user_last_name = $$("#new_user_last_name").val();
						  var new_user_mail = $$("#new_user_mail").val();

						  window.localStorage.setItem("buyerFN", new_user_first_name);
						  window.localStorage.setItem("buyerLN", new_user_last_name);
						  window.localStorage.setItem("buyerMail", new_user_mail);*/
						  mainView.router.loadPage("selleruploadlogo.html");
						}

						else{

							myApp.alert(data);
						}

				 }, () => {

				 		myApp.hidePreloader();
				 		myApp.alert("Unable to connect to Cydene servers");
				 });


			}

			else{

				myApp.hidePreloader();
				myApp.alert("Unable to connect to Google. Try again later.");
			}

		});


	});




	
		

		
					


});//Sellers Signup






myApp.onPageInit('selleruploadlogo', function(page){ //Sellers Signup


	
	$$("#seller-upload-logo").click(() => {

			getImg4rmGallery();
			
		});		


});










































    
