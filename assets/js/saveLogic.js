let r1 = document.getElementById("r1");
let r2 = document.getElementById("r2");
let r3 = document.getElementById("r3");
let r4 = document.getElementById("r4");
let r5 = document.getElementById("r5");

function saveLogic() {

    // First-timer new user
    if (oauthID == "Null") {
        promptSignIn();

    } else {
        console.log("logged in");
    }
    // Logged in, about to create new song


    //button.innerHTML = "Testing";

}

function promptSignIn() {
    r1.innerHTML = "OKAY";
    r2.remove();
    r3.remove();
    r4.remove();
    username.remove();
    title.remove();

    console.log("PROMPTING SIGN IN");
}
