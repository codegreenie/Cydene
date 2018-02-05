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








var getLatLong, deviceCoords;

$$(document).on("deviceready", function(){ //Device plugins starts here
	deviceIsReady();
});

function deviceIsReady(){

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


	

	$$(document).on("backbutton", function(x){ //Device plugins starts here

			trapBackButton();

	});

} //Device is ready




	


	function trapBackButton(){
		
		var cpage = mainView.activePage;
		var cpageName = cpage.name;

		//Re-route to Dashboard
		if(cpageName == "mapexp" || cpageName == "settings" || cpageName == "helpsection" || cpageName == "orderhistory" || cpageName == "offers" || cpageName == "sellers"){

				mainView.router.loadPage("dashboard.html");
		}

		//Re-route to Settings
		else if(cpageName == "wallet" || cpageName == "editprofile" || cpageName == "setnewpin" || cpageName == "addresseslist" ||  cpageName == "about"){

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
				myApp.showPreloader(' ');

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
							onClick : function(){test4connection()}	

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

		


			
			$$(".nearby-sellers").on("click", function(){
				myApp.showPreloader("Loading Nearby Sellers...");

				//Grab a list of all sellers
				$$.getJSON("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/list_all_sellers.php", function(data){
						
						theAddresses = data;
						console.log(data);
						
					}, function(){
					myApp.hidePreloader();
					myApp.alert("error in getting addresses");
				});



				//Get address details from addressname
				$$.get("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/get_address_details_from_name.php", 
				{
					"the_address_name" : theBuyerDeliveryAddress,
					"the_buyer" : window.localStorage.getItem("_cydene_user_phone_no")
				},
					function(data){
						
						//myApp.alert(data);
						theAddressDetails = data;
						
					}, function(){
					myApp.hidePreloader();
					myApp.alert("Could not connect to Cydene Servers. Try later");
				});




				//Giant For
				talkTogGoogle = function(){
					distanceLists = [];

					for(h in theAddresses){

				var originA = theAddressDetails;
				var destinationA = theAddresses[h];
				var service = new google.maps.DistanceMatrixService();
				service.getDistanceMatrix(
				  {
				    origins: [originA],
				    destinations: [destinationA],
				    travelMode: 'DRIVING',
				    avoidHighways: false,
				    avoidTolls: false,
				  }, callback);

				function callback(response, status) {
					if (status == 'OK') {

						console.log(response);

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
				        if(parseInt(clearDistance) <= 1000){

				        	//distanceLists.push(destinationA);
				        	myApp.alert(to);
				        }
				      }
				    }


				  }
				  else{
				  		myApp.hidePreloader();
				  		myApp.alert("Sorry, i'm having issues talking to Google Maps. Network Error");
				  }
				}
			
			}

			//console.log(distanceLists);
			window.setTimeout(function(){listNearbyAddresses()}, 3000);
		}


			window.setTimeout(function(){talkTogGoogle()}, 5000);

			function listNearbyAddresses(){

					$$.post("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/list_nearby_sellers.php",
					 {nearby_list : distanceLists},
					function(data){
							myApp.hidePreloader();
							$$(".populate-nearby-sellers").removeClass('text-center').html(data);
							//console.log(data);
					},
					function(){
							myApp.hidePreloader();
							myApp.alert("Cannot connect to Cydene Servers");
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

											mainView.router.loadPage("pinexec.html");
											
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
    					mainView.router.loadPage("pinexec.html");

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
		
		var totalPrice, initialPrice;
		if(window.localStorage.getItem("discounted_price")){

			totalPrice = window.localStorage.getItem("discounted_price");
			initialPrice = window.localStorage.getItem("original_total_price");

			var discountValue = parsedCouponDetails.coupon_value;

			$$("#discount-highlighter").html("<b><i>" + discountValue + "% Discount Applied!</i></b>").show();
			cashback = initialPrice - totalPrice;
		}
		else{

			totalPrice = window.localStorage.getItem("original_total_price");
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
								"tnx_coupon_sn" : parsedCouponDetails.coupon_sn,
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
		  componentRestrictions: {country: 'ng'},
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

		        console.log(theAddressLatLng);
		       
		       

		/*$$.post("http://tmlng.com/Mobile_app_repo/php_hub/_Cydene/save_delivery_address.php",
						{
							the_users_phone : window.localStorage.getItem("_cydene_user_phone_no"),
							the_address_name : $$("#the-address-name").val(),
							the_delivery_address : theDeliveryAddress,
							the_address_LatLng : theAddressLatLng
						},
						function(data){
							myApp.hidePreloader();
							console.log(data);
							
							if(data == "Save Successful"){

								myApp.hidePreloader();
								/*mainView.router.loadPage("dashboard.html");
							}
							else{

								myApp.alert("Error saving address, try again later.");

							}
							
						}, function(){

							myApp.alert("Unable to connect to Cydene Servers. Try again later");

						});*/

				} else {

				        myApp.alert('Geocode was not successful for the following reason: ' + status);
				  }


		    });

	});
	



	


}); // Map Exp Page














































    
