const titleField = document.getElementById("title");
const createDialog = document.getElementById("createDialog");

function createSongIndex() {
    // check required fields
    if (titleField.value.length == 0) {
        createNotification("is-warning", "Put in a title!", null);
        return;
    }

    createNewSong();
    createNotification("is-success", "Song successfully added! Click this notification to visit your new profile.", `profile.php?username="${oauthUsername}"`);
}
