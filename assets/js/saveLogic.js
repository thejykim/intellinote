// Disgusting code, probably need to refactor haha

let saveButton = document.getElementById("saveButton");

function saveLogic() {
    // First-timer (new user not signed in)
    if (oauthID == "Null") {
        promptSignIn(); // need to fix
    } else { // Logged in, about to create new song
        createSongIndex();
    }
}
//
// function loggedInAllowSave(){
//     saveButton.setAttribute("style", "cursor: allowed;");
//     saveButton.setAttribute("onclick", "createSongIndex()");
//     createDialog.innerHTML = "";
// }

function promptSignIn() {
    saveButton.setAttribute("style", "cursor: not-allowed;");
    saveButton.setAttribute("onclick", "");
    createDialog.innerHTML = `
    <span class="tag is-danger karla">Please sign in with your Google account!</span>
    `;

    console.log("Prompting sign in");
}
