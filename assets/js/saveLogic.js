// Disgusting code, probably need to refactor haha

let saveButton = document.getElementById("saveButton");

function saveLogic() {

    // First-timer (new user not signed in)
    if (oauthID == "Null") {
        promptSignIn();
    } else { // Logged in, about to create new song
        loggedInAllowSave();
    }
}

function loggedInAllowSave(){
    saveButton.setAttribute("style", "cursor: allowed;");
    createDialog.innerHTML = "";
}

function promptSignIn() {
    saveButton.setAttribute("style", "cursor: not-allowed;");
    createDialog.innerHTML = `
    <span class="tag is-danger karla">Please sign in with your Google account!</span>
    `;

    console.log("Prompting sign in");
}
