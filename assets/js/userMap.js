const userMapDupError = "Already registered, or username taken";
const userNotFoundError = "User not found!";
const usernameLengthLimit = 25;
let registerDialog = document.getElementById("registerDialog");


function registerUser(){
    let chosenUsername = document.getElementById("username").value;

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
    } else if (chosenUsername.length == 0) {
        registerDialog.innerHTML = `
        <span class="tag is-danger karla">Fill out the username field!</span>
        `;
    }

    let formData = new FormData();
    formData.append("email", email);
    formData.append("username", chosenUsername);

    var data = new XMLHttpRequest();
	    data.onload = function() {
	    if (data.status == 200 && data.readyState == 4) {
            if (data.responseText === userMapDupError) {
                registerDialog.innerHTML = `
                <span class="tag is-warning karla">Someone's already taken this username. Try again!</span>
                `;
            } else {
                oauthUsername = chosenUsername;

                // create a confirmation message on index.html
                registerDialog.innerHTML = `
                <span class="tag is-success karla">Registered successfully! Modal closing in three seconds...</span>
                `;

                setTimeout(function() {
                    // disable the modal
                    let registerModal = document.querySelector('#registerModal');
                    let html = document.querySelector('html');
                    registerModal.classList.remove('is-active');
                    html.classList.remove('is-clipped');
                }, 3000);
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
                oauthUsername = null;
                setRegisterModalJS();
                displaySongs(oauthUsername);
            } else {
                oauthUsername = data.responseText;
            }
        }
    };
    data.open("POST", `assets/php/get-username.php`);
    data.send(formData);
}
