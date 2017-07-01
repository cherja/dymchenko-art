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
  document.body.scrollTop = 0;
}
