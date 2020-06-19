function toggleDelete() {
    deleteButton.innerHTML = "Delete Song?";
    deleteButton.classList.add("is-light");
    deleteButton.onclick = callDelete;
}

function callDelete() {
    deleteSong(globalSongID);
    deleteButton.innerHTML = "Song Deleted!";
    deleteButton.setAttribute("disabled", "true");
}

function toggleProfileDelete(songID) {
    let targetButton = document.getElementById(songID);
    targetButton.innerHTML = "Delete Song?";
    targetButton.classList.add("is-light");
    songToDelete = songID;
    targetButton.onclick = callProfileDelete;
}

function callProfileDelete() {
    document.getElementById(songToDelete).innerHTML = "Song Deleted!";
    document.getElementById(songToDelete).setAttribute("disabled", "true");
    deleteSong(songToDelete);
}
