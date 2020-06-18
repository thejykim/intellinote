/* Cleaned */

function createSongIndex() {
    // check required fields
    //if (titleField.value.length == 0) {
    if (titleField.contents().length == 0) {
        createNotification("is-warning", "Put in a title!", null);
        return;
    }

    createNewSong();
    createNotification("is-success", "Song successfully added! Click this notification to visit your new profile.", `profile.php?username="${oauthUsername}"`);
}

function editSongIndex(songID) {
    // check required fields
    if (titleField.value.length == 0) {
        createDialog.innerHTML = `
        <div class="notification is-warning">
            Put in a title!
        </div>
        <br>
        `;
        return;
    }

    editSong(songID);
    createDialog.innerHTML = `
    <div class="notification is-success">
        Song successfully saved!
    </div>
    <br>
    `;
}
