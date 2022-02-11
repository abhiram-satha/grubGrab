$(document).ready(function() {
  $(window).scroll(function() {
    const stickyTop = $('.sticky-top');
    const scroll = $(window).scrollTop();

    if ($(window).width() < 748) {
      if (scroll > 240) {
        stickyTop.addClass('fixed');
      } else {
        stickyTop.removeClass('fixed');
      }
    } else {
      if (scroll > 300) {
        stickyTop.addClass('fixed');
      } else {
        stickyTop.removeClass('fixed');
      }
    }

  });
})
