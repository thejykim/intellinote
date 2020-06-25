/* Cleaned */
function displaySongs(username) {
    if (isProfile) {
        // check if not signed in
        if (username == null) {
            document.getElementById("titleName").innerHTML = "<b>your</b> future"
            recentSongsDiv.innerHTML = `
            <h4 class="title is-4 poppins">You're not signed in!</h4>
            <h6 class="subtitle is-6 karla">...but you could fix that in about 10 seconds. Click the sign in button on the top right to get started.</h6>
            `;
            return;
        }

        if (username == oauthUsername) {
            createButtonDiv.innerHTML = `
            <div class="columns is-centered">
                <div class="column is-narrow">
                    <a href='index.html'>
                        <button class="button is-info is-small is-rounded karla gradient">
                            <span class="icon is-small">
                                <i class="fas fa-plus"></i>
                            </span>
                            <span>Create</span>
                        </button>
                    </a>
                </div>
            </div>
            `
        }

        var data = new XMLHttpRequest();

        let formData = new FormData();
        formData.append("username", username);

        data.onload = function() {
            if (data.status == 200 && data.readyState == 4) {
                parseServerData(data.responseText);
                document.getElementById("titleName").innerHTML = `${username}'s`;
                if (serverObjects.length == 0) {
                    // show zero songs
                    recentSongsDiv.innerHTML = `
                    <h4 class="title is-4 poppins">Couldn't find any songs for <code>${username}</code>... yet.</h4>
                    <h6 class="subtitle is-6 karla">Check back later, or invite <code>${username}</code> to make their own tunes at IntelliNote!</h6>
                    `;
                    return;
                }

                // reverse array to display most recent songs first
                serverObjects.reverse();

                let recentSongs = [];
                let currentDate = Date.now();

                let numRecentSongs;

                if (serverObjects.length == 1) {
                    numRecentSongs = serverObjects.length + " song";
                } else {
                    numRecentSongs = serverObjects.length + " songs";
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
                }

                let numAllSongs;

                if (recentSongs.length == 1) {
                    numAllSongs = recentSongs.length + " song";
                } else {
                    numAllSongs = recentSongs.length + " songs";
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
                    let songID = recentSongs[i].songID;
                    songID = songID.toString();
                    let recentSongID = "R".concat(songID);
                    songDiv.innerHTML = `
                    <div class="column is-6 is-offset-3">
                        <div class="card" style="border-radius: 20px; border: 1px solid lightgray">
                            <div class="card-content">
                                <div class="content">
                                    <div class = "columns is-vcentered">
                                        <div class = "column is-9">
                                            <h5 class="title is-5 poppins" style="margin-bottom:0.5rem"><a href='songs.php?songID=${songID}' class="has-text-dark">${recentSongs[i].title}</a></h5>
                                            <span class="tag gradient has-text-white poppins">Last updated: ${recentSongs[i].dateModified}</span>
                                            <span class="tag is-light poppins"><b>${numRows}</b></span>
                                        </div>
                                        <div class = "column is-3">
                                            <button id = "${recentSongID}" class="button profileDelete is-danger is-small is-rounded" onclick = "toggleRecentDelete(${recentSongID})">
                                                <span class="icon is-small">
                                                    <i class="fas fa-trash"></i>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;

                    recentSongsDiv.appendChild(songDiv);
                }

                // alphabetize songs array
                serverObjects.sort(sortAlphabetically);

                // copy eligible songs into recent songs array
                for (let i = 0; i < serverObjects.length; i++) {
                    let songDate = Date.parse(serverObjects[i].dateModified);

                    // briefly parse song data
                    let numRows = serverObjects[i].songData.split(sheetParse)[2];

                    if (numRows == 1) {
                        numRows = numRows + " row";
                    } else {
                        numRows = numRows + " rows";
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
                                    <div class = "columns is-vcentered">
                                        <div class = "column is-9">
                                            <h5 class="title is-5 poppins" style="margin-bottom:0.5rem"><a href='songs.php?songID=${songID}' class="has-text-dark">${serverObjects[i].title}</a></h5>
                                            <span class="tag is-dark poppins">Created: ${serverObjects[i].dateCreated}</span>
                                            <span class="tag is-light poppins"><b>${numRows}</b></span>
                                        </div>
                                        <div class = "column is-3">
                                            <button id = "${songID}" class="button profileDelete is-danger is-small is-rounded" onclick = "toggleProfileDelete(this.id)">
                                                <span class="icon is-small">
                                                    <i class="fas fa-trash"></i>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;

                    allSongsDiv.appendChild(songDiv);
                }
            }
        };
        data.open("POST", `assets/php/get-songs.php`);
        data.send(formData);
    }
}

function sortAlphabetically (a, b) {
    let lowerA = a.title.toLowerCase();
    let lowerB = b.title.toLowerCase();
    if (lowerA < lowerB) {
        return -1;
    } else if (lowerA > lowerB) {
        return 1;
    } else {
        return 0;
    }
}
