const serverData = String.raw`Don't Stop The Party|secs@gmail.com|04-20-2020|05-10-2020|00202020?YeetYeet|secs@gmail.com|04-20-2020|05-10-2020|00202020`;
const fieldParse = "|";
const songParse = "?";
const dateSep = "-"
//add delete function

let serverEachSong = []; // After first split; gives information for each song (each song is string)
let serverObjects = []; // Array of song objects

//called on
function updateDisplay(){

}
//works
function parseServerData(serverData){
    // get the server data as string
    serverEachSong = serverData.split(songParse);
    for (let i = 0; i < serverEachSong.length-1; i++) {
        let songStr = serverEachSong[i].split(fieldParse);
        var songObj = {
            title : songStr[0],
            id : songStr[1],
            dateCreated :songStr[2],
            dateModified : songStr[3],
            songData : songStr[4]
        };
        serverObjects.push(songObj);
    }
}

// Send all songs to database
// TODO
// function sendNewSong(newSong) {
//     var data = new XMLHttpRequest();
//     var params = `newString=${newSong}`;
// 	data.onload = function() {
// 	    if (data.status == 200 && data.readyState == 4) {
//             console.log(data.responseText);
//             // parseServerData(data.responseText);
//         }
//         console.log("Running");
//     };
//     data.open("POST", "assets/php/create-song.php", true);
//     data.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
//     data.send(params); //parems
// }
// sendNewSong(serverData);

// TODO
function createNewSong(){
    var curDate = new Date();
    let newSong = "";
    exportSong();

    userID = document.getElementById('emailID').value;
    title = document.getElementById('title').value;

    year = curDate.getFullYear().toString().concat(dateSep);
    month = (curDate.getMonth()+1).toString().concat(dateSep);
    day = curDate.getDate().toString();

    date = date.concat(year, month, day);
    console.log(date);
    var data = new XMLHttpRequest();
    //var params = `userID=${userID}, title=${title}, dateCreated=${dateCreated}, dateModified=${dateCreated}, songData=${textbox.value}`;
	  data.onload = function() {
	    if (data.status == 200 && data.readyState == 4) {
            console.log(data.responseText);
            // parseServerData(data.responseText);
        }
        console.log("Running");
    };
    data.open("POST", `assets/php/create-song.php?userID=${userID}&title=${title}&dateCreated=${date}&dateModified=${date}&songData=${textbox.value}`, true);
    data.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    data.send(); //parems
    // // console.log(day);
    // newSong = newSong.concat(email, title, month, day, year, month, day, year, textbox.value, songParse);
    // parseServerData(newSong);
    // sendNewSong(newSong);


}

// get id from text box in html
// Get song from database
function getSong(id) {
    var data = new XMLHttpRequest();
    // var params = `id=${id}`;
	data.onload = function() {
	    if (data.status == 200 && data.readyState == 4) {
            console.log(data.responseText);
            // parseServerData(data.responseText);
        }
        console.log("Running");
    };
    data.open("POST", "assets/php/get-songs.php", true);
    data.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    data.send(); //parems
}

// Modify song; send to database
// TODO
function updateSong(id) {
    var data = new XMLHttpRequest();
    // var params = `id=${id}`;
	    data.onload = function() {
	    if (data.status == 200 && data.readyState == 4) {
            console.log(data.responseText);
            // parseServerData(data.responseText);
        }
        console.log("Running");
    };
    data.open("POST", "assets/php/edit-song.php", true);
    data.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    data.send(); //parems
}

// Delete song; TALK WITH BACKEND ABOUT THIS
// TODO
function deleteSong(id) {
    var data = new XMLHttpRequest();
    // var params = `id=${id}`;
	    data.onload = function() {
	    if (data.status == 200 && data.readyState == 4) {
            console.log(data.responseText);
            // parseServerData(data.responseText);
        }
        console.log("Running");
    };
    data.open("POST", "assets/php/delete-song.php", true);
    data.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    data.send(); //parems
}

//to create string: make form, get form data

// function validateForm() {
//   var x = document.forms["myForm"]["fname"].value;
//   if (x == "") {
//     alert("Name must be filled out");
//     return false;
//   }
// }
