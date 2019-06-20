jQuery(document).ready(function($) {
	'use strict';

  var top_header = $('.parallax-content');
  top_header.css({'background-position':'center center'}); // better use CSS

  $(window).scroll(function () {
    var st = $(this).scrollTop();
    top_header.css({'background-position':'center calc(50% + '+(st*.8)+'px)'});

    var windowHeight = $(this).scrollTop();
    var about = $("#about").offset();
    about = about.top;
    if( st >= about  ){
      initForm();
    } else {
      initedForm = false;
    }
  });

});
