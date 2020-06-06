// Disgusting code, probably need to refactor haha

let saveButton = document.getElementById("saveButton");
//let saveIcon = document.getElementById("saveIcon");

function saveLogic() {
    // First-timer (new user not signed in)
    if (email == null) {
        promptSignIn();
    } else { // Logged in, about to create new song

        createSongIndex();
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
    createDialog.innerHTML = `
    <div class="notification is-danger">
        Please sign in with your Google account!
    </div>
    <br>
    `;

    console.log("Prompting sign in");
}

function onloadSaveButton() {
    //console.log("button changed");
    // saveButton.innerHTML = `
    // Clone
    // `;
    // saveIcon.innerHTML = `
    // <i class="fas fa-clone"></i>
    // `;
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

    createDialog.innerHTML = `
    <a href='profile.php?username="${oauthUsername}"'>
        <div class="notification is-info gradient">
            Song successfully cloned! Click this notification to visit your new profile.
        </div>
    </a>
    <br>
    `;
}
