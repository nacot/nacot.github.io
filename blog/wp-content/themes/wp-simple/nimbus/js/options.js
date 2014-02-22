jQuery(document).ready(function($) {
        
    var cookieName = 'stickyTabNewAPI',
            $tabs = $('#options_content'),
            $lis = $tabs.find('ul').eq(0).find('li');

        $tabs.tabs({
            active: ($.cookies.get(cookieName) || 0),
            activate: function (e, ui) {
                $.cookies.set(cookieName, $lis.index(ui.newTab));
            }
        });    

	jQuery('.fade').delay(1000).fadeOut(1000);
	
	jQuery(".info_box_button").fancybox();
	
	jQuery('.colorSelector').each(function(){
		var Othis = this; 
		var initialColor = $(Othis).next('input').attr('value');
		$(this).ColorPicker({
		color: initialColor,
		onShow: function (colpkr) {
		$(colpkr).fadeIn(500);
		return false;
		},
		onHide: function (colpkr) {
		$(colpkr).fadeOut(500);
		return false;
		},
		onChange: function (hsb, hex, rgb) {
		$(Othis).children('div').css('backgroundColor', '#' + hex);
		$(Othis).next('input').attr('value','#' + hex);
	}
	});
	}); 
	
	
	
		 		
});	