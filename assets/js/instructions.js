function setInfoModalJS() {
  document.querySelector('#open-info-modal').addEventListener('click', function (event) {
      event.preventDefault();
      var infoModal = document.querySelector('#infoModal');
      var html = document.querySelector('html');
      infoModal.classList.add('is-active');
      html.classList.add('is-clipped');

     infoModal.querySelector('#background-info').addEventListener('click', function (e) {
          e.preventDefault();
         infoModal.classList.remove('is-active');
          html.classList.remove('is-clipped');
      });

     infoModal.querySelector('#close-info').addEventListener('click', function (e) {
          e.preventDefault();
         infoModal.classList.remove('is-active');
          html.classList.remove('is-clipped');
      });
  });
}

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
