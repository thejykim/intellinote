function updateExplorePage() {
    exploreDiv.innerHTML = `
    <div class="tile is-ancestor">
        <div class="tile is-vertical">
            <div class="tile">
                <div class="tile is-parent is-vertical">
                    <article class="tile is-child notification tile-border">
                        <a href='songs.php?songID=${serverObjects[0].songID}'>
                            <p class="title">${serverObjects[0].title}</p>
                        </a>
                        <p class="subtitle karla">by 
                            <a href='profile.php?username="${serverObjects[0].username}"'>
                                <strong>${serverObjects[0].username}</strong>
                            </a>
                        </p>
                    </article>
                    <article class="tile is-child notification tile-border">
                        <a href='songs.php?songID=${serverObjects[1].songID}'>
                            <p class="title">${serverObjects[1].title}</p>
                        </a>
                        <p class="subtitle karla">by 
                            <a href='profile.php?username="${serverObjects[1].username}"'>
                                <strong>${serverObjects[1].username}</strong>
                            </a>
                        </p>
                    </article>
                </div>
                <div class="tile is-parent">
                    <article class="tile is-child notification is-info">
                        <a href='songs.php?songID=${serverObjects[2].songID}'>
                            <p class="title">${serverObjects[2].title}</p>
                        </a>
                        <p class="subtitle karla">by 
                            <a href='profile.php?username="${serverObjects[2].username}"'>
                                <strong>${serverObjects[2].username}</strong>
                            </a>
                        </p>
                    </article>
                </div>
                <div class="tile is-parent is-vertical">
                    <article class="tile is-child notification tile-border">
                        <a href='songs.php?songID=${serverObjects[3].songID}'>
                            <p class="title">${serverObjects[3].title}</p>
                        </a>
                        <p class="subtitle karla">by 
                            <a href='profile.php?username="${serverObjects[3].username}"'>
                                <strong>${serverObjects[3].username}</strong>
                            </a>
                        </p>
                    </article>
                    <article class="tile is-child notification tile-border">
                        <a href='songs.php?songID=${serverObjects[4].songID}'>
                            <p class="title">${serverObjects[4].title}</p>
                        </a>
                        <p class="subtitle karla">by 
                            <a href='profile.php?username="${serverObjects[4].username}"'>
                                <strong>${serverObjects[4].username}</strong>
                            </a>
                        </p>
                    </article>
                </div>
            </div>
            <div class="tile">
                <div class="tile is-parent is-vertical">
                    <article class="tile is-child notification tile-border">
                        <a href='songs.php?songID=${serverObjects[5].songID}'>
                            <p class="title">${serverObjects[5].title}</p>
                        </a>
                        <p class="subtitle karla">by 
                            <a href='profile.php?username="${serverObjects[5].username}"'>
                                <strong>${serverObjects[5].username}</strong>
                            </a>
                        </p>
                    </article>
                    <article class="tile is-child notification tile-border">
                        <a href='songs.php?songID=${serverObjects[6].songID}'>
                            <p class="title">${serverObjects[6].title}</p>
                        </a>
                        <p class="subtitle karla">by 
                            <a href='profile.php?username="${serverObjects[6].username}"'>
                                <strong>${serverObjects[6].username}</strong>
                            </a>
                        </p>
                    </article>
                </div>
                <div class="tile is-parent is-vertical">
                    <article class="tile is-child notification tile-border">
                        <a href='songs.php?songID=${serverObjects[7].songID}'>
                            <p class="title">${serverObjects[7].title}</p>
                        </a>
                        <p class="subtitle karla">by 
                            <a href='profile.php?username="${serverObjects[7].username}"'>
                                <strong>${serverObjects[7].username}</strong>
                            </a>
                        </p>
                    </article>
                    <article class="tile is-child notification tile-border">
                        <p class="title">See your own song here</p>
                        <p class="subtitle karla">Create some music today</p>
                    </article>
                </div>
                <div class="tile is-parent">
                    <article class="tile is-child notification is-info">
                        <a href='songs.php?songID=${serverObjects[8].songID}'>
                            <p class="title">${serverObjects[8].title}</p>
                        </a>
                        <p class="subtitle karla">by 
                            <a href='profile.php?username="${serverObjects[8].username}"'>
                                <strong>${serverObjects[8].username}</strong>
                            </a>
                        </p>
                    </article>
                </div>
            </div>
        </div>
    </div>
    `
}