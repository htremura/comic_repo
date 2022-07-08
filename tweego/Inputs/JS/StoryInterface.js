// Add favicon to html page
$(document.createElement('link'))
    .attr({
        href : Story.get('favicon').text,
        rel  : 'icon'
    })
    .appendTo(document.head);
    
// Add image of settings icon to menu
$(document.createElement('img'))
    .attr({
        src :  Story.get('settings').text
    })
    .appendTo('#menu-item-settings a');

// Add image of restart icon to menu
$(document.createElement('img'))
    .attr({
        src :  Story.get('restart').text
    })
    .appendTo('#menu-item-restart a');
    
// Add image of menu closing icon to menu
$(document.createElement('img'))
    .attr({
        src :  Story.get('menu-close').text
    })
    .appendTo('#menu-item-toggle a');
    
// Add image of menu opening icon to menu
$(document.createElement('img'))
    .attr({
        src :  Story.get('menu-open').text
    })
    .appendTo('#menu-item-toggle-closed a');
	
$('#menu-item-settings')
	.ariaClick({label : 'Settings'}, 
	function () {
		UI.settings();
	});
	
    $('#menu-item-restart')
	.ariaClick({label : 'Restart'}, 
	function () {
		UI.restart();
    });
    
// Hide menu and show menu toggler
$('.menu-item').hide();
$('#menu-item-toggle-closed').show(); 
$('#menu-item-toggle, #menu-item-toggle-closed')
	.ariaClick({label : 'Menu Toggle'}, 
	function () {
         $('.menu-item').toggle(0);
    });
