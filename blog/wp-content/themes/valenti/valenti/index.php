<?php 
    get_header(); 
    $cb_full_feature = ot_get_option( 'cb_hp_gridslider', 'cb_full_off' ); 
    $cb_feature_post  = true;
    $cb_blog_style = ot_get_option( 'cb_blog_style', 'style-a' );
    $cb_full_feature_cats = ot_get_option( 'cb_gridslider_category', '' );
    if ( $cb_blog_style == 'style-c' ) {
        $cb_blog_width = 'cb-full-width'; 
    } else {
        $cb_blog_width = 'cb-standard'; 
    }
?>

<div id="cb-content" class="wrap clearfix">
     
    <?php if ($cb_full_feature != 'cb_full_off') {
        
                    $cb_flipped = $cb_title = $cb_module_style = NULL;
                    $cb_section = 'a';
                    if ( $cb_full_feature_cats == NULL ) {
                         $cb_full_feature_cats = get_all_category_ids(); 
                    }
                    $cb_cat_id = implode(",", $cb_full_feature_cats);
                    include( locate_template( 'library/modules/cb-'.$cb_full_feature.'.php' ) );
     } ?>  
        
    <div id="main" class="<?php echo $cb_blog_width; ?> clearfix" role="main">
      
      <?php get_template_part('cat', $cb_blog_style); ?>

    </div> <!-- end #main -->

    <?php if ( $cb_blog_style != 'style-c' ) {
                get_sidebar(); 
          } 
    ?>
    
</div> <!-- end #cb-content -->
    
<?php get_footer(); ?>