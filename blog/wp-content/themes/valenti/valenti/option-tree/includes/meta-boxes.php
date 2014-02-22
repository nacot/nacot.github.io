<?php

function _cb_meta() {
   $cb_go = array(
    'id'          => 'cb_go',
    'title'       => 'Valenti General Options',
    'desc'        => '',
    'pages'       => array( 'post' ),
    'context'     => 'normal',
    'priority'    => 'high',
    'fields'      => array(
    
      array(
            'id'          => 'cb_featured_post_menu',
            'label'       => 'Valenti Dropdown Menu Featured',
            'desc'        => 'Featured on category dropdown "Valenti Megamenu: Featured/Random + Recent Posts"',
            'std'         => '',
            'type'        => 'select',
            'rows'        => '',
            'post_type'   => '',
            'taxonomy'    => '',
            'class'       => '',
            'choices'     => array( 
              array(
                'value'       => 'off',
                'label'       => 'Off',
                'src'         => ''
              ),
              array(
                'value'       => 'featured',
                'label'       => 'Featured On Category Menu',
                'src'         => ''
              )
            ),
      ),
      array(
            'id'          => 'cb_featured_post',
            'label'       => 'Valenti Homepage Grid Feature',
            'desc'        => 'Featured on first grid on the homepage',
            'std'         => '',
            'type'        => 'select',
            'rows'        => '',
            'post_type'   => '',
            'taxonomy'    => '',
            'class'       => '',
            'choices'     => array( 
              array(
                'value'       => 'off',
                'label'       => 'Off',
                'src'         => ''
              ),
              array(
                'value'       => 'featured',
                'label'       => 'Featured On First Grid',
                'src'         => ''
              )
            ),
      ),
       array(
            'id'          => 'cb_featured_cat_post',
            'label'       => 'Valenti Category Feature',
            'desc'        => 'Featured on category grid/slider',
            'std'         => '',
            'type'        => 'select',
            'rows'        => '',
            'post_type'   => '',
            'taxonomy'    => '',
            'class'       => '',
            'choices'     => array( 
              array(
                'value'       => 'off',
                'label'       => 'Off',
                'src'         => ''
              ),
              array(
                'value'       => 'featured',
                'label'       => 'Featured On Feature Grid/slider',
                'src'         => ''
              )
            ),
      ),
      array(    
            'id'          => 'cb_featured_image_style',
            'label'       => 'Featured Image Style',
            'desc'        => '',
            'std'         => 'standard',
            'type'        => 'radio-image',
            'rows'        => '',
            'post_type'   => '',
            'taxonomy'    => '',
            'class'       => '',
            'choices'     => array( 
             array(
                'value'       => 'standard',
                'label'       => 'Standard',
                'src'         => '/img_st.png'
              ),
              array(
                'value'       => 'full-width',
                'label'       => 'Full-Width',
                'src'         => '/img_fw.png'
              ),
              array(
                'value'       => 'full-background',
                'label'       => 'Full-Background',
                'src'         => '/img_fb.png'
              ),
              array(
                'value'       => 'parallax',
                'label'       => 'Parallax',
                'src'         => '/img_pa.png'
              ),
              array(
                'value'       => 'off',
                'label'       => 'Do not show featured image',
                'src'         => '/off.png'
              ),
            ),
          ),
           array(    
      
            'id'          => 'cb_full_width_post',
            'label'       => 'Post Style',
            'desc'        => '',
            'std'         => 'sidebar',
            'type'        => 'radio-image',
            'rows'        => '',
            'post_type'   => '',
            'taxonomy'    => '',
            'class'       => '',
            'choices'     => array( 
              array(
                'value'       => 'sidebar',
                'label'       => 'With Sidebar',
                'src'         => '/post_sidebar.png'
              ),
              array(
                'value'       => 'sidebar_left',
                'label'       => 'With Left Sidebar',
                'src'         => '/post_sidebar_left.png'
              ),
              array(
                'value'       => 'nosidebar',
                'label'       => 'No Sidebar',
                'src'         => '/post_nosidebar.png'
              ),
            ),
          ),
     array(
            'label'       => 'Featured Image Credit Line',
            'id'          => 'cb_image_credit',
            'type'        => 'text',
            'desc'        => 'Optional Photograph credit line',
            'std'         => '',
            'rows'        => '',
            'post_type'   => '',
            'taxonomy'    => '',
            'class'       => ''
          ),
    )
  );
  
  ot_register_meta_box( $cb_go );
  
  $cb_hpb = array(
    'id'          => 'cb_hpb',
    'title'       => 'Valenti Drag & Drop Builder',
    'desc'        => '',
    'pages'       => array( 'page' ),
    'context'     => 'normal',
    'priority'    => 'high',
    'fields'      => array(
      array(
        'id'          => 'cb_section_a',
        'label'       => 'Section A (Full-Width)',
        'desc'        => '',
        'std'         => '',
        'type'        => 'list-item',
        'section'     => 'cb_homepage',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'settings'    => array( 
          array(
            'id'          => 'cb_a_module_style',
            'label'       => 'Module Block',
            'desc'        => '',
            'std'         => 'm-aa',
            'type'        => 'radio-image',
            'rows'        => '',
            'post_type'   => '',
            'taxonomy'    => '',
            'class'       => '',
            'choices'     => array( 
              array(
                'value'       => 'm-aa',
                'label'       => 'Module A',
                'src'         => '/module_a_fw.png'
              ),
              array(
                'value'       => 'grid-4a',
                'label'       => 'Grid 4',
                'src'         => '/grid_4.png'
              ),
              array(
                'value'       => 'grid-5a',
                'label'       => 'Grid 5',
                'src'         => '/grid_5.png'
              ),
              array(
                'value'       => 'grid-5-fa',
                'label'       => 'Grid 5',
                'src'         => '/grid_5_f.png'
              ),
              array(
                'value'       => 'grid-6a',
                'label'       => 'Grid 6',
                'src'         => '/grid_6.png'
              ),
              array(
                'value'       => 's-1a',
                'label'       => 'Slider A',
                'src'         => '/module_slider_a_fw.png'
              ),
              array(
                'value'       => 's-2a',
                'label'       => 'Slider B',
                'src'         => '/module_slider_b_fw.png'
              ),
              array(
                'value'       => 'ad-970a',
                'label'       => 'Ad: 970x90',
                'src'         => '/adc.png'
              ),
              array(
                'value'       => 'customa',
                'label'       => 'Custom Code',
                'src'         => '/custom.png'
              )
            ),
          ),
           array(
            'label'       => 'Category',
            'id'          => 'cb_a_latest_posts',
            'type'        => 'category-checkbox',
            'desc'        => '',
            'std'         => '',
            'rows'        => '',
            'post_type'   => '',
            'taxonomy'    => '',
            'class'       => '',
          ),
          array(
            'id'          => 'cb_ad_code_a',
            'label'       => 'Ad Code',
            'desc'        => '',
            'std'         => '',
            'type'        => 'textarea',
            'rows'        => '',
            'post_type'   => '',
            'taxonomy'    => '',
            'class'       => ''
          ),
          array(
            'id'          => 'cb_slider_a',
            'label'       => 'Number Of Posts To Show',
            'desc'        => '',
            'std'         => '3',
            'type'        => 'numeric-slider',
            'rows'        => '',
            'post_type'   => '',
            'taxonomy'    => '',
            'min_max_step'=> '3,12,3',
            'class'       => ''
          ),
          array(
            'id'          => 'cb_style_a',
            'label'       => 'Style',
            'desc'        => '',
            'std'         => '',
            'type'        => 'select',
            'rows'        => '',
            'post_type'   => '',
            'taxonomy'    => '',
            'class'       => '',
            'choices'     => array( 
              array(
                'value'       => 'cb_light_a',
                'label'       => 'Light',
                'src'         => ''
              ),
              array(
                'value'       => 'cb_dark_a',
                'label'       => 'Dark',
                'src'         => ''
              )
            ),
          ),
          array(
            'id'          => 'cb_subtitle_a',
            'label'       => 'Optional Subtitle',
            'desc'        => '',
            'std'         => '',
            'type'        => 'text',
            'rows'        => '',
            'post_type'   => '',
            'taxonomy'    => '',
            'class'       => ''
          ),
           array(
            'id'          => 'cb_custom_a',
            'label'       => 'Custom Code',
            'desc'        => '',
            'std'         => '',
            'type'        => 'textarea',
            'rows'        => '',
            'post_type'   => '',
            'taxonomy'    => '',
            'class'       => ''
          ),
        )
      ),
      array(
        'id'          => 'cb_section_b',
        'label'       => 'Section B + "Section B Sidebar (In Appearance -> Widgets)"',
        'desc'        => '',
        'std'         => '',
        'type'        => 'list-item',
        'section'     => 'cb_homepage',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'settings'    => array( 
          array(
            'id'          => 'cb_b_module_style',
            'label'       => 'Module Block',
            'desc'        => '',
            'std'         => 'm-ab',
            'type'        => 'radio-image',
            'rows'        => '',
            'post_type'   => '',
            'taxonomy'    => '',
            'class'       => '',
            'choices'     => array( 
              array(
                'value'       => 'm-ab',
                'label'       => 'Module A',
                'src'         => '/module_a.png'
              ),
              array(
                'value'       => 'm-bb',
                'label'       => 'Module B',
                'src'         => '/module_b.png'
              ),
              array(
                'value'       => 'm-cb',
                'label'       => 'Module C',
                'src'         => '/module_c.png'
              ),
              array(
                'value'       => 'm-db',
                'label'       => 'Module D',
                'src'         => '/module_d.png'
              ),
              array(
                'value'       => 'ad-728b',
                'label'       => 'Ad: 728x90',
                'src'         => '/adb.png'
              ),
              array(
                'value'       => 'ad-336b',
                'label'       => 'Ad: 336x280',
                'src'         => '/add.png'
              ),
              array(
                'value'       => 's-1b',
                'label'       => 'Slider A',
                'src'         => '/module_slider_a.png'
              ),
              array(
                'value'       => 's-2b',
                'label'       => 'Slider B',
                'src'         => '/module_slider_b.png'
              ),
              array(
                'value'       => 'customb',
                'label'       => 'Custom Code',
                'src'         => '/custom.png'
              )
            ),
          ),
          array(
            'label'       => 'Category',
            'id'          => 'cb_b_latest_posts',
            'type'        => 'category-checkbox',
            'desc'        => '',
            'std'         => '',
            'rows'        => '',
            'post_type'   => '',
            'taxonomy'    => '',
            'class'       => '',
          ),
          array(
            'id'          => 'cb_ad_code_b',
            'label'       => 'Ad Code',
            'desc'        => '',
            'std'         => '',
            'type'        => 'textarea',
            'rows'        => '',
            'post_type'   => '',
            'taxonomy'    => '',
            'class'       => ''
          ),
          array(
            'id'          => 'cb_slider_b',
            'label'       => 'Number Of Posts To Show',
            'desc'        => '',
            'std'         => '2',
            'type'        => 'numeric-slider',
            'rows'        => '',
            'post_type'   => '',
            'taxonomy'    => '',
            'min_max_step'=> '2,12,1',
            'class'       => ''
          ),
          array(
            'id'          => 'cb_style_b',
            'label'       => 'Style',
            'desc'        => '',
            'std'         => '',
            'type'        => 'select',
            'rows'        => '',
            'post_type'   => '',
            'taxonomy'    => '',
            'class'       => '',
            'choices'     => array( 
              array(
                'value'       => 'cb_light_b',
                'label'       => 'Light',
                'src'         => ''
              ),
              array(
                'value'       => 'cb_dark_b',
                'label'       => 'Dark',
                'src'         => ''
              )
            ),
          ),
          array(
            'id'          => 'cb_subtitle_b',
            'label'       => 'Optional Subtitle',
            'desc'        => '',
            'std'         => '',
            'type'        => 'text',
            'rows'        => '',
            'post_type'   => '',
            'taxonomy'    => '',
            'class'       => ''
          ),
          array(
            'id'          => 'cb_custom_b',
            'label'       => 'Custom Code',
            'desc'        => '',
            'std'         => '',
            'type'        => 'textarea',
            'rows'        => '',
            'post_type'   => '',
            'taxonomy'    => '',
            'class'       => ''
          ),
        )
      ),
       array(
        'id'          => 'cb_section_c',
        'label'       => 'Section C (Full-Width)',
        'desc'        => '',
        'std'         => '',
        'type'        => 'list-item',
        'section'     => 'cb_homepage',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'settings'    => array( 
          array(
            'id'          => 'cb_c_module_style',
            'label'       => 'Module Block',
            'desc'        => '',
            'std'         => 'm-ac',
            'type'        => 'radio-image',
            'rows'        => '',
            'post_type'   => '',
            'taxonomy'    => '',
            'class'       => '',
            'choices'     => array( 
              array(
                'value'       => 'm-ac',
                'label'       => 'Module A',
                'src'         => '/module_a_fw.png'
              ),
              array(
                'value'       => 'grid-4c',
                'label'       => 'Grid 4',
                'src'         => '/grid_4.png'
              ),
              array(
                'value'       => 'grid-5c',
                'label'       => 'Grid 5',
                'src'         => '/grid_5.png'
              ),
              array(
                'value'       => 'grid-5-fc',
                'label'       => 'Grid 5',
                'src'         => '/grid_5_f.png'
              ),
              array(
                'value'       => 'grid-6c',
                'label'       => 'Grid 6',
                'src'         => '/grid_6.png'
              ),
              array(
                'value'       => 's-1c',
                'label'       => 'Slider A',
                'src'         => '/module_slider_a_fw.png'
              ),
              array(
                'value'       => 's-2c',
                'label'       => 'Slider B',
                'src'         => '/module_slider_b_fw.png'
              ),
              array(
                'value'       => 'ad-970c',
                'label'       => 'Ad: 970x90',
                'src'         => '/adc.png'
              ),
              array(
                'value'       => 'customc',
                'label'       => 'Custom Code',
                'src'         => '/custom.png'
              )
            ),
          ),
          array(
            'label'       => 'Category',
            'id'          => 'cb_c_latest_posts',
            'type'        => 'category-checkbox',
            'desc'        => '',
            'std'         => '',
            'rows'        => '',
            'post_type'   => '',
            'taxonomy'    => '',
            'class'       => '',
          ),
          array(
            'id'          => 'cb_ad_code_c',
            'label'       => 'Ad Code',
            'desc'        => '',
            'std'         => '',
            'type'        => 'textarea',
            'rows'        => '',
            'post_type'   => '',
            'taxonomy'    => '',
            'class'       => ''
          ),
          array(
            'id'          => 'cb_slider_c',
            'label'       => 'Number Of Posts To Show',
            'desc'        => '',
            'std'         => '3',
            'type'        => 'numeric-slider',
            'rows'        => '',
            'post_type'   => '',
            'taxonomy'    => '',
            'min_max_step'=> '3,12,3',
            'class'       => ''
          ),
          array(
            'id'          => 'cb_style_c',
            'label'       => 'Style',
            'desc'        => '',
            'std'         => '',
            'type'        => 'select',
            'rows'        => '',
            'post_type'   => '',
            'taxonomy'    => '',
            'class'       => '',
            'choices'     => array( 
              array(
                'value'       => 'cb_light_c',
                'label'       => 'Light',
                'src'         => ''
              ),
              array(
                'value'       => 'cb_dark_c',
                'label'       => 'Dark',
                'src'         => ''
              )
            ),
          ),
          array(
            'id'          => 'cb_subtitle_c',
            'label'       => 'Optional Subtitle',
            'desc'        => '',
            'std'         => '',
            'type'        => 'text',
            'rows'        => '',
            'post_type'   => '',
            'taxonomy'    => '',
            'class'       => ''
          ),
          array(
            'id'          => 'cb_custom_c',
            'label'       => 'Custom Code',
            'desc'        => '',
            'std'         => '',
            'type'        => 'textarea',
            'rows'        => '',
            'post_type'   => '',
            'taxonomy'    => '',
            'class'       => ''
          ),
        )
      ),
      array(
        'id'          => 'cb_section_d',
        'label'       => 'Section D + "Section D Sidebar (In Appearance -> Widgets)"',
        'desc'        => '',
        'std'         => '',
        'type'        => 'list-item',
        'section'     => 'cb_homepage',
        'rows'        => '',
        'post_type'   => '',
        'taxonomy'    => '',
        'class'       => '',
        'settings'    => array( 
          array(
            'id'          => 'cb_d_module_style',
            'label'       => 'Module Block',
            'desc'        => '',
            'std'         => 'm-ad',
            'type'        => 'radio-image',
            'rows'        => '',
            'post_type'   => '',
            'taxonomy'    => '',
            'class'       => '',
            'choices'     => array( 
              array(
                'value'       => 'm-ad',
                'label'       => 'Module A',
                'src'         => '/module_a.png'
              ),
              array(
                'value'       => 'm-bd',
                'label'       => 'Module B',
                'src'         => '/module_b.png'
              ),
              array(
                'value'       => 'm-cd',
                'label'       => 'Module C',
                'src'         => '/module_c.png'
              ),
              array(
                'value'       => 'm-dd',
                'label'       => 'Module D',
                'src'         => '/module_d.png'
              ),
              array(
                'value'       => 'ad-728d',
                'label'       => 'Ad: 728x90',
                'src'         => '/adb.png'
              ),
              array(
                'value'       => 'ad-336d',
                'label'       => 'Ad: 336x280',
                'src'         => '/add.png'
              ),
              array(
                'value'       => 's-1d',
                'label'       => 'Slider A',
                'src'         => '/module_slider_a.png'
              ),
              array(
                'value'       => 's-2d',
                'label'       => 'Slider B',
                'src'         => '/module_slider_b.png'
              ),
              array(
                'value'       => 'customd',
                'label'       => 'Custom Code',
                'src'         => '/custom.png'
              )
            ),
          ),
          array(
            'label'       => 'Category',
            'id'          => 'cb_d_latest_posts',
            'type'        => 'category-checkbox',
            'desc'        => '',
            'std'         => '',
            'rows'        => '',
            'post_type'   => '',
            'taxonomy'    => '',
            'class'       => '',
          ),
          array(
            'id'          => 'cb_ad_code_d',
            'label'       => 'Ad Code',
            'desc'        => '',
            'std'         => '',
            'type'        => 'textarea',
            'rows'        => '',
            'post_type'   => '',
            'taxonomy'    => '',
            'class'       => ''
          ),
          array(
            'id'          => 'cb_slider_d',
            'label'       => 'Number Of Posts To Show',
            'desc'        => '',
            'std'         => '2',
            'type'        => 'numeric-slider',
            'rows'        => '',
            'post_type'   => '',
            'taxonomy'    => '',
            'min_max_step'=> '2,12,1',
            'class'       => ''
          ),
          array(
            'id'          => 'cb_style_d',
            'label'       => 'Style',
            'desc'        => '',
            'std'         => '',
            'type'        => 'select',
            'rows'        => '',
            'post_type'   => '',
            'taxonomy'    => '',
            'class'       => '',
            'choices'     => array( 
              array(
                'value'       => 'cb_light_d',
                'label'       => 'Light',
                'src'         => ''
              ),
              array(
                'value'       => 'cb_dark_d',
                'label'       => 'Dark',
                'src'         => ''
              )
            ),
          ),
          array(
            'id'          => 'cb_subtitle_d',
            'label'       => 'Optional Subtitle',
            'desc'        => '',
            'std'         => '',
            'type'        => 'text',
            'rows'        => '',
            'post_type'   => '',
            'taxonomy'    => '',
            'class'       => ''
          ),
          array(
            'id'          => 'cb_custom_d',
            'label'       => 'Custom Code',
            'desc'        => '',
            'std'         => '',
            'type'        => 'textarea',
            'rows'        => '',
            'post_type'   => '',
            'taxonomy'    => '',
            'class'       => ''
          ),
        )
      ),
    )
  );
  
ot_register_meta_box( $cb_hpb );

}
add_action( 'admin_init', '_cb_meta' );