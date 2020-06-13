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
    createDialog.innerHTML = `
    <div class="notification is-danger">
        Please sign in with your Google account!
    </div>
    <br>
    `;

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

    title = title.value + " - Copy";
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
	    // if (data.status == 200 && data.readyState == 4) {
      //       console.log(data.responseText);
      //   }
    };
    data.open("POST", `assets/php/create-song.php`);
    data.send(formData);

    createDialog.innerHTML = `
    <a href='profile.php?username="${oauthUsername}"'>
        <div class="notification is-info gradient">
            Song successfully cloned! Click this notification to visit your profile.
        </div>
    </a>
    <br>
    `;
}
