<?php
/**
 * Plugin Name: Cubell Themes - Functionality
 * Plugin URI: http://themeforest.net/user/cubell
 * Description: Adds functionality to Cubell Themes
 * Version: 1.2
 * Author: Cubell
 * Author URI: http://themeforest.net/user/cubell
 * License: GPL2
 */

class Cubell_Functionality {
    /**
     * Define constants
     *
     * @since 1.0
     *
    */
    protected function cb_constants() {
        
        /**
         * Plugin Path
         */
        define( 'CB_FUNC_PATH', plugin_dir_path( __FILE__ ) );
    
    }
  
    /**
     * Constructor
     *
     * @since 1.0
     *
    */
    public function __construct() {
        $this->cb_constants();
        $this->cb_extra_files();
    }
    
    /**
     * Extra files
     *
     * @since 1.0
     *
    */    
     function cb_extra_files() {

        $cb_theme_name = (wp_get_theme()->Name);
        if ( $cb_theme_name != 'Ciola' ) {

            require_once ( CB_FUNC_PATH . 'extensions/widgets/cb-125-ads-widget.php' );
            require_once ( CB_FUNC_PATH . 'extensions/widgets/cb-recent-posts-widget.php' );
            require_once ( CB_FUNC_PATH . 'extensions/widgets/cb-recent-comments-avatar-widget.php' );
            require_once ( CB_FUNC_PATH . 'extensions/widgets/cb-recent-posts-slider-widget.php' );
            require_once ( CB_FUNC_PATH . 'extensions/widgets/cb-social-media-widget.php' );
            require_once ( CB_FUNC_PATH . 'extensions/widgets/cb-google-follow-widget.php' );
            require_once ( CB_FUNC_PATH . 'extensions/widgets/cb-single-image-widget.php' );
            require_once ( CB_FUNC_PATH . 'extensions/widgets/cb-multi-widget.php' );
            require_once ( CB_FUNC_PATH . 'extensions/widgets/cb-top-reviews-widget.php' );
            require_once ( CB_FUNC_PATH . 'extensions/widgets/cb-facebook-like-widget.php' );
            require_once ( CB_FUNC_PATH . 'extensions/shortcodes/cb-shortcodes.php' );
            require_once ( CB_FUNC_PATH . 'extensions/Tax-meta-class/cb-class-config.php' );
            require_once ( CB_FUNC_PATH . 'extensions/meta-box/cb-meta-boxes.php' );
            require_once ( CB_FUNC_PATH . 'extensions/meta-box/meta-box.php' );
        }

    }
}

/**
 * Instantiate the Class
 *
 * @since     1.0
 * @global    object
 */
$Cubell_Functionality = new Cubell_Functionality();

?>