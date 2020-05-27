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
            <span class="tag is-danger karla">Both fields are required. Try again!</span>
            `;
            return;
    }

    createNewSong();
    createDialog.innerHTML = `
    <a href='profile.php?userID="${usernameField.value}"'><span class="tag is-success karla">Song successfully added! Click this tag to visit your new profile.</span></a>
    `;
}
