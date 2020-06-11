function createSongIndex() {
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

    createNewSong();
    createDialog.innerHTML = `
    <a href='profile.php?username="${oauthUsername}"'>
        <div class="notification is-success">
            Song successfully added! Click this notification to visit your new profile.
        </div>
    </a>
    <br>
    `;
}
