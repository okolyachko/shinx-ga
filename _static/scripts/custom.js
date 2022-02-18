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
	 
    if ($("#wide-content").length) {
		if ($(window).width() > 1024 ) {
		($(".toc-drawer").removeClass("no-toc"));
		($(".toc-drawer").css("display", "none"));
		($(".content").width("61em"));
		$('.alan-footer').css('margin-right', '-3.5em');
		$('article').css('margin-right', '15em');
		$('.related-pages').css('margin-right', '15em');
    }
        		
	} else if ($("#main-page").length) {		
			($(".toc-drawer").removeClass("no-toc"));
			($(".toc-drawer").css("display", "none"));
			($(".content").width("61em"));
			$('.alan-footer').css('margin-right', '-3.5em');       		
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
	$('a[href^="http://"], a[href^="https://"], a[href^="mailto:"]').not('a[class*=internal]').attr('target', '_blank');
});

// Expanding dropdowns on ctrl + f clicked

$(document).keydown(function(e) {
        if (e.keyCode == 70 && e.ctrlKey) {
            $(".dropdown").prop("open", true);
        }
    });
	
// Adding how-to headings to the right TOC

$(document).ready(function () {
    if ($("#how-to").length) {
		$("h3.anchor-fixed").addClass("how-to-anchor");
		$("h3.headerlink").css('color', '#fff');
		if(window.location.hash) {
           var hash = window.location.hash.substring(1);
		   $('#' + hash).children(".dropdown").prop("open", true);
         }
	}
});

// Expanding how-tos onclick

$(document).ready(function(){
	if ($("#how-to").length) {
    $('.toc-tree a').click(function(){
        var hash = $(this).attr('href');
		$('a.headerlink[href="'+hash+'"]').parent("h3").siblings(".dropdown").prop("open", true);
    });
	}
});






