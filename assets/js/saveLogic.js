let t1 = document.getElementById("t1");
let t2 = document.getElementById("t2");
let t3 = document.getElementById("t3");
let t4 = document.getElementById("t4");

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
    t1.innerHTML = "OKAY";
    t2.remove();
    t3.innerHTML = "t3";
    t4.remove();

    console.log("PROMPTING SIGN IN");
}
