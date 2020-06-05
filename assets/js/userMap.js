const userMapDupError = "Already registered, or username taken";
const userNotFoundError = "User not found!";
const usernameLengthLimit = 20;

function registerUser(chosenUsername){
    // manipulate chosenUsername to a textbox value, parameter, however implementation you want.
    // it doesn't need to be a parameter and probably shouldn't

    // proper length needs to be checked on client side
    if (chosenUsername.length > usernameLengthLimit) {
        // create an error message. for now, it just console.log's
        console.log("Username too long!");
        return;
    } else if (email == null) {
        // I'm not sure if this is a proper check for email, but the same follows
        // as above
        console.log("Sign in first!");
        return;
    }

    let formData = new FormData();
    formData.append("email", email);
    formData.append("username", chosenUsername);

    var data = new XMLHttpRequest();
	    data.onload = function() {
	    if (data.status == 200 && data.readyState == 4) {
            if (data.responseText === userMapDupError) {
                // handle this, and get rid of the console.log when you do
                console.log("Duplicate detected!");
            } else {
                // create a confirmation message on index.html, same thing here
                console.log("Hooray!");
            }
        }
    };
    data.open("POST", `assets/php/create-user.php`);
    data.send(formData);
}

function getUsername() {
    if (email == null) {
        console.log("Sign in first!");
        return;
    }

    let formData = new FormData();
    formData.append("email", email);

    var data = new XMLHttpRequest();
	    data.onload = function() {
	    if (data.status == 200 && data.readyState == 4) {
            if (data.responseText === userNotFoundError) {
                // handle this, and get rid of the console.log when you do
                console.log("Seems like you haven't registered yet.");
            } else {
                // create a confirmation message on index.html, same thing here
                console.log("Username: " + data.responseText);
            }
        }
    };
    data.open("POST", `assets/php/get-username.php`);
    data.send(formData);
}
