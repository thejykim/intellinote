// document elements
const textbox = document.getElementById('textbox');
const copyTextResetDelay = 2000;
const sheetParse = ',';
const rowParse = ";";
const noteParse = "-";
const noteObjectParse = ".";

function setModalJS() {
    document.querySelector('#open-export-modal').addEventListener('click', function (event) {
        event.preventDefault();
        var exportModal = document.querySelector('#exportModal');
        var html = document.querySelector('html');
        exportModal.classList.add('is-active');
        html.classList.add('is-clipped');

        exportModal.querySelector('#background-export').addEventListener('click', function (e) {
            e.preventDefault();
            exportModal.classList.remove('is-active');
            html.classList.remove('is-clipped');
        });

        exportModal.querySelector('#close-export').addEventListener('click', function (e) {
            e.preventDefault();
            exportModal.classList.remove('is-active');
            html.classList.remove('is-clipped');
        });
    });
}

function importSong() {
    let contents = textbox.value;

    // parse
    let parsed = contents.split(sheetParse);
    console.log("CONTENTS: " + contents);
    console.log(parsed);
    let newBPM = parsed[0]; // bpm
    let newTopNum = parsed[1].toString(); // time signature
    let numLines = parsed[2]; // number of separate sheet lines (minimum 1)
    let sheetContents = parsed[3].split(rowParse);

    // change bpm
    updateTempo(newBPM);

    // adjust current number of rows
    while ((newLine + 1) != numLines) {
        if ((newLine + 1) > numLines) {
            removeRow();
        } else {
            addRow();
        }
    }

    // set new time signature
    importTimeSignature(newTopNum);
    changeTimeSig();

    // iterate through
    for (let i = 0; i < numberOfRows; i++) {
        let rowContents = sheetContents[i].split(noteParse);
        for (let j = 0; j < (numberOfNotes * (newLine + 1)); j++) {
            let clefContents = rowContents[j].split(noteObjectParse);
            // treble accidentals
            trebleAccidentals[i][j] = clefContents[1];
            accidental = clefContents[1];

            // treble first
            switch (clefContents[0]) {
                case "1":
                    setWhole(i);
                    toggleNoteImport(document.getElementById(`treble.${i}.${j}`));
                    break;
                case "2":
                    setHalf(i);
                    toggleNoteImport(document.getElementById(`treble.${i}.${j}`));
                    break;
                case "4":
                    setQuarter(i);
                    toggleNoteImport(document.getElementById(`treble.${i}.${j}`));
                    break;
                case "8":
                    setEighth(i);
                    toggleNoteImport(document.getElementById(`treble.${i}.${j}`));
                    break;
            }

            // bass accidentals
            bassAccidentals[i][j] = clefContents[3];
            accidental = clefContents[3];

            // ..then bass
            switch (clefContents[2]) {
                case "1":
                    setWhole(i);
                    toggleNoteImport(document.getElementById(`bass.${i}.${j}`));
                    break;
                case "2":
                    setHalf(i);
                    toggleNoteImport(document.getElementById(`bass.${i}.${j}`));
                    break;
                case "4":
                    setQuarter(i);
                    toggleNoteImport(document.getElementById(`bass.${i}.${j}`));
                    break;
                case "8":
                    setEighth(i);
                    toggleNoteImport(document.getElementById(`bass.${i}.${j}`));
                    break;
            }
        }
    }

    // reset note lengths
    parseNoteLen();
}

function exportSong() {
    let topNum = parseInt(document.getElementById('timeSig').value);
    textbox.value = bpm + sheetParse + topNum + sheetParse + (newLine + 1) + sheetParse;

    // iterate through
    for (let i = 0; i < numberOfRows; i++) {
        for (let j = 0; j < (numberOfNotes * (newLine + 1)); j++) {
            let trebleLength = trebleData[i][j].noteLength;
            let bassLength = bassData[i][j].noteLength;

            // add to textbox
            textbox.value = textbox.value + trebleLength + noteObjectParse + trebleAccidentals[i][j] + noteObjectParse + bassLength + noteObjectParse + bassAccidentals[i][j] + noteParse;
        }
        textbox.value = textbox.value + rowParse;
    }
}

function copy() {
    textbox.select();
    textbox.setSelectionRange(0, 99999); // for mobile devices

    document.execCommand("copy");

    document.getElementById('copy').innerText = "Copied!";

    window.setTimeout(function () {
        document.getElementById('copy').innerText = "Copy to clipboard";
    }, copyTextResetDelay);
}

function importTimeSignature(topNumber) {
    let element = document.getElementById('timeSig');
    element.value = topNumber;
}
