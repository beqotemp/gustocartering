import $ from "jquery";
import slickSlider from 'slick-carousel';
$(document).ready(function(){
  $('.reviews-slider').slick({
  slidesToScroll: 1,
  autoplay: true,
  arrows:true,
  autoplaySpeed: 3000,
	  
  });

  (function(){
    var slides = $('#site-slider .fourth-view_menu__body-content');
    var countSlides = slides.length;
    var curentSlideImg;
    var activeSlide;
    function initSlider() {
       activeSlide  = slides.first().addClass('active-slide');
       slideImg();
    }

    initSlider();
    
    function nextSlide() {
      activeSlide = activeSlide
        .removeClass('active-slide')
        .next()
        .addClass('active-slide')
        if (activeSlide.length ===  0) {
          slides.parent().children().removeClass('active-slide')
          initSlider();
        }
        slideImg();
        
    }
    function prevSlide() {
      //alert('click');
      console.log(activeSlide);
      activeSlide = activeSlide
        .removeClass('active-slide')
        .prev()
        .addClass('active-slide')
        if (activeSlide.length ===  0) {
          slides.parent().children().removeClass('active-slide');
          slides.last().addClass('active-slide')
          slideImg();
          //initSlider();
        }
        slideImg();
        
    }
    function slideImg() {
      var imgId = activeSlide.attr('data-slide-id');
      $('.fourth-view_menu-picture').removeClass('active-image');
      var image = $('div[data-slide-img='+ imgId+']').addClass('active-image');
      
      console.log(image);
    }
    $('#site-slider-next').click(nextSlide)
    $('#site-slider-prev').click(prevSlide);
  }());
});
