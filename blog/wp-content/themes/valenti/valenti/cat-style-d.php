<?php /* Category/Blog Style D */

if (have_posts()) : while (have_posts()) : the_post(); 

	$cb_meta_onoff = ot_get_option('cb_meta_onoff', 'on'); 
    $cb_post_id = $post->ID;
    $cb_cat_id = get_the_category( $cb_post_id );
    $cb_post_format_icon = cb_post_format_check( $cb_post_id );    
    $cb_category_color = cb_get_cat_color( $cb_post_id );
?>

<article id="post-<?php the_ID(); ?>" class="cb-blog-style-d clearfix<?php if (is_sticky()) echo ' sticky'; ?>" role="article">
    
    <div class="cb-mask" style="background-color:<?php echo $cb_category_color;?>;">
        <?php
            cb_thumbnail('750', '400'); 
            echo cb_review_ext_box($cb_post_id, $cb_category_color); 
            echo $cb_post_format_icon; 
        ?>
    </div>
        
    <div class="cb-meta">
  
        <h2 class="h4"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2> 
        <?php echo cb_byline(); ?>
        <div class="cb-excerpt"><?php echo cb_clean_excerpt(260, false); ?></div>
        
  
    </div>
  
</article>

<?php
     endwhile;
     cb_page_navi();  
     endif; 
?>