function toggleDelete() {
    deleteContent.innerHTML = "Delete Song?";
    deleteButton.classList.add("is-light");
    deleteButton.onclick = callDelete;
}

function callDelete() {
    console.log("Deleting");
    deleteSong(globalSongID);
    deleteContent.innerHTML = "Song Deleted!";
    deleteButton.onclick = function() { return false; };
}

function toggleProfileDelete(songID) {
    console.log(songID);
}
