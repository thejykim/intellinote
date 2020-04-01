// buttons
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');

// create synths
const synth = new Tone.Synth().toMaster();
const synth2 = new Tone.Synth().toMaster();

// set oscillators
synth.oscillator.type = "sine";
synth2.oscillator.type = "sine";

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
                noteArray.push(null);
            } else if (row[i].noteLength == 1) {
                noteArray.push(noteToBePlayed);
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

            rowNotes.push(noteArray);
        }

        trebleNotes.push(rowNotes);
    })

    bassData.forEach(function(row) {
        // temp row array
        let rowNotes = [];
        let rowIndex = bassData.indexOf(row) % 9;

        // iterates over each column and fills out rowNotes with proper subset of notes
        for (let i = 0; i < numberOfNotes; i++) {
            if (row[i].noteLength == 0) {
                continue;
            }

            let noteToBePlayed = "A3";

            let noteArray = [];

            noteArray.push(`${i/2}`);

            if (rowIndex < 1) {
                noteToBePlayed = "A3";
            } else if (rowIndex <= 5) {
                noteToBePlayed = String.fromCharCode(72 - rowIndex) + "3";
            } else {
                noteToBePlayed = String.fromCharCode(77 - rowIndex) + "2";
            }

            noteArray.push(noteToBePlayed);

            // if (row[i].noteLength == 0) {
            //     noteArray.push(null);
            // } else if (row[i].noteLength == 1) {
            //     noteArray.push(noteToBePlayed);
            // } else if (row[i].noteLength == 2) {
            //     noteArray.push(noteToBePlayed);
            //     noteArray.push(null);
            // } else if (row[i].noteLength == 4) {
            //     noteArray.push(noteToBePlayed);
            //     noteArray.push(null);
            //     noteArray.push(null);
            //     noteArray.push(null);
            // } else {
            //     noteArray.push(noteToBePlayed);
            //     noteArray.push(null);
            //     noteArray.push(null);
            //     noteArray.push(null);
            //     noteArray.push(null);
            //     noteArray.push(null);
            //     noteArray.push(null);
            //     noteArray.push(null);
            // }

            rowNotes.push(noteArray);
        }

        bassNotes.push(rowNotes);
    })

    let synthTimeline = new Tone.Part(function(time, note){
            synth.triggerAttackRelease(note, "2hz", time);
        },
        bassNotes[0]
    );

    let synth2Timeline = new Tone.Part(function(time, note){
            synth.triggerAttackRelease(note, "2hz", time);
        },
        bassNotes[1]
    );

    console.log(bassNotes);

    // disable/enable buttons
    startButton.setAttribute('disabled', 'true');
    stopButton.removeAttribute('disabled');

    // start timelines
    synthTimeline.start(0);
    Tone.Transport.start();
}

function stopPlaying() {
    // disable/enable buttons
    startButton.removeAttribute('disabled');
    stopButton.setAttribute('disabled', 'true');

    // stop transport
    Tone.Transport.stop();
}