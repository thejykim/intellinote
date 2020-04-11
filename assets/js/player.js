// buttons
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const speedText = document.getElementById('speed');

// variables
let timeBetweenNotes = 2000;
let isPlaying = false;
let bpm = 120;

// create synths
let synth = new Tone.PolySynth(18, Tone.Synth, {
    oscillator : {
        type : "sine"
    }
}).toMaster();

// interval variable
let interval;

let notes = [];

let trebleNoteKey = ["A5", "G5", "F5", "E5", "D5", "C5", "B4", "A4", "G4", "F4", "E4","D4", "C4"];
let bassNoteKey = ["C4", "B3", "A3", "G3", "F3", "E3", "D3", "C2", "B2", "A2", "G2", "F2", "E2"];

async function startPlaying() {
    // combined the arrays, but this actually won't allow us to add more than one row for now
    notes = [];
    noteGroups = [trebleData, bassData];
    // iterate through both arrays
    for(let noteRowGroup = 0; noteRowGroup < 2; noteRowGroup++ ){
    noteGroups[noteRowGroup].forEach(function(row) {
        // temp row array
        let rowNotes = [];
        let rowIndex = noteGroups[noteRowGroup].indexOf(row) % numOfRows;

        // iterates over each column and fills out rowNotes with proper subset of notes
        for (let i = 0; i < (numberOfNotes*(newLine+1)); i++) {
          let noteLen = row[i].noteLength;

          // if no note, just push null and skip
          if (noteLen == 0) {
            rowNotes.push(null);
            continue;
          }

          let noteToBePlayed = "F5";

          let noteLength;
          // if array is treble
          // replaced if statements with array access

          if (noteRowGroup == 0) {

            noteToBePlayed = trebleNoteKey[rowIndex];
            noteToBePlayed = ''.concat(noteToBePlayed[0], trebleAccidentals[rowIndex][i], noteToBePlayed[noteToBePlayed.length - 1]);

          }

          // if array is bass
          else if (noteRowGroup == 1) {
            noteToBePlayed = bassNoteKey[rowIndex];
           noteToBePlayed = ''.concat(noteToBePlayed[0], bassAccidentals[rowIndex][i], noteToBePlayed[noteToBePlayed.length - 1]);
          }
          // account for accidentals (natural, sharp, flat)
          // push note object into the row
          rowNotes.push({noteT: noteToBePlayed, noteLength: noteLen});
        }
        notes.push(rowNotes);
    })
    }

      // transpose first, because if you remove null before then the transposition won't work
      notes = transpose(notes);

     // console.log(notes);

      // removes null from the notes array because otherwise triggerAttack flips out
      for (let i = 0; i < numberOfNotes * (newLine+1); i++) {
          notes[i] = notes[i].filter(checkNull);
      }

      // console.log(notes);

      // disable/enable buttons
      startButton.setAttribute('disabled', 'true');
      stopButton.removeAttribute('disabled');


      let count = 0;
      var maxLength = 1;
      isPlaying = true;
      while (count < (numberOfNotes * (newLine +1)) && isPlaying) {
        maxLength = beatsPerMeas;
        highlightColumn(count);

        for (let i = 0; i < notes[count].length; i++){
          notePlaying = notes[count][i].noteT;
          synth.triggerAttackRelease(notePlaying, (notes[count][i].noteLength.toString() + "n"));

          if (notes[count][i].noteLength < maxLength) {
            maxLength = notes[count][i].noteLength;
            //insert quantum computing server here
          }
        }
        await sleep(timeBetweenNotes/8);

        count++;
      }
      stopPlaying();
      return;
  }

  function pushNull(noteArray, numToPush) {
    for (let i = 0; i < numToPush; i++){
      noteArray.push(null);
    }
  }

  function stopPlaying() {
      // disable/enable buttons
      startButton.removeAttribute('disabled');
      stopButton.setAttribute('disabled', 'true');

      // stop playing (this doesn't work either...)
      isPlaying = false;
  }

  function transpose(a) {
      return a[0].map((_, c) => a.map(r => r[c]));
  }

  function checkNull(element) {
      return (element != null);
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function highlightColumn(i) {
    // change element classes
    for (let j = 0; j < numberOfRows; j++) {
        let noteElement = document.getElementById(trebleData[j][i].id);
        noteElement.className += " highlighted";
        noteElement = document.getElementById(bassData[j][i].id);
        noteElement.className += " highlighted";
    }

    // delay call to unhighlight for the appropriate duration
    window.setTimeout(function() { unhighlightColumn(i); }, timeBetweenNotes/8);
}

function unhighlightColumn(i) {
    // change element classes back
    for (let j = 0; j < numberOfRows; j++) {
        let noteElement = document.getElementById(trebleData[j][i].id);
        noteElement.classList.remove("highlighted");
        noteElement = document.getElementById(bassData[j][i].id);
        noteElement.classList.remove("highlighted");
    }
}
function updateTempo(value) {
     timeBetweenNotes = 2000 * (120/value);
     bpm = value;
     speedText.innerText = `Current speed: ${bpm} BPM`;
}
