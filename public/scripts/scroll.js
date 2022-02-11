$(document).ready(function() {
  $(window).scroll(function() {
    const stickyTop = $('.sticky-top');
    const scroll = $(window).scrollTop();

    if (scroll >= 300) {
      stickyTop.addClass('fixed');
    } else {
      stickyTop.removeClass('fixed');
    }
  });
})
