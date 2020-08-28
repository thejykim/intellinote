/* Cleaned */
function saveLogic() {
    // First-timer (new user not signed in)
    if (email == null) {
        promptSignIn();
    } else { // Logged in, about to create new song
        createSongIndex();
        window.onbeforeunload = function () { };
    }
}

function editLogic(songID) {
    // First-timer (new user not signed in)
    if (email == null) {
        promptSignIn();
    } else { // Logged in, about to edit own song
        editSongIndex(songID);
        window.onbeforeunload = function () { };
    }
}

function promptSignIn() {
    createNotification("is-danger", "Please sign in with your Google account!", null);

    isFirstSignIn = true;
}

// Changes save button to clone button, called in parseTextFromServer.js -> getSong(songID)
function onloadSaveToClone() {
    saveButton.innerHTML = `
    <span class="icon is-small">
        <i class="fas fa-clone"></i>
    </span>
    <span>Clone</span>
    `;

    saveButton.setAttribute("onclick", "cloneSong()");
}

// Changes clone button to save button, called in parseTextFromServer.js -> getSong(songID)
function onloadCloneToSave() {
    saveButton.reset();
}

function cloneSong() {
    saveButton.setAttribute("disabled", "true");
    saveButton.innerHTML = `
    <span class="icon is-small">
        <i class="fas fa-check"></i>
    </span>
    <span>Cloned</span>
    `;

    exportSong();

    title = titleField.textContent + " - Copy";

    let date = currentDate();

    let formData = new FormData();
    formData.append("title", title);
    formData.append("username", oauthUsername);
    formData.append("dateCreated", date);
    formData.append("dateModified", date);
    formData.append("songData", exportBox.value);

    var data = new XMLHttpRequest();
	data.onload = function() {
	    if (data.status == 200 && data.readyState == 4) {
            // Clone success!
            createNotification("is-info gradient", "Song successfully cloned! Click here to visit your profile.", `profile.php`);
        }
    };
    data.open("POST", `assets/php/create-song.php`);
    data.send(formData);
}
