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