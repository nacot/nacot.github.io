 <?php /* Module: B */

	$cb_meta_onoff = ot_get_option('cb_meta_onoff', 'on');
	$i = 0 ;
    $cb_wrap = 'cb-module-b';
    
	$cb_args = array( 'cat' => $cb_cat_id, 'post_type' => 'post', 'post_status' => 'publish', 'posts_per_page' => $cb_amount,  'ignore_sticky_posts'=> 1);
	
	$cb_qry = $cb_title_header = NULL;
	$cb_qry = new WP_Query($cb_args);
	
	if( $cb_qry->have_posts() ) {
		
	  while ($cb_qry->have_posts()) : $cb_qry->the_post();
      $cb_post_id = $post->ID; 
      $cb_post_format_icon = cb_post_format_check($cb_post_id);
      $cb_category_color = cb_get_cat_color($cb_post_id);
      if ($cb_title != NULL) {
         $cb_title_header = '<div class="cb-module-header" style="border-bottom-color:'. $cb_category_color.';"><h2 class="cb-module-title" >'.$cb_title.'</h2>'.$cb_subtitle.'</div>';
      }
	
      $i++;  
      if ($i == 1) {
          echo '<div class="'.$cb_wrap.' '.$cb_module_style.' cb-module-half clearfix">'. $cb_title_header;
?>
        <article class="cb-article cb-big clearfix" role="article">
              
               <div class="cb-mask" style="background-color:<?php echo $cb_category_color;?>;">
                   <?php
                            cb_thumbnail('360', '240'); 
                            echo cb_review_ext_box($cb_post_id, $cb_category_color); 
                            echo $cb_post_format_icon; 
                    ?>
               </div>
                
               <div class="cb-meta"> 
        
                     <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                        
                     <?php echo cb_byline(); ?>
                    
                    <div class="cb-excerpt"><?php echo cb_clean_excerpt(120); ?></div>
                    
               </div>
                                 
        </article> 
		
<?php } else { ?>

        <article class="cb-article cb-small clearfix" role="article">
    	    
      	 	<div class="cb-mask" style="background-color:<?php echo $cb_category_color;?>">
      	 	    <?php
                        cb_thumbnail('80', '60'); 
                        echo cb_review_ext_box($cb_post_id, $cb_category_color, true); 
                        echo $cb_post_format_icon; 
                ?>
      	 	</div>
             
            <div class="cb-meta">
                
                <h2 class="h4"><a href="<?php the_permalink();?>"><?php the_title(); ?></a></h2>
             
                <?php echo cb_byline(true, $cb_post_id, true); ?>
                     
            </div>
             
    	</article> 
                        
<?php 	} 
		
		endwhile; 
		
		echo '</div>';
		
	} // endif
		
	wp_reset_postdata(); 
?>