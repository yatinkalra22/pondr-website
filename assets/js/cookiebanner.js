$(window).on('load', function() {
  const isAccepted = $.cookie('cookieAccepted');
  if (isAccepted == 'true' || isAccepted == true) {
    
  } else {
    $('.cookie_banner').removeClass('d-none');
  }
});

$(document).on('click', '.accept_button', function() {
  $.cookie('cookieAccepted', 'true', {expires : 700});
  $('.cookie_banner').addClass('hide');
  $('.cookie_banner').fadeOut(1500);
});

$(document).on('click', '.close_banner', function() {
  $('.cookie_banner').addClass('hide');
  $('.cookie_banner').fadeOut(1500);
});
