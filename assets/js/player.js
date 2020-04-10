// buttons
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');

// variables
let timeBetweenNotes = 2000;
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
          if (noteRowGroup == 0) {
            if (rowIndex <= 3) {
                noteToBePlayed = String.fromCharCode(70 - rowIndex) + "5";
            } else if (rowIndex <= 5) {
                noteToBePlayed = String.fromCharCode(70 - rowIndex) + "4";
            } else {
                noteToBePlayed = String.fromCharCode(77 - rowIndex) + "4";
            }
            noteToBePlayed = ''.concat(noteToBePlayed[0], trebleAccidentals[rowIndex][i], noteToBePlayed[noteToBePlayed.length - 1]);
          }

          // if array is bass
          else if (noteRowGroup == 1) {
            if (rowIndex < 1) {
                  noteToBePlayed = "A3";
              } else if (rowIndex <= 5) {
                  noteToBePlayed = String.fromCharCode(72 - rowIndex) + "3";
              } else if (rowIndex <= 7) {
                  noteToBePlayed = String.fromCharCode(72 - rowIndex) + "2";
              } else {
                  noteToBePlayed = String.fromCharCode(79 - rowIndex) + "2";
              }
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
        maxLength = 8;
        // highlight column
        highlightColumn(count);

        // play notes
        for (let i = 0; i < notes[count].length; i++){
          notePlaying = notes[count][i].noteT
          //console.log(''.concat(notePlaying[0] + notes[count][i].noteAccidental + notePlaying[notePlaying.length - 1]));
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
