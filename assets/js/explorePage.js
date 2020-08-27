function updateExplorePage() {
    console.log(serverObjects);
    for (let i = 0; i < serverObjects.length; i++) {
        let card = document.createElement('div');
        card.className = 'card';
        card.style = 'border-radius: 20px; border: 1px solid lightgray'

        card.innerHTML = `
        <div class="card-content">
            <div class="content">
                <h5 class="title is-5 poppins" style="margin-bottom:0.5rem">
                    <a href='songs.php?songID=${serverObjects[i].songID}' class="has-text-dark">${serverObjects[i].title}</a>
                    <span style="font-weight: 400"> by </span>
                    <a href='profile.php?username="${serverObjects[i].username}"' class="has-text-dark">${serverObjects[i].username}</a>
                </h5>
            </div>
        </div>
        `;

        exploreDiv.appendChild(card);

        // add break
        let lineBreak = document.createElement('div');
        lineBreak.className = 'empty-padding';

        exploreDiv.appendChild(lineBreak);
    }
}