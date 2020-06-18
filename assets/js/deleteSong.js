function toggleDelete() {
    deleteContent.innerHTML = "Delete Song?";
    deleteButton.classList.add("is-light");
    deleteButton.onclick = deleteSong;
}

function deleteSong() {
    deleteContent.innerHTML = "Song Deleted!";
    deleteButton.onclick = function() { return false; };
}
