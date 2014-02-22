<?php /* Category/Blog Style C */
   
    $i = 0;
    
    if (have_posts()) : while (have_posts()) : the_post(); 

        $cb_meta_onoff = ot_get_option('cb_meta_onoff', 'on'); 
        $cb_cat_id = get_the_category($post->ID);
        $cb_post_id = $post->ID;
        $cb_post_format_icon = cb_post_format_check($cb_post_id);        
        $cb_category_color = cb_get_cat_color($cb_post_id);
        
        if ($i  % 3 == 0) {
            $cb_side = NULL; 
            echo '<div class="cb-line clearfix">';
            $cb_closer = true;
        } elseif ($i  % 3 == 2) {
            $cb_side = ' cb-last'; 
            $cb_closer = false;
        } else {
            $cb_closer = true;
            $cb_side = NULL;
        }
    
?>
        <article id="post-<?php the_ID(); ?>" class="cb-blog-style-c clearfix<?php if (is_sticky()) { echo ' sticky'; } echo $cb_side; ?>" role="article">
        
          <div class="cb-mask" style="background-color:<?php echo $cb_category_color;?>;">
               <?php
                            cb_thumbnail('360', '240'); 
                            echo cb_review_ext_box($cb_post_id, $cb_category_color); 
                            echo $cb_post_format_icon; 
              ?>
          </div>
                
          <div class="cb-meta">
          
             <h2 class="h4"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2> 
             <?php echo cb_byline(); ?>
             <div class="cb-excerpt"><?php echo cb_clean_excerpt(150, false); ?></div>
          
          </div>
          
        </article>
<?php   
        if ($i  % 3 == 2) { echo '</div>'; }
        $i++; 
        endwhile; 
        if ($cb_closer == true) {echo '</div>';}
        cb_page_navi(); 
        endif; 
?>