// Disgusting code, probably need to refactor haha

let r1 = document.getElementById("r1");
let r2 = document.getElementById("r2");
let r3 = document.getElementById("r3");
let r4 = document.getElementById("r4");
let r5 = document.getElementById("r5");
let r6 = document.getElementById("r6");

function saveLogic() {

    // First-timer (new user not signed in)
    if (oauthID == "Null") {
        promptSignIn();
    } else { // Logged in, about to create new song
        console.log("Logged in");
    }
}

function promptSignIn() {
    r1.innerHTML = "Ready to Save?";
    r2.innerHTML = "Sign in with your Google account!";
    r3.remove();
    r4.remove();
    r5.remove();
    r6.remove();
    username.remove();
    title.remove();

    console.log("Prompting sign in");
}
