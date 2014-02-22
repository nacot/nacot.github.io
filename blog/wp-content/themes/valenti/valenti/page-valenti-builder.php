<?php /* Template Name: Valenti Drag & Drop Builder */

	  get_header(); 
      $cb_page_id = get_the_ID();
      $cb_section_a = get_post_meta($cb_page_id, 'cb_section_a', true);
      $cb_section_b = get_post_meta($cb_page_id, 'cb_section_b', true);
      $cb_section_c = get_post_meta($cb_page_id, 'cb_section_c', true);
      $cb_section_d = get_post_meta($cb_page_id, 'cb_section_d', true);
      
      echo '<div id="cb-content" class="wrap clearfix">';
            
      while ( have_posts()) : the_post(); if ( get_the_content() != NULL) {
                echo '<article id="post-'.get_the_ID().'" '.get_post_class("clearfix").' role="article" itemscope itemtype="http://schema.org/BlogPosting">' . get_the_content() . '</article>';
      } 
      endwhile; 
    
      if ( $cb_section_a != NULL ) {
            $g = $j = $x = 0;
            $cb_section = 'a';
            
            foreach ( $cb_section_a as $cb_module ) {
                
               if ( ( $x == 0 ) && ( 0 === strpos($cb_module['cb_a_module_style'], 'grid') ) ) {
                    echo '<section id="cb-section-a" class="cb-first-true clearfix">';
               } elseif ( $x == 0 ) {
                   echo '<section id="cb-section-a" class="clearfix">';
               }
                
               if ( isset($cb_module['cb_a_latest_posts']) ) {
                   $cb_cat_id_selection = $cb_module['cb_a_latest_posts'];
                   $cb_cat_id = implode(",", $cb_cat_id_selection);
                   $cb_cat_name = get_category($cb_cat_id)->name; 
                   $cb_cat_url = get_category_link($cb_cat_id);
               } else {
                   $cb_cat_id_selection = get_all_category_ids(); 
                   $cb_cat_id = implode(",", $cb_cat_id_selection);
                   $cb_cat_name = get_category($cb_cat_id)->name; 
                   $cb_cat_url = get_category_link($cb_cat_id);
               }
               
               $cb_amount = $cb_module['cb_slider_a'];
               $cb_title = $cb_module['title'];
               $cb_flipped = NULL;
               $cb_style = $cb_module['cb_style_a'];
               if ( $cb_style == 'cb_light_a' ) {
                   $cb_module_style = 'cb-light';
               } else {
                   $cb_module_style = 'cb-dark';
              }
               $cb_ad_code = $cb_module['cb_ad_code_a'];
               $cb_custom = $cb_module['cb_custom_a'];
               $cb_subtitle = $cb_module['cb_subtitle_a'];
               
               if ( $cb_subtitle != NULL ) {
                    $cb_subtitle = '<p>'.$cb_subtitle.'</p>'; 
               }
               
               $cb_module_type = substr_replace( $cb_module['cb_a_module_style'] ,"",-1 );
               
               if  (( ($cb_module_type == 'grid-4-f' ) || ( $cb_module_type == 'grid-5-f' ) || ( $cb_module_type == 'grid-5' ) || ( $cb_module_type == 'grid-4' ) || ( $cb_module_type == 'grid-6' ) ) && ( $g == '0' ) ) {
                     $cb_feature_post = true; 
               } else {
                    $cb_feature_post = false;
               } 
               if ( $cb_module_type == 'grid-4-f' ) {
                   $cb_flipped = 'cb-flipped '; 
                   $cb_module_type = 'grid-4'; 
               }  
               if ( $cb_module_type == 'grid-5-f' ) {
                   $cb_flipped = 'cb-flipped '; 
                   $cb_module_type = 'grid-5'; 
               } 

               if ( function_exists( 'get_tax_meta' ) ) {
                     $cb_category_color = get_tax_meta($cb_cat_id, 'cb_color_field_id');
               } else {
                    $cb_category_color = NULL;
               }
              
               include( locate_template('library/modules/cb-'.$cb_module_type.'.php') );
               $j++;
               $g++;
               $x++;
            }
            echo '</section>';
      }
       
      if ( $cb_section_b != NULL ) {
                
            if ( $cb_section_a == NULL ) { $cb_section_spacing = ' cb-section-top'; } else { $cb_section_spacing = NULL; }
            $j = 0;
            $cb_section = NULL;
            echo '<section id="cb-section-b" class="clearfix'. $cb_section_spacing .'">';
            foreach ( $cb_section_b as $cb_module ) {
               
               if (isset($cb_module['cb_b_latest_posts'])) {
                   $cb_cat_id_selection = $cb_module['cb_b_latest_posts'];
                   $cb_cat_id = implode(",", $cb_cat_id_selection);
                   $cb_cat_name = get_category($cb_cat_id)->name; 
                   $cb_cat_url = get_category_link($cb_cat_id);
               } else {
                   $cb_cat_id_selection = get_all_category_ids(); 
                   $cb_cat_id = implode(",", $cb_cat_id_selection);
                   $cb_cat_name = get_category($cb_cat_id)->name; 
                   $cb_cat_url = get_category_link($cb_cat_id);
               }

               $cb_amount = $cb_module['cb_slider_b'];
               $cb_title = $cb_module['title'];
               $cb_flipped = NULL;
               $cb_style = $cb_module['cb_style_b'];
               if ( $cb_style == 'cb_light_b' ) { $cb_module_style = 'cb-light'; } else { $cb_module_style = 'cb-dark'; }
               $cb_ad_code = $cb_module['cb_ad_code_b'];
               $cb_custom = $cb_module['cb_custom_b'];
               $cb_subtitle = $cb_module['cb_subtitle_b'];
                if ( $cb_subtitle != '' ) { $cb_subtitle = '<p>'. $cb_subtitle .'</p>'; }
               $cb_module_type = substr_replace($cb_module['cb_b_module_style'] ,"",-1);
                
               if ( function_exists( 'get_tax_meta' ) ) {
                     $cb_category_color = get_tax_meta($cb_cat_id, 'cb_color_field_id');
               } else {
                    $cb_category_color = NULL;
               }               

               include( locate_template( 'library/modules/cb-'. $cb_module_type .'.php' ) );
               $j++;  
            }
            echo '</section>';
            if ( is_active_sidebar( 'sidebar-hp-b-'.$cb_page_id ) ) { echo '<aside id="cb-sidebar-b" class="cb-sidebar clearfix'. $cb_section_spacing .'" role="complementary">'; dynamic_sidebar('sidebar-hp-b-'.$cb_page_id); echo '</aside>'; }
       }

       if ( $cb_section_c != NULL ) {
            $j = 0;
            $cb_section = 'c';
            echo '<section id="cb-section-c" class="clearfix">';
            foreach ( $cb_section_c as $cb_module ) {
                
               if ( isset( $cb_module['cb_c_latest_posts'] ) ) {
                   $cb_cat_id_selection = $cb_module['cb_c_latest_posts'];
                   $cb_cat_id = implode(",", $cb_cat_id_selection);
                   $cb_cat_name = get_category($cb_cat_id)->name; 
                   $cb_cat_url = get_category_link($cb_cat_id);
               } else {
                   $cb_cat_id_selection = get_all_category_ids(); 
                   $cb_cat_id = implode(",", $cb_cat_id_selection);
                   $cb_cat_name = get_category($cb_cat_id)->name; 
                   $cb_cat_url = get_category_link($cb_cat_id);
               }

               $cb_amount = $cb_module['cb_slider_c'];
               $cb_title = $cb_module['title'];
               $cb_flipped = NULL;
               $cb_style = $cb_module['cb_style_c'];
               if ($cb_style == 'cb_light_c') {$cb_module_style = 'cb-light';} else {$cb_module_style = 'cb-dark';}
               $cb_ad_code = $cb_module['cb_ad_code_c'];
               $cb_subtitle = $cb_module['cb_subtitle_c'];
               $cb_custom = $cb_module['cb_custom_c'];
                if ( $cb_subtitle != NULL ) { $cb_subtitle = '<p>'. $cb_subtitle .'</p>'; }
               $cb_module_type = substr_replace($cb_module['cb_c_module_style'] ,"",-1);
               
               if ($cb_module_type == 'grid-4-f') {
                    $cb_flipped = 'cb-flipped '; 
                    $cb_module_type = 'grid-4'; 
               }
               if ($cb_module_type == 'grid-5-f') {
                   $cb_flipped = 'cb-flipped '; 
                   $cb_module_type = 'grid-5'; 
               }
               
               if ( function_exists('get_tax_meta') ) {
                     $cb_category_color = get_tax_meta($cb_cat_id, 'cb_color_field_id');
               } else {
                    $cb_category_color = NULL;
               }               

               include( locate_template('library/modules/cb-'. $cb_module_type .'.php') );
               $j++;  
               
                 
            }
            echo '</section>';
       }
       if ( $cb_section_d != NULL ) {
            $j = 0;
            $cb_section = NULL;
            echo '<section id="cb-section-d" class="clearfix">';
            foreach ( $cb_section_d as $cb_module ) {
               
               if ( isset($cb_module['cb_d_latest_posts']) ) {
                   $cb_cat_id_selection = $cb_module['cb_d_latest_posts'];
                   $cb_cat_id = implode(",", $cb_cat_id_selection);
                   $cb_cat_name = get_category($cb_cat_id)->name; 
                   $cb_cat_url = get_category_link($cb_cat_id);
               } else {
                   $cb_cat_id_selection = get_all_category_ids(); 
                   $cb_cat_id = implode(",", $cb_cat_id_selection);
                   $cb_cat_name = get_category($cb_cat_id)->name; 
                   $cb_cat_url = get_category_link($cb_cat_id);
               }

               $cb_amount = $cb_module['cb_slider_d'];
               $cb_title = $cb_module['title'];
               $cb_flipped = NULL;
               $cb_style = $cb_module['cb_style_d'];
               if ( $cb_style == 'cb_light_d' ) { $cb_module_style = 'cb-light'; } else { $cb_module_style = 'cb-dark'; }
               $cb_ad_code = $cb_module['cb_ad_code_d'];
               $cb_custom = $cb_module['cb_custom_d'];
               $cb_subtitle = $cb_module['cb_subtitle_d'];
                if ( $cb_subtitle != NULL ) { $cb_subtitle = '<p>'. $cb_subtitle .'</p>'; }
               $cb_module_type = substr_replace($cb_module['cb_d_module_style'] ,"",-1);
                
               if ( function_exists( 'get_tax_meta' ) ) {
                     $cb_category_color = get_tax_meta($cb_cat_id, 'cb_color_field_id');
               } else {
                    $cb_category_color = NULL;
               }               

               include( locate_template('library/modules/cb-'. $cb_module_type. '.php') );
               $j++;  
            }
            echo '</section>';
            if ( is_active_sidebar( 'sidebar-hp-d-'. $cb_page_id ) ) { echo '<aside id="cb-sidebar-d" class="cb-sidebar clearfix" role="complementary">'; dynamic_sidebar('sidebar-hp-d-'. $cb_page_id); echo '</aside>'; }
       }
?>
	</div> <!-- end #cb-content -->
    
<?php get_footer(); ?>