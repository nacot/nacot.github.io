<?php
        get_header(); 
        $cb_global_color = ot_get_option('cb_base_color', '#eb9812');
?>

<div id="cb-content" class="wrap clearfix">
    
    <div class="cb-cat-header" style="border-bottom-color:<?php echo $cb_global_color;?>;">
           <h1 id="cb-search-title"><?php _e('Tagged', 'cubell'); ?> <span style="color:<?php echo $cb_global_color; ?>"><?php single_tag_title(); ?></span></h1>
    </div>

    <div id="main" class="clearfix" role="main">
        
        <?php if (have_posts()) { get_template_part('cat', 'style-b'); } ?>

    </div> <!-- end #main -->

	<?php get_sidebar(); ?>

</div> <!-- end #cb-content -->

<?php get_footer(); ?>