 <?php /* Module: D */
						
        $j++;
		$cb_args = array( 'cat' => $cb_cat_id, 'post_type' => 'post', 'post_status' => 'publish', 'posts_per_page' => $cb_amount, 'ignore_sticky_posts'=> 1);
        
        $cb_module_type = 'cb-module-d';
		$cb_qry = $cb_title_header = NULL;
		$cb_qry = new WP_Query($cb_args);
        $cb_count = 1;
         
		if( $cb_qry->have_posts() ) {
					          
		  while ($cb_qry->have_posts()) : $cb_qry->the_post(); 
          
          $cb_post_id = $post->ID;
          $cb_category_color = cb_get_cat_color($cb_post_id);
          
          if ($cb_title != NULL) {
             $cb_title_header = '<div class="cb-module-header" style="border-bottom-color:'. $cb_category_color.';"><h2 class="cb-module-title" >'.$cb_title.'</h2>'.$cb_subtitle.'</div>';
          }
      
       if ( $cb_count == 1 ) {
             echo '<div class="'.$cb_module_type.' '.$cb_module_style.' cb-module-half clearfix">'.$cb_title_header; 
       }
?>
        <article class="cb-article clearfix" role="article">
            
            <div class="cb-meta">
                <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
           
                <?php echo cb_byline(true); ?>
             
                <div class="cb-excerpt"><?php echo cb_clean_excerpt(120); ?></div>
            </div>
                    
        </article> 
                   
<?php 
          $cb_count++;
		  endwhile; 
		  
	   echo '</div>';		  
	 }
	
	wp_reset_postdata(); 
?>