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
<<<<<<< HEAD
        editSong(songID);
        createNotification("is-success", "Song successfully saved!", null);
=======
        //editSong(songID);
        editSongIndex(songID);
>>>>>>> master
    }
}
//
// function loggedInAllowSave(){
//     saveButton.setAttribute("style", "cursor: allowed;");
//     saveButton.setAttribute("onclick", "createSongIndex()");
//     createDialog.innerHTML = "";
// }

function promptSignIn() {
    //saveButton.setAttribute("style", "cursor: not-allowed;");
    //saveButton.setAttribute("onclick", "");
    //saveButton.setAttribute('disabled', 'true');
    createNotification("is-danger", "Please sign in with your Google account!", null);

    isFirstSignIn = true;

    console.log("Prompting sign in");
}

function onloadSaveButton() {

    saveButton.innerHTML = `
    <span class="icon is-small">
        <i class="fas fa-clone"></i>
    </span>
    <span>Clone</span>
    `;

    //saveButton.onclick = testOnClick();
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

    //console.log(exportBox.value);

    var data = new XMLHttpRequest();
	    data.onload = function() {
	    if (data.status == 200 && data.readyState == 4) {
            console.log(data.responseText);
        }
    };
    data.open("POST", `assets/php/create-song.php`);
    data.send(formData);

    createNotification("is-info gradient", "Song successfully cloned! Click this notification to visit your profile.", `profile.php?username="${oauthUsername}"`);
}
