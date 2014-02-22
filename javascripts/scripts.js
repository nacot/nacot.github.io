$(document).ready(function() {

    "use strict";

    /* 
     * Do different stuff based on the resolution 
     */

    if (window.innerWidth <= 1140) {
        // Hide address bar    
        window.scrollTo(0, 1);

    } else {
    
        $.fn.fullpage({
            verticalCentered: false,
            anchors: ['head-scroll', 'how-it-works-scroll', 'results-scroll', 'try-it-scroll', 'team-scroll', 'as-seen-on-scroll', 'contact-scroll'],
            resize: false,
            css3: true,
            menu: '#main-nav',
            afterLoad: function(anchorLink, index) {
			
			console.log(anchorLink );
                if (anchorLink === 'head-scroll') {
                    $('#main-nav').hide();
                }
				
                else{
                    $('#main-nav').show();
                }
				
            }
        });
        
        $('#head').on('click', function() {
            $.fn.fullpage.moveToSlide('how-it-works-scroll');
        });
    }
    
    
    
    //Contact Form Code:

    $(function() {
        $(".form-send").click(function(e) {
            var $error = 0;
            var email = $(this).siblings(".newsletter-email").val();

            var formSend = $(this);
            var formSending = formSend.siblings('.form-sending');
            var formSent = formSend.siblings('.form-sent');
            var formError = formSend.siblings('.details-error-wrap');

            if (email === "") {
                formError.fadeIn(1000);
                $error = 1;

            } else {
                formError.fadeOut(1000);

            }

            if (!(/(.+)@(.+){2,}\.(.+){2,}/.test(email))) {
                formError.fadeIn(1000);
                $error = 1;
            }

            var dataString = 'email=' + email;
            if ($error === 0) {
                formSend.hide();
                formSending.show();

                $.ajax({
                    type: "POST",
                    url: "newsletter.php",
                    data: dataString,
                    success: function() {
                        formError.fadeOut(300);
                        formSending.fadeOut(500, function() {
                            formSent.fadeIn(1000);
                        });



                    }
                });
                return false;
            }

            e.preventDefault();
        });
    });

});