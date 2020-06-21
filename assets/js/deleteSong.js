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
    // setTimeout(() => {}, 2000);
    // window.location.href = "profile.php";
}

function toggleRecentDelete(songID) {
    console.log("HELLO" + songID);
    let targetButton = document.getElementById(songID);
    targetButton.innerHTML = "Confirm Delete?";
    targetButton.classList.add("is-light");
    songToDelete = songID - 1069;
    buttonToChange = targetButton;
    targetButton.onclick = callRecentDelete;
}

function callRecentDelete() {
    buttonToChange.innerHTML = "Song Deleted!";
    buttonToChange.setAttribute("disabled", "true");
    deleteSong(songToDelete);
    // setTimeout(() => {}, 2000);
    // window.location.href = "profile.php";
}
