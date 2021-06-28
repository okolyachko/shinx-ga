//Custom JS

// Changing color

$(document).ready(function () {
    if ($("#green-background").length) {
		$("body").get(0).style.setProperty("--main-color", "#149086");
		$("body").get(0).style.setProperty("--main-color-background", "rgba(20,144,134,0.1)replace(/[^,]+(?=\))/, '0.1')");
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
	

