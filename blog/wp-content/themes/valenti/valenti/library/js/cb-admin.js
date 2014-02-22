jQuery(document).ready(function($){"use strict";
  
   $('#cb_final_score').attr('readonly', true);
   $("#cb_review .inside .rwmb-meta-box > div:gt(0)").wrapAll('<div class="cb-enabled-review">');
   $('.cb-enabled-review > div:gt(3):odd:lt(6)').each(function() {
        $(this).prev().addBack().wrapAll($('<div/>',{'class': 'cb-criteria'}));
    });
    var cbReviewCheckbox = $('#cb_review_checkbox'),
        cbReviewBox = $('.cb-enabled-review');
    
        if ( cbReviewCheckbox.is(":checked") ) {
                cbReviewBox.show();
            }
            
        cbReviewCheckbox.click(function(){
            cbReviewBox.slideToggle('slow');
        });
        
        function cbScoreCalc() { 
    
            var i = 0;
            var cb_cs1 = parseFloat($('input[name=cb_cs1]').val());
            var cb_cs2 = parseFloat($('input[name=cb_cs2]').val());
            var cb_cs3 = parseFloat($('input[name=cb_cs3]').val());
            var cb_cs4 = parseFloat($('input[name=cb_cs4]').val());
            var cb_cs5 = parseFloat($('input[name=cb_cs5]').val());
            var cb_cs6 = parseFloat($('input[name=cb_cs6]').val());     
            if (cb_cs1) { i+=1; } else { cb_cs1 = 0; }
            if (cb_cs2) { i+=1; } else { cb_cs2 = 0; }
            if (cb_cs3) { i+=1; } else { cb_cs3 = 0; }
            if (cb_cs4) { i+=1; } else { cb_cs4 = 0; }
            if (cb_cs5) { i+=1; } else { cb_cs5 = 0; }
            if (cb_cs6) { i+=1; } else { cb_cs6 = 0; }  
            
            var cbTempTotal = (cb_cs1 + cb_cs2 + cb_cs3 + cb_cs4 + cb_cs5 + cb_cs6);
            var cbTotal = Math.round(cbTempTotal / i);
            
            $("#cb_final_score").val(cbTotal);
            
            if ( isNaN(cbTotal) ) { $("#cb_final_score").val(''); }
   
        }
      
       $('#cb_cs1, #cb_cs2, #cb_cs3, #cb_cs4, #cb_cs5, #cb_cs6').on('slidechange', cbScoreCalc);
        
       cbReviewCheckbox.after('<label for="cb_review_checkbox"></label>');
        
       $('.cb-about-options-title').after($('.cb-about-options'));

      // Theme Option Functions
      var cbHpb = $('#cb_hpb'),
          cbSectionA = $('#cb_cb_section_a'),
          cbSectionB = $('#cb_cb_section_b'),
          cbSectionD = $('#cb_cb_section_d'),
          cbSelectedAd = cbHpb.find('.option-tree-ui-radio-image-selected[title^="Ad"]').closest('.format-settings'),
          cbSelectedModule = cbHpb.find('.option-tree-ui-radio-image-selected[title^="Module"]').closest('.format-settings'),
          cbSelectedModuleA = cbSectionB.add(cbSectionD).find('.option-tree-ui-radio-image-selected[title="Module A"]').closest('.format-settings'),
          cbSelectedSlider = cbHpb.find('.option-tree-ui-radio-image-selected[title^="Slider"]').closest('.format-settings'),
          cbSelectedCustom = cbHpb.find('.option-tree-ui-radio-image-selected[title^="Custom Code"]').closest('.format-settings'),
          cbSelectedGrid = cbHpb.find('.option-tree-ui-radio-image-selected[title^="Grid"]').closest('.format-settings'),
          cbPostStyleOverride = $('#setting_cb_post_style_override'),
          cbPostStyleOverrideOnOff = $('#cb_post_style_override_onoff');
          
      cbSectionA.before('<div id="setting_cb_title" class="format-settings"><div class="format-setting-wrap"><div class="format-setting-label"><h3 class="label">Valenti Homepage Builder</h3></div><div class="list-item-description">All the sections below are optional, allowing you to build any type of homepage you want. Remember to set "Page Attributes: Template" to "Valenti Drag & Drop Builder" and <strong>GET CREATIVE!</strong></div></div></div>');
      
      
      cbSelectedAd.each(function () {
      
          $(this).next().hide();
          $(this).nextAll(':eq(1)').show();
          $(this).nextAll(':eq(2)').hide(); 
          $(this).nextAll(':eq(3)').hide(); 
          $(this).nextAll(':eq(4)').hide(); 
          $(this).nextAll(':eq(5)').hide(); 
          
      });
      
      cbSelectedCustom.each(function () {
          
          $(this).next().hide(); 
          $(this).nextAll(':eq(1)').hide();
          $(this).nextAll(':eq(2)').hide(); 
          $(this).nextAll(':eq(3)').hide(); 
          $(this).nextAll(':eq(4)').show();
          $(this).nextAll(':eq(5)').show(); 
          
      });
      
      cbSelectedModule.each(function () {
          
          $(this).nextAll(':eq(1)').hide();
          $(this).nextAll(':eq(5)').hide();
      
      });
      
      cbSelectedModuleA.each(function () {
          
          $(this).nextAll(':eq(1)').hide();
          $(this).nextAll(':eq(5)').hide();
          
      });

      cbSelectedSlider.each(function () {
          
          $(this).nextAll(':eq(1)').hide();
          $(this).nextAll(':eq(2)').hide(); 
          $(this).nextAll(':eq(5)').hide(); 
      
      });
      
      cbSelectedGrid.each(function () {
              
          $(this).nextAll(':eq(1)').hide();
          $(this).nextAll(':eq(2)').hide();
          $(this).nextAll(':eq(5)').hide();
      
      });

      if ( cbPostStyleOverrideOnOff.val() === 'on' ) {
        cbPostStyleOverride.show();
      }

      cbPostStyleOverrideOnOff.on('change', function() {
        if ( this.value === 'on' ) {
          cbPostStyleOverride.slideDown();
        } else {
          cbPostStyleOverride.slideUp();
        }
      });
    
      $('#setting_cb_how_to_get_support').find('img[title="Documentation"]').wrap('<a href="http://docs.cubellthemes.com/valenti/" class="cb-pointer" target="_blank"></a>');
      cbHpb.find('.option-tree-ui-radio-image-selected[title="Module B"]').closest('.ui-state-default').addClass('cb-half-width');        
      cbHpb.find('.option-tree-ui-radio-image-selected[title="Module C"]').closest('.ui-state-default').addClass('cb-half-width');        
      cbHpb.find('.option-tree-ui-radio-image-selected[title="Module D"]').closest('.ui-state-default').addClass('cb-half-width');  
      cbHpb.find('.option-tree-ui-radio-image-selected[title="Module G"]').closest('.ui-state-default').addClass('cb-half-width');  
      cbHpb.find('.option-tree-ui-radio-image-selected[title="Ad: 336x280"]').closest('.ui-state-default').addClass('cb-half-width');  
      
      $(document).on('click', '#cb_cb_section_a .option-tree-ui-radio-image, #cb_cb_section_c .option-tree-ui-radio-image', function() {
            
            var cbClosest =  $(this).closest('.format-settings');

             if ($(this).attr('title') === 'Ad: 970x90')  {
                       cbClosest.nextAll(':eq(1)').slideDown();
                       cbClosest.nextAll(':eq(2)').slideUp();
                       cbClosest.nextAll(':eq(3)').slideUp();
                       cbClosest.nextAll(':eq(4)').slideUp();
                       cbClosest.nextAll(':eq(5)').slideUp();
                       cbClosest.next().slideUp();
                       
             } else if ($(this).attr('title') === 'Module A')  {
                        cbClosest.nextAll(':eq(1)').slideUp();
                        cbClosest.nextAll(':eq(2)').slideDown();
                        cbClosest.nextAll(':eq(3)').slideDown();
                        cbClosest.nextAll(':eq(4)').slideDown();
                        cbClosest.nextAll(':eq(5)').slideUp();
                        cbClosest.next().slideDown();
                       
            }  else if ($(this).attr('title') === 'Custom Code')  {
                        cbClosest.nextAll(':eq(1)').slideUp();
                        cbClosest.nextAll(':eq(2)').slideUp();
                        cbClosest.nextAll(':eq(3)').slideUp();
                        cbClosest.nextAll(':eq(4)').slideDown();
                        cbClosest.nextAll(':eq(5)').slideDown();
                        cbClosest.next().slideUp();
                       
            } else if (($(this).attr('title') === 'Slider A') || ($(this).attr('title') === 'Slider B') ) {
                        
                        cbClosest.nextAll(':eq(1)').slideUp();
                        cbClosest.nextAll(':eq(2)').slideUp();
                        cbClosest.nextAll(':eq(3)').slideDown();
                        cbClosest.nextAll(':eq(4)').slideDown();
                        cbClosest.nextAll(':eq(5)').slideUp();
                        cbClosest.next().slideDown();
           } else {
                        cbClosest.nextAll(':eq(1)').slideUp();
                        cbClosest.nextAll(':eq(2)').slideUp();
                        cbClosest.nextAll(':eq(3)').slideDown();
                        cbClosest.nextAll(':eq(4)').slideDown();
                        cbClosest.nextAll(':eq(5)').slideUp();
                        cbClosest.next().slideDown();
           }
           
        });    
        
        $(document).on('click', '#cb_cb_section_b .option-tree-ui-radio-image, #cb_cb_section_d .option-tree-ui-radio-image', function() {
        
                    if ( ($(this).attr('title') === 'Ad: 336x280') || ($(this).attr('title') === 'Module B') || ($(this).attr('title') === 'Module C') || ($(this).attr('title') === 'Module D') )  {
                         $(this).closest('.ui-state-default').addClass('cb-half-width');
                    } else {
                         $(this).closest('.ui-state-default').removeClass('cb-half-width');
                    }
                   
                    var cbClosest =  $(this).closest('.format-settings');
 
                   if (($(this).attr('title') === 'Ad: 336x280') || ($(this).attr('title') === 'Ad: 728x90'))  {
                       cbClosest.nextAll(':eq(1)').slideDown();
                       cbClosest.nextAll(':eq(2)').slideUp();
                       cbClosest.nextAll(':eq(3)').slideUp();
                       cbClosest.nextAll(':eq(4)').slideUp();
                       cbClosest.nextAll(':eq(5)').slideUp();
                       cbClosest.next().slideUp();
                       
                    } else if (($(this).attr('title') === 'Slider A') || ($(this).attr('title') === 'Slider B') ) {
                         
                        cbClosest.nextAll(':eq(1)').slideUp();
                        cbClosest.nextAll(':eq(2)').slideUp();
                        cbClosest.nextAll(':eq(3)').slideDown();
                        cbClosest.nextAll(':eq(4)').slideDown();
                        cbClosest.nextAll(':eq(5)').slideUp();
                        cbClosest.next().slideDown();
                       
                    }  else if ($(this).attr('title') === 'Module A')  {
                        
                        cbClosest.nextAll(':eq(1)').slideUp();
                        cbClosest.nextAll(':eq(2)').slideDown();
                        cbClosest.nextAll(':eq(3)').slideDown();
                        cbClosest.nextAll(':eq(4)').slideDown();
                        cbClosest.nextAll(':eq(5)').slideUp();
                        cbClosest.next().slideDown();
                        
                    } else if ($(this).attr('title') === 'Custom Code')  {
                        
                        cbClosest.nextAll(':eq(1)').slideUp();
                        cbClosest.nextAll(':eq(2)').slideUp();
                        cbClosest.nextAll(':eq(3)').slideUp();
                        cbClosest.nextAll(':eq(4)').slideDown();
                        cbClosest.nextAll(':eq(5)').slideDown();
                        cbClosest.next().slideUp();
                        
                    } else {
                        
                        cbClosest.nextAll(':eq(1)').slideUp();
                        cbClosest.nextAll(':eq(2)').slideDown();
                        cbClosest.nextAll(':eq(3)').slideDown();
                        cbClosest.nextAll(':eq(4)').slideDown();
                        cbClosest.nextAll(':eq(5)').slideUp();
                        cbClosest.next().slideDown();
                    }
        });    
        
        $('#setting_cb_blog_style').before('<div id="setting_cb_title" class="format-settings"><div class="format-setting-wrap"><div class="format-setting-label"><h3 class="label">Homepage Settings</h3></div><div class="list-item-description">The settings below <strong>only</strong> apply to homepages that are set to "Your latest posts" in the "Wordpress Settings -> Reading" section. To create a homepage with modules please read the documentation section "Valenti Homepage Builder".</div></div></div>');
});