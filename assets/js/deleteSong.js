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
    let targetButton = document.getElementById(songID);
    targetButton.innerHTML = "Delete Song?";
    targetButton.classList.add("is-light");
    targetButton.onclick = callProfileDelete(songID);
}

function callProfileDelete(songID) {
    let targetButton = document.getElementById(songID);
    deleteSong(songID);
    targetButton.innerHTML = "Song Deleted!";
    targetButton.onclick = function() { return false; };
}
