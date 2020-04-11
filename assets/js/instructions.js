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
