let button = document.getElementById("open-save-modal");
let yeet = document.getElementById("yeet");

function saveLogic() {

    // First-timer new user
    if (oauthID == "Null") {
        promptSignIn();
        yeet.innerHTML = "OKAY";
    } else {
        console.log("logged in");
    }
    // Logged in, about to create new song


    //button.innerHTML = "Testing";

}

function promptSignIn() {
    console.log("PROMPTING SIGN IN");
}
