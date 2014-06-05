$(document).ready(function()
{
	$('a').smoothScroll({
		preventDefault: false
	});
})

$(document).on("click","a",function() {
    $(this).smoothScroll({
		preventDefault: false
	});

	console.log('click')
});




