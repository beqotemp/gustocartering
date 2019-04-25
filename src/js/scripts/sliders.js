import $ from "jquery";
import slickSlider from 'slick-carousel';
$(document).ready(function(){
  $('.reviews-slider').slick({
  slidesToScroll: 1,
  autoplay: true,
  arrows:true,
  autoplaySpeed: 3000,
	  
  });
});