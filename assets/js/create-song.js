function setSaveModalJS() {
    document.querySelector('#open-save-modal').addEventListener('click', function (event) {
        event.preventDefault();
        var saveModal = document.querySelector('#saveModal');
        var html = document.querySelector('html');
        saveModal.classList.add('is-active');
        html.classList.add('is-clipped');

        saveModal.querySelector('#background-save').addEventListener('click', function (e) {
            e.preventDefault();
            saveModal.classList.remove('is-active');
            html.classList.remove('is-clipped');
        });

        saveModal.querySelector('#close-save').addEventListener('click', function (e) {
            e.preventDefault();
            saveModal.classList.remove('is-active');
            html.classList.remove('is-clipped');
        });
    });
}
