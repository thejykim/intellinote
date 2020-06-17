function deletePopup() {
    createDialog.innerHTML = `
    <div class="notification is-danger">
    <p> Are you sure you want to delete?
    <button class = "button is-danger is-rounded"
    onclick = "deleteSong()"> Delete Song </button>
    </p>
    </div>
    <br>`;
}

function deleteSong() {
    console.log("Deleting song");
}
