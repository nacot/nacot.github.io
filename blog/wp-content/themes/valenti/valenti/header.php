<?php 	
		$cb_logo = ot_get_option('cb_logo_url', false);
		$cb_sticky_onoff = ot_get_option('cb_sticky_nav', 'on');
		$cb_banner = ot_get_option('cb_banner_selection', false);
        $cb_banner_code = ot_get_option('cb_banner_code', NULL);        
        $cb_head_code = ot_get_option('cb_custom_head', NULL);        
        $cb_theme_style = ot_get_option('cb_theme_style', 'cb_boxed');        
        $cb_breaking_news = ot_get_option('cb_breaking_news', 'off');        
        $cb_nav_style = ot_get_option('cb_menu_style', 'cb_dark'); 
        $cb_featured_image_style_override_onoff = ot_get_option('cb_post_style_override_onoff', 'off');
        $cb_featured_image_style_override_style = ot_get_option('cb_post_style_override', 'standard');
        $cb_favicon = ot_get_option('cb_favicon_url', false);
        $cb_bg_to = ot_get_option('cb_bg_to', 'off');
        $cb_mobile_slidein_menu = ot_get_option('cb_mobile_slidein_menu', 'on');

        $cb_featured_image_style = $cb_post_format = $cb_bg_ad = $cb_ad_wrap_fix = $cb_bg_to_margin_top = $cb_bg_to_img = NULL; 

        if ( ( $cb_bg_to == 'global' ) || ( ( $cb_bg_to == 'only-hp' ) && ( is_front_page() == TRUE ) ) ) {
            $cb_bg_to_margin_top = ot_get_option('cb_bg_to_margin_top', NULL);
            $cb_bg_to_url = ot_get_option('cb_bg_to_url', NULL);
            $cb_bg_to_img = ot_get_option('cb_bg_to_img', NULL);
            $cb_bg_ad = '<a href="'. $cb_bg_to_url .'" target="_blank" id="cb-bg-to"></a>';
            $cb_ad_wrap_fix = ' cb-rel-wrap';

            if ( $cb_bg_to_margin_top != NULL ) {
                $cb_bg_to_margin_top = ' style="margin-top:'. $cb_bg_to_margin_top[0] . $cb_bg_to_margin_top[1] . ';"';
            }
            if ( $cb_bg_to_img != NULL ) {
                $cb_bg_to_img = 'style="background-color: #fff; background-image: url('. $cb_bg_to_img .'); background-attachment: fixed; background-position: 50% 0%; background-repeat: no-repeat no-repeat;"';
            }     
        }
        
        if ( $post != NULL ) {
            
            $cb_post_id = $post->ID;
            $cb_featured_image_style = get_post_meta( $cb_post_id, 'cb_featured_image_style', true );
            $cb_post_format = get_post_format($cb_post_id);
            $cb_review_checkbox = get_post_meta($cb_post_id, 'cb_review_checkbox', true );

            if ( $cb_featured_image_style_override_onoff == 'on' ) {
               $cb_featured_image_style = $cb_featured_image_style_override_style;
            }
        }
        
        if ( ( ( $cb_featured_image_style == 'full-background' ) || ( $cb_featured_image_style == 'parallax' ) ) && ( $cb_post_format != 'gallery' ) ) {
                      $cb_container_classes = 'cb-no-top'; 
                      $cb_bg_ad = $cb_bg_to_img = $cb_bg_to_margin_top = NULL;   
        } elseif ( $cb_theme_style == 'cb_boxed' ) {
                      $cb_container_classes = 'cb-boxed wrap clearfix';
                      if ( $cb_ad_wrap_fix != NULL ) {
                          $cb_container_classes .= $cb_ad_wrap_fix;
                      }
        }
?>

<!DOCTYPE html>

<!--[if lt IE 7]><html <?php language_attributes(); ?> class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if (IE 7)&!(IEMobile)]><html <?php language_attributes(); ?> class="no-js lt-ie9 lt-ie8"><![endif]-->
<!--[if (IE 8)&!(IEMobile)]><html <?php language_attributes(); ?> class="no-js lt-ie9"><![endif]-->
<!--[if gt IE 8]><!--> <html <?php language_attributes(); ?> class="no-js"><!--<![endif]-->

	<head>
	    
		<meta charset="utf-8">

		<!-- Google Chrome Frame for IE -->
		<!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=edge" /><![endif]-->
		
        <title><?php wp_title(); ?></title>

		<!-- mobile meta -->
		<meta name="HandheldFriendly" content="True">
		<meta name="MobileOptimized" content="320">
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>

		<link rel="shortcut icon" href="<?php echo $cb_favicon; ?>">

		<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">

		<!-- Holding main menu -->
		<?php  if ( has_nav_menu( 'main' ) ) {
		    
                    if ($cb_theme_style == 'cb_boxed') { $cb_class = ''; } else {$cb_class = 'clearfix';}
    					$cb_main_menu = wp_nav_menu(
    						array(
    							'echo'           => FALSE, 
    					    	'container_class' => $cb_class,  			
    					    	'container_id'         => 'cb-main-menu',
    					    	'theme_location' => 'main',                    
    					        'depth' => 0,                                   
    							'walker' => new CB_Walker,									
    							'items_wrap' => '<ul class="nav main-nav clearfix">%3$s</ul>',
    							)); 
				}
		?>
		
		<?php if ( $cb_head_code != NULL ) { echo $cb_head_code; } ?>
		
		<!-- head functions -->
		<?php wp_head(); ?>
		<!-- end head functions-->

	</head>

	<body <?php body_class(); echo $cb_bg_to_img; ?>>

        <?php echo $cb_bg_ad; ?>
        
	    <div id="cb-outer-container"<?php echo $cb_bg_to_margin_top; ?>>

    		<div id="cb-container" class="<?php echo $cb_container_classes; ?>" <?php if ( $cb_review_checkbox == '1' ) { echo 'itemprop="review" itemscope itemtype="http://schema.org/Review"'; }?> >
    
                <header class="header clearfix<?php if ( $cb_theme_style == 'cb_boxed' ) echo ' wrap'; ?>" role="banner">
    				
                        <div class="wrap clearfix">
                                <?php if ( $cb_logo != false ) {
                                        $cb_logo_src = wp_get_attachment_image_src( cb_get_image_id( $cb_logo ), 'full' );
                                        $cb_logo_size = 'width="'. $cb_logo_src[1] .'" height="'. $cb_logo_src[2] .'"';
                                        $cb_logo_retina = substr($cb_logo, 0 , -4);       
                                        $cb_logo_retina_ext = substr($cb_logo, -4);      

                                    ?>
                                        <div id="logo" <?php if ($cb_banner == 'cb_banner_728') { echo 'class="cb-with-large"'; } ?> >
                                            <a href="<?php echo home_url();?>">
                                                <img src="<?php  echo $cb_logo; ?>" alt="<?php bloginfo('name');?> logo" <?php echo $cb_logo_size; ?> data-retina-src="<?php echo $cb_logo_retina . '@2x' . $cb_logo_retina_ext; ?>" />
                                            </a>
                                        </div>
                                <?php } 
                                        if ($cb_banner == 'cb_banner_468') { 
                                            echo  '<div class="cb-medium">'. do_shortcode( $cb_banner_code ).'</div>';
                                        } elseif ($cb_banner == 'cb_banner_728') {
                                            echo  '<div class="cb-large">'. do_shortcode( $cb_banner_code ) .'</div>';
                                        } 
                                ?>
                        </div>
                        
    				    <nav id="cb-nav-bar" class="clearfix<?php if ($cb_sticky_onoff == 'off') { echo ' stickyoff';} else {echo ' stickybar';}  if ($cb_nav_style == 'cb_light') {echo ' cb-light-menu';} else {echo ' cb-dark-menu';} if ($cb_theme_style != 'cb_boxed') { echo ' cb-full-width'; } ?>" role="navigation">
    				        
                           <?php if ( has_nav_menu( 'main' ) ) {
                               
                                 echo ' <div class="wrap clearfix">'. $cb_main_menu . cb_add_modals_main_menu() .'</div>'; 
                           } 
                           ?>
    	            		  
    	 				</nav>
    	 				
    	 				<?php if ( has_nav_menu( 'top' ) || ($cb_breaking_news != 'off')) { ?>
                             
                             <!-- Top Menu -->            
                             <div id="cb-top-menu" class="clearfix<?php if ($cb_nav_style == 'cb_light') {echo ' cb-light-menu';} else {echo ' cb-dark-menu'; } ?>">
                                    <div class="wrap clearfix">
                                        <?php if ($cb_breaking_news != 'off') { echo cb_breaking_news(); } ?>
                                        <?php if ( has_nav_menu( 'top' )) { cb_top_nav(); }  ?>
                                    </div>
                             </div> 
                             <!-- /Top Menu -->  
                              
                        <?php } ?>
                      
                        <?php if ( has_nav_menu( 'small' ) ) { ?>
                            
                            <!-- Small-Screen Menu --> 
                            
                            <section id="cb-small-menu" class="clearfix<?php if ( $cb_nav_style == 'cb_light' ) {echo ' cb-light-menu';} else {echo ' cb-dark-menu';} echo ' cb-sm-'. $cb_mobile_slidein_menu; ?>">
                                
                                <a href="#" id="cb-small-menu-close"><i class="icon-remove"></i></a>
                                <?php if ( has_nav_menu( 'small' ) ) { cb_small_screen_nav(); }  ?>
                                
                            </section>
                            
                            <a href="#" id="cb-small-menu-trigger"><i class="icon-reorder"></i></a>
                            <!-- /Small-Screen Menu -->
                            
                        <?php } ?>
    	 				
    	 				<a href="#" id="cb-to-top"><i class="icon-long-arrow-up"></i></a>
    	 		
                </header> <!-- end header -->