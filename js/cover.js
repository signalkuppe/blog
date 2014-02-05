$(document).ready(function()
{


	$(window).scrollTop(0);

	function handleResize()
	{
	var h = $(window).height();
	        $('.cover').css({'height':h+'px'});
	        $('.cover').addClass('is-rendered');
	}

	function checkGuide ()
	{
		$menucontainer.hasClass('is-open') ? $('.cover-guide').hide() : $('.cover-guide').show();
	}

	handleResize();
	
	$(window).resize(function(){
	    handleResize();
	});



	var $menubutton = $("#menu-link");
	var $menucontainer = $("#menu-container");

	$menubutton.click(function()
	{
		$menucontainer.toggleClass("is-open");
		checkGuide();
	})

})