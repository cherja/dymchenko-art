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

    document.scrollingElement.scrollTop -= 50;
    if (document.scrollingElement.scrollTop === 0) clearInterval(st);

  }, 16);
}



$('a[href^="#"]').click(function() {
  elementClick = $(this).attr("href");
  destination = $(elementClick).offset().top;
  $(document.scrollingElement).animate({scrollTop: destination}, 1100);
  return false;
});
