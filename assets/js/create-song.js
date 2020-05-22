const usernameField = document.getElementById("username");
const titleField = document.getElementById("title");
const createDialog = document.getElementById("createDialog");

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

function createSongIndex() {
    // check required fields
    if (usernameField.value.length == 0 ||
        titleField.value.length == 0) {
            createDialog.innerHTML = `
            <p class="karla has-text-danger">Both fields are required. Try again!</p>
            `;
            return;
    }

    createNewSong();
    createDialog.innerHTML = `
    <p class="karla has-text-success">Song submitted!</p>
    `;
}
