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
    songToDelete = songID;
    targetButton.onclick = callProfileDelete;
}

function callProfileDelete() {
    // let targetButton = document.getElementById(songToDelete);
    // console.log(songToDelete);
    // deleteSong(102);
    // targetButton.innerHTML = "Song Deleted!";
    // targetButton.onclick = function() { return false; };
    deleteSong(songToDelete);
}
