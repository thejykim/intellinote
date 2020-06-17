function deletePopup() {
    createDialog.innerHTML = `
    <div class="notification is-danger is-vcentered columns">
        <div class = "column is-four-fifths">
        Are you sure you want to delete?
        </div>
        <div class = "column is-half">
            <button class = "button is-danger is-inverted is-rounded"
            onclick = "deleteSong()"> Delete Song </button>
        </div>
    </div>
    <br>`;
}

function deleteSong() {
    console.log("Deleting song");
}
