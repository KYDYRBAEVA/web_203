$(document).ready(function() {
	$(".tab_content").hide();
	$("ul.tabs li:first").addClass("active");
	$(".tab_content:first").show();
	
	$("ul.tabs li").click(function()){
			      $("ul.tabs li").removeClass("active");
			      $(this).addClass("active");

	
