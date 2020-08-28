/* Cleaned */
function parseServerData(serverData){
    serverObjects = [];
    // get the server data as string
    serverEachSong = serverData.split(songParse);
    for (let i = 0; i < serverEachSong.length-1; i++) {
        let songStr = serverEachSong[i].split(fieldParse);
        var songObj = {
            title : songStr[0],
            username : songStr[1],
            dateCreated :songStr[2],
            dateModified : songStr[3],
            songData : songStr[4],
            songID : songStr[5]
        };
        serverObjects.push(songObj);
    }
}

function parseDateFromServer(date) {
    // necessary because 'date' parameter is a string made in currentDate()
    let dateTypeDate = new Date(date);

    let year = dateTypeDate.getFullYear();
    let month = dateTypeDate.getMonth();
    let day = dateTypeDate.getDate();

    let dateString = year + dateSep + (month + 1) + dateSep + day;

    return dateString;
}

// Add a new song to the database
function createNewSong(){
    var data = new XMLHttpRequest();
    exportSong();

    let title = document.getElementById('title').innerHTML;

    let date = currentDate();

    let formData = new FormData();
    formData.append("title", title);
    formData.append("username", oauthUsername);
    formData.append("dateCreated", date);
    formData.append("dateModified", date);
    formData.append("songData", exportBox.value);

    data.onload = function() {
        if (data.status == 200 && data.readyState == 4) {
            createNotification("is-success", "Song successfully added! Click here to visit your profile.", `profile.php`);
        }
    };
    data.open("POST", `assets/php/create-song.php`);
    data.send(formData);
}

// Get a single song from database
function getSong(songID) {
    var data = new XMLHttpRequest();

    let formData = new FormData();
    formData.append("songID", songID);

	data.onload = function() {
	    if (data.status == 200 && data.readyState == 4) {
            parseServerData(data.responseText);
            exportBox.value = serverObjects[0].songData;
            importSong();
            titleField.innerHTML = serverObjects[0].title;

            if ((serverObjects[0].username != oauthUsername) && (oauthUsername != null)) {
                saveButton.classList.add("is-hidden");
                cloneButton.classList.remove("is-hidden");
                deleteButton.classList.add("is-hidden");
            } else {
                saveButton.classList.remove("is-hidden");
                cloneButton.classList.add("is-hidden");
                deleteButton.classList.remove("is-hidden");
            }
        }
    };
    data.open("POST", `assets/php/get-song.php`);
    data.send(formData);
}

// Modify song; send to database
function editSong(songID) {
    var data = new XMLHttpRequest();
    exportSong();

    let title = document.getElementById('title').innerHTML;

    let date = currentDate();

    let formData = new FormData();
    formData.append("title", title);
    formData.append("username", oauthUsername);
    formData.append("dateModified", date);
    formData.append("songData", exportBox.value);
    formData.append("songID", songID);

	data.onload = function() {
        if (data.status == 200 && data.readyState == 4) {
            createNotification("is-success", "Song successfully saved!", null);
        }
    };
    data.open("POST", `assets/php/edit-song.php`);
    data.send(formData);
}

// Delete song
function deleteSongFromMap(songID) {
    var data = new XMLHttpRequest();

    let formData = new FormData();
    formData.append("username", oauthUsername);
    formData.append("songID", songID);

    data.onload = function() {
        if (data.status == 200 && data.readyState == 4) {
            // Delete song success!
        }
    };
    data.open("POST", `assets/php/delete-song.php`);
    data.send(formData);
}

function deleteProfileFromMap() {
    var data = new XMLHttpRequest();

    let formData = new FormData();
    formData.append("username", oauthUsername);

    data.onload = function() {
        if (data.status == 200 && data.readyState == 4) {
            // Delete profile success!
        }
    };
    data.open("POST", `assets/php/delete-profile.php`);
    data.send(formData);
}

function getTotalSongs() {
    var data = new XMLHttpRequest();
	data.onload = function() {
	    if (data.status == 200 && data.readyState == 4) {
            totalSongsElement.innerHTML = data.responseText;
        }
    };
    data.open("POST", `assets/php/get-total.php`);
    data.send();
}

// Get the nine most recent songs from database
function getExploreSongs() {
    var data = new XMLHttpRequest();

	data.onload = function() {
	    if (data.status == 200 && data.readyState == 4) {
            parseServerData(data.responseText);
            updateExplorePage();
        }
    };
    data.open("GET", `assets/php/get-explore.php`);
    data.send();
}

function currentDate() {
    let curDate = new Date().toString();
    return curDate;
}
