<?php
// this file contains the contents of the popup window
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>Insert Video</title>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.js"></script>
<script language="javascript" type="text/javascript" src="tiny_mce_popup.js"></script>
<link rel="stylesheet" href="css/friendly_buttons_tinymce.css" />


<script type="text/javascript">
 
var ButtonDialog = {
	local_ed : 'ed',
	init : function(ed) {
		ButtonDialog.local_ed = ed;
		tinyMCEPopup.resizeToInnerSize();
	},
	insert : function insertButton(ed) {
	 
		// Try and remove existing style / blockquote
		tinyMCEPopup.execCommand('mceRemoveNode', false, null);
		 
		// set up variables to contain our input values
		var website = jQuery('#button-dialog select#website').val();
		var id = jQuery('#button-dialog input#video-id').val();
	 
		 
		var output = '';
		
		// setup the output of our shortcode
		
		output = '[embedvideo ';
		output += 'id="' + id + '" ';
		output += 'website="' + website +'"';
		output += ']';	

				
		tinyMCEPopup.execCommand('mceReplaceContent', false, output);
		 
		// Return
		tinyMCEPopup.close();
	}
};
tinyMCEPopup.onInit.add(ButtonDialog.init, ButtonDialog);
 
</script>

</head>
<body>
	<div id="button-dialog">
		<form action="/" method="get" accept-charset="utf-8"  onsubmit="javascript:ButtonDialog.insert(ButtonDialog.local_ed);return false;">
 			<div>
				<label for="website">Website</label>
				<select name="website" id="website" size="1">
					<option value="youtube" selected="selected">YouTube</option>
					<option value="vimeo">Vimeo</option>
				</select>
			</div>
            
			<div>
				<label for="video-id">Video ID</label>
				<input type="text" name="video-id" value="" id="video-id" />
			</div>
			
			<div>	
				<a href="javascript:ButtonDialog.insert(ButtonDialog.local_ed)" id="insert" style="display: block; line-height: 24px;">Insert</a>
			</div>
		</form>
	</div>
</body>
</html>