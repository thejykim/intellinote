const serverData = String.raw`Don't Stop The Party|secs@gmail.com|04-20-2020|05-10-2020|00202020?YeetYeet|secs@gmail.com|04-20-2020|05-10-2020|00202020`;
const fieldParse = "|";
const songParse = "?";
const dateSep = "-"

const totalSongsElement = document.getElementById("totalSongs");

let serverEachSong = []; // After first split; gives information for each song (each song is string)
let serverObjects = []; // Array of song objects
let savedSong = "INITIAL VALUE";

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

    var data = new XMLHttpRequest();
	    data.onload = function() {
	    if (data.status == 200 && data.readyState == 4) {
            console.log(data.responseText);
            // parseServerData(data.responseText);
        }
        console.log("Running");
    };
    data.open("POST", `assets/php/create-song.php?title=${title}&userID=${userID}&dateCreated=${date}&dateModified=${date}&songData=${textbox.value}`, true);
    data.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    data.send();
}

// Get a single song from database
function getSong() {
    let userID = "thejyk1@gmail.com";
    let songID = 10;
    var data = new XMLHttpRequest();
    let tempData = "";
    // var params = `id=${id}`;
	data.onload = function() {
	    if (data.status == 200 && data.readyState == 4) {
            parseServerData(data.responseText);
            textbox.value = serverObjects[0].songData;
            importSong();
        }
        console.log("Running");
    };
    data.open("POST", `assets/php/get-song.php?userID=${userID}&songID=${songID}`, true);
    data.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    data.send(); //parems
}

// Get songs from database
function getSongs(userID) {
    var data = new XMLHttpRequest();
	data.onload = function() {
	    if (data.status == 200 && data.readyState == 4) {
            parseServerData(data.responseText);
        }
        console.log("Running");
    };
    data.open("POST", `assets/php/get-songs.php?userID=${userID}`, true);
    data.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    data.send(); //parems
}

// Modify song; send to database
function editSong(songID) {
    exportSong();

    let title = document.getElementById('title').value;
    let userID = document.getElementById('emailID').value;

    let date = currentDate();

    var data = new XMLHttpRequest();
    // var params = `id=${id}`;
	    data.onload = function() {
	    if (data.status == 200 && data.readyState == 4) {
            console.log(data.responseText);
            // parseServerData(data.responseText);
        }
        console.log("Running");
    };
    data.open("POST", `assets/php/edit-song.php?title=${title}&userID=${userID}&dateModified=${date}&songData=${textbox.value}&songID=${songID}`, true);
    data.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    data.send(); //parems
}

// Delete song
function deleteSong(songID) {
    let userID = document.getElementById('emailID').value;

    var data = new XMLHttpRequest();
    // var params = `id=${id}`;
	    data.onload = function() {
	    if (data.status == 200 && data.readyState == 4) {
            console.log(data.responseText);
            // parseServerData(data.responseText);
        }
        console.log("Running");
    };
    data.open("POST", `assets/php/delete-song.php?userID=${userID}&songID=${songID}`, true);
    data.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    data.send(); //parems
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
    data.send(); //parems
}
