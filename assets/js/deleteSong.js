// The following two functions operate in songs.php
function toggleDelete() {
    deleteButton.innerHTML = "Confirm Delete?";
    deleteButton.classList.add("is-light");
    // deleteButton.onclick = callDelete;
    deleteButton.setAttribute("onclick", "callDelete()");
}

function callDelete() {
    deleteSong(globalSongID);
    deleteButton.innerHTML = "Song Deleted!";
    deleteButton.setAttribute("disabled", "true");
    setTimeout(() => {}, 2000);
    window.location.href = "profile.php";
}

// The following three functions operate in profile.php
function toggleProfileDelete(songID) {
    buttonToChange = document.getElementById(songID);
    buttonToChange.innerHTML = "Confirm Delete?";
    buttonToChange.classList.add("is-light");
    songToDelete = songID;
    buttonToChange.onclick = callProfileDelete;
}

function toggleRecentDelete(songID) {
    buttonToChange = document.getElementById(songID);
    buttonToChange.innerHTML = "Confirm Delete?";
    buttonToChange.classList.add("is-light");
    songToDelete = songID.substr(1);
    buttonToChange.onclick = callProfileDelete;
}

function callProfileDelete() {
    buttonToChange.innerHTML = "Song Deleted!";
    buttonToChange.setAttribute("disabled", "true");
    deleteSong(songToDelete);
    setTimeout(() => {}, 2000);
    window.location.href = "profile.php";
}
