jQuery(document).ready(function($) {
  "use strict";
  
  $('form.contactus_form').submit(function() {
    let email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    let error = true;
    $('.validate').html('').hide();

    // Validate Name - Sudama [26-06-2020]
    if($('input[name=name]').val().length === 0) {
      $('input[name=name]').focus();
      $('.name_msg').html('Please Enter Your Name').show();
      error = true;

      // Validate Email Address - Sudama [26-06-2020]
    } else if(!email_regex.test($('input[name=email]').val())) {
      $('input[name=email]').focus();
      $('.email_msg').html('Please Enter Valid Email Address').show();
      error = true;

      // Validate Subject - Sudama [26-06-2020]
    } else if($('input[name=subject]').val().length < 10) {
      $('input[name=subject]').focus();
      $('.subject_msg').html('Please Enter At least 10 Characters').show();
      error = true;
    }
    // Validate Message - Sudama [26-06-2020]
     else if($('textarea[name=message]').val().length == 0) {
      $('textarea[name=message]').focus();
      $('.message_msg').html('Please Enter Your Message').show();
      error = true;
    } else if($('input[name=subscribe]:checked').length == 0) {
      $('input[name=subscribe]').focus();
      $('.subscribe_msg').html('Please Select At least One Option').show();
      error = true;
    } else {
      let payload = {};
      payload.name = $('input[name=name]').val();
      payload.email = $('input[name=email]').val();
      payload.subject = $('input[name=subject]').val();
      payload.message = $('textarea[name=message]').val();

      if($('input[name=subscribe]:checked').val() == "true") {
        payload.subscribe = true;
      } else {
        payload.subscribe = false;
      }

      $('.sent-message').slideUp();
      $('.error-message').slideUp();
      $('.loading').slideDown();
     
      // Function to Send Feedback Data - Sudama [26-06-2020]
      const postContactFeedback = async (payload) => {
        const response = await fetch('https://demo-api.deviecoach.com/api/contact-us-feedback/new', {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const myJson = await response.json();
        if(response.status == 200) {
          $('.loading').slideUp();
          $('.sent-message').slideDown();
          $("input:not(input[type=submit]), textarea").val('');
        } else {
          $('.error-message').slideDown().html("Something Wents Wrong");
        }
      }

      // Calling Funtion - Sudama [26-06-2020]
      postContactFeedback(payload);
    }

    return false;
  })
});