const fieldParse = "|";
const songParse = "?";
const dateSep = "-"

const totalSongsElement = document.getElementById("totalSongs");

let serverEachSong = []; // After first split; gives information for each song (each song is string)
let serverObjects = []; // Array of song objects

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
    //console.log(serverObjects);
}

function createNewSong(){
    exportSong();

    let title = document.getElementById('title').value;
    let username = oauthUsername;

    let date = currentDate();

    let formData = new FormData();
    formData.append("title", title);
    formData.append("username", username);
    formData.append("dateCreated", date);
    formData.append("dateModified", date);
    formData.append("songData", exportBox.value);

    //console.log(exportBox.value);

    var data = new XMLHttpRequest();
	    data.onload = function() {
	    if (data.status == 200 && data.readyState == 4) {
            console.log(data.responseText);
        }
    };
    data.open("POST", `assets/php/create-song.php`);
    data.send(formData);
}

// Get a single song from database
function getSong(songID) {
    var data = new XMLHttpRequest();

    let formData = new FormData();
//    formData.append("username", username);
    formData.append("songID", songID);

	data.onload = function() {
	    if (data.status == 200 && data.readyState == 4) {
            parseServerData(data.responseText);
            exportBox.value = serverObjects[0].songData;
            importSong();

            if (serverObjects[0].username != oauthUsername) {
                //console.log("server username : " + serverObjects[0].username + "oauth : " + oauthUsername);
                onloadSaveButton();
            }
        }
    };
    data.open("POST", `assets/php/get-song.php`);
    data.send(formData);
}

// Get songs from database
function getSongs(username) {
    var data = new XMLHttpRequest();

    let formData = new FormData();
    formData.append("username", username);

	data.onload = function() {
	    if (data.status == 200 && data.readyState == 4) {
            parseServerData(data.responseText);
        }
    };

    data.open("POST", `assets/php/get-songs.php`);
    data.send(formData);
}

// Modify song; send to database
function editSong(songID) {
    exportSong();

    let title = document.getElementById('title').value;

    let date = currentDate();

    let formData = new FormData();
    formData.append("title", title);
    formData.append("username", oauthUsername);
    formData.append("dateModified", dateModified);
    formData.append("songData", exportBox.value);
    formData.append("songID", songID);

    var data = new XMLHttpRequest();
	    data.onload = function() {
	    if (data.status == 200 && data.readyState == 4) {
            // edit status success
        }
    };
    data.open("POST", `assets/php/edit-song.php`);
    data.send(formData);
}

// Delete song
function deleteSong(songID) {
    let username = document.getElementById('emailID').value;

    let formData = new FormData();
    formData.append("username", username);
    formData.append("songID", songID);

    var data = new XMLHttpRequest();
	    data.onload = function() {
	    if (data.status == 200 && data.readyState == 4) {
            console.log(data.responseText);
        }
    };

    data.open("POST", `assets/php/delete-song.php`);
    data.send(formData);
}

function currentDate() {
    let curDate = new Date();

    let year = curDate.getFullYear().toString().concat(dateSep);
    let month = (curDate.getMonth()+1).toString().concat(dateSep);
    let day = curDate.getDate().toString();

    let date = "";
    date = date.concat(year, month, day);

    return date;
}

function getTotalSongs() {
    var data = new XMLHttpRequest();
	data.onload = function() {
	    if (data.status == 200 && data.readyState == 4) {
            totalSongsElement.innerText = data.responseText;
        }
    };
    data.open("POST", `assets/php/get-total.php`);
    data.send();
}
