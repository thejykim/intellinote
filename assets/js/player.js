// buttons
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');

// variables
let timeBetweenNotes = 1000;

// create synths
let synth = new Tone.PolySynth(18, Tone.Synth, {
    oscillator : {
        type : "sine"
    }
}).toMaster();

let notes = [];

function startPlaying() {
    // combined the arrays, but this actually won't allow us to add more than one row for now
    notes = [];

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

        notes.push(rowNotes);
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

        notes.push(rowNotes);
    })

    // transpose first, because if you remove null before then the transposition won't work
    notes = transpose(notes);

    console.log(notes);

    // removes null from the notes array because otherwise triggerAttack flips out
    for (let i = 0; i < numberOfNotes; i++) {
        notes[i] = notes[i].filter(checkNull);
    }

    console.log(notes);

    // disable/enable buttons
    startButton.setAttribute('disabled', 'true');
    stopButton.removeAttribute('disabled');

    let count = 0;
    setInterval(function() {
        synth.triggerAttackRelease(notes[count], "4n");
        if (++count > numberOfNotes) {
            // this actually doesn't work so we have to fix this
            clearInterval();
        }
        console.log(count);
    }, timeBetweenNotes);
}

function stopPlaying() {
    // disable/enable buttons
    startButton.removeAttribute('disabled');
    stopButton.setAttribute('disabled', 'true');

    // stop playing (this doesn't work either...)
    clearInterval();
}

function transpose(a) {
    return a[0].map((_, c) => a.map(r => r[c]));
}

function checkNull(element) {
    console.log((element != null));
    return (element != null);
}