<?php
$top_scripts = nimbus_get_option('top_scripts_multi');
$bottom_scripts = nimbus_get_option('bottom_scripts_multi');
$post_meta = nimbus_get_option('nimbus_post_meta_blog');
get_header();
get_template_part( 'parts/content', 'page');
get_footer(); 
?>


