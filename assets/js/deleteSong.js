function deletePopup() {
  createDialog.innerHTML = `
  <div class="notification is-danger">
    Are you sure you want to delete?
    <button class = "button is-danger is-rounded"
     onclick = "deleteSong()"> Delete Song </button>
  </div>
  <br>`;
}

function deleteSong() {
  console.log("Deleting song");
}
