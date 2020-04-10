// document elements
const textbox = document.getElementById('textbox');
const copyTextResetDelay = 2000;

function setModalJS() {
    document.querySelector('#open-modal').addEventListener('click', function (event) {
        event.preventDefault();
        var modal = document.querySelector('.modal');
        var html = document.querySelector('html');
        modal.classList.add('is-active');
        html.classList.add('is-clipped');

        modal.querySelector('.modal-background').addEventListener('click', function (e) {
            e.preventDefault();
            modal.classList.remove('is-active');
            html.classList.remove('is-clipped');
        });

        modal.querySelector('#close').addEventListener('click', function (e) {
            e.preventDefault();
            modal.classList.remove('is-active');
            html.classList.remove('is-clipped');
        });
    });
}

function importSong() {
    let contents = textbox.value;

    // parse
    let parsed = contents.split(',');
    let numLines = parsed[0]; // number of separate sheet lines (minimum 1)
    let sheetContents = parsed[1].split('&');

    // adjust current number of rows
    while ((newLine + 1) != numLines) {
        if ((newLine + 1) > numLines) {
            removeRow();
        } else {
            addRow();
        }
    }

    // iterate through
    for (let i = 0; i < numberOfRows; i++) {
        let rowContents = sheetContents[i].split(';');
        for (let j = 0; j < (numberOfNotes * (newLine + 1)); j++) {
            let clefContents = rowContents[j].split('#');
            // treble first
            switch (clefContents[0]) {
                case "1":
                    setWhole();
                    toggleNote(document.getElementById(`treble.${i}.${j}`));
                    break;
                case "2":
                    setHalf();
                    toggleNote(document.getElementById(`treble.${i}.${j}`));
                    break;
                case "4":
                    setQuarter();
                    toggleNote(document.getElementById(`treble.${i}.${j}`));
                    break;
                case "8":
                    setEighth();
                    toggleNote(document.getElementById(`treble.${i}.${j}`));
                    break;
            }

            // ..then bass
            switch (clefContents[1]) {
                case "1":
                    setWhole();
                    toggleNote(document.getElementById(`bass.${i}.${j}`));
                    break;
                case "2":
                    setHalf();
                    toggleNote(document.getElementById(`bass.${i}.${j}`));
                    break;
                case "4":
                    setQuarter();
                    toggleNote(document.getElementById(`bass.${i}.${j}`));
                    break;
                case "8":
                    setEighth();
                    toggleNote(document.getElementById(`bass.${i}.${j}`));
                    break;
            }
        }
    }

    // reset note lengths
    parseNoteLen();
}

function exportSong() {
    textbox.value = (newLine+1) + ",";

    // iterate through
    for (let i = 0; i < numberOfRows; i++) {
        for (let j = 0; j < (numberOfNotes * (newLine + 1)); j++) {
            let trebleLength = trebleData[i][j].noteLength;
            let bassLength = bassData[i][j].noteLength;

            // add to textbox
            textbox.value = textbox.value + trebleLength + "#" + bassLength + ";";
        }
        textbox.value = textbox.value + "&";
    }
}

function copy() {
    textbox.select();
    textbox.setSelectionRange(0, 99999); // for mobile devices

    document.execCommand("copy");

    document.getElementById('copy').innerText = "Copied!";

    window.setTimeout(function() {
        document.getElementById('copy').innerText = "Copy to clipboard";
    }, copyTextResetDelay);
}
