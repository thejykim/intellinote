/* Cleaned */
function registerUser(){
    let chosenUsername = document.getElementById("username").value;

    // proper length needs to be checked on client side
    if (chosenUsername.length > usernameLengthLimit) {
        registerDialog.innerHTML = `
        <span class="tag is-danger karla">Username too long!</span>
        `;
        return;
    } else if (chosenUsername.length == 0) {
        registerDialog.innerHTML = `
        <span class="tag is-danger karla">Fill out the username field!</span>
        `;
        return;
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

                createNotification("is-success", "Successfully registered!", null);

                let registerModal = document.querySelector('#registerModal');
                let html = document.querySelector('html');
                registerModal.classList.remove('is-active');
                html.classList.remove('is-clipped');
            }
        }
    };
    data.open("POST", `assets/php/create-user.php`);
    data.send(formData);
}

function getUsername() {
    if (email == null) {
        // TODO: ERROR MESSAGE
        return;
    }

    let formData = new FormData();
    formData.append("email", email);

    var data = new XMLHttpRequest();
	    data.onload = function() {
	    if (data.status == 200 && data.readyState == 4) {
            if (data.responseText === userNotFoundError) {
                oauthUsername = null;
                if (isIndex) {
                    setRegisterModalJS();
                }
            } else {
                oauthUsername = data.responseText;
                displaySongs(oauthUsername);
            }
        }
    };
    data.open("POST", `assets/php/get-username.php`);
    data.send(formData);
}
