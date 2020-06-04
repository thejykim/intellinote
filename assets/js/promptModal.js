function setPromptModalJS() {
    document.querySelector('#open-prompt-modal').addEventListener('click', function (event) {
        event.preventDefault();
        var promptModal = document.querySelector('#promptModal');
        var html = document.querySelector('html');
        promptModal.classList.add('is-active');
        html.classList.add('is-clipped');

        promptModal.querySelector('#background-prompt').addEventListener('click', function (e) {
            e.preventDefault();
            promptModal.classList.remove('is-active');
            html.classList.remove('is-clipped');
        });

        promptModal.querySelector('#close-prompt').addEventListener('click', function (e) {
            e.preventDefault();
            promptModal.classList.remove('is-active');
            html.classList.remove('is-clipped');
        });
    });
}
