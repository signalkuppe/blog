$(document).ready(function()
{
    $('a').on('click', function (event)
    {      
        var href = $(this).attr("href");

        // prevent internal links (href.indexOf...) to open in safari if target
        // is not explicitly set_blank, doesn't break href="#" links
        if (href.indexOf(location.hostname) > -1 && href != "#" && $(this).attr("target") != "_blank")
        {
            event.preventDefault();
            window.location = href;
        }

    });    
})