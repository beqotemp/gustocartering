import $ from "jquery";
import slickSlider from 'slick-carousel';
$(document).ready(function(){
  $('.menu-slider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  arrows:false,
  row:1,
  autoplaySpeed: 3000,

	  
  });
});
