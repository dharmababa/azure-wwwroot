
// Initialize Google Analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-36595207-1']);
_gaq.push(['_trackPageview']);

(function () {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();


// Initialize Page
$(document).ready(function () {

    // Highlight Menu Control
    var location = window.location.pathname.toLowerCase();
    var path = location.split('/');
    var view = path[1];
    var page = path[2];

    if (location === "/") {
        $("#WelcomeMenu").addClass("menuItemSelected");
    }
    else if (view === "home" && page === "welcome") {
        $("#WelcomeMenu").addClass("menuItemSelected");
    }
    else if (view === "inventory") {
        $("#InventoryMenu").addClass("menuItemSelected");
    }
    else if (view === "home" && page === "financing") {
        $("#FinancingMenu").addClass("menuItemSelected");
    }
    else if (view === "home" && page === "contact") {
        $("#ContactMenu").addClass("menuItemSelected");
    }
    else if (view === "home" && page === "espanol") {
        $("#EspanolMenu").addClass("menuItemSelected");
    }
    else {
        $("#PortalMenu").addClass("menuItemSelected");
    }

    // Initialize Search Control
    $("#menuSearchIcon").click(function () {
        var search = $("#menuSearchEdit").val();
        if (search.length > 0) {
            window.location = "http://" + window.location.host + "/Inventory/Search?search=" + search;
        }
        else {
            $("#menuSearchEdit").focus();
        }
    });

    // Perform Search from Enter Key
    $("#menuSearchEdit").keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            $("#menuSearchIcon").click();
        }
    });

    // Handle Keyboard Shortcuts
    $(document).keydown(function (e) {
        // (G)oto: Move selection to the search box.
        if (e.ctrlKey && e.keyCode == 71) {
            $("#menuSearchEdit").focus();
            e.preventDefault();
        }
        // (L)ogin: Navigate to the Login page.
        else if (e.ctrlKey && e.keyCode == 76) {
            window.location = "http://" + window.location.host + "/Account/Login";
            e.preventDefault();
        }
    });

});

// Global Support Functions

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
}
