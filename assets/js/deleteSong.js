function toggleDelete() {
    deleteButton.innerHTML = "Confirm Delete?";
    deleteButton.classList.add("is-light");
    deleteButton.onclick = callDelete;
}

function callDelete() {
    deleteSong(globalSongID);
    deleteButton.innerHTML = "Song Deleted!";
    deleteButton.setAttribute("disabled", "true");
    setTimeout(function() => { window.location.href = "profile.php"; }, 1000);

}

function toggleProfileDelete(songID) {
    let targetButton = document.getElementById(songID);
    targetButton.innerHTML = "Confirm Delete?";
    targetButton.classList.add("is-light");
    songToDelete = songID;
    targetButton.onclick = callProfileDelete;
}

function callProfileDelete() {
    document.getElementById(songToDelete).innerHTML = "Song Deleted!";
    document.getElementById(songToDelete).setAttribute("disabled", "true");
    deleteSong(songToDelete);
    setTimeout(function() => { location.reload(); }, 1000);
}
