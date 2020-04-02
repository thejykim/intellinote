// buttons
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');

// create synths
let synth = new Tone.PolySynth(18, Tone.Synth, {
    oscillator : {
        type : "sine"
    }
}).toMaster();

let synthPart;

let trebleNotes = [];
let bassNotes = [];

function startPlaying() {
    trebleNotes = [];
    bassNotes = [];

    // iterate through clef arrays
    trebleData.forEach(function(row) {
        // temp row array
        let rowNotes = [];
        let rowIndex = trebleData.indexOf(row) % 9;

        // iterates over each column and fills out rowNotes with proper subset of notes
        for (let i = 0; i < numberOfNotes; i++) {
            let noteToBePlayed = "F5";

            let noteArray = [];

            if (rowIndex <= 3) {
                noteToBePlayed = String.fromCharCode(70 - rowIndex) + "5";
            } else if (rowIndex <= 5) {
                noteToBePlayed = String.fromCharCode(70 - rowIndex) + "4";
            } else {
                noteToBePlayed = String.fromCharCode(77 - rowIndex) + "4";
            }

            if (row[i].noteLength == 0) {
                rowNotes.push(null);
            } else if (row[i].noteLength == 1) {
                rowNotes.push(noteToBePlayed);
            } else if (row[i].noteLength == 2) {
                noteArray.push(noteToBePlayed);
                noteArray.push(null);
            } else if (row[i].noteLength == 4) {
                noteArray.push(noteToBePlayed);
                noteArray.push(null);
                noteArray.push(null);
                noteArray.push(null);
            } else {
                noteArray.push(noteToBePlayed);
                noteArray.push(null);
                noteArray.push(null);
                noteArray.push(null);
                noteArray.push(null);
                noteArray.push(null);
                noteArray.push(null);
                noteArray.push(null);
            }
        }

        trebleNotes.push(rowNotes);
    })

    bassData.forEach(function(row) {
        // temp row array
        let rowNotes = [];
        let rowIndex = bassData.indexOf(row) % 9;

        // iterates over each column and fills out rowNotes with proper subset of notes
        for (let i = 0; i < numberOfNotes; i++) {
            let noteToBePlayed = "A3";

            let noteArray = [];

            if (rowIndex < 1) {
                noteToBePlayed = "A3";
            } else if (rowIndex <= 5) {
                noteToBePlayed = String.fromCharCode(72 - rowIndex) + "3";
            } else {
                noteToBePlayed = String.fromCharCode(77 - rowIndex) + "2";
            }

            if (row[i].noteLength == 0) {
                rowNotes.push(null);
            } else if (row[i].noteLength == 1) {
                rowNotes.push(noteToBePlayed);
            } else if (row[i].noteLength == 2) {
                rowNotes.push(noteToBePlayed);
                rowNotes.push(null);
            } else if (row[i].noteLength == 4) {
                noteArray.push(noteToBePlayed);
                noteArray.push(null);
                noteArray.push(null);
                noteArray.push(null);
            } else {
                noteArray.push(noteToBePlayed);
                noteArray.push(null);
                noteArray.push(null);
                noteArray.push(null);
                noteArray.push(null);
                noteArray.push(null);
                noteArray.push(null);
                noteArray.push(null);
            }
        }

        bassNotes.push(rowNotes);
    })

    trebleNotes = transpose(trebleNotes);
    bassNotes = transpose(bassNotes);

    console.log(trebleNotes);

    synthPart = new Tone.Sequence(
        function(time, note) {
            synth.triggerAttackRelease(note, "4n", time);
        },
        trebleNotes,
        "2n"
    );

    // disable/enable buttons
    startButton.setAttribute('disabled', 'true');
    stopButton.removeAttribute('disabled');

    // start timelines
    synthPart.start();
    Tone.Transport.start();
}

function stopPlaying() {
    // disable/enable buttons
    startButton.removeAttribute('disabled');
    stopButton.setAttribute('disabled', 'true');

    // stop transport
    synthPart.dispose();
    synthPart.removeAll();
    Tone.Transport.stop();
    Tone.Transport.cancel();
}

function transpose(a) {
    return a[0].map((_, c) => a.map(r => r[c]));
}