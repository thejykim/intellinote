const serverData = String.raw`Don't Stop The Party|secs@gmail.com|04-20-2020|05-10-2020|00202020?YeetYeet|secs@gmail.com|04-20-2020|05-10-2020|00202020`;
const fieldParse = "|";
const songParse = "?";
const dateSep = "-"

const totalSongsElement = document.getElementById("totalSongs");

let serverEachSong = []; // After first split; gives information for each song (each song is string)
let serverObjects = []; // Array of song objects
// let savedSong = "INITIAL VALUE";

//called on
function updateDisplay(){

}
//works
function parseServerData(serverData){
    serverObjects = [];
    // get the server data as string
    serverEachSong = serverData.split(songParse);
    for (let i = 0; i < serverEachSong.length-1; i++) {
        let songStr = serverEachSong[i].split(fieldParse);
        var songObj = {
            title : songStr[0],
            userID : songStr[1],
            dateCreated :songStr[2],
            dateModified : songStr[3],
            songData : songStr[4],
            songID : songStr[5]
        };
        serverObjects.push(songObj);
    }
    console.log(serverObjects);
}

function createNewSong(){
    exportSong();

    let title = document.getElementById('title').value;
    let userID = document.getElementById('username').value;

    let date = currentDate();

    let formData = new FormData();
    formData.append("title", title);
    formData.append("userID", userID);
    formData.append("dateCreated", date);
    formData.append("dateModified", date);
    formData.append("songData", textbox.value);

    var data = new XMLHttpRequest();
	    data.onload = function() {
	    if (data.status == 200 && data.readyState == 4) {
            console.log(data.responseText);
            // parseServerData(data.responseText);
        }
        console.log("Running");
    };
    data.open("POST", `assets/php/create-song.php`, true);
    data.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    data.send(formData);
}

// Get a single song from database
function getSong(userID, songID) {
    var data = new XMLHttpRequest();

    let formData = new FormData();
    formData.append("userID", userID);
    formData.append("songID", songID);

	data.onload = function() {
	    if (data.status == 200 && data.readyState == 4) {
            parseServerData(data.responseText);
            textbox.value = serverObjects[0].songData;
            importSong();
        }
        console.log("Running");
    };
    data.open("POST", `assets/php/get-song.php`, true);
    data.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    data.send(formData);
}

// Get songs from database
function getSongs(userID) {
    var data = new XMLHttpRequest();

    let formData = new FormData();
    formData.append("userID", userID);

	data.onload = function() {
	    if (data.status == 200 && data.readyState == 4) {
            parseServerData(data.responseText);
        }
        console.log("Running");
    };

    data.open("POST", `assets/php/get-songs.php`, true);
    data.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    data.send(formData);
}

// Modify song; send to database
function editSong(songID) {
    exportSong();

    let title = document.getElementById('title').value;
    let userID = document.getElementById('emailID').value;

    let date = currentDate();

    let formData = new FormData();
    formData.append("title", title);
    formData.append("userID", userID);
    formData.append("dateModified", dateModified);
    formData.append("songData", textbox.value);
    formData.append("songID", songID);

    var data = new XMLHttpRequest();
    // var params = `id=${id}`;
	    data.onload = function() {
	    if (data.status == 200 && data.readyState == 4) {
            // edit status success
        }
    };
    data.open("POST", `assets/php/edit-song.php`, true);
    data.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    data.send(formData);
}

// Delete song
function deleteSong(songID) {
    let userID = document.getElementById('emailID').value;

    let formData = new FormData();
    formData.append("userID", userID);
    formData.append("songID", songID);

    var data = new XMLHttpRequest();
    // var params = `id=${id}`;
	    data.onload = function() {
	    if (data.status == 200 && data.readyState == 4) {
            console.log(data.responseText);
            // parseServerData(data.responseText);
        }
        console.log("Running");
    };

    data.open("POST", `assets/php/delete-song.php`, true);
    data.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
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
        console.log("Running");
    };
    data.open("POST", `assets/php/get-total.php`, true);
    data.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    data.send();
}
