jQuery(document).ready(function () {
	jQuery("#first_name_error, #last_name_error, #email_error, #password_error1, #contact_error, #response_error, #rememberreg_error, #email_error_already_register, #otp_field, #ComplateSignupBtn, #regotprequired,#developer_name_container, #developer_name_error, #rera_id_container, #rera_id_error").hide();

	function hideallerrors(contact) {
		jQuery("#first_name_error, #last_name_error, #email_error, #password_error1, #contact_error, #response_error, #rememberreg_error, #email_error_already_register, #developer_name_error, #rera_id_error").hide()
	}
	jQuery("#username_error, #password_error, #login_response_error, #login_inactive_error").hide();
	jQuery("#user_reset_email_error, #response_reset_email_success, #response_reset_email_error, #user_pass_otp_field, #validate_otp, #response_otp_error, #user_pass_set_field, #passwordSet, #password_success_message").hide();
	jQuery("#inq_first_name_err, #inq_last_name_err, #inq_contact_err, #response_inquiry_error, #response_inquiry_success").hide();
	jQuery("#call_first_name_err, #call_contact_err, #call_email_err, #response_call_error, #response_call_success").hide();
	jQuery("#mainpassworderror, #confirmpassworderror, #confirmpassworderrornotmatch").hide();
	jQuery("#register_success_message").hide();
	jQuery("#password_error_message").hide();

	function validateEmail(email) {
		const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email)
	}

	function phonenumber(contact) {
		const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
		return regex.test(contact)
	}
	jQuery('#signup').unbind('click').bind('click', function (e) {
		jQuery('#signup').prop('disabled', true);
		const firstname = jQuery("#first_name").val();
		const lastname = jQuery("#last_name").val();
		const contact = jQuery("#contact").val();
		const email = jQuery("#email").val();
		const password1 = jQuery("#password1").val();
		const rara_id = jQuery("#rera_id").val();
		const developer_name = jQuery("#developer_name").val();
		const checkBox = document.getElementById("checkbox1");
		const user_type = jQuery('.user_type:checked').val();
		jQuery("#email_error_already_register").hide();
		//console.log(user_type);
		
		var error = 0;
		if (firstname.length == "") {
			jQuery("#first_name_error").show();
			var error = 1
		} else {
			jQuery("#first_name_error").hide()
		}
		if (lastname.length == "") {
			jQuery("#last_name_error").show();
			var error = 1
		} else {
			jQuery("#last_name_error").hide()
		}
		if (jQuery('#rera_id_container').is(":visible")) {
			if (rara_id.length == "") {
				jQuery("#rera_id_error").show();
				var error = 1
			} else {
				jQuery("#rera_id_error").hide()
			}
		} else {}
		if (jQuery('#developer_name_container').is(":visible")) {
			if (developer_name.length == "") {
				jQuery("#developer_name_error").show();
				var error = 1
			} else {
				jQuery("#developer_name_error").hide()
			}
		} else {}
		if (contact.length == "" || phonenumber(contact) == !1) {
			jQuery("#contact_error").show();
			var error = 1
		} else {
			jQuery("#contact_error").hide()
		}
		if (email.length == "" || validateEmail(email) == !1) {
			jQuery("#email_error").show();
			var error = 1
		} else {
			jQuery("#email_error").hide();
			jQuery("#email_error_already_register").hide();
		}
		if (password1.length == "") {
			jQuery("#password_error1").show();
			var error = 1
		} else {
			jQuery("#password_error1").hide()
		}
		if (jQuery(checkBox).prop('checked') == !0) {
			//console.log("test")
		}
		if (firstname.length != "" && lastname.length != "" && contact.length != "" && email.length != "" && password1.length != "") {
			jQuery.ajax({
				type: "POST",
				url: "ajax/register.php",
				data: {
					"firstname": firstname,
					"lastname": lastname,
					"email": email,
					"contact": contact,
					"password": password1,
					"user_type": user_type,
					"rera_id": rara_id,
					"developer_name": developer_name
				},
				dataType: 'JSON',
				success: function (feedback) {
					jQuery('#signup').prop('disabled', false);
					if (feedback.status === "error") {
						if (feedback.message === "dupemail") {
							jQuery("#email_error_already_register").show();
							jQuery("#ComplateSignupBtn").hide();
							jQuery("#signup").show()
						}
						if (feedback.message === "internalerr") {
							jQuery("#response_error").show()
						}
					} else if (feedback.status === "success") {
						console.log(feedback);
						jQuery("#signup").hide();
						jQuery("#otp_field").show();
						jQuery("#ComplateSignupBtn").show()
					}
				}
			})
		}
	});
	jQuery("#ComplateSignupBtn").click(function () {
		var error = 0;
		const OtpFieldValue = jQuery("#OtpFieldValue").val();
		const email = jQuery("#email").val();
		if (OtpFieldValue.length == "") {
			jQuery("#regotprequired").show();
			var error = 1
		} else {
			jQuery("#regotprequired").hide()
		}
		//console.log("hello");
		if (error == 0) {
			jQuery.ajax({
				type: "POST",
				url: "ajax/reg_validate_otp.php",
				data: {
					"register_email": email,
					"phone_verify_code": OtpFieldValue
				},
				dataType: 'JSON',
				success: function (feedback) {
					if (feedback.status === "error") {
						console.log(feedback);
						jQuery("#regotprequired").show()
					} else if (feedback.status === "success") {
						jQuery("#regotprequired").hide();
						jQuery("#register_form").hide();
						jQuery("#register_success_message").show()
					}
				}
			})
		} else {
			console.log("error")
		}
	});
	jQuery("#login_btn").click(function () {
		const user_login = jQuery("#user_login").val();
		const user_password = jQuery("#user_password").val();
		var error = 0;
		if (user_login.length == "" || validateEmail(user_login) == !1) {
			jQuery("#username_error").show();
			var error = 1
		} else {
			jQuery("#username_error").hide();
			var error = 0
		}
		if (user_password.length == "") {
			jQuery("#password_error").show();
			var error = 1
		} else {
			jQuery("#password_error").hide();
			var error = 0
		}
		if (error == 0) {
			jQuery.ajax({
				type: "POST",
				url: "ajax/login.php",
				data: {
					"username": user_login,
					"password": user_password
				},
				dataType: 'JSON',
				success: function (feedback) {
					if (feedback.status === "error") {
						console.log(feedback.message);
						if (feedback.message === "InvalidLogin") {
							jQuery("#login_response_error").show()
						}
					} else if (feedback.status === "success") {
						jQuery("#login_response_error").hide();
						location.reload()
					}
				}
			})
		} else {
			console.log("error")
		}
	});
	jQuery("#inq_button").off().on('click', function () {
		const inq_first_name = jQuery("#inq_first_name").val();
		const inq_last_name = jQuery("#inq_last_name").val();
		const inq_contact = jQuery("#inq_contact").val();
		const inq_message = jQuery("#inq_message").val();
		const inq_pro_id = jQuery("#inq_pro_id").val();
		var error = 0;
		console.log(inq_pro_id);
		if (inq_first_name.length == "") {
			jQuery("#inq_first_name_err").show();
			var error = 1
		} else {
			jQuery("#inq_first_name_err").hide();
			var error = 0
		}
		if (inq_last_name.length == "") {
			jQuery("#inq_last_name_err").show();
			var error = 1
		} else {
			jQuery("#inq_last_name_err").hide();
			var error = 0
		}
		if (inq_contact.length == "") {
			jQuery("#inq_contact_err").show();
			var error = 1
		} else {
			jQuery("#inq_contact_err").hide();
			var error = 0
		}
		if (error == 0) {
			jQuery.ajax({
				type: "POST",
				url: "ajax/save_equiry.php",
				data: {
					"first_name": inq_first_name,
					"last_name": inq_last_name,
					"contact": inq_contact,
					"message": inq_message,
					"proid": inq_pro_id
				},
				dataType: 'JSON',
				success: function (feedback) {
					console.log(feedback);
					if (feedback.status === "error") {
						jQuery("#response_inquiry_error").show();
						jQuery("#response_inquiry_success").hide();
						jQuery('#inquiryform')[0].reset()
					} else if (feedback.status === "success") {
						jQuery("#response_inquiry_success").show();
						jQuery("#response_inquiry_error").hide();
						jQuery('#inquiryform').trigger("reset")
					}
				}
			})
		} else {
			console.log("error")
		}
	});
	
	//inquiryform contact form present on property project details page 
	var request;
	jQuery("#contactFormInq").submit(function(event){
			event.preventDefault();
			
			// Abort any pending request
			if (request) {
				request.abort();
			}
			// setup some local variables
			var myform = jQuery(this);

			// Let's select and cache all the fields
			var myinputs = myform.find("input, select, button, textarea");

			// Serialize the data in the form
			var serializedData = myform.serialize();

			// Let's disable the inputs for the duration of the Ajax request.
			// Note: we disable elements AFTER the form data has been serialized.
			// Disabled form elements will not be serialized.
			myinputs.prop("disabled", true);

			// Fire off the request to /form.php
			request = jQuery.ajax({
				url: "ajax/proContactForm.php",
				type: "post",
				data: serializedData,
				dataType: 'JSON',
			});

			// Callback handler that will be called on success
			request.done(function (response, textStatus, jqXHR){
				
				console.log(response.state);
				   if(response.state == "success") {
                       jQuery.notify("Form Submitted Successfully", "success");
					    jQuery("#contactFormInq")[0].reset();
						jQuery('#contactFormInqPopUp').modal('toggle');
                   }else{
                       jQuery.notify("Error While Submitting Form", "error");
					   //jQuery("#contactFormInq")[0].reset()
                   }
			});

			// Callback handler that will be called on failure
			request.fail(function (jqXHR, textStatus, errorThrown){
				// Log the error to the console
				console.error(
					"The following error occurred: "+
					textStatus, errorThrown
				);
				jQuery.notify("Error While Submitting Form", "error");
			});

			// Callback handler that will be called regardless
			// if the request failed or succeeded
			request.always(function () {
				// Reenable the inputs
				myinputs.prop("disabled", false);
			});
	});
	

	
	//inquiryform contact form present on properties page 
	jQuery(document).on("click", ".contact_form_inq", function () {
     var MyProId = jQuery(this).data('id');
	 jQuery('#contactFormInqPopUp').modal('toggle');
	 jQuery('#pro_con_id').val(MyProId);
	});
	
	
		
	//inquiryform contact form present on property project details page 
	var request;
	jQuery("#sitevisit_form").submit(function(event){
			event.preventDefault();
			
			// Abort any pending request
			if (request) {
				request.abort();
			}
			// setup some local variables
			var myform = jQuery(this);

			// Let's select and cache all the fields
			var myinputs = myform.find("input, select, button, textarea");

			// Serialize the data in the form
			var serializedData = myform.serialize();

			// Let's disable the inputs for the duration of the Ajax request.
			// Note: we disable elements AFTER the form data has been serialized.
			// Disabled form elements will not be serialized.
			myinputs.prop("disabled", true);

			// Fire off the request to /form.php
			request = jQuery.ajax({
				url: "ajax/proSiteVisitForm.php",
				type: "post",
				data: serializedData,
				dataType: 'JSON',
			});

			// Callback handler that will be called on success
			request.done(function (response, textStatus, jqXHR){
				
				console.log(response);

				   if(response.state == "success") {
                        jQuery.notify("Site Visit Request Submited", "success");
					    jQuery("#sitevisit_form")[0].reset();
						setTimeout(function () {
                     		jQuery('#inquirynowmodel').modal('toggle');
                 		}, 1000);
						
                   }else{
                       jQuery.notify("Error While Submitting Site Visit Request", "error");
					   //jQuery("#contactFormInq")[0].reset()
                   }
			});

			// Callback handler that will be called on failure
			request.fail(function (jqXHR, textStatus, errorThrown){
		
				// Log the error to the console
				console.error(
					"The following error occurred: "+
					textStatus, errorThrown
				);
				jQuery.notify("Error While Submitting Site Visit Request", "error");
			});

			// Callback handler that will be called regardless
			// if the request failed or succeeded
			request.always(function () {
				// Reenable the inputs
				myinputs.prop("disabled", false);
			});
	});


	jQuery("#resetpass_btn").click(function () {
		const user_reset_email = jQuery("#user_reset_email").val();
		var error = 0;
		if (user_reset_email.length == "" || validateEmail(user_reset_email) == !1) {
			jQuery("#user_reset_email_error").show();
			var error = 1
		} else {
			jQuery("#user_reset_email_error").hide();
			var error = 0
		}
		if (error == 0) {
			jQuery.ajax({
				type: "POST",
				url: "ajax/password-reset.php",
				data: {
					"reset_email": user_reset_email
				},
				dataType: 'JSON',
				success: function (feedback) {
					console.log(feedback);
					if (feedback.status === "error") {
						jQuery("#password_error_message").show();
						if (feedback.message === "error") {
							jQuery("#response_reset_email_error").show();
							jQuery("#response_reset_email_success").hide()
						}
					} else if (feedback.status === "success") {
						jQuery("#password_error_message").hide();
						jQuery("#user_pass_otp_field").show();
						jQuery("#validate_otp").show();
						jQuery("#resetpass_btn").hide();
						jQuery("#response_reset_email_error").hide();
						jQuery("#response_reset_email_success").show()
					}
				}
			})
		} else {
			console.log("error")
		}
	});
	jQuery("#validate_otp").click(function () {
		const user_reset_email = jQuery("#user_reset_email").val();
		const user_reset_otp = jQuery("#user_reset_otp").val();
		var error = 0;
		if (error == 0) {
			jQuery.ajax({
				type: "POST",
				url: "ajax/validate_otp.php",
				data: {
					"reset_email": user_reset_email,
					"phone_verify_code": user_reset_otp
				},
				dataType: 'JSON',
				success: function (feedback) {
					console.log(feedback);
					if (feedback.status === "error") {
						console.log(feedback.message);
						jQuery("#response_reset_email_success").hide();
						jQuery("#response_otp_error").show()
					} else if (feedback.status === "success") {
						jQuery("#response_otp_error").hide();
						jQuery("#response_reset_email_error").hide();
						jQuery("#response_reset_email_success").hide();
						jQuery("#user_pass_set_field").show();
						jQuery("#validate_otp").hide();
						jQuery("#passwordSet").show()
					}
				}
			})
		} else {
			console.log("error")
		}
	});
	jQuery("#passwordSet").click(function () {
		const user_reset_email = jQuery("#user_reset_email").val();
		const reset_new_password = jQuery("#reset_new_password").val();
		const user_reset_otp = jQuery("#user_reset_otp").val();
		var error = 0;
		if (error == 0) {
			jQuery.ajax({
				type: "POST",
				url: "ajax/password-set.php",
				data: {
					"reset_email": user_reset_email,
					"new_password": reset_new_password,
					"phone_verify_code": user_reset_otp
				},
				dataType: 'JSON',
				success: function (feedback) {
					console.log(feedback);
					if (feedback.status === "error") {
						console.log(feedback);
						
					} else if (feedback.status === "success") {
						jQuery("#reset-form").hide();
						jQuery("#password_success_message").show();
					}
				}
			})
		} else {
			console.log("error")
		}
	});
	jQuery("#resetpass_save").click(function () {
		const main_password = jQuery("#main_password").val();
		const id = jQuery("#id").val();
		const hash = jQuery("#hash").val();
		var error = 0;
		if (main_password.length == "") {
			jQuery("#mainpassworderror").show();
			var error = 1
		} else {
			jQuery("#mainpassworderror").hide();
			var error = 0
		}
		if (error == 0) {
			jQuery.ajax({
				type: "POST",
				url: "ajax/password-save.php",
				data: {
					"password": main_password,
					"id": id,
					"hash": hash
				},
				dataType: 'JSON',
				success: function (feedback) {
					//console.log(feedback);
					if (feedback.status === "error") {
						//console.log(feedback.message);
						if (feedback.message === "error") {
							location.reload()
						}
					} else if (feedback.status === "success") {
						location.reload()
					}
				}
			})
		} else {
			//console.log("error")
		}
	});
	jQuery(window).scroll(function () {
			   var width = jQuery(window).width();

					if (jQuery(this).scrollTop() >= 100) {
						jQuery('.sticky-header').addClass('sticky')
					} else {
						jQuery('.sticky-header').removeClass('sticky')
					}
			   
			   
	});

	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition)
		} else {
			console.log('Browser not suppoted')
		}
	}

	function showPosition(position) {
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		//console.log(latitude);
		//console.log(longitude);
		jQuery.ajax({
			type: "POST",
			url: "ajax/location_session.php",
			data: {
				"latitude": latitude,
				"longitude": longitude
			},
			dataType: 'JSON',
			success: function (feedback) {
				//console.log(feedback)
			}
		})
	}

	function initupdateCart() {
		jQuery.ajax({
			type: "GET",
			url: "ajax/get_session_count.php",
			dataType: 'JSON',
			success: function (feedback) {
				//console.log(feedback);
				jQuery('#lblCartCount').html(feedback)
			}
		})
	}
	jQuery("#favoratebtn").click(function () {
		const favproid = jQuery("#favproid").val();
		jQuery.ajax({
			type: "POST",
			url: "ajax/favorate.php",
			data: {
				"favproid": favproid
			},
			dataType: 'JSON',
			success: function (feedback) {
				if (feedback.status === "showunfavorate") {
					jQuery("#favorate").removeClass("favselected")
				}
				if (feedback.status === "showfavorate") {
					jQuery("#favorate").addClass("favselected")
				}
			}
		})
	});
	getLocation();
	initupdateCart()
});

document.addEventListener("DOMContentLoaded", function () {
	var lazyloadImages = document.querySelectorAll("img.lazy");
	var lazyloadThrottleTimeout;

	function lazyload() {
		if (lazyloadThrottleTimeout) {
			clearTimeout(lazyloadThrottleTimeout)
		}
		lazyloadThrottleTimeout = setTimeout(function () {
			var scrollTop = window.pageYOffset;
			lazyloadImages.forEach(function (img) {
				if (img.offsetTop < (window.innerHeight + scrollTop)) {
					img.src = img.dataset.src;
					img.classList.remove('lazy')
				}
			});
			if (lazyloadImages.length == 0) {
				document.removeEventListener("scroll", lazyload);
				window.removeEventListener("resize", lazyload);
				window.removeEventListener("orientationChange", lazyload)
			}
		}, 20)
	}
	document.addEventListener("scroll", lazyload);
	window.addEventListener("resize", lazyload);
	window.addEventListener("orientationChange", lazyload)
});

jQuery(function () {
	jQuery(document).on('change', '.user_type', function () {
		if (jQuery(this).val() == "user") {
			jQuery("#developer_name_container, #developer_name_error, #rera_id_container, #rera_id_error").hide()
		}
		if (jQuery(this).val() == "seller") {
			jQuery("#developer_name_container, #developer_name_error, #rera_id_container, #rera_id_error").hide()
		}
		if (jQuery(this).val() == "agent") {
			jQuery("#rera_id_container").show();
			jQuery("#developer_name_container, #developer_name_error").hide()
		}
		if (jQuery(this).val() == "developer") {
			jQuery("#rera_id_container").hide();
			jQuery("#developer_name_container").show();
		}
	}).change()
});

jQuery('input[type=radio][name=property_type]').change(function () {
	if (this.value == 'plot') {
		$('#search_form').attr('action', 'properties.php')
	} else if (this.value == 'project') {
		$('#search_form').attr('action', 'projects.php')
	}
});

function poulateinquiry(id) {
	document.getElementById("inq_pro_id").value = id
}

function wp_rem_advanced_search_field(counter, tab, element) {
	"use strict";
	if (tab == 'simple') {
		jQuery('#property_type_fields_' + counter).slideUp();
		jQuery('#nav-tabs-' + counter + ' li').removeClass('active');
		jQuery(element).parent().addClass('active')
	} else if (tab == 'advance') {
		jQuery('#property_type_fields_' + counter).slideDown();
		jQuery('#nav-tabs-' + counter + ' li').removeClass('active');
		jQuery(element).parent().addClass('active')
	} else {
		jQuery('#property_type_fields_' + counter).slideToggle()
	}
}



jQuery("#sign-in").on('hide.bs.modal', function(){
    console.log("Hello");
});
  
jQuery('#sign-in').on('hidden.bs.modal', function () {
	console.log("Hello");
    jQuery('#register-form').trigger("reset");
    jQuery('#reset-form').trigger("reset");
    jQuery('#login-form').trigger("reset");
});