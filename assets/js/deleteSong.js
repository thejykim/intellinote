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
    document.getElementById(songID).innerHTML = "Delete Song?";
    document.getElementById(songID).classList.add("is-light");
    document.getElementById(songID).onclick = callProfileDelete(songID);
}

function callProfileDelete(songID) {
    console.log("Deleting");
    deleteSong(songID);
    deleteContent.innerHTML = "Song Deleted!";
    document.getElementById(songID).onclick = function() { return false; };
}
