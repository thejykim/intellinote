function toggleDelete() {
    deleteContent.innerHTML = "Delete Song?";
    deleteButton.classList.add("is-light");
    deleteButton.onclick = callDelete;
}

function callDelete() {
    deleteSong(globalSongID);
    deleteContent.innerHTML = "Song Deleted!";
    deleteButton.onclick = function() { return false; };
}

function toggleProfileDelete(songID) {
    document.getElementById(songID).classList.add("is-light");
}

function callProfileDelete(songID) {
    console.log("Deleting");
    deleteSong(globalSongID);
    deleteContent.innerHTML = "Song Deleted!";
    deleteButton.onclick = function() { return false; };
}
