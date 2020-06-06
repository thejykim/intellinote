let visitor = false;
let email = null;
let oauthUsername;
let globalSongID;

function onSignIn(googleUser) {
    if (!visitor) {
        var profile = googleUser.getBasicProfile();
        //console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        //console.log('Name: ' + profile.getName());
        //console.log('Image URL: ' + profile.getImageUrl());
        email = profile.getEmail(); // This is null if the 'email' scope is not present.
        getUsername();

        createDialog.innerHTML = `
        <div class="notification is-success">
            Successfully logged in!
        </div>
        <br>`;
    } else {
        return;
    }
}

function onSignInSong(googleUser) {
    if (!visitor) {
        var profile = googleUser.getBasicProfile();
        //console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        //console.log('Name: ' + profile.getName());
        //console.log('Image URL: ' + profile.getImageUrl());
        email = profile.getEmail(); // This is null if the 'email' scope is not present.
        getUsername();

        getSong(globalSongID);

        createDialog.innerHTML = `
        <div class="notification is-success">
            Successfully logged in!
        </div>
        <br>`;
    } else {
        return;
    }
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
 }

function setRegisterModalJS() {
    event.preventDefault();
    var registerModal = document.querySelector('#registerModal');
    var html = document.querySelector('html');
    registerModal.classList.add('is-active');
    html.classList.add('is-clipped');
}
