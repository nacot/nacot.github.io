/* sird responsive menu */
$(document).ready(function () {
  
  $('.menu-trigger').sidr({
    name: 'sidr',
    source: '#footer-menu',
    renaming: true
  });

  /* creation section easings */
  var hone = 1;
  var pageDuration = 2300;
  var duration = 1200;
  var easing = 'easeOutQuart';
  var pageEasing = 'easeInOutCubic';
  var pageHeight = $(window).height();

  $('#start').on("click", function () {
    $('html,body').animate({
      scrollTop: $(document).height()
    }, pageDuration, pageEasing);
  });

  $(window).scroll(function () {
    var scrollPos = $(this).scrollTop();

    if (scrollPos >= pageHeight / 2 && hone == 1) {
      hone = 0;
      $(".gen").animate({
        'padding-top': pageHeight / 2 - 190,
      }, duration, easing);

    } else if (scrollPos < pageHeight / 2 && hone == 0) {
      hone = 1;
      $(".gen").animate({
        'padding-top': 0,
      }, duration, easing);
    }

  });

});