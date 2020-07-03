/* Cleaned */

function createSongIndex() {
    // check required fields
    if (titleField.textContent.replace(/\s+/g, '') == "") {
        createNotification("is-warning", "Put in a title!", null);
        return;
    }
    createNewSong();

    saveButton.setAttribute("disabled", "true");
}

function editSongIndex(songID) {
    //check required fields
    if (titleField.textContent.replace(/\s+/g, '') == "") {
        createNotification("is-warning", "Put in a title!", null);
        return;
    }
    editSong(songID);
}
