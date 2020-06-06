let oauthID = "Null";
let visitor = false;
let email;

function onSignIn(googleUser) {
    if (!visitor) {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        oauthID = profile.getId();
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        email = profile.getEmail(); // This is null if the 'email' scope is not present.
        displaySongs(email);
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
