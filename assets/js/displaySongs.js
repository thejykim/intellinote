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

        if (!isVisitor) {
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
            `;

            deleteProfileDiv.innerHTML = `
            <div class="columns" style="padding-bottom: 1.5rem">
                <div class="column is-6 is-offset-2">
                    <h4 class="title is-4 poppins">Danger Zone!</h4>
                </div>
            </div>

            <div class="columns is-centered">
                <button onclick="setDeleteModalJS()"
                    class="button is-danger is-small is-light is-rounded karla">
                    <span class="icon is-small">
                        <i class="fas fa-minus-circle"></i>
                    </span>
                    <span>Delete Profile</span>
                </button>
            </div>
            `;
        }

        var data = new XMLHttpRequest();

        let formData = new FormData();
        formData.append("username", username);

        data.onload = function() {
            if (data.status == 200 && data.readyState == 4) {
                parseSongServerData(data.responseText);
                document.getElementById("titleName").innerHTML = `${username}'s`;
                if (songObjects.length == 0) {
                    // show zero songs
                    recentSongsDiv.innerHTML = `
                    <h4 class="title is-4 poppins">Couldn't find any songs for <code>${username}</code>... yet.</h4>
                    <h6 class="subtitle is-6 karla">Check back later, or invite <code>${username}</code> to make their own tunes at IntelliNote!</h6>
                    `;
                    let paddings = document.getElementsByClassName("container empty-padding");
                    paddings[paddings.length - 1].remove();
                    return;
                }

                let recentSongs = [];
                let currentDate = new Date();

                let numAllSongs;
                if (songObjects.length == 1) {
                    numAllSongs = songObjects.length + " song";
                } else {
                    numAllSongs = songObjects.length + " songs";
                }

                allSongsDiv.innerHTML = `
                <div class="columns" style="padding-bottom: 1.5rem">
                    <div class="column is-6 is-offset-2">
                        <h4 class="title is-4 poppins">All songs</h4>
                        <h6 class="subtitle is-6 karla">${numAllSongs}</h6>
                    </div>
                </div>
                `;

                // copy eligible songs into recent songs array
                for (let i = 0; i < songObjects.length; i++) {
                    let songDate = Date.parse(songObjects[i].dateModified);

                    if ((currentDate - songDate) < recentThreshold) {
                        recentSongs.push(songObjects[i]);
                    }
                }

                // brings most recently modified songs to beginning of array
                recentSongs.sort(sortChronologically);

                let numRecentSongs;
                if (recentSongs.length == 1) {
                    numRecentSongs = recentSongs.length + " song";
                } else {
                    numRecentSongs = recentSongs.length + " songs";
                }

                // print recent songs
                recentSongsDiv.innerHTML = `
                <div class="columns" style="padding-bottom: 1.5rem">
                    <div class="column is-6 is-offset-2">
                        <h4 class="title is-4 poppins">Recently modified</h4>
                        <h6 class="subtitle is-6 karla">${numRecentSongs}</h6>
                    </div>
                </div>
                `;

                for (let i = 0; i < recentSongs.length; i++) {
                    // briefly parse song data
                    let numRows = recentSongs[i].songData.split(sheetParse)[2];

                    if (numRows == 1) {
                        numRows = numRows + " row";
                    } else {
                        numRows = numRows + " rows";
                    }

                    let songDiv = document.createElement('div');
                    songDiv.setAttribute("class", "columns");
                    songDiv.setAttribute("style", "padding-bottom: 0.5rem");
                    let songID = recentSongs[i].songID;
                    songID = songID.toString();
                    let recentSongID = "R".concat(songID);
                    let recentSongsDateModified = parseDateFromServer(recentSongs[i].dateModified); // simplifies date form to YYYY-MM-DD

                    songDiv.innerHTML = `
                    <div class="column is-6 is-offset-3">
                        <div class="card" style="border-radius: 20px; border: 1px solid lightgray">
                            <div class="card-content">
                                <div class="content">
                                    <div class = "columns is-vcentered">
                                        <div class = "column is-9">
                                            <h5 class="title is-5 poppins" style="margin-bottom:0.5rem"><a href='songs.php?songID=${songID}' class="has-text-dark">${recentSongs[i].title}</a></h5>
                                            <span class="tag gradient has-text-white poppins">Last updated: ${recentSongsDateModified}</span>
                                            <span class="tag is-light poppins"><b>${numRows}</b></span>
                                        </div>
                                        <div class = "column is-3">
                                            <button id = "${recentSongID}" class="button karla profileDelete is-danger is-small is-rounded" onclick="toggleRecentDelete(this.id)">
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
                songObjects.sort(sortAlphabetically);

                // all songs
                for (let i = 0; i < songObjects.length; i++) {

                    // briefly parse song data
                    let numRows = songObjects[i].songData.split(sheetParse)[2];

                    if (numRows == 1) {
                        numRows = numRows + " row";
                    } else {
                        numRows = numRows + " rows";
                    }

                    let songDiv = document.createElement('div');
                    songDiv.setAttribute("class", "columns");
                    songDiv.setAttribute("style", "padding-bottom: 0.5rem");
                    let songID = songObjects[i].songID;
                    songID = songID.toString();
                    let allSongsDateCreated = parseDateFromServer(songObjects[i].dateCreated); // simplifies date form to YYYY-MM-DD

                    songDiv.innerHTML = `
                    <div class="column is-6 is-offset-3">
                        <div class="card" style="border-radius: 20px; border: 1px solid lightgray">
                            <div class="card-content">
                                <div class="content">
                                    <div class = "columns is-vcentered">
                                        <div class = "column is-9">
                                            <h5 class="title is-5 poppins" style="margin-bottom:0.5rem"><a href='songs.php?songID=${songID}' class="has-text-dark">${songObjects[i].title}</a></h5>
                                            <span class="tag is-dark poppins">Created: ${allSongsDateCreated}</span>
                                            <span class="tag is-light poppins"><b>${numRows}</b></span>
                                        </div>
                                        <div class = "column is-3">
                                            <button id = "${songID}" class="button profileDelete karla is-danger is-small is-rounded" onclick="toggleProfileDelete(this.id)">
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

                if (isVisitor) {
                    var deleteButtons = document.getElementsByClassName("profileDelete");
                    for (button of deleteButtons) {
                        button.classList.add("is-hidden");
                    }
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

function sortChronologically (a, b) {
    let aDate = Date.parse(a.dateModified);
    let bDate = Date.parse(b.dateModified);
    if (aDate > bDate) {
        return -1;
    } else if (aDate < bDate) {
        return 1;
    } else {
        return 0;
    }
}
