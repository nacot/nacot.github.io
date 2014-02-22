<?php
/********************* META BOX DEFINITIONS ***********************/

global $meta_boxes;
$prefix = 'cb_';
$cb_name = (wp_get_theme()->Name);

if (($cb_name != 'Valenti') && ($cb_name != 'Ciola')) {
    $cb_name = 'Cubell Themes:';
}

$meta_boxes = array();

// Post Options Format
$meta_boxes[] = array(
    'id' => 'cb_style',
    'title' => $cb_name. ' Background Options',
    'pages' => array( 'post'),
    'context' => 'normal',
    'priority' => 'high',

    'fields' => array(
        array(
            'name' => 'Background Color',
            'id'   => $prefix . 'bg_color_post',
            'type' => 'color',
            'desc' => 'Overrides Global + Category Background Color'
        ),
        array(
            'name' => 'Background Image',
            'id'   => $prefix . 'bg_image_post',
            'type' => 'image_advanced',
            'desc' => 'Overrides Global + Category Background Image'
        ),
        array(
            'name'     => 'Background Image Settings',
            'id'       => $prefix . 'bg_image_post_setting',
            'desc' => "How do you want the background image to look?",
            'type'     => 'select',
            'std'   => '1',
            'options'  => array(
                '1' => 'Full-Width Stretch',
                '2' => 'Repeat',
                '3' => 'No-Repeat',             
            ),
            'multiple' => false,
        ),
    )
);

// Post Options Format
$meta_boxes[] = array(
    'id' => 'cb_style',
    'title' => $cb_name. ' Page Options',
    'pages' => array( 'page' ),
    'context' => 'normal',
    'priority' => 'high',

    'fields' => array(
        array(
            'name' => 'Main Page Color',
            'id'   => $prefix . 'overall_color_post',
            'type' => 'color',
            'desc' => 'For the navigation menu'
        ),
        array(
            'name' => 'Background Color',
            'id'   => $prefix . 'bg_color_post',
            'type' => 'color',
            'desc' => 'Overrides Background Color'
        ),
        array(
            'name' => 'Background Image',
            'id'   => $prefix . 'bg_image_post',
            'type' => 'image_advanced',
            'desc' => 'Overrides Global + Category Background Image'
        ),
        array(
            'name'     => 'Background Image Settings',
            'id'       => $prefix . 'bg_image_post_setting',
            'desc' => "How do you want the background image to look?",
            'type'     => 'select',
            'std'   => '1',
            'options'  => array(
                '1' => 'Full-Width Stretch',
                '2' => 'Repeat',
                '3' => 'No-Repeat',             
            ),
            'multiple' => false,
        ),
        array(
            'name'     => 'Custom Sidebar',
            'id'       => $prefix . 'page_custom_sidebar',
            'desc' => "",
            'type'     => 'select',
            'std'   => '1',
            'options'  => array(
                '1' => 'Off',
                '2' => 'On',
            ),
            'multiple' => false,
        ),
    )
);


// Post Review Options
$meta_boxes[] = array(
    'id' => 'cb_review',
    'title' => $cb_name.' Review System',
    'pages' => array( 'post' ),
    'context' => 'normal',
    'priority' => 'high',

    'fields' => array(
        // Enable Review
        array(
            'name' => 'Include Review Box',
            'id' => $prefix . 'review_checkbox',
            'type' => 'checkbox',
            'desc' => 'Enable Review On This Post',
            'std'  => 0,
        ),
        // Type of review
        array(
            'name'     => 'Type',
            'id'       => $prefix . 'score_display_type',
            'type'     => 'select',
            // Array of 'value' => 'Label' pairs for select box
            'options'  => array(
                'percentage' => 'Percentage',
                'stars' => 'Stars',
                'points' => 'Points',
            ),
            // Select multiple values, optional. Default is false.
            'multiple' => false,
        ),
        // Location of review
        array(
            'name'     => 'Location',
            'id'       => $prefix . 'placement',
            'type'     => 'select',
            // Array of 'value' => 'Label' pairs for select box
            'options'  => array(
                'top' => 'Top',
                'top-half' => 'Top Half-Width',
                'bottom' => 'Bottom',
            ),
            // Select multiple values, optional. Default is false.
            'multiple' => false,
            'std'   => 'Select a location',
        ),        
        // User Ratings
        array(
            'name'     => 'User Ratings',
            'id'       => $prefix . 'user_score',
            'type'     => 'select',
            // Array of 'value' => 'Label' pairs for select box
            'options'  => array(
                'on' => 'On',
                'off' => 'Off',
            ),
            // Select multiple values, optional. Default is false.
            'multiple' => false,
            'std'   => 'Select a location',
        ),        
       // Sub-title
        array(
            'name'  => 'Score Sub-Title',
            'id'    => $prefix . 'rating_short_summary',
            'type'  => 'text',
        ),
        // Criteria 1 Text & Score
        array(
            'name'  => 'Criteria 1 Title',
            'id'    => $prefix . 'ct1',
            'type'  => 'text',
        ),
        array(
            'name' => __( 'Criteria 1 Score', 'rwmb' ),
            'id' => $prefix . 'cs1',
            'type' => 'slider',
            'js_options' => array(
                'min'   => 0,
                'max'   => 100,
                'step'  => 1,
            ),
        ),
        // Criteria 2 Text & Score
        array(
            'name'  => 'Criteria 2 Title',
            'id'    => $prefix . 'ct2',
            'type'  => 'text',
        ),
        array(
            'name' => __( 'Criteria 2 Score', 'rwmb' ),
            'id' => $prefix . 'cs2',
            'type' => 'slider',
            'js_options' => array(
                'min'   => 0,
                'max'   => 100,
                'step'  => 1,
            ),
        ),    
        // Criteria 3 Text & Score
        array(
            'name'  => 'Criteria 3 Title',
            'id'    => $prefix . 'ct3',
            'type'  => 'text',
        ),
        array(
            'name' => __( 'Criteria 3 Score', 'rwmb' ),
            'id' => $prefix . 'cs3',
            'type' => 'slider',
            'js_options' => array(
                'min'   => 0,
                'max'   => 100,
                'step'  => 1,
            ),
        ),
        // Criteria 4 Text & Score
        array(
            'name'  => 'Criteria 4 Title',
            'id'    => $prefix . 'ct4',
            'type'  => 'text',
        ),
        array(
            'name' => __( 'Criteria 4 Score', 'rwmb' ),
            'id' => $prefix . 'cs4',
            'type' => 'slider',
            'js_options' => array(
                'min'   => 0,
                'max'   => 100,
                'step'  => 1,
            ),
        ),
        // Criteria 5 Text & Score
        array(
            'name'  => 'Criteria 5 Title',
            'id'    => $prefix . 'ct5',
            'type'  => 'text',
        ),
        array(
            'name' => __( 'Criteria 5 Score', 'rwmb' ),
            'id' => $prefix . 'cs5',
            'type' => 'slider',
            'js_options' => array(
                'min'   => 0,
                'max'   => 100,
                'step'  => 1,
            ),
        ),    
        // Criteria 6 Text & Score
        array(
            'name'  => 'Criteria 6 Title',
            'id'    => $prefix . 'ct6',
            'type'  => 'text',
        ),
        array(
            'name' => __( 'Criteria 6 Score', 'rwmb' ),
            'id' => $prefix . 'cs6',
            'type' => 'slider',
            'js_options' => array(
                'min'   => 0,
                'max'   => 100,
                'step'  => 1,
            ),
        ),
        // Summary
        array(
            'name' => __( 'Summary', 'rwmb' ),
            'id'   => $prefix . 'summary',
            'type' => 'textarea',
            'cols' => 20,
            'rows' => 3,
        ),
        // Pros Title
        array(
            'name'  => 'Positives Title',
            'id'    => $prefix . 'pros_title',
            'type'  => 'text',
        ), 
        // Pro 1
        array(
            'name'  => 'Positive 1',
            'id'    => $prefix . 'pro_1',
            'type'  => 'text',
        ), 
        // Pro 2
        array(
            'name'  => 'Positive 2',
            'id'    => $prefix . 'pro_2',
            'type'  => 'text',
        ), 
        // Pro 3
        array(
            'name'  => 'Positive 3',
            'id'    => $prefix . 'pro_3',
            'type'  => 'text',
        ),        
        // Cons Title
        array(
            'name'  => 'Negatives Title',
            'id'    => $prefix . 'cons_title',
            'type'  => 'text',
        ),
         // Con 1
        array(
            'name'  => 'Negative 1',
            'id'    => $prefix . 'con_1',
            'type'  => 'text',
        ),
         // Con 2
        array(
            'name'  => 'Negative 2',
            'id'    => $prefix . 'con_2',
            'type'  => 'text',
        ),
         // Con 3
        array(
            'name'  => 'Negative 3',
            'id'    => $prefix . 'con_3',
            'type'  => 'text',
        ),
        
        // Final average
        array(
            'name'  => 'Final Average Score',
            'id'    => $prefix . 'final_score',
            'type'  => 'text',
        ),
        // Final average override
        array(
            'name'  => 'Final Score Override',
            'id'    => $prefix . 'final_score_override',
            'type'  => 'text',
        ),        
        
    )
);
// Post Options Format
$meta_boxes[] = array(
    'id' => 'cb_format_options',
    'title' => $cb_name.' Post Format Options',
    'pages' => array( 'post' ),
    'context' => 'normal',
    'priority' => 'high',

    'fields' => array(
        array(
            'name' => 'Format Options: Audio',
            'desc' => 'Soundcloud Wordpress Embed Code',
            'id' => $prefix . 'soundcloud_embed_code_post',
            'type' => 'textarea',
            'std' => ''
        ),
        array(
            'name' => 'Format Options: Video',
            'desc' => 'Video iframe embed code',
            'id' => $prefix . 'video_embed_code_post',
            'type' => 'textarea',
            'std' => ''
        ),
        array(
            'name' => 'Format Options: Gallery',
            'desc' => 'Gallery Images',
            'id' => $prefix . 'gallery_content',
            'type' => 'image_advanced',
            'std' => ''
        )
    )
);

/********************* META BOX REGISTERING ***********************/

/**
 * Register meta boxes
 *
 * @return void
 */
if ( ! function_exists( 'cb_register_meta_boxes' ) ) { 
    function cb_register_meta_boxes() {
    	// Make sure there's no errors when the plugin is deactivated or during upgrade
    	if ( !class_exists( 'RW_Meta_Box' ) )
    		return;
    
    	global $meta_boxes;
    	foreach ( $meta_boxes as $meta_box )
    	{
    		new RW_Meta_Box( $meta_box );
    	}
    }

add_action( 'admin_init', 'cb_register_meta_boxes' );
}