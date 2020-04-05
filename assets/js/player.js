// buttons
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');

// variables
let timeBetweenNotes = 3000;
let isPlaying = false;

// create synths
let synth = new Tone.PolySynth(18, Tone.Synth, {
    oscillator : {
        type : "sine"
    }
}).toMaster();

// interval variable
let interval;

let notes = [];

async function startPlaying(startPlaying) {
    // combined the arrays, but this actually won't allow us to add more than one row for now
    notes = [];
    noteGroups = [trebleData, bassData];
    // iterate through both arrays
    for(let noteRowGroup = 0; noteRowGroup < 2; noteRowGroup++ ){
    noteGroups[noteRowGroup].forEach(function(row) {
        // temp row array
        let rowNotes = [];
        let rowIndex = noteGroups[noteRowGroup].indexOf(row) % 9;

        // iterates over each column and fills out rowNotes with proper subset of notes
        for (let i = 0; i < numberOfNotes; i++) {
          let noteLen = row[i].noteLength;

          // if no note, just push null and skip
          if (noteLen == 0) {
            rowNotes.push(null);
            continue;
          }

          let noteToBePlayed = "F5";

          let noteLength;
          // if array is treble
          if (noteRowGroup == 0) {
            if (rowIndex <= 3) {
                noteToBePlayed = String.fromCharCode(70 - rowIndex) + "5";
            } else if (rowIndex <= 5) {
                noteToBePlayed = String.fromCharCode(70 - rowIndex) + "4";
            } else {
                noteToBePlayed = String.fromCharCode(77 - rowIndex) + "4";
            }
          }

          // if array is bass
          else if (noteRowGroup == 1) {
            if (rowIndex < 1) {
                  noteToBePlayed = "A3";
              } else if (rowIndex <= 5) {
                  noteToBePlayed = String.fromCharCode(72 - rowIndex) + "3";
              } else {
                  noteToBePlayed = String.fromCharCode(77 - rowIndex) + "2";
              }
          }

          // push note object into the row
          rowNotes.push({noteT: noteToBePlayed, noteLength: noteLen});
        }
        notes.push(rowNotes);
      })
    }

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
      var maxLength = 1;
      isPlaying = true;
      while (count < numberOfNotes && isPlaying) {
        maxLength = 8;
        for (let i = 0; i < notes[count].length; i++){
          synth.triggerAttackRelease(notes[count][i].noteT, (notes[count][i].noteLength.toString() + "n"));
          if (notes[count][i].noteLength < maxLength) {
            maxLength = notes[count][i].noteLength;
            //insert quantum computing server here
          }
        }
        await sleep(timeBetweenNotes/maxLength);

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
