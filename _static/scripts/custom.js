//Custom JS

// Recolor - experiment

$(document).ready(function () {
    if ($("#green-background").length) {
		$("body").get(0).style.setProperty("--main-color", "#149086");
		$("body").get(0).style.setProperty("--main-color-background", "#149086");
		$("body").get(0).style.setProperty("--link-background", "#007b781a");
	} else if ($("#blue-background").length) {
		$("body").get(0).style.setProperty("--main-color", "#0060b9");
		$("body").get(0).style.setProperty("--main-color-background", "#0060b9");
		$("body").get(0).style.setProperty("--link-background", "#0060b91a");
	} else if ($("#purple-background").length) {
		$("body").get(0).style.setProperty("--main-color", "#5536b3");
		$("body").get(0).style.setProperty("--main-color-background", "#5536b3");
		$("body").get(0).style.setProperty("--link-background", "#5536b31a");
	} else if ($("#orange-background").length) {
		$("body").get(0).style.setProperty("--main-color", "#cc420a");
		$("body").get(0).style.setProperty("--main-color-background", "#cc420a");
		$("body").get(0).style.setProperty("--link-background", "#cc420a1a");
	}
});

// Footer fixing

$(document).ready(function () {
    if ($(".no-toc").length) {
		$('.alan-footer').css('margin-right', '-3.5em');
	} 
});

// Main page width

$(document).ready(function () {
    if ($("#main-page").length) {
		($(".toc-drawer").removeClass("no-toc"));
		($(".toc-drawer").width("0em"));
		($(".content").width("63em"));
		$('.alan-footer').css('margin-right', '-6em');
		
	}
});

// Removing prev page from main page 

$(document).ready(function () {
    if ($("#title-no").length) {
		$('.prev-page').css('display', 'none');
	} 
});

// Fixing sticky header error

$(document).ready(function () {
    $(".headerlink").parent().addClass("anchor-fixed");
});

// Adding target to external links

$(document).ready(function () {
	$('a[href^="http://"], a[href^="https://"]').not('a[class*=internal]').attr('target', '_blank');
});

// Expanding dropdowns on ctrl + f clicked

$(document).keydown(function(e) {
        if (e.keyCode == 70 && e.ctrlKey) {
            $(".dropdown").prop("open", true);
        }
    });
	

