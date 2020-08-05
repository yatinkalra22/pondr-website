jQuery(document).ready(function($) {
  "use strict";
  
  $('form.signup_form').submit(function() {
    // Email Regex - Sudama [26-06-2020]
    let email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    let error = true;
    let checkBoxValue = [];
    
    // Fetching Checkbox Value -Sudama [26-06-2020]
    $('input[name=interest_reason]:checked').each(function() {
      checkBoxValue.push($(this).val())
    });
    $('.validate').html('').hide();

    // Validate Email Address - Sudama [26-06-2020]
    if(!email_regex.test($('input[name=email]').val())) {
      $('input[name=email]').focus();
      $('.emailvalidation').html('Please Enter Valid Email Address').show();
      error = true;

      // Validate Short Name of BetaUser - Sudama [26-06-2020]
    } else if($('input[name=nickname]').val().length < 4) {
      $('input[name=nickname]').focus();
      $('.nicknamemsg').html('Please Enter At least 4 Characters').show();
      error = true;

      // Validate Relation - Sudama [26-06-2020]
    } else if($('input[type=radio][name=relation]:checked').length == 0) {
      $('input[name=relation]').focus();
      $('.relationmsg').html('Please Select at least One Option').show();
      error = true;

      // Validate Relation Input if other is selected - Sudama [26-06-2020]
    } else if($('input[name=relation]:checked').val() == 'other' && $('input[name=relation_other_input]').val().length == 0) {
      $('input[name=relation_other_input]').focus();
      $('.relationmsg').html('Please Enter Some Value').show();
      error = true;

      // Validate Having Chidren - Sudama [26-06-2020]
    } else if($('input[name=having_children]:checked').length == 0) {
      $('input[name=having_children]').focus();
      $('.having_children_msg').html('Please Select at least One Option').show();
      error = true;

      // Validate Interest Reason - Sudama [26-06-2020]
    } else if($('input[name=interest_reason]:checked').length == 0) {
      $('input[name=interest_reason]').focus();
      $('.interest_reason_msg').html('Please Select at least One Option').show();
      error = true;

      // Validate Interest Reason Other Input if checked - Sudama [26-06-2020]
    } else if((checkBoxValue[checkBoxValue.length - 1] == 'other') && ($('input[name=interest_reason_input]').val().length == 0)) {
      $('input[name=interest_reason_input]').focus();
      $('.interest_reason_msg').html('Please Enter Some Value').show();
      error = true;

      // Validate education level - Sudama [26-06-2020]
    } else if($('input[name=edu_level]:checked').length == 0) {
      $('input[name=edu_level]').focus();
      $('.edu_level_msg').html('Please Select at least One Option').show();
      error = true;

      // Validate Usage Commit - Sudama [26-06-2020]
    } else if($('input[name=usage_commit]:checked').length == 0) {
      $('input[name=usage_commit]').focus();
      $('.usage_commit_msg').html('Please Select at least One Option').show();
      error = true;

      // Validate feedback Commit - Sudama [26-06-2020]
    } else if($('input[name=feedback_commit]:checked').length == 0) {
      $('input[name=feedback_commit]').focus();
      $('.feedback_commit_msg').html('Please Select at least One Option').show();
      error = true;

    } else {

      // No errors send data to api - Sudama [26-06-2020]
      let payload = {};
      payload.email = $('input[name=email]').val();
      payload.osType = $('select[name=os_type]').children("option:selected").val();
      payload.nickname = $('input[name=nickname]').val();

      if($('input[name=relation]:checked').val() == 'other') {
        payload.userRelation = $('input[name=relation_other_input]').val();
      } else {
        payload.userRelation = $('input[name=relation]:checked').val();
      }

      if($('input[name=having_children]:checked').val() == "true") {
        payload.haveChild = true;
      } else {
        payload.haveChild = false;
      }

      if(checkBoxValue[checkBoxValue.length - 1] == 'other') {
        checkBoxValue.pop();
        checkBoxValue.push($('input[name=interest_reason_input]').val());
      }
      
      payload.interestReasons = [...checkBoxValue];
      payload.educationLevel = $('input[name=edu_level]:checked').val();

      if($('input[name=usage_commit]:checked').val() == "true") {
        payload.usageCommit = true;
      } else {
        payload.usageCommit = false;
      }
      
      if($('input[name=feedback_commit]:checked').val() == "true") {
        payload.feedbackCommit = true;
      } else {
        payload.feedbackCommit = false;
      }

      $('.sent-message').slideUp();
      $('.error-message').slideUp();
      $('.loading').slideDown();
     

      //Call Api Funtion - Sudama [26-06-2020]
      const sendBetaUserData = async (payload) => {
        const response = await fetch('https://demo-api.deviecoach.com/api/beta-users/new', {
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
          setTimeout(() => {
            location.href = 'signupsuccess.html'
          }, 2000)
        } else {
          $('.error-message').slideDown().html("Something Wents Wrong");
        }
      }
      sendBetaUserData(payload);
    }

    return false;
  })
});