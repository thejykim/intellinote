const userMapDupError = "Already registered, or username taken";

function registerUser(chosenUsername){
    // manipulate chosenUsername to a textbox value, parameter, however implementation you want.
    // it doesn't need to be a parameter and probably shouldn't

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
