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


up.onclick = function() {

  var st = setInterval(function() {

    document.body.scrollTop -= 35;
    if (document.body.scrollTop === 0) clearInterval(st);

  }, 16);
}


$(document).ready(function() {
  $('a[href^="#"]').click(function() {
    elementClick = $(this).attr("href");
    destination = $(elementClick).offset().top;

    if (navigator.userAgent.indexOf("Safari") > -1) {
      $('body').animate({
        scrollTop: destination
      }, 1100);
    } else {
      $('html').animate({
        scrollTop: destination
      }, 1100);
    }
    return false;
  });
});
