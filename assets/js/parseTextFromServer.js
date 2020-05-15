const serverData = String.raw`Don't Stop The Party|secs@gmail.com|04-20-2020|05-10-2020|00202020?YeetYeet|secs@gmail.com|04-20-2020|05-10-2020|00202020`;


let serverEachSong = []; // After first split; gives information for each song (each song is string)
let serverObjects = []; // Array of song objects

function parseServerData(){
    // get the server data as string
    serverEachSong = serverData.split("?");
    for (let i = 0; i < serverEachSong.length; i++) {
        let songStr = serverEachSong[i].split("|");
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

parseServerData();

//to create string: make form, get form data

// function validateForm() {
//   var x = document.forms["myForm"]["fname"].value;
//   if (x == "") {
//     alert("Name must be filled out");
//     return false;
//   }
// }
