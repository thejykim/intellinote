async function updateExplorePage() {
    console.log('Running once');
    await getExploreSongs();
    
    for (let i = 0; i < serverObjects.length; i++) {
        let card = document.createElement('div');
        card.className = 'card';
        let innerCard = document.createElement('div');
        innerCard.className = 'card-contents poppins';

        innerCard.innerText = serverObjects[i].title;

        exploreDiv.appendChild(innerCard);
        console.log('Appended');
    }
}