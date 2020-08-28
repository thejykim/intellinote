function setDeleteModalJS() {
    document.querySelector('#open-delete-modal').addEventListener('click', function (event) {
        event.preventDefault();
        var deleteModal = document.querySelector('#deleteModal');
        var html = document.querySelector('html');
        deleteModal.classList.add('is-active');
        html.classList.add('is-clipped');

        deleteModal.querySelector('#background-delete').addEventListener('click', function (e) {
            e.preventDefault();
            deleteModal.classList.remove('is-active');
            html.classList.remove('is-clipped');
        });

        deleteModal.querySelector('#close-delete').addEventListener('click', function (e) {
            e.preventDefault();
            deleteModal.classList.remove('is-active');
            html.classList.remove('is-clipped');
        });
    });
}

function deleteProfile() {
    for (song of serverObjects) {
        deleteSongFromMap(song.songID);
    }

    deleteProfileFromMap();
    signOut();
    window.setTimeout(function() {
        window.location.href = 'index.html';
    }, 1000);
}
