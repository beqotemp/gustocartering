import $ from 'jquery';

$( document ).ready(function() {
    $('#pol-open').click(function() {
     	$(".pol__body").addClass("active-pol");

    });
    $("#pol-close").click(function() {
     	$(".pol__body").removeClass("active-pol");

    });
});
    	