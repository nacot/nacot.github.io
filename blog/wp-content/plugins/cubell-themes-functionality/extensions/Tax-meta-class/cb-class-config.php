<?php
require_once("Tax-meta-class.php");
if (is_admin()){
  $prefix = 'cb_';

  $config = array(
    'id' => 'cb_cat_meta',          // meta box id, unique per meta box
    'title' => 'Category Extra Meta',          // meta box title
    'pages' => array('category'),        // taxonomy name, accept categories, post_tag and custom taxonomies
    'context' => 'normal',            // where the meta box appear: normal (default), advanced, side; optional
    'fields' => array(),            // list of meta fields (can be added by field arrays)
    'local_images' => false,          // Use local or hosted images (meta box images for add/remove)
    'use_with_theme' => false          //change path if used with theme set to true, false for a plugin or anything else for a custom path(default false).
  );
  
  $cb_cat_meta =  new Tax_Meta_Class($config);
  $cb_cat_meta->addSelect($prefix.'cat_style_field_id',array('style-a'=>'Blog Style A','style-b'=>'Blog Style B','style-c'=>'Blog Style C','style-d'=>'Blog Style D'),array('name'=> __('Blog Style ','tax-meta'), 'std'=> array('style-a')));
  $cb_cat_meta->addColor($prefix.'color_field_id',array('name'=> __('Category Global Color','tax-meta')));
  $cb_cat_meta->addSelect($prefix.'cat_featured_op',array('Off' => 'Off', 'full-slider'=>'Full-width Slider', 'slider'=>'Slider', 'grid-4'=>'Grid - 4', 'grid-5'=>'Grid - 5','grid-6'=>'Grid - 6'),array('name'=> __('Show grid/slider ','tax-meta'), 'std'=> array('Off')));
  $cb_cat_meta->addSelect($prefix.'cat_sidebar',array('off'=>'Off','on'=>'On'),array('name'=> __('Custom Sidebar ','tax-meta'), 'std'=> array('off')));
  $cb_cat_meta->addImage($prefix.'bg_image_field_id',array('name'=> __('Category Background Image ','tax-meta')));
  $cb_cat_meta->addSelect($prefix.'bg_image_setting_op',array('1' => 'Full-Width Stretch', '2'=>'Repeat', '3'=>'No-Repeat'),array('name'=> __('Background Image Settings','tax-meta'), 'std'=> array('1')));
  $cb_cat_meta->addColor($prefix.'bg_color_field_id',array('name'=> __('Category Background Color','tax-meta')));
  $cb_cat_meta->Finish();
}