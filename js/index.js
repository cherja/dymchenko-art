var hamburger = document.querySelector(".hamburger");
hamburger.addEventListener("click", function() {
  hamburger.classList.toggle("is-active");
});

var header = document.querySelector(".header");
hamburger.addEventListener("click", function() {
  header.classList.toggle("active");
});
baguetteBox.run('.gallery', {
  animation: 'fadeIn',
  noScrollbars: true
});

$(document).ready(function() {

  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.scrollup').fadeIn();
    } else {
      $('.scrollup').fadeOut();
    }
  });

  $('.scrollup').click(function() {
    $("html, body").animate({
      scrollTop: 0
    }, 600);
    return false;
  });

});
