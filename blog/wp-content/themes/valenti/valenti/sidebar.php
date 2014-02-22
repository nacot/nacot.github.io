<?php 
        $cb_sidebar_id = NULL;
        
         if ( is_category() ) {
             
            $cb_cat_id = get_query_var( 'cat' );
            $cb_cat = get_category($cb_cat_id);
            $cb_cat_name = sanitize_title( $cb_cat->cat_name );
            $cb_sidebar_id =  $cb_cat_name . '-sidebar';
            
        } elseif ( is_page() ) {
            
            $cb_page_id = get_the_id();   
            $cb_sidebar_id = 'page-'. $cb_page_id .'-sidebar';
              
        } elseif ( function_exists('is_woocommerce') && ( is_woocommerce() ) ) {
            
            $cb_cats = get_the_terms( $post->ID, 'product_cat' );
            
            if ( $cb_cats != NULL ) {
                foreach ($cb_cats as $cb_cat) {
                    $cb_cat_name = sanitize_title( $cb_cat->name );
                } 
                
            } else {
                $cb_cat_name = NULL;
            }
            
            $cb_sidebar_id =  $cb_cat_name . '-sidebar';
            
        } elseif ( is_single() && ( is_attachment() == false ) ) {
            
            $cb_cat = get_the_category( $post->ID );
            $cb_cat_name = sanitize_title( $cb_cat[0]->cat_name );
            $cb_sidebar_id =  $cb_cat_name . '-sidebar';
        }
?>
<aside class="cb-sidebar clearfix" role="complementary">

<?php
			if (is_active_sidebar($cb_sidebar_id) == true) {
			     
	  					dynamic_sidebar( $cb_sidebar_id );
                
			} elseif ( is_active_sidebar( 'sidebar-global' ) ) {
			     
						dynamic_sidebar( 'sidebar-global' );
			} 
?>

</aside>