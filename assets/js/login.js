/* Cleaned */
function setLoginModalJS() {
    document.querySelector('#open-login-modal').addEventListener('click', function (event) {
        event.preventDefault();
        var loginModal = document.querySelector('#loginModal');
        var html = document.querySelector('html');
        loginModal.classList.add('is-active');
        html.classList.add('is-clipped');

        loginModal.querySelector('#background-login').addEventListener('click', function (e) {
            e.preventDefault();
            loginModal.classList.remove('is-active');
            html.classList.remove('is-clipped');
        });

        loginModal.querySelector('#close-login').addEventListener('click', function (e) {
            e.preventDefault();
            loginModal.classList.remove('is-active');
            html.classList.remove('is-clipped');
        });
    });
}

function onSignIn(googleUser) {
    if (!isVisitor) {
        var profile = googleUser.getBasicProfile();
        oauthID = profile.getId();
        email = profile.getEmail(); // This is null if the 'email' scope is not present.
        getUsername();

        if (isFirstSignIn) {
            createNotification("is-success", "Successfully logged in!", null);
        }

        if (isProfile) {
            if (oauthUsername == null) {
                recentSongsDiv.innerHTML = `
                <h4 class="title is-4 poppins">You're not registered!</h4>
                <h6 class="subtitle is-6 karla">...but you could also fix that in about 10 seconds. Click Intellinote on the top left to get started.</h6>
                `;
            }
        }
    }
    let signInButton = document.getElementById('open-login-modal');
    signInButton.classList.add("is-hidden");
    let dropdownMenu = document.getElementById('navbar-dropdown');
    dropdownMenu.classList.remove("is-hidden");
}

function onSignInSong(googleUser) {
    if (!isVisitor) {
        var profile = googleUser.getBasicProfile();
        email = profile.getEmail(); // This is null if the 'email' scope is not present.
        getUsername();
        getSong(globalSongID);

    }
    let signInButton = document.getElementById('open-login-modal');
    signInButton.classList.add("is-hidden");
    let dropdownMenu = document.getElementById('navbar-dropdown');
    dropdownMenu.classList.remove("is-hidden");
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        // console.log('User signed out.');
    });
}

function setRegisterModalJS() {
    event.preventDefault();
    var registerModal = document.querySelector('#registerModal');
    var html = document.querySelector('html');
    registerModal.classList.add('is-active');
    html.classList.add('is-clipped');
}
