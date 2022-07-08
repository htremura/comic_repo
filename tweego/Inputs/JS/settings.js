// Settings header
Setting.addHeader("Content Settings", "Settings controlling how content is displayed in this gallery. Built with Tweego(SugarCube format). Icons from <a href=\"https://game-icons.net/\" target=\"_blank\">game-icons.net</a> https://creativecommons.org/licenses/by/3.0/");

// Name fonts to use in story
var settingfontNames = ["(none)", "Headline", "Lantern", "Oeuf", "Thinstix"];
// Create font handler which removes all fonts and adds the selected font
var settingfontHandler = function () {
    // jQuery-wrap the <html> element
    var $html = $("html");

    // remove any existing font class
    $html.removeClass("font-headline font-lanternfont-oeuf font-thinstix");

    // switch on the font name to add the selected font class
    switch (settings.font) {
    case "Headline":
        $html.addClass("font-headline");
        break;
    case "Lantern":
        $html.addClass("font-lantern");
        break;
    case "Oeuf":
        $html.addClass("font-oeuf");
        break;
    case "Thinstix":
        $html.addClass("font-thinstix");
        break;
    }
};

// Add list of fonts to settings menu for user to change fonts.
Setting.addList("font", {
    label    : "Font:",
    list     : settingfontNames,
    onInit   : settingfontHandler,
    onChange : settingfontHandler
}); // default value not defined, so "(none)" is used
