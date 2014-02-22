<div class="container">
    <?php 
    get_template_part( 'parts/logo'); 
    $banner_content = trim(get_post_meta($post->ID, 'frontpage_banner_content', true));
    if ( empty($banner_content) ) {
        if (nimbus_get_option('nimbus_example_content') == "on") {
            get_template_part( 'parts/example', 'banner_content');
        }
    } else {
        echo apply_filters('the_content', $banner_content); 
    }
    ?>   
</div>



