/* Cleaned */
function saveLogic() {
    // First-timer (new user not signed in)
    if (email == null) {
        promptSignIn();
    } else { // Logged in, about to create new song
        createSongIndex();
    }
}

function editLogic(songID) {
    // First-timer (new user not signed in)
    if (email == null) {
        promptSignIn();
    } else { // Logged in, about to edit own song
        editSongIndex(songID);
    }
}

function promptSignIn() {
    createNotification("is-danger", "Please sign in with your Google account!", null);

    isFirstSignIn = true;
}

function onloadSaveButton() {
    saveButton.innerHTML = `
    <span class="icon is-small">
        <i class="fas fa-clone"></i>
    </span>
    <span>Clone</span>
    `;

    saveButton.setAttribute("onclick", "cloneSong()");
}

function cloneSong() {
    exportSong();

    title = titleField.textContent + " - Copy";
    let username = oauthUsername;

    let date = currentDate();

    let formData = new FormData();
    formData.append("title", title);
    formData.append("username", username);
    formData.append("dateCreated", date);
    formData.append("dateModified", date);
    formData.append("songData", exportBox.value);

    var data = new XMLHttpRequest();
	data.onload = function() {
	    if (data.status == 200 && data.readyState == 4) {
            // Clone success!
        }
    };
    data.open("POST", `assets/php/create-song.php`);
    data.send(formData);

    createNotification("is-info gradient", "Song successfully cloned! Click this notification to visit your profile.", `profile.php`);
}
