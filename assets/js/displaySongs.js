const recentSongsDiv = document.getElementById("recentSongs");
const allSongsDiv = document.getElementById("allSongs");

let recentThreshold = 2592000000;

// purely for functionality testing
let userID = "hello@hello.com";

async function displaySongs() {
    console.log("displaySongs() ran");
    await getSongs(userID);
    console.log("got songs!");

    if (serverObjects.length == 0) {
        // show zero songs
        return;
    }

    let recentSongs = [];
    let currentDate = Date.now();

    allSongsDiv.innerHTML = `
    <div class="columns" style="padding-bottom: 1.5rem">
        <div class="column is-6 is-offset-2">
            <h4 class="title is-4 poppins">All songs</h4>
            <h6 class="subtitle is-6 karla">${serverObjects.length} songs</h6>
        </div>
    </div>
    `;

    // copy eligible songs into recent songs array
    for (let i = 0; i < serverObjects.length; i++) {
        console.log("serverObjects for loop ran");
        let songDate = Date.parse(serverObjects[i]);

        if ((currentDate - songDate) < recentThreshold) {
            recentSongs.push(serverObjects[i]);
        }

        // briefly parse song data
        let numRows = serverObjects[i].songData.split(sheetParse)[2];

        let songDiv = document.createElement('div');
        songDiv.setAttribute("class", "columns");
        songDiv.setAttribute("style", "padding-bottom: 0.5rem");
        songDiv.innerHTML = `
        <div class="column is-6 is-offset-3">
            <div class="card" style="border-radius: 20px; border: 1px solid lightgray">
                <div class="card-content">
                    <div class="content">
                        <h5 class="title is-5 poppins" style="margin-bottom:0.5rem"><a href="projects/ideadb" class="has-text-dark">${serverObjects[i].title}</a></h5>
                        <span class="tag is-dark poppins">Created: ${serverObjects[i].dateCreated}</span>
                        <span class="tag is-light poppins"><b>${numRows} rows</b></span>
                    </div>
                </div>
            </div>
        </div>
        `;

        allSongsDiv.appendChild(songDiv);
    }

    // print recent songs
    recentSongsDiv.innerHTML = `
    <div class="columns" style="padding-bottom: 1.5rem">
        <div class="column is-6 is-offset-2">
            <h4 class="title is-4 poppins">Recently modified</h4>
            <h6 class="subtitle is-6 karla">${recentSongs.length} songs</h6>
        </div>
    </div>
    `;

    for (let i = 0; i < recentSongs.length; i++) {
        console.log("recentSongs for loop ran");
        // briefly parse song data
        let numRows = recentSongs[i].songData.split(sheetParse)[2];

        let songDiv = document.createElement('div');
        songDiv.setAttribute("class", "columns");
        songDiv.setAttribute("style", "padding-bottom: 0.5rem");
        songDiv.innerHTML = `
        <div class="column is-6 is-offset-3">
            <div class="card" style="border-radius: 20px; border: 1px solid lightgray">
                <div class="card-content">
                    <div class="content">
                        <h5 class="title is-5 poppins" style="margin-bottom:0.5rem"><a href="#" class="has-text-dark">${recentSongs[i].title}</a></h5>
                        <span class="tag gradient has-text-white poppins">Last updated: ${recentSongs[i].dateModified}</span>
                        <span class="tag is-light poppins"><b>${numRows} rows</b></span>
                    </div>
                </div>
            </div>
        </div>
        `;

        recentSongsDiv.appendChild(songDiv);
    }
}
