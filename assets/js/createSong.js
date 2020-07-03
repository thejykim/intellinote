/* Cleaned */

function createSongIndex() {
    // check required fields
    if (titleField.textContent.replace(/\s+/g, '') == "") {
        createNotification("is-warning", "Put in a title!", null);
        return;
    }
    createNewSong();

    saveButton.setAttribute("disabled", "true");
    saveButton.innerHTML = `
    <span class="icon is-small">
        <i class="fas fa-check"></i>
    </span>
    <span>Saved</span>
    `;

    window.setTimeout(function() {
        saveButton.innerHTML = `
        <span class="icon is-small">
            <i class="fas fa-save"></i>
        </span>
        <span>Save</span>
        `;

        saveButton.setAttribute("disabled", "false");
    }, textResetDelay);
}

function editSongIndex(songID) {
    //check required fields
    if (titleField.textContent.replace(/\s+/g, '') == "") {
        createNotification("is-warning", "Put in a title!", null);
        return;
    }
    editSong(songID);
}
