function updateExplorePage() {
    exploreDiv.innerHTML = `
    <div class="tile is-ancestor">
        <div class="tile is-vertical">
            <div class="tile">
                <div class="tile is-parent is-vertical">
                    <article class="tile is-child notification tile-border">
                        <div>
                            <a href='songs.php?songID=${serverObjects[0].songID}'>
                                <p class="title is-4">${serverObjects[0].title}</p>
                            </a>
                            <p class="subtitle is-6 karla">by 
                                <a href='profile.php?username="${serverObjects[0].username}"'>
                                    <strong>${serverObjects[0].username}</strong>
                                </a>
                            </p>
                        </div>
                    </article>
                    <article class="tile is-child notification tile-border">
                        <div>
                            <a href='songs.php?songID=${serverObjects[1].songID}'>
                                <p class="title is-4">${serverObjects[1].title}</p>
                            </a>
                            <p class="subtitle is-6 karla">by 
                                <a href='profile.php?username="${serverObjects[1].username}"'>
                                    <strong>${serverObjects[1].username}</strong>
                                </a>
                            </p>
                        </div>
                    </article>
                </div>
                <div class="tile is-parent">
                    <article class="tile is-child notification is-info">
                        <div>
                            <a href='songs.php?songID=${serverObjects[2].songID}'>
                                <p class="title is-4">${serverObjects[2].title}</p>
                            </a>
                            <p class="subtitle is-6 karla">by 
                                <a href='profile.php?username="${serverObjects[2].username}"'>
                                    <strong class="has-text-white">${serverObjects[2].username}</strong>
                                </a>
                            </p>
                        </div>
                    </article>
                </div>
                <div class="tile is-parent is-vertical">
                    <article class="tile is-child notification tile-border">
                        <div>
                            <a href='songs.php?songID=${serverObjects[3].songID}'>
                                <p class="title is-4">${serverObjects[3].title}</p>
                            </a>
                            <p class="subtitle is-6 karla">by 
                                <a href='profile.php?username="${serverObjects[3].username}"'>
                                    <strong>${serverObjects[3].username}</strong>
                                </a>
                            </p>
                        </div>
                    </article>
                    <article class="tile is-child notification tile-border">
                        <div>
                            <a href='songs.php?songID=${serverObjects[4].songID}'>
                                <p class="title is-4">${serverObjects[4].title}</p>
                            </a>
                            <p class="subtitle is-6 karla">by 
                                <a href='profile.php?username="${serverObjects[4].username}"'>
                                    <strong>${serverObjects[4].username}</strong>
                                </a>
                            </p>
                        </div>
                    </article>
                </div>
            </div>
            <div class="tile">
                <div class="tile is-parent">
                    <article class="tile is-child notification is-info">
                        <div>
                            <a href='songs.php?songID=${serverObjects[5].songID}'>
                                <p class="title is-4">${serverObjects[5].title}</p>
                            </a>
                            <p class="subtitle is-6 karla">by 
                                <a href='profile.php?username="${serverObjects[5].username}"'>
                                    <strong class="has-text-white">${serverObjects[5].username}</strong>
                                </a>
                            </p>
                        </div>
                    </article>
                </div>
                <div class="tile is-parent is-vertical">
                    <article class="tile is-child notification tile-border">
                        <div>
                            <a href='songs.php?songID=${serverObjects[6].songID}'>
                                <p class="title is-4">${serverObjects[6].title}</p>
                            </a>
                            <p class="subtitle is-6 karla">by 
                                <a href='profile.php?username="${serverObjects[6].username}"'>
                                    <strong>${serverObjects[6].username}</strong>
                                </a>
                            </p>
                        </div>
                    </article>
                    <article class="tile is-child notification tile-border">
                        <div>
                            <a href='songs.php?songID=${serverObjects[7].songID}'>
                                <p class="title is-4">${serverObjects[7].title}</p>
                            </a>
                            <p class="subtitle is-6 karla">by 
                                <a href='profile.php?username="${serverObjects[7].username}"'>
                                    <strong>${serverObjects[7].username}</strong>
                                </a>
                            </p>
                        </div>
                    </article>
                </div>
                <div class="tile is-parent">
                    <article class="tile is-child notification is-info">
                        <div>
                            <a href='songs.php?songID=${serverObjects[8].songID}'>
                                <p class="title is-4">${serverObjects[8].title}</p>
                            </a>
                            <p class="subtitle is-6 karla">by 
                                <a href='profile.php?username="${serverObjects[8].username}"'>
                                    <strong class="has-text-white">${serverObjects[8].username}</strong>
                                </a>
                            </p>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    </div>
    `
}