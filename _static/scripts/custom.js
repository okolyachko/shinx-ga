//Custom JS

//Clear cache for select elements
 
$(document).ready(function () {
    $("select").each(function () {
        $(this).val($(this).find('option[selected]').val());
    });
});

// Fixing sticky header error

$(document).ready(function () {
    $(".headerlink").parent().addClass("anchor-fixed");
});


//API

$('table.api-code-block  td').html(function (i, html) {
	return html.replace(/&nbsp;/g, '');
});


//Logo

$('.site-title').text(' ');
$('.site-title').addClass('logo-img');



