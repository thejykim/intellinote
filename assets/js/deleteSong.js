function toggleDelete() {
    deleteButton.innerHTML = "Confirm Delete?";
    deleteButton.classList.add("is-light");
    deleteButton.onclick = callDelete;
}

function callDelete() {
    deleteSong(globalSongID);
    deleteButton.innerHTML = "Song Deleted!";
    deleteButton.setAttribute("disabled", "true");
    setTimeout(() => {}, 2000);
    window.location.href = "profile.php";
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
    setTimeout(() => {}, 2000);
    window.location.href = "profile.php";
}

function toggleRecentDelete(songID) {
    buttonToChange = document.getElementById(songID);
    buttonToChange.innerHTML = "Confirm Delete?";
    buttonToChange.classList.add("is-light");
    songToDelete = songID.substr(1);
    buttonToChange.onclick = callRecentDelete;
}

function callRecentDelete() {
    buttonToChange.innerHTML = "Song Deleted!";
    buttonToChange.setAttribute("disabled", "true");
    deleteSong(songToDelete);
    setTimeout(() => {}, 2000);
    window.location.href = "profile.php";
}
