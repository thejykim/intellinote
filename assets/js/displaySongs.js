const recentSongsDiv = document.getElementById("recentSongs");
const allSongsDiv = document.getElementById("allSongs");

let recentThreshold = 2592000000;

function displaySongs(userID) {
    var data = new XMLHttpRequest();
	data.onload = function() {
	    if (data.status == 200 && data.readyState == 4) {
            parseServerData(data.responseText);
            if (serverObjects.length == 0) {
                // show zero songs
                recentSongsDiv.innerHTML = `
                <h4 class="title is-4 poppins">Couldn't find any songs for <code>${userID}</code>... yet.</h4>
                <h6 class="subtitle is-6 karla">Check back later, or invite <code>${userID}</code> to make their own tunes at IntelliNote!</h6>
                `;
                return;
            }

            let recentSongs = [];
            let currentDate = Date.now();

            let numRecentSongs;

            if (serverObjects.length > 1) {
                numRecentSongs = serverObjects.length + " songs";
            } else {
                numRecentSongs = serverObjects.length + " song";
            }

            allSongsDiv.innerHTML = `
            <div class="columns" style="padding-bottom: 1.5rem">
                <div class="column is-6 is-offset-2">
                    <h4 class="title is-4 poppins">All songs</h4>
                    <h6 class="subtitle is-6 karla">${numRecentSongs}</h6>
                </div>
            </div>
            `;

            // copy eligible songs into recent songs array
            for (let i = 0; i < serverObjects.length; i++) {
                let songDate = Date.parse(serverObjects[i].dateModified);

                if ((currentDate - songDate) < recentThreshold) {
                    recentSongs.push(serverObjects[i]);
                }

                // briefly parse song data
                let numRows = serverObjects[i].songData.split(sheetParse)[2];

                if (numRows > 1) {
                    numRows = numRows + " rows";
                } else {
                    numRows = numRows + " row";
                }

                let songDiv = document.createElement('div');
                songDiv.setAttribute("class", "columns");
                songDiv.setAttribute("style", "padding-bottom: 0.5rem");
                let songID = serverObjects[i].songID;
                songID = songID.toString(); 
                songDiv.innerHTML = `
                <div class="column is-6 is-offset-3">
                    <div class="card" style="border-radius: 20px; border: 1px solid lightgray">
                        <div class="card-content">
                            <div class="content">
                                <h5 class="title is-5 poppins" style="margin-bottom:0.5rem"><a href='songs.php?userID="${userID}"&songID=${songID}' class="has-text-dark">${serverObjects[i].title}</a></h5>
                                <span class="tag is-dark poppins">Created: ${serverObjects[i].dateCreated}</span>
                                <span class="tag is-light poppins"><b>${numRows}</b></span>
                            </div>
                        </div>
                    </div>
                </div>
                `;

                allSongsDiv.appendChild(songDiv);
            }

            let numAllSongs;

            if (recentSongs.length > 1) {
                numAllSongs = recentSongs.length + " songs";
            } else {
                numAllSongs = recentSongs.length + " song";
            }

            // print recent songs
            recentSongsDiv.innerHTML = `
            <div class="columns" style="padding-bottom: 1.5rem">
                <div class="column is-6 is-offset-2">
                    <h4 class="title is-4 poppins">Recently modified</h4>
                    <h6 class="subtitle is-6 karla">${numAllSongs}</h6>
                </div>
            </div>
            `;

            for (let i = 0; i < recentSongs.length; i++) {
                console.log("recentSongs for loop ran");
                // briefly parse song data
                let numRows = recentSongs[i].songData.split(sheetParse)[2];

                if (numRows > 1) {
                    numRows = numRows + " rows";
                } else {
                    numRows = numRows + " row";
                }

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
                                <span class="tag is-light poppins"><b>${numRows}</b></span>
                            </div>
                        </div>
                    </div>
                </div>
                `;

                recentSongsDiv.appendChild(songDiv);
            }
        }
    };
    data.open("POST", `assets/php/get-songs.php?userID=${userID}`, true);
    data.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    data.send();
}
