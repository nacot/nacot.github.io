<?php 
    	global $current_user;
    	get_currentuserinfo();
        $cb_author_id = $current_user->ID;
        $cb_author_posts = count_user_posts( $cb_author_id ); 
        $cb_nav_style = ot_get_option('cb_menu_style', 'cb_dark'); 
        if ($cb_nav_style == 'cb_light') {
            $cb_menu_color = 'cb-light-menu'; 
        } else {
             $cb_menu_color = 'cb-dark-menu';
        }
?>

<div class="cb-login-modal clearfix <?php echo $cb_menu_color; ?>">
    <div class="lwa cb-logged-in clearfix">
        
        <div class="cb-header">
                <div class="cb-title"><?php echo  $current_user->display_name;  ?></div>
                <div class="cb-close"><span class="cb-close-modal"><i class="icon-remove"></i></span></div>
        </div>
        <div class="cb-lwa-profile">
        	<div class="cb-avatar">
                <?php echo get_avatar( $current_user->ID, $size = '150' );  ?>
            </div>
            
            <div class="cb-block">
                <a href="<?php echo get_edit_user_link($cb_author_id); ?>"><?php esc_html_e("Edit Profile", 'cubell'); ?></a>
            </div>  
            
            <div class="cb-block">
                <a class="wp-logout" href="<?php echo wp_logout_url() ?>"><?php esc_html_e( 'Log Out' ,'login-with-ajax') ?></a>
            </div>  
        </div>
            
    </div>
</div>